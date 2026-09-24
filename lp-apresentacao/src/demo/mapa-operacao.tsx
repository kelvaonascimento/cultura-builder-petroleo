"use client";

// Mapa real do Brasil (OpenFreeMap + malhas do IBGE) com a frota simulada rodando
// pelas rotas rodoviárias reais (OSRM/OpenStreetMap). Carregado só no cliente via mapa.tsx.

import { useEffect, useMemo, useRef, useState } from "react";
import { Map as MLMap, NavigationControl, type ExpressionSpecification, type LayerSpecification, type MapLayerMouseEvent } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { TripsLayer } from "@deck.gl/geo-layers";
import { ScatterplotLayer } from "@deck.gl/layers";
import malhaJson from "./malha.json";

export type Tema = "light" | "dark";
type TipoNo = "refinaria" | "porto" | "terminal" | "base" | "praca";
type No = { id: string; nome: string; rotulo?: string; tipo: TipoNo; uf: string; lat: number; lon: number; real: boolean; municipio?: string; capacidade_m3?: number; precisao?: string };
type RotaGeo = { id: string; de: string; para: string; produto: string; km: number; min: number; coords: [number, number][] };
type Grupo = "diesel" | "gasolina" | "etanol";
type Caminhao = { id: string; rota: RotaGeo; grupo: Grupo; volume: number; inicio: number; dur: number; cum: number[]; total: number };
type Selecao = { tipo: "no"; no: No } | { tipo: "caminhao"; c: Caminhao; progresso: number } | null;

const MALHA = malhaJson as unknown as { nos: No[]; dutos: { id: string; nome: string; pontos: string[] }[] };
const NOS = Object.fromEntries(MALHA.nos.map((n) => [n.id, n]));

const ESTILO: Record<Tema, string> = {
  light: "https://tiles.openfreemap.org/styles/positron",
  dark: "https://tiles.openfreemap.org/styles/dark",
};

// Paleta categórica validada (skill dataviz, 3 slots, all-pairs, claro e escuro)
const PALETA: Record<Tema, Record<Grupo, [number, number, number]> & { ink: string; tinta2: string; muted: string; surface: string; mascara: string; uf: string; pais: string; rota: string }> = {
  light: { diesel: [42, 120, 214], gasolina: [235, 104, 52], etanol: [27, 175, 122], ink: "#0b0b0b", tinta2: "#52514e", muted: "#898781", surface: "#fcfcfb", mascara: "rgba(205,204,196,0.55)", uf: "#b5b4ab", pais: "#52514e", rota: "#9c9a93" },
  dark: { diesel: [57, 135, 229], gasolina: [217, 89, 38], etanol: [25, 158, 112], ink: "#ffffff", tinta2: "#c3c2b7", muted: "#898781", surface: "#1a1a19", mascara: "rgba(0,0,0,0.55)", uf: "#383835", pais: "#898781", rota: "#5c5b57" },
};

const ROTULO_GRUPO: Record<Grupo, string> = { diesel: "Diesel S10/S500", gasolina: "Gasolina C", etanol: "Etanol hidratado" };
const ROTULO_PRODUTO: Record<string, string> = { diesel_s10: "Diesel S10", diesel_s500: "Diesel S500", gasolina_c: "Gasolina C", etanol: "Etanol hidratado" };
const ROTULO_TIPO: Record<TipoNo, string> = { refinaria: "Refinaria", porto: "Porto", terminal: "Terminal", base: "Base própria", praca: "Praça" };

const CICLO = 48; // segundos de animação por volta completa da frota
const grupoDe = (p: string): Grupo => (p.startsWith("diesel") ? "diesel" : p === "etanol" ? "etanol" : "gasolina");
const fmtInt = (n: number) => n.toLocaleString("pt-BR");

// comprimento acumulado do trajeto (graus corrigidos pela latitude — suficiente para interpolar)
function acumulado(coords: [number, number][]) {
  const cum = [0];
  for (let i = 1; i < coords.length; i++) {
    const [x1, y1] = coords[i - 1];
    const [x2, y2] = coords[i];
    const k = Math.cos(((y1 + y2) / 2) * (Math.PI / 180));
    cum.push(cum[i - 1] + Math.hypot((x2 - x1) * k, y2 - y1));
  }
  return cum;
}

function pontoEm(c: Caminhao, p: number): [number, number] {
  const alvo = p * c.total;
  const { coords } = c.rota;
  let i = 1;
  while (i < c.cum.length - 1 && c.cum[i] < alvo) i++;
  const seg = c.cum[i] - c.cum[i - 1] || 1;
  const t = Math.min(1, Math.max(0, (alvo - c.cum[i - 1]) / seg));
  return [coords[i - 1][0] + (coords[i][0] - coords[i - 1][0]) * t, coords[i - 1][1] + (coords[i][1] - coords[i - 1][1]) * t];
}

function progressoEm(c: Caminhao, t: number) {
  const local = (((t - c.inicio) % CICLO) + CICLO) % CICLO;
  return local <= c.dur ? local / c.dur : null; // null = descarregando/voltando (fora do mapa)
}

function montarFrota(rotas: RotaGeo[]): Caminhao[] {
  const frota: Caminhao[] = [];
  rotas.forEach((rota, i) => {
    const cum = acumulado(rota.coords);
    const dur = Math.min(30, Math.max(7, rota.min / 22));
    const n = rota.km > 250 ? 2 : 1;
    for (let k = 0; k < n; k++) {
      frota.push({
        id: `CT-${String(frota.length + 1).padStart(2, "0")}`,
        rota,
        grupo: grupoDe(rota.produto),
        volume: rota.produto.startsWith("diesel") && rota.km > 250 ? 45000 : 30000,
        inicio: (i * 7.7 + k * (CICLO / 2)) % CICLO,
        dur,
        cum,
        total: cum[cum.length - 1] || 1,
      });
    }
  });
  return frota;
}

function camadasProprias(map: MLMap, tema: Tema, rotas: RotaGeo[]) {
  const c = PALETA[tema];
  const primeiroRotulo = map.getStyle().layers.find((l) => /^(label_|place_)/.test(l.id))?.id;
  // tira os rótulos de cidade do mapa base — as praças da operação ganham os próprios rótulos
  for (const l of map.getStyle().layers) {
    if (l.type !== "symbol") continue;
    if (/(city|town|village|other|suburb|highway|road|shield|poi|airport)/.test(l.id)) map.setLayoutProperty(l.id, "visibility", "none");
    else map.setLayoutProperty(l.id, "text-field", ["coalesce", ["get", "name:pt"], ["get", "name:latin"], ["get", "name"]]);
  }
  map.addSource("mascara", { type: "geojson", data: `${location.origin}/geo/mascara-brasil.json` });
  map.addSource("ufs", { type: "geojson", data: `${location.origin}/geo/brasil-uf.json` });
  map.addLayer({ id: "mascara", type: "fill", source: "mascara", paint: { "fill-color": c.mascara } }, primeiroRotulo);
  map.addLayer({ id: "ufs", type: "line", source: "ufs", paint: { "line-color": c.uf, "line-width": 0.8 } }, primeiroRotulo);

  map.addSource("rotas", {
    type: "geojson",
    data: { type: "FeatureCollection", features: rotas.map((r) => ({ type: "Feature", properties: { id: r.id }, geometry: { type: "LineString", coordinates: r.coords } })) },
  });
  map.addLayer({ id: "rotas", type: "line", source: "rotas", layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": c.rota, "line-width": 1.4, "line-opacity": 0.55 } });

  map.addSource("dutos", {
    type: "geojson",
    data: { type: "FeatureCollection", features: MALHA.dutos.map((d) => ({ type: "Feature", properties: { nome: d.nome }, geometry: { type: "LineString", coordinates: d.pontos.map((p) => [NOS[p].lon, NOS[p].lat]) } })) },
  });
  map.addLayer({ id: "dutos", type: "line", source: "dutos", paint: { "line-color": c.tinta2, "line-width": 1.6, "line-dasharray": [2, 2], "line-opacity": 0.8 } });

  const prioridade: Record<TipoNo, number> = { base: 0, refinaria: 1, porto: 2, terminal: 3, praca: 4 };
  map.addSource("nos", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: MALHA.nos.map((n) => ({ type: "Feature", properties: { id: n.id, tipo: n.tipo, rotulo: n.rotulo ?? n.nome, ordem: prioridade[n.tipo] }, geometry: { type: "Point", coordinates: [n.lon, n.lat] } })),
    },
  });
  const oco: ExpressionSpecification = ["in", ["get", "tipo"], ["literal", ["porto", "terminal"]]];
  map.addLayer({
    id: "nos-circulo",
    type: "circle",
    source: "nos",
    paint: {
      "circle-radius": ["match", ["get", "tipo"], "base", 6.5, "refinaria", 6, "praca", 3.5, 5],
      "circle-color": ["case", oco, c.surface, ["==", ["get", "tipo"], "praca"], c.muted, c.ink],
      "circle-stroke-color": ["case", oco, c.ink, c.surface],
      "circle-stroke-width": ["case", ["==", ["get", "tipo"], "praca"], 1, 2],
    },
  } as LayerSpecification);
  map.addLayer({
    id: "nos-rotulo",
    type: "symbol",
    source: "nos",
    layout: {
      "text-field": ["get", "rotulo"],
      "text-font": ["Noto Sans Regular"],
      "text-size": ["match", ["get", "tipo"], "praca", 10.5, 11.5],
      "text-variable-anchor": ["top", "bottom", "left", "right"],
      "text-radial-offset": 0.9,
      "text-justify": "auto",
      "symbol-sort-key": ["get", "ordem"],
    },
    paint: {
      "text-color": ["match", ["get", "tipo"], "praca", c.tinta2, c.ink],
      "text-halo-color": c.surface,
      "text-halo-width": 1.6,
    },
  } as LayerSpecification);
}

export default function MapaOperacao({ tema = "light", altura = 520, onEmRota }: { tema?: Tema; altura?: number; onEmRota?: (n: number) => void }) {
  const caixa = useRef<HTMLDivElement>(null);
  const mapa = useRef<MLMap | null>(null);
  const overlay = useRef<MapboxOverlay | null>(null);
  const temaRef = useRef(tema);
  const onEmRotaRef = useRef(onEmRota);
  onEmRotaRef.current = onEmRota;
  const [rotas, setRotas] = useState<RotaGeo[] | null>(null);
  const [sel, setSel] = useState<Selecao>(null);
  const [emRota, setEmRota] = useState(0);
  const frota = useMemo(() => (rotas ? montarFrota(rotas) : []), [rotas]);

  useEffect(() => {
    fetch("/geo/rotas.json").then((r) => r.json()).then((d) => setRotas(d.rotas));
  }, []);

  // cria o mapa uma vez
  useEffect(() => {
    if (!caixa.current || !rotas) return;
    const lons = MALHA.nos.map((n) => n.lon);
    const lats = MALHA.nos.map((n) => n.lat);
    const map = new MLMap({
      container: caixa.current,
      style: ESTILO[temaRef.current],
      bounds: [
        [Math.min(...lons), Math.min(...lats)],
        [Math.max(...lons), Math.max(...lats)],
      ],
      fitBoundsOptions: { padding: caixa.current.clientWidth >= 640 ? { top: 40, bottom: 40, left: 300, right: 60 } : { top: 24, bottom: 24, left: 20, right: 20 } },
      maxBounds: [
        [-85, -40],
        [-20, 12],
      ],
      cooperativeGestures: true,
      renderWorldCopies: false,
      attributionControl: { compact: true, customAttribution: "Malhas: IBGE · Rotas: OSRM/OpenStreetMap" },
      locale: {
        "CooperativeGesturesHandler.WindowsHelpText": "Use Ctrl + rolagem para dar zoom no mapa",
        "CooperativeGesturesHandler.MacHelpText": "Use ⌘ + rolagem para dar zoom no mapa",
        "CooperativeGesturesHandler.MobileHelpText": "Use dois dedos para mover o mapa",
      },
    });
    map.addControl(new NavigationControl({ showCompass: false }), "top-right");
    // interleaved: a frota é desenhada dentro do próprio WebGL do mapa (rastros por baixo dos pontos e rótulos)
    const ov = new MapboxOverlay({ interleaved: true, layers: [] });
    map.addControl(ov);
    map.on("style.load", () => camadasProprias(map, temaRef.current, rotas));
    // créditos começam recolhidos (ícone "i") para não cobrir rótulos
    map.once("load", () => caixa.current?.querySelector(".maplibregl-ctrl-attrib")?.classList.remove("maplibregl-compact-show"));
    map.on("click", "nos-circulo", (e: MapLayerMouseEvent) => {
      const id = e.features?.[0]?.properties?.id as string | undefined;
      if (id) setSel({ tipo: "no", no: NOS[id] });
    });
    map.on("mouseenter", "nos-circulo", () => (map.getCanvas().style.cursor = "pointer"));
    map.on("mouseleave", "nos-circulo", () => (map.getCanvas().style.cursor = ""));
    mapa.current = map;
    overlay.current = ov;
    if (process.env.NODE_ENV !== "production") (window as unknown as { __mapas?: MLMap[] }).__mapas = [...((window as unknown as { __mapas?: MLMap[] }).__mapas ?? []), map];
    return () => {
      map.remove();
      mapa.current = null;
      overlay.current = null;
    };
  }, [rotas]);

  // troca de tema: novo estilo base e recoloca as camadas próprias
  useEffect(() => {
    temaRef.current = tema;
    const map = mapa.current;
    if (map) map.setStyle(ESTILO[tema], { diff: false });
  }, [tema]);

  // animação da frota (pausa fora da tela e com "reduzir movimento")
  useEffect(() => {
    const ov = overlay.current;
    if (!ov || !frota.length || !caixa.current) return;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const viagens = frota.flatMap((c) => {
      const ts = c.cum.map((d) => c.inicio + (d / c.total) * c.dur);
      return [0, -CICLO].map((desl) => ({ c, path: c.rota.coords, ts: ts.map((x) => x + desl) }));
    });
    let visivel = true;
    const io = new IntersectionObserver(([e]) => (visivel = e.isIntersecting));
    io.observe(caixa.current);
    const t0 = performance.now();
    let raf = 0;
    let ultimoContador = -1;
    const quadro = () => {
      const t = reduzir ? CICLO * 0.37 : (((performance.now() - t0) / 1000) % CICLO + CICLO) % CICLO;
      const cor = PALETA[temaRef.current];
      const ativos = frota.map((c) => ({ c, p: progressoEm(c, t) })).filter((x) => x.p !== null) as { c: Caminhao; p: number }[];
      const antes = mapa.current?.getLayer("nos-circulo") ? "nos-circulo" : undefined;
      ov.setProps({
        layers: [
          new TripsLayer({
            id: "rastros",
            beforeId: antes,
            data: viagens,
            getPath: (d: (typeof viagens)[number]) => d.path,
            getTimestamps: (d: (typeof viagens)[number]) => d.ts,
            getColor: (d: (typeof viagens)[number]) => cor[d.c.grupo],
            currentTime: t,
            trailLength: 7,
            fadeTrail: true,
            widthMinPixels: 4,
            capRounded: true,
            jointRounded: true,
            updateTriggers: { getColor: temaRef.current },
          }),
          new ScatterplotLayer({
            id: "caminhoes",
            beforeId: antes,
            data: ativos,
            getPosition: (d: { c: Caminhao; p: number }) => pontoEm(d.c, d.p),
            getFillColor: (d: { c: Caminhao }) => cor[d.c.grupo],
            getLineColor: temaRef.current === "dark" ? [26, 26, 25] : [252, 252, 251],
            stroked: true,
            lineWidthMinPixels: 2,
            radiusMinPixels: 6,
            radiusMaxPixels: 6,
            pickable: true,
            onClick: ({ object }: { object?: { c: Caminhao; p: number } }) => {
              if (object) setSel({ tipo: "caminhao", c: object.c, progresso: object.p });
            },
            updateTriggers: { getPosition: t, getFillColor: temaRef.current },
          }),
        ],
      });
      if (ativos.length !== ultimoContador) {
        ultimoContador = ativos.length;
        setEmRota(ativos.length);
        onEmRotaRef.current?.(ativos.length);
      }
      if (!reduzir) raf = requestAnimationFrame(function laco() {
        if (visivel) quadro();
        else raf = requestAnimationFrame(laco);
      });
    };
    quadro();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [frota]);

  // mantém o card do caminhão atualizado enquanto ele anda
  useEffect(() => {
    if (sel?.tipo !== "caminhao") return;
    const id = setInterval(() => {
      const t = ((performance.now() / 1000) % CICLO + CICLO) % CICLO;
      setSel((s) => (s?.tipo === "caminhao" ? { ...s, progresso: progressoEm(s.c, t) ?? 1 } : s));
    }, 1000);
    return () => clearInterval(id);
  }, [sel?.tipo]);

  const kmRodando = useMemo(() => Math.round(frota.reduce((s, c) => s + c.rota.km, 0)), [frota]);
  const cor = PALETA[tema];

  return (
    <div className="relative w-full" role="img" aria-label={`Mapa do Brasil com ${frota.length} caminhões simulados em ${rotas?.length ?? 0} rotas rodoviárias reais entre refinarias, portos, bases e praças`}>
      <div className="relative overflow-hidden rounded-2xl ring-1 ring-foreground/[0.07]" style={{ height: `clamp(360px, 62vh, ${altura}px)` }}>
        <div ref={caixa} className="h-full w-full" />
        {!rotas && <div className="absolute inset-0 animate-pulse bg-secondary" />}
      </div>

      <div className="mt-2 grid gap-2 sm:mt-0 sm:contents">

      {/* resumo / detalhe */}
      <div className="pointer-events-auto rounded-xl bg-card/95 p-3 text-[11.5px] ring-1 ring-foreground/10 backdrop-blur sm:absolute sm:left-3 sm:top-3 sm:w-[260px] sm:shadow-lg">
        {sel === null && (
          <>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Frota em movimento</p>
            <p className="mt-1 text-[20px] font-semibold tabular-nums text-foreground">{emRota} <span className="text-[12px] font-medium text-muted-foreground">caminhões em rota</span></p>
            <p className="mt-0.5 text-muted-foreground">{rotas?.length ?? 0} rotas · {fmtInt(kmRodando)} km de malha rodoviária</p>
            <p className="mt-2 text-[10.5px] text-muted-foreground">Clique num caminhão ou num ponto para ver o detalhe.</p>
          </>
        )}
        {sel?.tipo === "caminhao" && (
          <>
            <div className="flex items-center justify-between">
              <p className="font-semibold text-foreground">{sel.c.id} · {ROTULO_PRODUTO[sel.c.rota.produto]}</p>
              <button type="button" onClick={() => setSel(null)} className="text-muted-foreground hover:text-foreground" aria-label="Fechar">✕</button>
            </div>
            <p className="mt-1 text-muted-foreground">{NOS[sel.c.rota.de].nome} → {NOS[sel.c.rota.para].nome}</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full" style={{ width: `${Math.round(sel.progresso * 100)}%`, background: `rgb(${cor[sel.c.grupo].join(",")})` }} />
            </div>
            <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
              <dt className="text-muted-foreground">Carga</dt><dd className="text-right tabular-nums text-foreground">{fmtInt(sel.c.volume)} L</dd>
              <dt className="text-muted-foreground">Trecho</dt><dd className="text-right tabular-nums text-foreground">{sel.c.rota.km.toLocaleString("pt-BR")} km</dd>
              <dt className="text-muted-foreground">Percorrido</dt><dd className="text-right tabular-nums text-foreground">{Math.round(sel.progresso * 100)}%</dd>
              <dt className="text-muted-foreground">Chegada</dt><dd className="text-right tabular-nums text-foreground">em {Math.max(0, Math.round((1 - sel.progresso) * sel.c.rota.min))} min</dd>
            </dl>
            <p className="mt-2 text-[10px] text-muted-foreground">Trajeto rodoviário real (OSRM) · caminhão e carga simulados</p>
          </>
        )}
        {sel?.tipo === "no" && (
          <>
            <div className="flex items-center justify-between">
              <p className="font-semibold text-foreground">{sel.no.nome}</p>
              <button type="button" onClick={() => setSel(null)} className="text-muted-foreground hover:text-foreground" aria-label="Fechar">✕</button>
            </div>
            <p className="mt-1 text-muted-foreground">{ROTULO_TIPO[sel.no.tipo]} · {sel.no.municipio ? `${sel.no.municipio}/` : ""}{sel.no.uf}</p>
            {sel.no.capacidade_m3 && <p className="mt-1 tabular-nums text-foreground">Tancagem: {fmtInt(sel.no.capacidade_m3)} m³</p>}
            <p className="mt-2 inline-flex rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
              {sel.no.real ? `Infraestrutura real${sel.no.precisao ? ` · posição: ${sel.no.precisao}` : ""}` : "Base da empresa fictícia"}
            </p>
          </>
        )}
      </div>

      {/* legenda */}
      <div className="pointer-events-none rounded-xl bg-card/95 p-2.5 text-[10.5px] text-muted-foreground ring-1 ring-foreground/10 backdrop-blur sm:absolute sm:bottom-3 sm:left-3 sm:shadow-lg">
        <div className="flex flex-col gap-1">
          {(Object.keys(ROTULO_GRUPO) as Grupo[]).map((g) => (
            <span key={g} className="flex items-center gap-1.5">
              <span className="h-1 w-4 rounded-full" style={{ background: `rgb(${cor[g].join(",")})` }} />
              <span className="text-foreground">{ROTULO_GRUPO[g]}</span>
            </span>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 border-t border-border pt-2">
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-foreground" />Refinaria / base</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full border-2 border-foreground bg-card" />Porto / terminal</span>
          <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full" style={{ background: cor.muted }} />Praça</span>
          <span className="flex items-center gap-1.5"><span className="w-4 border-t-2 border-dashed" style={{ borderColor: cor.tinta2 }} />Duto OSBRA</span>
        </div>
      </div>
      </div>
    </div>
  );
}
