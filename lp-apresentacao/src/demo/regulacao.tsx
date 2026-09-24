"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, Ban, Bot, CalendarClock, CheckCircle2, ChevronDown, ExternalLink, Hourglass } from "lucide-react";
import { ACOES, PRAZOS, RADAR, type Categoria, type ItemRadar, type Severidade } from "./regulacao-dados";

type Modo = "manual" | "integrada";
type Evento = { id: number; hora: string; agente: string; acao: string; norma: string; resultado: "ok" | "atenção" | "bloqueado" | "pendente" };

// status reservados (skill dataviz): sempre com ícone + rótulo, nunca só cor
const STATUS = {
  ok: { cor: "#0ca30c", Icone: CheckCircle2, rotulo: "ok" },
  atenção: { cor: "#fab219", Icone: AlertTriangle, rotulo: "atenção" },
  bloqueado: { cor: "#d03b3b", Icone: Ban, rotulo: "bloqueado" },
  pendente: { cor: "#898781", Icone: Hourglass, rotulo: "pendente" },
} as const;
const SEV: Record<Severidade, string> = { alta: "#d03b3b", média: "#fab219", baixa: "#898781" };
const CATEGORIAS: ("Todas" | Categoria)[] = ["Todas", "Tributário", "ANP", "Biocombustíveis", "Compliance", "Mercado", "Logística", "IA"];
const fmt = (n: number) => n.toLocaleString("pt-BR");

function horaMais(hora: string, seg: number) {
  const [h, m] = hora.split(":").map(Number);
  const t = h * 3600 + m * 60 + seg;
  return `${String(Math.floor(t / 3600) % 24).padStart(2, "0")}:${String(Math.floor(t / 60) % 60).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
}

function novoEvento(i: number, hora: string, modo: Modo): Evento {
  const a = ACOES[i % ACOES.length];
  const n = `${48210 + i * 7}`;
  if (modo === "manual") return { id: i, hora: horaMais(hora, i * 3), agente: "Fila manual", acao: a.acao.replace("{n}", n).replace(/^(Validou|Conferiu|Aposentou|Leu)/, "Aguardando: $1"), norma: a.norma, resultado: "pendente" };
  return { id: i, hora: horaMais(hora, i * 3), agente: a.agente, acao: a.acao.replace("{n}", n), norma: a.norma, resultado: a.resultado };
}

export function RegulacaoView({ sim }: { sim: { modo: Modo; hora: string } }) {
  const [filtro, setFiltro] = useState<(typeof CATEGORIAS)[number]>("Todas");
  const [aberto, setAberto] = useState<string | null>("abusividade");
  const [eventos, setEventos] = useState<Evento[]>(() => Array.from({ length: 6 }, (_, k) => novoEvento(5 - k, sim.hora, sim.modo)));
  const [checagens, setChecagens] = useState(1284);
  const [pendentes, setPendentes] = useState(37);
  const seq = useRef(6);
  const hora = useRef(sim.hora);
  useEffect(() => {
    hora.current = sim.hora;
  }, [sim.hora]);

  useEffect(() => {
    seq.current = 6;
    setEventos(Array.from({ length: 6 }, (_, k) => novoEvento(5 - k, hora.current, sim.modo)));
    const id = setInterval(() => {
      const ev = novoEvento(seq.current++, hora.current, sim.modo);
      setEventos((e) => [ev, ...e].slice(0, 9));
      if (sim.modo === "integrada") setChecagens((c) => c + 1);
      else setPendentes((p) => p + 1);
    }, sim.modo === "integrada" ? 2200 : 4200);
    return () => clearInterval(id);
  }, [sim.modo]);

  const itens = useMemo(() => RADAR.filter((i) => filtro === "Todas" || i.categoria === filtro), [filtro]);
  const agentes = useMemo(() => new Set(ACOES.map((a) => a.agente)).size, []);
  const integrada = sim.modo === "integrada";

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Tile rotulo="Normas monitoradas" valor={String(RADAR.length)} nota="fontes oficiais · situação em 24/09/2026" />
        <Tile rotulo="Agentes em execução" valor={integrada ? String(agentes) : "0"} nota={integrada ? "leem DOU, NF-e, ANP e CONFAZ" : "conferência feita por pessoas"} />
        <Tile rotulo={integrada ? "Checagens hoje" : "Pendências na fila"} valor={fmt(integrada ? checagens : pendentes)} nota={integrada ? "cada NF-e, lote e cliente (simulado)" : "planilhas e e-mails (simulado)"} />
        <Tile rotulo="Prazos em 100 dias" valor={String(PRAZOS.length)} nota={`próximo: ${PRAZOS[0].data}`} />
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-12">
        <section className="rounded-2xl bg-card p-4 ring-1 ring-foreground/[0.07] xl:col-span-7">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <h3 className="text-[13px] font-semibold text-foreground">Radar regulatório</h3>
              <p className="text-[11px] text-muted-foreground">Normas reais que mexem na margem e no caixa · clique para ver o impacto</p>
            </div>
          </div>
          <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
            {CATEGORIAS.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => setFiltro(c)}
                className={`shrink-0 rounded-full px-2.5 py-1 text-[10.5px] font-medium transition-colors ${filtro === c ? "bg-foreground text-background" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-3 max-h-[520px] space-y-1.5 overflow-y-auto pr-1">
            {itens.map((i) => (
              <ItemRadarCard key={i.id} item={i} aberto={aberto === i.id} onToggle={() => setAberto(aberto === i.id ? null : i.id)} />
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-card p-4 ring-1 ring-foreground/[0.07] xl:col-span-5">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-foreground/70" />
            <h3 className="text-[13px] font-semibold text-foreground">{integrada ? "Agentes trabalhando agora" : "Fila de conferência manual"}</h3>
            <span className="ml-auto flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground motion-reduce:animate-none" />
              ao vivo · simulação com normas reais
            </span>
          </div>
          <ol className="mt-3 space-y-1.5" aria-live="polite">
            {eventos.map((e) => {
              const s = STATUS[e.resultado];
              return (
                <li key={e.id} className="rounded-xl bg-secondary px-3 py-2 motion-safe:animate-[fadeIn_.4s_ease]">
                  <div className="flex items-center gap-2 text-[10.5px]">
                    <span className="font-mono tabular-nums text-muted-foreground">{e.hora}</span>
                    <span className="font-semibold text-foreground">{e.agente}</span>
                    <span className="ml-auto inline-flex items-center gap-1 rounded-full px-1.5 py-px text-[10px] font-medium text-foreground ring-1 ring-foreground/10">
                      <s.Icone className="h-3 w-3" style={{ color: s.cor }} />
                      {s.rotulo}
                    </span>
                  </div>
                  <p className="mt-1 text-[11.5px] leading-snug text-foreground/85">{e.acao}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">{e.norma}</p>
                </li>
              );
            })}
          </ol>
        </section>
      </div>

      <section className="rounded-2xl bg-card p-4 ring-1 ring-foreground/[0.07]">
        <div className="flex items-center gap-2">
          <CalendarClock className="h-4 w-4 text-foreground/70" />
          <h3 className="text-[13px] font-semibold text-foreground">Prazos regulatórios à frente</h3>
          <span className="ml-auto text-[10px] text-muted-foreground">datas oficiais</span>
        </div>
        <ol className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {PRAZOS.map((p) => (
            <li key={p.o_que} className="rounded-xl bg-secondary px-3 py-2">
              <p className="text-[12px] font-semibold tabular-nums text-foreground">{p.data}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-foreground/80">{p.o_que}</p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">{p.fonte}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function Tile({ rotulo, valor, nota }: { rotulo: string; valor: string; nota: string }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-xl bg-card p-3.5 ring-1 ring-foreground/[0.07]">
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{rotulo}</p>
      <p className="text-[19px] font-semibold tabular-nums leading-tight tracking-tight text-foreground">{valor}</p>
      <p className="text-[10.5px] text-muted-foreground">{nota}</p>
    </div>
  );
}

function ItemRadarCard({ item, aberto, onToggle }: { item: ItemRadar; aberto: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-xl bg-secondary">
      <button type="button" onClick={onToggle} aria-expanded={aberto} className="flex w-full items-start gap-2 px-3 py-2 text-left">
        <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: SEV[item.severidade] }} aria-hidden />
        <span className="min-w-0 flex-1">
          <span className="block text-[12px] font-semibold leading-snug text-foreground">{item.titulo}</span>
          <span className="mt-0.5 block text-[10px] text-muted-foreground">
            {item.categoria} · severidade {item.severidade} · {item.tipo} · situação em {item.data}
          </span>
        </span>
        <ChevronDown className={`mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform ${aberto ? "rotate-180" : ""}`} />
      </button>
      {aberto && (
        <div className="space-y-1.5 border-t border-foreground/[0.06] px-3 py-2 text-[11px] leading-snug">
          <p className="text-foreground/85">{item.situacao}</p>
          <p className="text-foreground/85">
            <span className="font-semibold text-foreground">Impacto: </span>
            {item.impacto}
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[10.5px]">
            <span className="rounded-full bg-card px-2 py-0.5 text-muted-foreground ring-1 ring-foreground/10">monitorado por: {item.agente}</span>
            <a href={item.fonte.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-foreground underline-offset-2 hover:underline">
              Fonte: {item.fonte.rotulo} <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
