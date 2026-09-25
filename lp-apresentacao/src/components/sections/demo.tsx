"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Moon, PanelRightClose, PanelRightOpen, Sun } from "lucide-react";
import { useSim, type Modo, type Tema } from "./demo-sim";
import { JornadaStrip, VIEW_MAP } from "./demo-views";
import { FaixaMercado } from "@/demo/faixa-mercado";
import { AvatarAgente, PainelAgente, useAgente } from "@/demo/agente";
import { observar } from "@/demo/observador";
import { VIEW_DEFS, type ViewId } from "@/demo/telas";
import { VERDE_VIVO } from "@/demo/cores";

const NAV = VIEW_DEFS.map((d, i) => ({ ...d, header: i === 0 || VIEW_DEFS[i - 1].grupo !== d.grupo }));

export function Demo() {
  const sim = useSim();
  const [view, setView] = useState<ViewId>("cockpit");
  const [tema, setTema] = useState<Tema>("light");
  const [agenteFixo, setAgenteFixo] = useState(true); // painel do agente à direita (telas a partir de 1280 px)
  const [gaveta, setGaveta] = useState(false); // agente em gaveta (telas menores ou painel recolhido)
  const [visivel, setVisivel] = useState(false); // DEMO na tela: só então aparece o botão flutuante
  const caixa = useRef<HTMLDivElement>(null);
  const def = VIEW_DEFS.find((d) => d.id === view) ?? VIEW_DEFS[0];
  const agente = useAgente(sim, def.label);
  const View = VIEW_MAP[view];
  const pontos = observar(sim).length;

  useEffect(() => {
    const el = caixa.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0.04 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!gaveta) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setGaveta(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [gaveta]);

  const navegar = (v: ViewId) => {
    setView(v);
    setGaveta(false);
  };

  return (
    <section id="demo" className="px-3 pb-6 sm:px-6">
      <div
        ref={caixa}
        className={`${tema === "dark" ? "dark " : ""}demo-scope relative mx-auto max-w-[1480px] rounded-3xl bg-background p-3 text-foreground ring-1 ring-foreground/10 shadow-[0_24px_80px_rgba(0,0,0,0.35)] transition-colors sm:p-4`}
      >
        <header className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl bg-card px-4 py-3 ring-1 ring-foreground/[0.07]">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-foreground text-[14px] font-bold text-background">H</span>
            <div className="min-w-0">
              <p className="flex flex-wrap items-center gap-x-2 text-[13.5px] font-semibold leading-tight">
                Distribuidora Horizonte
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[9.5px] font-medium text-muted-foreground ring-1 ring-foreground/10">empresa fictícia</span>
              </p>
              <p className="truncate text-[10.5px] text-muted-foreground">porte de regional top 5 · 5 bases próprias · 24 praças · 30 rotas · 170 postos bandeirados</p>
            </div>
          </div>
          <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-[10.5px] font-medium tabular-nums ring-1 ring-foreground/[0.07]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:hidden" style={{ background: VERDE_VIVO }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: VERDE_VIVO }} />
              </span>
              ao vivo · {sim.hora}
            </span>
            <Segmented
              opcoes={[
                ["Manual", "manual"],
                ["Integrada", "integrada"],
              ]}
              valor={sim.modo}
              onChange={(v) => sim.setModo(v as Modo)}
            />
            <button
              type="button"
              onClick={() => setTema(tema === "dark" ? "light" : "dark")}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground ring-1 ring-foreground/[0.07] hover:text-foreground"
              aria-label={tema === "dark" ? "Usar tema claro" : "Usar tema escuro"}
              title={tema === "dark" ? "Tema claro" : "Tema escuro"}
            >
              {tema === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={() => setAgenteFixo(!agenteFixo)}
              className="hidden h-8 items-center gap-1.5 rounded-full bg-foreground px-3 text-[11px] font-semibold text-background hover:opacity-90 xl:inline-flex"
              aria-pressed={agenteFixo}
            >
              {agenteFixo ? <PanelRightClose className="h-3.5 w-3.5" /> : <PanelRightOpen className="h-3.5 w-3.5" />}
              {agenteFixo ? "Recolher agente" : "Mostrar agente"}
            </button>
          </div>
        </header>

        <div className="mt-3">
          <FaixaMercado />
        </div>

        <div className={`mt-3 grid grid-cols-1 gap-3 lg:grid-cols-[208px_minmax(0,1fr)] ${agenteFixo ? "xl:grid-cols-[84px_minmax(0,1fr)_340px]" : ""}`}>
          <Navegacao view={view} onNav={navegar} trilho={agenteFixo} />

          <main className="@container min-h-[560px] min-w-0">
            <div className="mb-3 flex flex-wrap items-end justify-between gap-x-3 gap-y-1 px-1">
              <div className="min-w-0">
                <h3 className="text-[17px] font-semibold tracking-tight">{def.label}</h3>
                <p className="text-[11.5px] text-muted-foreground">{def.sub}</p>
              </div>
              <p className="text-[10px] text-muted-foreground">números da empresa: simulados · dado público: com fonte</p>
            </div>
            <View sim={sim} tema={tema} onNav={navegar} />
          </main>

          {agenteFixo && (
            <aside className="hidden h-[calc(100vh-5.5rem)] max-h-[900px] min-h-[560px] overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/[0.07] xl:sticky xl:top-16 xl:block xl:self-start">
              <PainelAgente sim={sim} agente={agente} onNav={navegar} onFechar={() => setAgenteFixo(false)} />
            </aside>
          )}
        </div>

        <div className="mt-3 rounded-2xl bg-card p-3 ring-1 ring-foreground/[0.07]">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">A mesma operação, os dois modos — jornada ponta a ponta</p>
          <JornadaStrip />
        </div>

        {visivel && !gaveta && (
          <button
            type="button"
            onClick={() => setGaveta(true)}
            className={`fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full bg-card py-1.5 pl-1.5 pr-4 text-[12px] font-semibold shadow-[0_12px_40px_rgba(0,0,0,0.25)] ring-1 ring-foreground/10 ${agenteFixo ? "xl:hidden" : ""}`}
            aria-label="Abrir o agente de operações"
          >
            <AvatarAgente />
            Agente
            {pontos > 0 && <span className="rounded-full bg-destructive px-1.5 py-px text-[10px] font-bold tabular-nums text-white">{pontos}</span>}
          </button>
        )}

        {gaveta && (
          <div className="fixed inset-0 z-[70] flex justify-end bg-black/30 backdrop-blur-[2px]" onClick={() => setGaveta(false)}>
            <aside role="dialog" aria-label="Agente de operações" className="h-full w-full max-w-md bg-card shadow-2xl ring-1 ring-foreground/10" onClick={(e) => e.stopPropagation()}>
              <PainelAgente sim={sim} agente={agente} onNav={navegar} onFechar={() => setGaveta(false)} />
            </aside>
          </div>
        )}

        {sim.toast && (
          <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-card px-4 py-2.5 text-[12px] font-semibold shadow-[0_12px_40px_rgba(0,0,0,0.3)] ring-1 ring-foreground/10">
            <CheckCircle2 className="h-4 w-4" />
            {sim.toast}
          </div>
        )}
      </div>
    </section>
  );
}

function Segmented({ opcoes, valor, onChange }: { opcoes: [string, string][]; valor: string; onChange: (v: string) => void }) {
  return (
    <div className="flex rounded-full bg-secondary p-0.5 ring-1 ring-foreground/[0.07]">
      {opcoes.map(([label, v]) => {
        const ativo = valor === v;
        return (
          <button
            type="button"
            key={v}
            onClick={() => onChange(v)}
            aria-pressed={ativo}
            className={`rounded-full px-3 py-1 text-[10.5px] font-semibold transition-all ${
              ativo ? (v === "integrada" ? "bg-foreground text-background" : "bg-card text-foreground shadow-sm ring-1 ring-foreground/10") : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

// celular: faixa horizontal · tela média: lista com grupos · tela larga com o agente aberto: trilho compacto
function Navegacao({ view, onNav, trilho }: { view: ViewId; onNav: (v: ViewId) => void; trilho: boolean }) {
  return (
    <nav aria-label="Telas do painel" className="min-w-0 lg:sticky lg:top-16 lg:self-start">
      <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] lg:hidden">
        {NAV.map((d) => {
          const ativo = view === d.id;
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => onNav(d.id)}
              aria-current={ativo ? "page" : undefined}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-medium ${ativo ? "bg-foreground text-background" : "bg-card text-muted-foreground ring-1 ring-foreground/[0.07]"}`}
            >
              <d.icone className="h-3.5 w-3.5" />
              {d.label}
            </button>
          );
        })}
      </div>

      <div className={`hidden flex-col lg:flex ${trilho ? "xl:hidden" : ""}`}>
        {NAV.map((d) => {
          const ativo = view === d.id;
          return (
            <div key={d.id}>
              {d.header && <p className="mb-1 mt-3 px-2.5 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/70 first:mt-0">{d.grupo}</p>}
              <button
                type="button"
                onClick={() => onNav(d.id)}
                aria-current={ativo ? "page" : undefined}
                className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-[12px] font-medium transition-colors ${
                  ativo ? "bg-card text-foreground shadow-sm ring-1 ring-foreground/10" : "text-muted-foreground hover:bg-card/60 hover:text-foreground"
                }`}
              >
                <d.icone className={`h-4 w-4 shrink-0 ${ativo ? "text-foreground" : "text-muted-foreground/80"}`} />
                <span className="truncate">{d.label}</span>
              </button>
            </div>
          );
        })}
      </div>

      {trilho && (
        <div className="hidden flex-col gap-0.5 xl:flex">
          {NAV.map((d, i) => {
            const ativo = view === d.id;
            return (
              <div key={d.id}>
                {d.header && i > 0 && <div className="mx-4 my-1.5 h-px bg-border" />}
                <button
                  type="button"
                  onClick={() => onNav(d.id)}
                  aria-current={ativo ? "page" : undefined}
                  title={d.label}
                  className={`flex w-full flex-col items-center gap-1 rounded-xl px-1 py-2 transition-colors ${
                    ativo ? "bg-card text-foreground shadow-sm ring-1 ring-foreground/10" : "text-muted-foreground hover:bg-card/60 hover:text-foreground"
                  }`}
                >
                  <d.icone className="h-[18px] w-[18px]" />
                  <span className="text-[9.5px] font-medium leading-none">{d.curto}</span>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </nav>
  );
}
