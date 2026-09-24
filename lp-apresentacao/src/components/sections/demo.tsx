"use client";

import { useState } from "react";
import { CheckCircle2, CircleDot, Sparkles } from "lucide-react";
import { margemRsM3, useSim, type Modo, type SimData, type Tema } from "./demo-sim";
import { JornadaStrip, VIEW_DEFS, VIEW_MAP, type ViewId } from "./demo-views";
import { FaixaMercado } from "@/demo/faixa-mercado";
import { Copiloto } from "@/demo/copiloto";

const CHIPS = ["empresa fictícia", "porte de regional top 5", "5 bases próprias", "24 praças", "30 rotas", "170 postos bandeirados"];

const NAV = VIEW_DEFS.map((d, i) => ({ ...d, header: i === 0 || VIEW_DEFS[i - 1].grupo !== d.grupo }));

export function Demo() {
  const sim = useSim();
  const [view, setView] = useState<ViewId>("visao");
  const [tema, setTema] = useState<Tema>("light");
  const View = VIEW_MAP[view];

  return (
    <div id="demo" className={`${tema === "dark" ? "dark " : ""}demo-scope relative mx-auto max-w-[1200px] rounded-3xl bg-background ring-1 ring-foreground/10 shadow-[0_24px_80px_rgba(0,0,0,0.35)] p-3 sm:p-4 transition-colors`}>
      <Topo sim={sim} tema={tema} setTema={setTema} tela={VIEW_DEFS.find((d) => d.id === view)?.label ?? ""} />
      <div className="mt-3">
        <FaixaMercado />
      </div>
      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-[200px_minmax(0,1fr)]">
        <Lateral view={view} onNav={setView} />
        <div className="min-h-[560px] min-w-0">
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

function Topo({ sim, tema, setTema, tela }: { sim: SimData; tema: Tema; setTema: (t: Tema) => void; tela: string }) {
  // retrato do painel simulado que o copiloto recebe junto com os dados públicos
  const painel = {
    tela_aberta: tela,
    modo: sim.modo === "integrada" ? "Integrada (agentes de IA ativos)" : "Manual (processos humanos)",
    hora: sim.hora,
    volume_do_dia_m3: Math.round(sim.volume / 1000),
    receita_do_dia_rs: sim.receita,
    margem_bruta_rs_por_m3: +margemRsM3(sim.precos).toFixed(2),
    janela_cumprida_pct: sim.janela,
    km_vazio_pct: sim.kmVazio,
    alertas_abertos: sim.alertas,
    precos_por_base: sim.precos.map((p) => ({ produto: p.produto, base: p.base, preco_venda_rs_l: p.preco, custo_reposicao_rs_l: p.custo, preco_concorrente_rs_l: p.concorrente })),
    observacao: "todos os números deste bloco são SIMULADOS",
  };
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
      <div className="ml-auto flex flex-wrap items-center justify-end gap-2 sm:gap-3">
        <Copiloto painel={painel} />
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
