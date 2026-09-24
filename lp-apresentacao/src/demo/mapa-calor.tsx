"use client";

// Mapa de calor por UF (contorno oficial do IBGE): oportunidades × riscos da empresa fictícia.
// Mercado 2025 é dado real da ANP; participação, alcance, volume endereçável e risco são simulados.

import { useEffect, useMemo, useRef, useState } from "react";
import { Map as MLMap, type ExpressionSpecification, type MapLayerMouseEvent, type StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { ExternalLink } from "lucide-react";
import { FONTE_MERCADO, UFS, type UF } from "./calor-dados";

type Tema = "light" | "dark";
type Camada = "oportunidade" | "risco";

// sequenciais de um matiz só (skill dataviz): azul p/ oportunidade, laranja p/ risco
const RAMPA: Record<Camada, string[]> = {
  oportunidade: ["#cde2fb", "#9ec5f4", "#6da7ec", "#3987e5", "#256abf", "#184f95", "#0d366b"],
  risco: ["#fde4d8", "#f9c2a8", "#f39c77", "#eb6834", "#c9531f", "#9e3f15", "#6e2b0d"],
};
const SUPERFICIE: Record<Tema, { fundo: string; vazio: string; tinta: string; borda: string }> = {
  light: { fundo: "#fcfcfb", vazio: "#ebeae4", tinta: "#0b0b0b", borda: "#fcfcfb" },
  dark: { fundo: "#1a1a19", vazio: "#2c2c2a", tinta: "#ffffff", borda: "#1a1a19" },
};
const POR_COD = Object.fromEntries(UFS.map((u) => [u.cod, u]));
const fmt = (n: number) => n.toLocaleString("pt-BR");
const valorDe = (u: UF, c: Camada) => (c === "oportunidade" ? (u.enderecavel > 0 ? u.oportunidade : null) : u.risco);

function corPara(v: number | null, c: Camada, tema: Tema) {
  if (v === null) return SUPERFICIE[tema].vazio;
  const r = RAMPA[c];
  return r[Math.min(r.length - 1, Math.floor((v / 100) * r.length))];
}

type Geo = { type: "FeatureCollection"; features: { type: "Feature"; properties: Record<string, unknown>; geometry: { type: string; coordinates: unknown } }[] };

function centroBbox(coords: unknown): [number, number] {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  const varre = (c: unknown) => {
    if (Array.isArray(c) && typeof c[0] === "number") {
      const [x, y] = c as [number, number];
      x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
    } else if (Array.isArray(c)) c.forEach(varre);
  };
  varre(coords);
  return [(x0 + x1) / 2, (y0 + y1) / 2];
}

// ajustes finos de rótulo onde o centro da caixa cai fora do território
const AJUSTE: Record<string, [number, number]> = { "52": [-50.1, -16.1], "32": [-40.5, -19.7], "26": [-37.9, -8.4], "31": [-44.6, -18.4], "29": [-41.7, -12.3], "22": [-42.7, -7.4], "21": [-45.2, -5.0], "53": [-47.8, -15.78], "28": [-37.4, -10.6], "27": [-36.6, -9.6], "24": [-36.6, -5.8], "25": [-36.7, -7.2] };

export default function MapaCalor({ tema = "light" }: { tema?: Tema }) {
  const caixa = useRef<HTMLDivElement>(null);
  const mapa = useRef<MLMap | null>(null);
  const [camada, setCamada] = useState<Camada>("oportunidade");
  const [sel, setSel] = useState<string>("31");
  const [hover, setHover] = useState<{ cod: string; x: number; y: number } | null>(null);
  const camadaRef = useRef(camada);

  useEffect(() => {
    if (!caixa.current) return;
    const s = SUPERFICIE[tema];
    const estilo: StyleSpecification = {
      version: 8,
      glyphs: "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf",
      sources: {},
      layers: [{ id: "fundo", type: "background", paint: { "background-color": s.fundo } }],
    };
    const map = new MLMap({
      container: caixa.current,
      style: estilo,
      bounds: [
        [-74, -33.8],
        [-34.7, 5.3],
      ],
      fitBoundsOptions: { padding: 16 },
      dragPan: false,
      scrollZoom: false,
      boxZoom: false,
      doubleClickZoom: false,
      touchZoomRotate: false,
      keyboard: false,
      dragRotate: false,
      attributionControl: { compact: true, customAttribution: "Malha: IBGE · Mercado: ANP" },
    });
    map.on("load", async () => {
      const geo: Geo = await (await fetch("/geo/brasil-uf.json")).json();
      const rotulos: Geo = { type: "FeatureCollection", features: [] };
      for (const f of geo.features) {
        const cod = String(f.properties.codarea);
        const u = POR_COD[cod];
        f.properties = { cod, sigla: u?.sigla ?? "", oportunidade: u ? valorDe(u, "oportunidade") : null, risco: u?.risco ?? null };
        rotulos.features.push({ type: "Feature", properties: f.properties, geometry: { type: "Point", coordinates: AJUSTE[cod] ?? centroBbox(f.geometry.coordinates) } });
      }
      map.addSource("ufs", { type: "geojson", data: geo as unknown as GeoJSON.FeatureCollection });
      map.addSource("rotulos", { type: "geojson", data: rotulos as unknown as GeoJSON.FeatureCollection });
      map.addLayer({ id: "uf-fill", type: "fill", source: "ufs", paint: { "fill-color": expressaoCor(camadaRef.current, tema) } });
      map.addLayer({ id: "uf-borda", type: "line", source: "ufs", paint: { "line-color": s.borda, "line-width": 1.5 } });
      map.addLayer({ id: "uf-sel", type: "line", source: "ufs", filter: ["==", ["get", "cod"], sel], paint: { "line-color": s.tinta, "line-width": 2.2 } });
      map.addLayer({
        id: "uf-sigla",
        type: "symbol",
        source: "rotulos",
        layout: { "text-field": ["get", "sigla"], "text-font": ["Noto Sans Regular"], "text-size": 10.5, "text-allow-overlap": true },
        paint: { "text-color": expressaoTexto(camadaRef.current, tema), "text-halo-color": "rgba(0,0,0,0)" },
      });
      map.on("mousemove", "uf-fill", (e: MapLayerMouseEvent) => {
        const cod = e.features?.[0]?.properties?.cod as string | undefined;
        if (cod) setHover({ cod, x: e.point.x, y: e.point.y });
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "uf-fill", () => {
        setHover(null);
        map.getCanvas().style.cursor = "";
      });
      map.on("click", "uf-fill", (e: MapLayerMouseEvent) => {
        const cod = e.features?.[0]?.properties?.cod as string | undefined;
        if (cod) setSel(cod);
      });
      map.once("idle", () => caixa.current?.querySelector(".maplibregl-ctrl-attrib")?.classList.remove("maplibregl-compact-show"));
    });
    mapa.current = map;
    if (process.env.NODE_ENV !== "production") (window as unknown as { __calor?: MLMap }).__calor = map;
    return () => {
      map.remove();
      mapa.current = null;
    };
    // o mapa é recriado só quando o tema muda; camada/seleção são aplicadas nos efeitos abaixo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tema]);

  useEffect(() => {
    camadaRef.current = camada;
    const map = mapa.current;
    if (map?.getLayer("uf-fill")) {
      map.setPaintProperty("uf-fill", "fill-color", expressaoCor(camada, tema));
      map.setPaintProperty("uf-sigla", "text-color", expressaoTexto(camada, tema));
    }
  }, [camada, tema]);

  useEffect(() => {
    const map = mapa.current;
    if (map?.getLayer("uf-sel")) map.setFilter("uf-sel", ["==", ["get", "cod"], sel]);
  }, [sel]);

  const ranking = useMemo(
    () =>
      UFS.filter((u) => valorDe(u, camada) !== null)
        .sort((a, b) => (valorDe(b, camada) ?? 0) - (valorDe(a, camada) ?? 0))
        .slice(0, 5),
    [camada],
  );
  const u = POR_COD[sel];
  const h = hover ? POR_COD[hover.cod] : null;

  return (
    <div className="grid grid-cols-1 gap-3 xl:grid-cols-12">
      <div className="relative overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/[0.07] xl:col-span-7">
        <div className="flex flex-wrap items-center gap-2 px-4 pt-3">
          <div className="flex rounded-full bg-secondary p-0.5" role="tablist" aria-label="Camada do mapa">
            {(["oportunidade", "risco"] as Camada[]).map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={camada === c}
                onClick={() => setCamada(c)}
                className={`rounded-full px-3 py-1 text-[11px] font-semibold capitalize transition-all ${camada === c ? "bg-card text-foreground shadow-sm ring-1 ring-foreground/10" : "text-muted-foreground hover:text-foreground"}`}
              >
                {c === "oportunidade" ? "Oportunidades" : "Riscos"}
              </button>
            ))}
          </div>
          <Legenda camada={camada} tema={tema} />
        </div>
        <div ref={caixa} className="h-[440px] w-full sm:h-[520px]" />
        {h && hover && (
          <div className="pointer-events-none absolute z-10 w-56 rounded-xl bg-card/95 p-2.5 text-[11px] shadow-lg ring-1 ring-foreground/10 backdrop-blur" style={{ left: Math.min(hover.x + 14, 9999), top: hover.y + 60 }}>
            <p className="font-semibold text-foreground">{h.nome}</p>
            <p className="mt-0.5 tabular-nums text-muted-foreground">Mercado 2025: {fmt(h.mercado)} m³</p>
            <p className="tabular-nums text-muted-foreground">
              {camada === "oportunidade" ? (h.enderecavel ? `Endereçável: ${fmt(h.enderecavel)} m³/ano` : h.share >= 10 ? "Participação já acima da meta de 10%" : "Fora da área de atuação") : h.risco !== null ? `Índice de risco: ${h.risco}` : "Fora da área de atuação"}
            </p>
          </div>
        )}
        <p className="px-4 pb-3 text-[10px] text-muted-foreground">
          Mercado 2025 (gasolina C + diesel + etanol hidratado): dado real da{" "}
          <a href={FONTE_MERCADO.url} target="_blank" rel="noreferrer" className="underline-offset-2 hover:underline">
            ANP <ExternalLink className="inline h-2.5 w-2.5" />
          </a>
          . Participação, alcance, volume endereçável e risco: simulados para a empresa fictícia.
        </p>
      </div>

      <div className="space-y-3 xl:col-span-5">
        {u && (
          <section className="rounded-2xl bg-card p-4 ring-1 ring-foreground/[0.07]">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">UF selecionada · clique no mapa para trocar</p>
            <h3 className="mt-1 text-[16px] font-semibold text-foreground">{u.nome}</h3>
            <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11.5px]">
              <dt className="text-muted-foreground">Mercado 2025 (ANP)</dt>
              <dd className="text-right tabular-nums text-foreground">{fmt(u.mercado)} m³</dd>
              <dt className="text-muted-foreground">Participação (simulada)</dt>
              <dd className="text-right tabular-nums text-foreground">{u.share.toLocaleString("pt-BR", { minimumFractionDigits: 1 })}%</dd>
              <dt className="text-muted-foreground">Estrutura</dt>
              <dd className="text-right text-foreground">{u.estrutura}</dd>
              <dt className="text-muted-foreground">Endereçável até 10%</dt>
              <dd className="text-right tabular-nums text-foreground">{u.enderecavel ? `${fmt(u.enderecavel)} m³/ano` : "—"}</dd>
              <dt className="text-muted-foreground">Índice de risco</dt>
              <dd className="text-right tabular-nums text-foreground">{u.risco ?? "—"}</dd>
            </dl>
            {u.motivos.length > 0 && (
              <ul className="mt-2 space-y-1 border-t border-foreground/[0.06] pt-2 text-[11px] text-foreground/80">
                {u.motivos.map((m) => (
                  <li key={m}>• {m}</li>
                ))}
              </ul>
            )}
          </section>
        )}
        <section className="rounded-2xl bg-card p-4 ring-1 ring-foreground/[0.07]">
          <h3 className="text-[13px] font-semibold text-foreground">{camada === "oportunidade" ? "Onde crescer primeiro" : "Onde agir primeiro"}</h3>
          <p className="text-[11px] text-muted-foreground">{camada === "oportunidade" ? "Maior volume endereçável com a estrutura atual" : "Maior índice de risco na área de atuação"}</p>
          <ol className="mt-2 space-y-1.5">
            {ranking.map((r, k) => (
              <li key={r.sigla}>
                <button type="button" onClick={() => setSel(r.cod)} className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left transition-colors ${sel === r.cod ? "bg-foreground/[0.08] ring-1 ring-foreground/20" : "bg-secondary hover:ring-1 hover:ring-foreground/15"}`}>
                  <span className="w-4 text-[11px] font-semibold tabular-nums text-muted-foreground">{k + 1}</span>
                  <span className="h-3 w-3 shrink-0 rounded-sm" style={{ background: corPara(valorDe(r, camada), camada, tema) }} aria-hidden />
                  <span className="text-[12px] font-medium text-foreground">{r.nome}</span>
                  <span className="ml-auto text-[11px] tabular-nums text-muted-foreground">{camada === "oportunidade" ? `${fmt(r.enderecavel)} m³/ano` : `risco ${r.risco}`}</span>
                </button>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}

function expressaoCor(c: Camada, tema: Tema): ExpressionSpecification {
  const r = RAMPA[c];
  const paradas = r.flatMap((cor, i) => [Math.round((i / (r.length - 1)) * 100), cor]);
  return ["case", ["==", ["get", c], null], SUPERFICIE[tema].vazio, ["interpolate", ["linear"], ["get", c], ...paradas]] as unknown as ExpressionSpecification;
}

function expressaoTexto(c: Camada, tema: Tema): ExpressionSpecification {
  return ["case", ["all", ["!=", ["get", c], null], [">=", ["get", c], 50]], "#ffffff", SUPERFICIE[tema].tinta] as unknown as ExpressionSpecification;
}

function Legenda({ camada, tema }: { camada: Camada; tema: Tema }) {
  return (
    <div className="ml-auto flex items-center gap-2 text-[10px] text-muted-foreground">
      <span>{camada === "oportunidade" ? "menor" : "baixo"}</span>
      <span className="h-2 w-28 rounded-full" style={{ background: `linear-gradient(90deg, ${RAMPA[camada].join(",")})` }} />
      <span>{camada === "oportunidade" ? "maior" : "alto"}</span>
      <span className="ml-1 inline-flex items-center gap-1">
        <span className="h-2 w-2 rounded-sm" style={{ background: SUPERFICIE[tema].vazio }} />
        {camada === "oportunidade" ? "sem volume endereçável" : "fora da área de atuação"}
      </span>
    </div>
  );
}
