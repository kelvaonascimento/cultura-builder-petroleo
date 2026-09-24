"use client";

import { useState } from "react";
import { CheckCircle2, CircleDot, Sparkles } from "lucide-react";
import { useSim, type Modo, type SimData, type Tema } from "./demo-sim";
import { JornadaStrip, VIEW_DEFS, VIEW_MAP, type ViewId } from "./demo-views";

const CHIPS = ["empresa fictícia", "R$ 7,2 bi/ano", "142 postos", "20 bases", "640 mil CBIOs/ano"];

const NAV = VIEW_DEFS.map((d, i) => ({ ...d, header: i === 0 || VIEW_DEFS[i - 1].grupo !== d.grupo }));

export function Demo() {
  const sim = useSim();
  const [view, setView] = useState<ViewId>("visao");
  const [tema, setTema] = useState<Tema>("light");
  const View = VIEW_MAP[view];

  return (
    <div id="demo" className={`${tema === "dark" ? "dark " : ""}demo-scope relative mx-auto max-w-[1200px] rounded-3xl bg-background ring-1 ring-foreground/10 shadow-[0_24px_80px_rgba(0,0,0,0.35)] p-3 sm:p-4 transition-colors`}>
      <Topo sim={sim} tema={tema} setTema={setTema} />
      <div className="mt-3 grid gap-3 lg:grid-cols-[200px_1fr]">
        <Lateral view={view} onNav={setView} />
        <div className="min-h-[560px]">
          <View sim={sim} tema={tema} onNav={setView} />
        </div>
      </div>
      <div className="mt-3 rounded-2xl bg-card p-3 ring-1 ring-foreground/[0.07]">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">A mesma operação, os dois modos — jornada ponta a ponta</p>
        <JornadaStrip />
      </div>

      {sim.toast && (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-card px-4 py-2.5 text-[12px] font-semibold text-foreground shadow-[0_12px_40px_rgba(0,0,0,0.3)] ring-1 ring-foreground/10">
          <CheckCircle2 className="h-4 w-4" />
          {sim.toast}
        </div>
      )}
    </div>
  );
}

function Topo({ sim, tema, setTema }: { sim: SimData; tema: Tema; setTema: (t: Tema) => void }) {
  return (
    <header className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl bg-card px-4 py-3 ring-1 ring-foreground/[0.07]">
      <div className="flex items-center gap-2.5">
        <span className="rounded-lg bg-secondary p-1.5 ring-1 ring-foreground/[0.07]"><Sparkles className="h-4 w-4 text-foreground/70" /></span>
        <div>
          <p className="text-[13px] font-semibold text-foreground">Distribuidora Horizonte</p>
          <p className="text-[10px] text-muted-foreground">simulação · Cultura Builder</p>
        </div>
      </div>
      <div className="hidden items-center gap-1.5 xl:flex">
        {CHIPS.map((c) => (
          <span key={c} className="rounded-full border border-border px-2 py-0.5 text-[9.5px] text-muted-foreground">{c}</span>
        ))}
      </div>
      <div className="ml-auto flex items-center gap-3">
        <span className="text-[11px] tabular-nums text-muted-foreground">{sim.hora}</span>
        <Segmented
          opcoes={[
            ["Claro", "light"],
            ["Escuro", "dark"],
          ]}
          valor={tema}
          onChange={(v) => setTema(v as Tema)}
        />
        <Segmented
          opcoes={[
            ["Manual", "manual"],
            ["Integrada", "integrada"],
          ]}
          valor={sim.modo}
          onChange={(v) => sim.setModo(v as Modo)}
          destaque
        />
      </div>
    </header>
  );
}

function Segmented({ opcoes, valor, onChange, destaque = false }: { opcoes: [string, string][]; valor: string; onChange: (v: string) => void; destaque?: boolean }) {
  return (
    <div className="flex rounded-full bg-secondary p-0.5">
      {opcoes.map(([label, v]) => {
        const ativo = valor === v;
        return (
          <button
            type="button"
            key={v}
            onClick={() => onChange(v)}
            className={`rounded-full px-3 py-1 text-[10.5px] font-semibold transition-all ${
              ativo
                ? destaque && v === "integrada"
                  ? "bg-foreground text-background"
                  : "bg-card text-foreground ring-1 ring-foreground/10 shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function Lateral({ view, onNav }: { view: ViewId; onNav: (v: ViewId) => void }) {
  return (
    <nav className="flex gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
      {NAV.map((d) => {
        const ativo = view === d.id;
        return (
          <div key={d.id} className="shrink-0 lg:shrink">
            {d.header && <p className="mb-1.5 mt-3 hidden px-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 first:mt-0 lg:block">{d.grupo}</p>}
            <button
              type="button"
              onClick={() => onNav(d.id)}
              className={`flex w-full min-w-max items-center gap-2 rounded-lg px-2.5 py-1.5 text-left transition-colors lg:min-w-0 ${
                ativo ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              }`}
            >
              {ativo ? <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" /> : <CircleDot className="h-2.5 w-2.5 shrink-0 text-muted-foreground/40" />}
              <span className="text-[12px] font-medium">{d.label}</span>
            </button>
          </div>
        );
      })}
    </nav>
  );
}
