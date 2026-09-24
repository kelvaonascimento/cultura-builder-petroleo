"use client";

import { useState } from "react";
import { PAL, prodTone, type Modo, type Rota, type Tema, fmtInt, fmtMin } from "./demo-sim";

/* ---------- nós do mapa (coordenadas estilizadas — Bahia + Suape/PE) ---------- */
export type NoMapa = { x: number; y: number; tipo: "base" | "cliente" | "refinaria" | "porto" };

export const MAPA_NOS: Record<string, NoMapa> = {
  Juazeiro: { x: 150, y: 96, tipo: "base" },
  "Paulo Afonso": { x: 640, y: 58, tipo: "cliente" },
  Barreiras: { x: 120, y: 252, tipo: "base" },
  LEM: { x: 185, y: 178, tipo: "base" },
  Irecê: { x: 330, y: 212, tipo: "cliente" },
  "Bom Jesus da Lapa": { x: 298, y: 342, tipo: "cliente" },
  "Vitória da Conquista": { x: 402, y: 402, tipo: "cliente" },
  Jequié: { x: 502, y: 398, tipo: "cliente" },
  Itabuna: { x: 424, y: 478, tipo: "base" },
  Ilhéus: { x: 512, y: 502, tipo: "cliente" },
  Salvador: { x: 880, y: 300, tipo: "cliente" },
  Camaçari: { x: 812, y: 252, tipo: "cliente" },
  Pojuca: { x: 745, y: 234, tipo: "base" },
  SFC: { x: 698, y: 204, tipo: "base" },
  "Santo Amaro": { x: 780, y: 300, tipo: "cliente" },
  Alagoinhas: { x: 734, y: 148, tipo: "cliente" },
  "Feira de Santana": { x: 664, y: 312, tipo: "cliente" },
  Suape: { x: 956, y: 78, tipo: "porto" },
};

const RIOS = "M 640,32 C 570,80 500,140 420,200 C 340,262 262,292 212,312 C 172,332 156,380 166,440";
const COSTA = "M 830,72 C 870,100 910,150 934,206 C 950,260 952,320 942,360 C 922,420 884,468 826,502 C 782,524 748,532 716,538";
const OCEANO = "M 830,72 C 870,100 910,150 934,206 C 950,260 952,320 942,360 C 922,420 884,468 826,502 C 782,524 748,532 716,538 L 716,560 L 1000,560 L 1000,36 L 972,36 Z";

function bezier(p0: [number, number], p1: [number, number], p2: [number, number], t: number): [number, number] {
  const u = 1 - t;
  return [
    u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0],
    u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1],
  ];
}

function pontosParciais(p0: [number, number], p1: [number, number], p2: [number, number], t: number, n = 36) {
  const pts: string[] = [];
  const tt = Math.min(1, Math.max(0, t));
  for (let i = 0; i <= n; i++) {
    const [x, y] = bezier(p0, p1, p2, (tt * i) / n);
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

function ctrl(a: NoMapa, b: NoMapa, k = 0.16): [number, number] {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const side = ((a.x * 7 + a.y * 13 + b.x * 3) % 2 === 0 ? 1 : -1);
  return [mx + (-dy / len) * len * k * side, my + (dx / len) * len * k * side];
}

export function MapaLogistico({
  rotas,
  modo,
  tema,
  onSelect,
  selId,
  hora,
}: {
  rotas: Rota[];
  modo: Modo;
  tema: Tema;
  onSelect: (id: string) => void;
  selId: string | null;
  hora: string;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const [verRotulos, setVerRotulos] = useState(true);
  const [verAlertas, setVerAlertas] = useState(true);
  const manual = modo === "manual";
  const dark = tema === "dark";
  const p = PAL[tema];
  const fundo = dark ? "#101012" : "#f5f5f7";
  const terra = dark ? "rgba(255,255,255,0.055)" : "#e8e8ed";
  const terraLinha = dark ? "rgba(255,255,255,0.18)" : "#c7c7cc";
  const oceano = dark ? "rgba(160,190,230,0.08)" : "#e3e7ee";
  const rio = dark ? "rgba(160,190,230,0.35)" : "#b9c4d4";
  const via = dark ? "rgba(255,255,255,0.07)" : "#d4d4d9";
  const pontoGrid = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
  const rotuloFundo = dark ? "rgba(16,16,18,0.92)" : "rgba(255,255,255,0.94)";

  const rotasAtivas = rotas.filter((r) => r.prog < 100);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-[var(--d-fundo)]" style={{ ["--d-fundo" as string]: fundo }}>
      <svg viewBox="0 0 1000 560" className="h-auto w-full" role="img" aria-label="Mapa logístico simulado">
        <defs>
          <pattern id="dotgrid" width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="1.4" cy="1.4" r="1" fill={pontoGrid} />
          </pattern>
        </defs>

        <rect width="1000" height="560" fill={fundo} />
        <rect width="1000" height="560" fill="url(#dotgrid)" />

        {/* oceano */}
        <path d={OCEANO} fill={oceano} />
        <path d={COSTA} fill="none" stroke={rio} strokeWidth="2" />

        {/* Bahia — contorno estilizado */}
        <path
          d="M 62,62 L 400,30 L 620,28 L 700,56 L 760,42 L 830,72 C 870,100 910,150 934,206 C 950,260 952,320 942,360 C 922,420 884,468 826,502 C 782,524 748,532 716,538 L 560,542 L 430,532 L 300,546 L 170,522 L 96,442 L 64,332 L 56,200 Z"
          fill={terra}
          stroke={terraLinha}
          strokeWidth="1.4"
        />

        {/* Rio São Francisco + lago */}
        <path d={RIOS} fill="none" stroke={rio} strokeWidth="2.6" strokeLinecap="round" />
        <ellipse cx="330" cy="122" rx="30" ry="13" fill={rio} stroke={rio} strokeWidth="1" opacity="0.5" />
        <text x="292" y="108" fill={p.s2} fontSize="8">L. Sobradinho</text>

        {/* rodovias decorativas */}
        {[
          "M 664,312 L 880,300",
          "M 664,312 C 600,362 520,424 424,478",
          "M 664,312 C 520,292 380,262 185,178",
          "M 120,252 C 200,214 280,212 330,212",
          "M 150,96 C 132,150 122,200 120,252",
          "M 698,204 C 760,240 830,272 880,300",
          "M 424,478 L 512,502",
          "M 402,402 C 460,398 560,360 664,312",
        ].map((d) => (
          <path key={d} d={d} fill="none" stroke={via} strokeWidth="3" strokeLinecap="round" />
        ))}

        {/* rota de importação Suape → SFC (marítima) */}
        <path
          d="M 956,78 C 900,110 810,150 742,186 L 698,204"
          fill="none"
          stroke={rio}
          strokeWidth="1.6"
          strokeDasharray="3 6"
        />
        <text x="958" y="64" fill={p.s2} fontSize="9" fontWeight="600">Suape · PE</text>
        <text x="878" y="105" fill={p.s2} fontSize="8">importação · cabotagem</text>

        {/* rotas + caminhões */}
        {rotas.map((r) => {
          const a = MAPA_NOS[r.de];
          const b = MAPA_NOS[r.para];
          if (!a || !b) return null;
          const c = ctrl(a, b);
          const t = Math.min(1, r.prog / 100);
          const [tx, ty] = bezier([a.x, a.y], c, [b.x, b.y], t);
          const [lx, ly] = bezier([a.x, a.y], c, [b.x, b.y], Math.min(1, t + 0.02));
          const ang = (Math.atan2(ly - ty, lx - tx) * 180) / Math.PI;
          const cor = prodTone(r.produto, tema);
          const ativa = r.prog < 100;
          const focado = hover === r.id || selId === r.id;
          const dim = (hover !== null || selId !== null) && !focado;
          const corSel = focado ? p.info : cor;
          return (
            <g
              key={r.id}
              opacity={dim ? 0.25 : 1}
              onMouseEnter={() => setHover(r.id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onSelect(r.id === selId ? "" : r.id)}
              className="cursor-pointer"
            >
              <path
                d={`M ${a.x},${a.y} Q ${c[0]},${c[1]} ${b.x},${b.y}`}
                fill="none"
                stroke={focado ? p.info : via}
                strokeWidth={focado ? 2.4 : 1.6}
                strokeDasharray={focado || manual ? "5 6" : "2 5"}
              />
              {ativa && (
                <>
                  <polyline points={pontosParciais([a.x, a.y], c, [b.x, b.y], t)} fill="none" stroke={corSel} strokeWidth={focado ? 3.2 : 2.4} strokeLinecap="round" opacity={0.95} />
                  <polyline points={pontosParciais([a.x, a.y], c, [b.x, b.y], Math.max(0, t - 0.09), 8)} fill="none" stroke={corSel} strokeWidth="5" strokeLinecap="round" opacity="0.18" />
                </>
              )}
              {ativa && (
                <g transform={`translate(${tx},${ty}) rotate(${ang})`}>
                  <circle r="15" fill={corSel} opacity="0.16">
                    <animate attributeName="r" values="12;18;12" dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.2;0.05;0.2" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                  <rect x="-11" y="-6" width="22" height="12" rx="3.4" fill={corSel} stroke={fundo} strokeWidth="1.2" />
                  <rect x="-13" y="-6.5" width="7" height="13" rx="2.4" fill={corSel} stroke={fundo} strokeWidth="1.2" opacity="0.85" />
                  <circle cx="-6" cy="7" r="2.4" fill={fundo} stroke={corSel} strokeWidth="1" />
                  <circle cx="7" cy="7" r="2.4" fill={fundo} stroke={corSel} strokeWidth="1" />
                  {verRotulos && (
                    <text transform={`rotate(${-ang})`} x="0" y="-13" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill={dark ? "#f5f5f7" : "#1d1d1f"} opacity="0.9" style={{ paintOrder: "stroke" }} stroke={rotuloFundo} strokeWidth="3">
                      {r.placa}
                    </text>
                  )}
                </g>
              )}
              {ativa && verAlertas && r.atrasada && (
                <g transform={`translate(${tx},${ty - 20})`}>
                  <path d="M 0,-6 L 5.5,3.5 L -5.5,3.5 Z" fill={p.warn} stroke={fundo} strokeWidth="1" />
                  <text x="0" y="2.4" textAnchor="middle" fontSize="6" fontWeight="800" fill={fundo}>!</text>
                </g>
              )}
              {!ativa && (
                <circle cx={b.x} cy={b.y} r="9" fill="none" stroke={corSel} strokeWidth="2">
                  <animate attributeName="r" values="4;12;4" dur="1.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0;0.7" dur="1.4s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          );
        })}

        {/* nós */}
        {Object.entries(MAPA_NOS).map(([nome, n]) => {
          const base = n.tipo === "base" || n.tipo === "refinaria";
          const refinaria = n.tipo === "refinaria";
          const porto = n.tipo === "porto";
          const corNo = refinaria ? (dark ? "#f5f5f7" : "#1d1d1f") : porto ? (dark ? "#a1a1a6" : "#6e6e73") : base ? (dark ? "#f5f5f7" : "#1d1d1f") : fundo;
          return (
            <g key={nome}>
              {base && (
                <circle cx={n.x} cy={n.y} r="9" fill="none" stroke={dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)"} strokeWidth="1">
                  <animate attributeName="r" values="7;12;7" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={n.x} cy={n.y} r={porto ? 4.5 : base ? 4.4 : 3.4} fill={corNo} stroke={fundo} strokeWidth="1.4" />
              <text
                x={n.x + 8}
                y={n.y - 4}
                fontSize="9.5"
                fontWeight={base ? 700 : 500}
                fill={dark ? (base ? "#f5f5f7" : "#a1a1a6") : base ? "#1d1d1f" : "#6e6e73"}
                style={{ paintOrder: "stroke" }}
                stroke={rotuloFundo}
                strokeWidth="3"
              >
                {nome === "SFC" ? "SFC · Mataripe" : nome === "LEM" ? "Luís E. Magalhães" : nome}
              </text>
            </g>
          );
        })}

        {/* legenda */}
        <g>
          <rect x="16" y="492" width="300" height="54" rx="12" fill={rotuloFundo} stroke={terraLinha} strokeWidth="1" />
          {[
            ["bases próprias", corNoLeg("base", dark)],
            ["refino · Mataripe", corNoLeg("refinaria", dark)],
            ["porto (importação)", corNoLeg("porto", dark)],
          ].map(([l, c], i) => (
            <g key={l} transform={`translate(30, ${508 + i * 14})`}>
              <circle r="3.4" fill={c} stroke={fundo} strokeWidth="1" />
              <text x="9" y="3.4" fontSize="9.5" fill={p.s2}>{l}</text>
            </g>
          ))}
          <g transform="translate(148, 508)">
            {["Diesel S10", "Gasolina C", "Diesel S500", "Etanol"].map((prod, i) => (
              <g key={prod} transform={`translate(0, ${i * 14})`}>
                <rect x="0" y="-4" width="10" height="7" rx="2" fill={prodTone(prod, tema)} stroke={fundo} strokeWidth="0.8" />
                <text x="15" y="3.4" fontSize="9.5" fill={p.s2}>{prod}</text>
              </g>
            ))}
          </g>
        </g>

        {/* selo do mapa */}
        <g>
          <rect x="742" y="14" width="244" height="58" rx="12" fill={rotuloFundo} stroke={terraLinha} strokeWidth="1" />
          <text x="758" y="34" fontSize="10" fontWeight="700" fill={dark ? "#f5f5f7" : "#1d1d1f"}>Frota em movimento · tempo real</text>
          <text x="758" y="50" fontSize="9" fill={p.s2}>
            {rotasAtivas.length} cargas em rota · telemetria 1s · {hora}
          </text>
          <text x="758" y="64" fontSize="8.5" fill={p.s3}>empresa fictícia · dados sintéticos</text>
        </g>
      </svg>

      {/* controles */}
      <div className="absolute left-3 top-3 flex gap-2">
        <button
          type="button"
          onClick={() => setVerRotulos((v) => !v)}
          className={`rounded-full border px-3 py-1 text-[10px] font-semibold transition-colors ${verRotulos ? "border-foreground/30 bg-foreground text-background" : "border-border bg-transparent text-muted-foreground"}`}
        >
          Placas
        </button>
        <button
          type="button"
          onClick={() => setVerAlertas((v) => !v)}
          className={`rounded-full border px-3 py-1 text-[10px] font-semibold transition-colors ${verAlertas ? "border-foreground/30 bg-foreground text-background" : "border-border bg-transparent text-muted-foreground"}`}
        >
          Alertas
        </button>
        <span className="rounded-full border border-border bg-transparent px-3 py-1 text-[10px] font-semibold text-muted-foreground">
          {manual ? "rotas manuais · despachante" : "rotas otimizadas por IA"}
        </span>
      </div>
    </div>
  );
}

function corNoLeg(tipo: "base" | "refinaria" | "porto", dark: boolean) {
  if (tipo === "refinaria") return dark ? "#f5f5f7" : "#1d1d1f";
  if (tipo === "porto") return dark ? "#a1a1a6" : "#6e6e73";
  return dark ? "#f5f5f7" : "#1d1d1f";
}

/* ---------- detalhe da carga selecionada ---------- */
export function CartaoRota({ rota, tema, onClose }: { rota: Rota; tema: Tema; onClose: () => void }) {
  const dark = tema === "dark";
  const eta = rota.inicioMin + ((100 - rota.prog) / 100) * rota.minTotal;
  const janela = rota.inicioMin + rota.minTotal * 1.08;
  return (
    <div className="absolute bottom-4 left-4 z-10 w-80 rounded-2xl border border-border bg-card p-4 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[13px] font-semibold text-foreground">
            {rota.placa}
            <span className="font-normal text-muted-foreground"> · {rota.motorista}</span>
          </p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            {rota.de} → {rota.para} · {rota.produto} · {fmtInt(rota.volume)} L
          </p>
        </div>
        <button type="button" onClick={onClose} className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground hover:text-foreground">
          fechar
        </button>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        {[
          ["progresso", `${Math.round(rota.prog)}%`],
          ["ETA", rota.prog >= 100 ? "descarga" : fmtMin(eta)],
          ["janela", fmtMin(janela)],
        ].map(([l, v]) => (
          <div key={l} className="rounded-xl bg-secondary px-2 py-2">
            <p className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">{l}</p>
            <p className="mt-0.5 text-[12px] font-semibold tabular-nums text-foreground">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-1.5">
        {[
          ["Selo lacre", rota.selo ? "íntegro · hash NF-e" : "verificação manual no ponto"],
          ["Telemetria", rota.atrasada ? "desvio de rota detectado" : "em rota · 5 km de tolerância"],
          ["NF-e", rota.prog > 40 ? "emitida · vinculada à carga" : "aguardando liberação"],
          ["Próxima parada", rota.prog > 75 ? "descarga + coleta de amostra" : "reabastecimento programado"],
        ].map(([l, v]) => (
          <div key={l} className="flex items-center justify-between gap-2 text-[11px]">
            <span className="text-muted-foreground">{l}</span>
            <span className={`text-right font-medium ${v.startsWith("desvio") || v.startsWith("verificação") ? (dark ? "text-[#ff9f0a]" : "text-[#b25000]") : "text-foreground"}`}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
