"use client";

import { useMemo, useState, type ReactElement, type ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowDownRight, ArrowUpRight, Bot, CheckCircle2, Clock3, FileText, Fuel, Lock, Radar, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { chartTheme, fmtDec, fmtInt, fmtMi, fmtRs, margemPorProduto, margemRsM3, PAL, POSTOS, prodTone, PRODUTOS, SISTEMAS, serieDias, type Ordem, type SimData, type Tema } from "./demo-sim";
import { MapaCalor, MapaOperacao } from "@/demo/mapa";
import { RegulacaoView } from "@/demo/regulacao";

export type ViewId =
  | "calor"
  | "visao"
  | "comercial"
  | "precos"
  | "rede"
  | "suprimento"
  | "logistica"
  | "financeiro"
  | "fiscal"
  | "ia"
  | "seguranca";

export const VIEW_DEFS: { id: ViewId; grupo: string; label: string; sub: string }[] = [
  { id: "visao", grupo: "Painel de gestão", label: "Visão geral", sub: "Retrato executivo da operação" },
  { id: "comercial", grupo: "Comercial", label: "Comercial B2B", sub: "Funil, fila de pedidos e crédito" },
  { id: "precos", grupo: "Comercial", label: "Precificação", sub: "Copiloto e margem por região" },
  { id: "rede", grupo: "Comercial", label: "Rede & Varejo", sub: "Postos, demanda e captação" },
  { id: "suprimento", grupo: "Operação", label: "Suprimento", sub: "Tanques, compras e custos" },
  { id: "logistica", grupo: "Operação", label: "Logística", sub: "Rotas, frota e janelas" },
  { id: "financeiro", grupo: "Financeiro", label: "Financeiro & Caixa", sub: "Fluxo, aging e cobrança" },
  { id: "fiscal", grupo: "Back-office", label: "Regulação ao vivo", sub: "Normas, prazos e agentes" },
  { id: "calor", grupo: "Inteligência", label: "Oportunidades & Riscos", sub: "Mapa de calor por UF" },
  { id: "ia", grupo: "Inteligência", label: "Centro de IA", sub: "Agentes operando o fluxo" },
  { id: "seguranca", grupo: "Inteligência", label: "Segurança & Compliance", sub: "Trilha, controles e LGPD" },
];

export type ViewProps = { sim: SimData; tema: Tema; onNav: (v: ViewId) => void };

/* ================= átomos ================= */

export function Stat({ label, value, delta, nota }: { label: string; value: string; delta?: string; nota?: string }) {
  const up = delta?.startsWith("▲");
  const down = delta?.startsWith("▼");
  return (
    <div className="flex flex-col justify-between gap-1.5 rounded-xl bg-card p-3.5 ring-1 ring-foreground/[0.07]">
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`${value.length > 13 ? "text-[15.5px]" : "text-[19px]"} whitespace-nowrap font-semibold tabular-nums leading-tight tracking-tight text-foreground`}>{value}</p>
      {(delta || nota) && (
        <p className={`flex items-center gap-1 text-[10.5px] ${down ? "text-destructive" : up ? "text-foreground" : "text-muted-foreground"}`}>
          {up && <ArrowUpRight className="h-3 w-3" />}
          {down && <ArrowDownRight className="h-3 w-3" />}
          {delta?.replace("▲ ", "").replace("▼ ", "") ?? nota}
        </p>
      )}
      {delta && nota && <p className="text-[10px] text-muted-foreground/70">{nota}</p>}
    </div>
  );
}

function PanelCard({ title, sub, action, children, className = "" }: { title: string; sub?: string; action?: ReactElement; children: ReactNode; className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-[13px]">{title}</CardTitle>
        {sub && <CardDescription className="text-[11px] leading-snug">{sub}</CardDescription>}
        {action && <CardAction>{action}</CardAction>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function AcoesLista({ sim, limite }: { sim: SimData; limite?: number }) {
  const lista = limite ? sim.acoes.slice(0, limite) : sim.acoes;
  return (
    <div className="space-y-1.5">
      {lista.map((a) => (
        <div key={a.chave} className="flex items-center gap-3 rounded-lg bg-secondary px-3 py-2">
          <Badge variant="outline" className="shrink-0 text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground">{a.tipo}</Badge>
          <p className="flex-1 text-[11.5px] leading-snug text-foreground/90">{a.msg}</p>
          {a.usada ? (
            <Badge variant="secondary" className="shrink-0 text-[9.5px]">aplicado</Badge>
          ) : sim.modo === "integrada" ? (
            <Button size="sm" onClick={() => sim.executarAcao(a.chave)} className="h-6 shrink-0 rounded-full px-3 text-[10.5px]">
              {a.acao}
            </Button>
          ) : (
            <span className="shrink-0 text-[10px] text-muted-foreground">manual</span>
          )}
        </div>
      ))}
    </div>
  );
}

const TIPO_CLS: Record<string, string> = {
  IA: "text-foreground",
  PREÇO: "text-muted-foreground",
  LOG: "text-muted-foreground",
  FISC: "text-muted-foreground",
  REDE: "text-muted-foreground",
  "CRÉD": "text-muted-foreground",
  COBR: "text-muted-foreground",
  SEG: "text-destructive",
  TRAD: "text-muted-foreground",
  ALERTA: "text-muted-foreground",
  B2B: "text-muted-foreground",
  FIN: "text-muted-foreground",
  HUMANO: "text-muted-foreground",
};

export function FeedEventos({ sim, max = 7 }: { sim: SimData; max?: number }) {
  return (
    <div className="space-y-1">
      {sim.eventos.slice(0, max).map((e, i) => (
        <div key={`${e.t}-${i}`} className="flex items-start gap-2 rounded-lg bg-secondary px-2.5 py-1.5">
          <span className={`mt-px w-11 shrink-0 font-mono text-[9px] font-bold uppercase tracking-wide ${TIPO_CLS[e.tipo] ?? TIPO_CLS.HUMANO}`}>{e.tipo}</span>
          <span className="text-[11px] leading-snug text-foreground/80">{e.msg}</span>
        </div>
      ))}
    </div>
  );
}

function HoraChart({ tema }: { tema: Tema }) {
  const th = chartTheme(tema);
  const pal = PAL[tema];
  const data = useMemo(() => {
    const vols = serieDias(14, 41, 560, 170);
    return vols.map((v, i) => ({ h: `${String(6 + i).padStart(2, "0")}h`, v: Math.round(v) }));
  }, []);
  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 6, right: 8, bottom: 0, left: -14 }}>
          <CartesianGrid stroke={th.grid} vertical={false} />
          <XAxis dataKey="h" tick={th.tick} axisLine={false} tickLine={false} />
          <YAxis tick={th.tick} axisLine={false} tickLine={false} tickFormatter={(v) => fmtInt(Number(v))} width={44} />
          <Tooltip contentStyle={th.tip} labelStyle={{ color: "inherit" }} formatter={(v) => fmtInt(Number(v)) + " m³"} />
          <Line type="monotone" dataKey="v" stroke={pal.s1} strokeWidth={2} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ================= 1 · Visão geral ================= */

export function VisaoGeral({ sim, tema, onNav }: ViewProps) {
  const emRota = sim.rotas.filter((r) => r.prog < 100).length;
  const atrasadas = sim.rotas.filter((r) => r.prog < 100 && r.atrasada).length;
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        <Stat label="Volume do dia" value={fmtInt(sim.volume / 1000) + " m³"} delta={sim.modo === "integrada" ? "▲ +9,4%" : "▼ +4,1%"} nota="vs. ontem" />
        <Stat label="Receita do dia" value={fmtMi(sim.receita)} delta={sim.modo === "integrada" ? "▲ +11,2%" : "▼ +5,6%"} />
        <Stat label="Margem bruta" value={fmtRs(+margemRsM3(sim.precos).toFixed(2)) + "/m³"} delta={sim.modo === "integrada" ? "▲ copiloto repassando custo" : "▼ tabela desatualizada"} nota="média ponderada pelo mix" />
        <Stat label="Janela cumprida" value={sim.janela + "%"} delta={sim.modo === "integrada" ? "▲ +2,1 p.p." : "▼ -4,2 p.p."} />
        <Stat label="Km vazio" value={fmtDec(sim.kmVazio) + "%"} delta={sim.modo === "integrada" ? "▲ -3,8 p.p." : "▼ +5,1 p.p."} />
        <Stat label="Alertas abertos" value={String(sim.alertas)} nota={sim.modo === "integrada" ? "tratados por agentes" : "fila humana de triagem"} />
      </div>

      <div className="grid gap-3 xl:grid-cols-12">
        <PanelCard
          className="xl:col-span-5"
          title="Briefing das 08:00 · Diretoria"
          sub="Gerado pelo copiloto a partir dos dados da operação"
          action={<Badge variant="secondary">IA</Badge>}
        >
          <ul className="space-y-2 text-[11.5px] leading-snug text-foreground/80">
            <li className="flex gap-2"><Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground/60" />Volume 9% acima do previsto no corredor Salvador–Feira. Sugestão: antecipar 2 cargas para Barreiras e Camaçari.</li>
            <li className="flex gap-2"><Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground/60" />Concorrente cortou o preço da gasolina em Camaçari. Reprecificação pronta, respeitando o piso de margem.</li>
            <li className="flex gap-2"><Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground/60" />Cobrança: R$ 24,9 mi vencidos. Agente tem script de acordo; aprovação humana acima de R$ 500 mil.</li>
          </ul>
          <div className="mt-3 border-t pt-3">
            <AcoesLista sim={sim} limite={3} />
            <button type="button" onClick={() => onNav("ia")} className="mt-2.5 text-[11px] font-medium text-foreground underline decoration-foreground/30 underline-offset-2 hover:decoration-foreground">
              ver os 8 agentes no Centro de IA →
            </button>
          </div>
        </PanelCard>

        <PanelCard className="xl:col-span-4" title="Volume por hora (m³)" sub="Saiu das bases · 14 horas (simulação)">
          <HoraChart tema={tema} />
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[
              ["em rota", String(emRota)],
              ["atrasadas", String(atrasadas)],
              ["NF-e emitidas", fmtInt(sim.nfe)],
            ].map(([l, v]) => (
              <div key={l} className="rounded-lg bg-secondary py-1.5 text-center">
                <p className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">{l}</p>
                <p className="text-[12px] font-semibold tabular-nums text-foreground">{v}</p>
              </div>
            ))}
          </div>
        </PanelCard>

        <PanelCard className="xl:col-span-3" title="Eventos ao vivo" sub="O que os agentes capturaram agora">
          <FeedEventos sim={sim} max={9} />
        </PanelCard>
      </div>

      <div className="grid gap-3 xl:grid-cols-12">
        <PanelCard className="xl:col-span-7" title="A fila de pedidos atravessa 8 sistemas sem toque humano" sub="No modo manual, cada etapa depende de alguém digitar, ligar ou conferir.">
          <FunilSistemas sim={sim} />
        </PanelCard>
        <PanelCard className="xl:col-span-5" title="Margem bruta por produto (R$/m³)" sub="Preço de venda − custo de reposição, média das bases (simulação)">
          <MargemProdutos sim={sim} tema={tema} />
          <div className="mt-2 grid grid-cols-2 gap-2 text-[10.5px] text-muted-foreground">
            <p className="rounded-lg bg-secondary px-2.5 py-1.5">Diesel responde por <span className="font-semibold text-foreground">62% do volume</span></p>
            <p className="rounded-lg bg-secondary px-2.5 py-1.5">Gasolina responde por <span className="font-semibold text-foreground">58% da margem</span></p>
          </div>
        </PanelCard>
      </div>
    </div>
  );
}

/* ================= funil de sistemas (compartilhado) ================= */

function FunilSistemas({ sim }: { sim: SimData }) {
  return (
    <div className="space-y-2">
      {sim.ordens.map((o) => (
        <LinhaOrdem key={o.id} o={o} manual={sim.modo === "manual"} />
      ))}
    </div>
  );
}

function LinhaOrdem({ o, manual }: { o: Ordem; manual: boolean }) {
  const done = o.step >= SISTEMAS.length;
  return (
    <div className="rounded-xl bg-secondary px-3 py-2.5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-mono text-[11px] font-semibold text-foreground">{o.id}</span>
        <span className="text-[12px] font-semibold text-foreground">{o.posto}</span>
        <span className="text-[10.5px] text-muted-foreground">{o.cidade}</span>
        <span className="ml-auto text-[11px] tabular-nums text-foreground/70">
          {fmtInt(o.volume)} L · {fmtRs(o.valor)}
        </span>
        {done ? <Badge variant="secondary" className="text-[9.5px]">concluído</Badge> : <Badge variant="outline" className="text-[9.5px]">{manual ? "etapa manual" : "fluxo contínuo"}</Badge>}
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        {SISTEMAS.map((s, i) => {
          const passou = i < o.step;
          const atual = i === o.step && !done;
          return (
            <div key={s} className="relative flex-1">
              <div className={`h-1 rounded-full transition-colors duration-500 ${passou ? "bg-foreground" : atual ? "bg-foreground/50" : "bg-foreground/10"}`} />
              <p className={`mt-1 hidden truncate text-[8.5px] sm:block ${atual ? "text-foreground" : passou ? "text-muted-foreground" : "text-muted-foreground/40"}`}>{s}</p>
              {atual && <p className="mt-1 text-[8.5px] text-foreground sm:hidden">em andamento</p>}
            </div>
          );
        })}
        <span className="shrink-0 font-mono text-[10px] tabular-nums text-muted-foreground">{Math.min(o.step, 8)}/8</span>
      </div>
    </div>
  );
}

function MargemProdutos({ sim, tema }: { sim: SimData; tema: Tema }) {
  const th = chartTheme(tema);
  const data = useMemo(() => {
    const m = margemPorProduto(sim.precos);
    return PRODUTOS.filter((p) => m[p] !== undefined).map((p) => ({ p, m: +m[p].toFixed(2) }));
  }, [sim.precos]);
  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 6, right: 8, bottom: 0, left: -18 }}>
          <CartesianGrid stroke={th.grid} vertical={false} />
          <XAxis dataKey="p" tick={{ ...th.tick, fontSize: 9 }} axisLine={false} tickLine={false} interval={0} />
          <YAxis tick={th.tick} axisLine={false} tickLine={false} tickFormatter={(v) => "R$ " + Number(v)} />
          <Tooltip contentStyle={th.tip} formatter={(v) => fmtRs(Number(v)) + "/m³"} />
          <Bar dataKey="m" radius={[5, 5, 0, 0]} isAnimationActive={false}>
            {data.map((d) => (
              <Cell key={d.p} fill={prodTone(d.p, tema)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ================= 2 · Comercial B2B ================= */

export function ComercialView({ sim }: ViewProps) {
  const respondidas = sim.cotacoes.filter((c) => c.respEm !== null);
  const mediaResp = respondidas.length ? Math.round(respondidas.reduce((a, c) => a + (c.respEm! - c.minuto), 0) / respondidas.length) : 0;
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Stat label="Pedidos no portal hoje" value={fmtInt(320 + sim.ordens.length * 14)} delta={sim.modo === "integrada" ? "▲ +18%" : "▼ +6%"} nota="entrada 100% digital" />
        <Stat label="Tempo médio de cotação" value={sim.modo === "integrada" ? "40 s" : `${mediaResp || 6} ciclos`} nota={sim.modo === "integrada" ? "de 1-3 dias" : "sem resposta ≥ 41h"} />
        <Stat label="Crédito pré-aprovado" value="R$ 340 mi" nota="scoring em 40 segundos" />
        <Stat label={sim.modo === "integrada" ? "Capturado por agentes" : "Ficando na mesa"} value={sim.modo === "integrada" ? fmtRs(sim.capturado) : fmtRs(sim.naMesa)} nota={sim.modo === "integrada" ? "oportunidades não perdidas" : "sem follow-up registrado"} />
      </div>

      <div className="grid gap-3 xl:grid-cols-12">
        <PanelCard
          className="xl:col-span-8"
          title="Fila de pedidos atravessando os 8 sistemas"
          sub="Cada pedido nasce com cotação, crédito e reserva de volume resolvidos."
        >
          <FunilSistemas sim={sim} />
          <div className="mt-3 border-t pt-3">
            <AcoesLista sim={sim} />
          </div>
        </PanelCard>

        <div className="space-y-3 xl:col-span-4">
          <PanelCard title="Cotações chegando" sub={sim.modo === "integrada" ? "respondidas em ~1 ciclo pelo copiloto" : "resposta depende de ida e volta humana"} action={<Clock3 className="h-4 w-4 text-muted-foreground" />}>
            <div className="space-y-2">
              {sim.cotacoes.map((c) => {
                const esperando = c.respEm === null;
                return (
                  <div key={c.id} className="rounded-xl bg-secondary px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10.5px] font-semibold text-foreground">{c.id}</span>
                      <span className="text-[11.5px] font-semibold text-foreground">{c.posto}</span>
                      <span className="ml-auto">
                        <Badge variant={esperando ? "outline" : "secondary"} className="text-[9px]">{esperando ? "aguardando" : "respondida"}</Badge>
                      </span>
                    </div>
                    <p className="mt-1 text-[10.5px] text-muted-foreground">
                      {c.cidade} · {c.produto} · {fmtInt(c.volume)} L · {fmtRs(c.valor)}
                    </p>
                    {esperando ? (
                      <p className={`mt-1 text-[10px] ${sim.modo === "integrada" ? "text-foreground/70" : "text-destructive"}`}>
                        {sim.modo === "integrada" ? "copiloto responde no próximo ciclo" : "sem dono — risco de perder o pedido"}
                      </p>
                    ) : (
                      <p className="mt-1 text-[10px] text-muted-foreground">respondida em {(c.respEm! - c.minuto) * 15} min (relógio da simulação)</p>
                    )}
                  </div>
                );
              })}
            </div>
          </PanelCard>
          <PanelCard title="Scoring de crédito" sub="Histórico de 18 meses + régua de pagamentos">
            <div className="space-y-2.5">
              {sim.ordens.slice(0, 5).map((o) => (
                <div key={o.id}>
                  <div className="mb-1 flex items-center justify-between text-[10.5px]">
                    <span className="text-foreground/80">{o.posto}</span>
                    <span className="font-semibold tabular-nums text-foreground">{o.score}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
                    <div className="h-full rounded-full bg-foreground transition-[width] duration-700" style={{ width: `${o.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </PanelCard>
        </div>
      </div>
    </div>
  );
}

/* ================= 3 · Precificação ================= */

export function PrecificacaoView({ sim, tema }: ViewProps) {
  const pal = PAL[tema];
  const sens = useMemo(
    () =>
      [
        { f: "Reajuste do fornecedor +1%", m: 0.21 },
        { f: "Câmbio +1%", m: 0.16 },
        { f: "ICMS estado vizinho", m: 0.34 },
        { f: "Concorrente -1%", m: -0.27 },
      ].map((x) => ({ ...x, h: +(((sim.margem / 100) * 3_100_000 * x.m) / 100).toFixed(0) })),
    [sim.margem],
  );
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Stat label="Preços recalculados hoje" value={sim.modo === "integrada" ? fmtInt(1_860 + sim.tick * 12) : "120 (manuais)"} nota="custo + frete + concorrência" />
        <Stat label="Margem média" value={fmtRs(+margemRsM3(sim.precos).toFixed(2)) + "/m³"} delta={sim.modo === "integrada" ? "▲ desde 6h" : "▼ desde 6h"} />
        <Stat label="Ciclo de reação" value={sim.modo === "integrada" ? "30 s" : "1-2 dias"} nota="tabela editada à mão hoje" />
        <Stat label="Risco de guerra de preço" value={sim.modo === "integrada" ? "baixo" : "alto"} nota="piso de margem por base" />
      </div>

      <PanelCard
        title="Copiloto de preço por base × produto"
        sub="Sugestão recalculada com custo de reposição, tributos, frete e preço do vizinho. Você aprova — piso de margem é regra, não exceção."
        action={<Badge variant="secondary">copiloto</Badge>}
      >
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[10px] uppercase tracking-wider">Produto</TableHead>
              <TableHead className="text-[10px] uppercase tracking-wider">Base</TableHead>
              <TableHead className="text-right text-[10px] uppercase tracking-wider">Preço</TableHead>
              <TableHead className="text-right text-[10px] uppercase tracking-wider">Custo</TableHead>
              <TableHead className="text-right text-[10px] uppercase tracking-wider">Sugerido</TableHead>
              <TableHead className="text-right text-[10px] uppercase tracking-wider">Concorrente</TableHead>
              <TableHead className="text-center text-[10px] uppercase tracking-wider">Gap</TableHead>
              <TableHead className="text-right text-[10px] uppercase tracking-wider">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sim.precos.map((p, i) => {
              const gap = ((p.concorrente - p.preco) / p.preco) * 100;
              const abaixo = gap > 0.5;
              return (
                <TableRow key={`${p.produto}-${p.base}-${i}`}>
                  <TableCell className="py-2">
                    <span className="inline-flex items-center gap-1.5 text-[11.5px] font-medium">
                      <span className="h-2 w-2 rounded-full" style={{ background: prodTone(p.produto, tema) }} />
                      {p.produto}
                    </span>
                  </TableCell>
                  <TableCell className="py-2 text-[11.5px] text-muted-foreground">{p.base}</TableCell>
                  <TableCell className="py-2 text-right text-[11.5px] font-semibold tabular-nums">{fmtDec(p.preco, 3)}</TableCell>
                  <TableCell className="py-2 text-right text-[11.5px] tabular-nums text-muted-foreground">{fmtDec(p.custo, 3)}</TableCell>
                  <TableCell className="py-2 text-right text-[11.5px] font-semibold tabular-nums">{fmtDec(p.sugerido, 3)}</TableCell>
                  <TableCell className="py-2 text-right text-[11.5px] tabular-nums text-muted-foreground">{fmtDec(p.concorrente, 3)}</TableCell>
                  <TableCell className="py-2 text-center">
                    {abaixo ? (
                      <Badge variant="outline" className="text-[9.5px]">{fmtDec(gap, 1)}% abaixo</Badge>
                    ) : (
                      <Badge variant="secondary" className="text-[9.5px]">ok</Badge>
                    )}
                  </TableCell>
                  <TableCell className="py-2 text-right">
                    {p.base === "Camaçari" ? (
                      p.aplicado ? (
                        <Badge variant="secondary" className="text-[9.5px]">aplicado</Badge>
                      ) : sim.modo === "integrada" ? (
                        <Button size="sm" onClick={() => sim.executarAcao("preco-pojuca")} className="h-6 rounded-full px-3 text-[10px]">Aplicar</Button>
                      ) : (
                        <span className="text-[10px] text-muted-foreground">modo manual</span>
                      )
                    ) : (
                      <span className="text-[10px] text-muted-foreground/50">—</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </PanelCard>

      <div className="grid gap-3 xl:grid-cols-2">
        <PanelCard title="Sensibilidade da margem" sub="Impacto estimado no mês, dado o volume do dia (modelo ilustrativo)">
          <div className="space-y-3">
            {sens.map((s) => (
              <div key={s.f} className="flex items-center gap-3">
                <span className="w-32 shrink-0 text-[11px] text-foreground/80">{s.f}</span>
                <div className="relative h-5 flex-1 overflow-hidden rounded-md bg-secondary">
                  <div
                    className="absolute top-0 h-full rounded-md bg-foreground/70"
                    style={{ left: s.m >= 0 ? "50%" : undefined, right: s.m < 0 ? "50%" : undefined, width: `${Math.min(50, Math.abs(s.m) * 90)}%` }}
                  />
                  <div className="absolute inset-y-0 left-1/2 w-px bg-foreground/20" />
                </div>
                <span className={`w-16 shrink-0 text-right text-[11px] font-semibold tabular-nums ${s.m < 0 ? "text-destructive" : "text-foreground"}`}>
                  {s.m >= 0 ? "+" : ""}
                  {fmtRs(s.h)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 border-t pt-3">
            <AcoesLista sim={sim} />
          </div>
        </PanelCard>
        <PanelCard title="Margem por produto" sub="Média das bases monitoradas">
          <MargemProdutos sim={sim} tema={tema} />
          <div className="mt-2 grid grid-cols-2 gap-2 text-[10.5px] text-muted-foreground">
            <p className="rounded-lg bg-secondary px-2.5 py-1.5">Piso de margem: <span className="font-semibold text-foreground">2,4% por base</span></p>
            <p className="rounded-lg bg-secondary px-2.5 py-1.5">Reação ao vizinho: <span className="font-semibold text-foreground">30 s</span></p>
          </div>
        </PanelCard>
      </div>
      <p className="text-[10px] text-muted-foreground/60">Tons em {pal.s1 === "#1d1d1f" ? "claro" : "escuro"} · dados sintéticos</p>
    </div>
  );
}

/* ================= 4 · Rede & Varejo ================= */

export function RedeView({ sim, tema, onNav }: ViewProps) {
  const th = chartTheme(tema);
  const demanda = useMemo(
    () => POSTOS.map(([nome], i) => ({ nome: nome.replace("Posto ", "").replace("Auto ", "").replace("Rede ", ""), v: 4.2 + ((i * 37) % 9) * 1.3 })),
    [],
  );
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Stat label="Postos atendidos" value="142" nota="78 bandeira branca · 64 bandeirados" />
        <Stat label="Volume/dia por posto" value="9.400 L" delta="▲ +6,2%" nota="média da rede" />
        <Stat label="Fraude detectada (30d)" value="R$ 184,6 mil" delta={sim.modo === "integrada" ? "▲ capturada por IA" : "▼ no fechamento"} />
        <Stat label="Captação em aberto" value={sim.modo === "integrada" ? "9 leads" : "23 leads parados"} nota="bandeira branca no interior" />
      </div>

      <div className="grid gap-3 xl:grid-cols-12">
        <PanelCard className="xl:col-span-7" title="Demanda por posto (litros/dia, mil)" sub="Top da rede · janela de 14 dias">
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demanda} layout="vertical" margin={{ top: 4, right: 12, bottom: 0, left: 24 }}>
                <CartesianGrid stroke={th.grid} horizontal={false} />
                <XAxis type="number" tick={th.tick} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="nome" tick={{ ...th.tick, fontSize: 9.5 }} axisLine={false} tickLine={false} width={70} />
                <Tooltip contentStyle={th.tip} formatter={(v) => fmtDec(Number(v), 1) + "k L/dia"} />
                <Bar dataKey="v" fill="currentColor" className="text-foreground" radius={[0, 5, 5, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </PanelCard>

        <PanelCard className="xl:col-span-5" title="Varejo vigiado por IA" sub="Câmeras + telemetria do posto viram contexto dos agentes" action={<Radar className="h-4 w-4 text-muted-foreground" />}>
          <div className="space-y-2">
            {[
              { t: "Padrão de bomba-truque", d: "Câmeras cruzaram picos de bico sem passagem de veículo. OS aberta automática." },
              { t: "Lavração suspeita", d: "Divergência compra×venda×tanque por 3 ciclos consecutivos. Auditoria aberta." },
              { t: "Concorrência no raio", d: "Novo posto aberto a 2,1 km de Rede Xavier. Copiloto reposicionou preço." },
            ].map((x) => (
              <div key={x.t} className="rounded-xl bg-secondary px-3 py-2.5">
                <p className="text-[11.5px] font-semibold text-foreground">{x.t}</p>
                <p className="mt-1 text-[10.5px] leading-snug text-muted-foreground">{x.d}</p>
              </div>
            ))}
            <button type="button" onClick={() => onNav("seguranca")} className="text-[11px] font-medium text-foreground underline decoration-foreground/30 underline-offset-2 hover:decoration-foreground">
              ver incidentes e trilha de auditoria →
            </button>
          </div>
        </PanelCard>
      </div>

      <PanelCard title="Postos da rede" sub="Volume, cadência e status de vigilância (simulação)">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[10px] uppercase tracking-wider">Posto</TableHead>
              <TableHead className="text-[10px] uppercase tracking-wider">Cidade</TableHead>
              <TableHead className="text-right text-[10px] uppercase tracking-wider">L/dia</TableHead>
              <TableHead className="text-right text-[10px] uppercase tracking-wider">Tanque médio</TableHead>
              <TableHead className="text-center text-[10px] uppercase tracking-wider">Câmeras</TableHead>
              <TableHead className="text-right text-[10px] uppercase tracking-wider">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {POSTOS.map(([nome, cidade], i) => {
              const vol = 7800 + ((i * 613) % 4200);
              const tank = 44 + ((i * 29) % 46);
              const cam = i % 3 !== 2;
              return (
                <TableRow key={nome}>
                  <TableCell className="py-2 text-[11.5px] font-medium">{nome}</TableCell>
                  <TableCell className="py-2 text-[11.5px] text-muted-foreground">{cidade}</TableCell>
                  <TableCell className="py-2 text-right text-[11.5px] tabular-nums">{fmtInt(vol)}</TableCell>
                  <TableCell className="py-2 text-right text-[11.5px] tabular-nums">{tank}%</TableCell>
                  <TableCell className="py-2 text-center">
                    <Badge variant={cam ? "secondary" : "outline"} className="text-[9px]">{cam ? "ativo" : "sem câmera"}</Badge>
                  </TableCell>
                  <TableCell className="py-2 text-right">
                    <Badge variant={i === 4 || i === 7 ? "outline" : "secondary"} className="text-[9px]">{i === 4 ? "atenção" : i === 7 ? "captação" : "regular"}</Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </PanelCard>

      <PanelCard title="Captação de bandeira branca" sub="Agente de prospecção mapeia postos independentes no NE e prepara a abordagem">
        <div className="grid gap-2 sm:grid-cols-3">
          {[
            { c: "Irecê · BA", n: "Auto Posto Sertão", s: "lead qualificado", v: "secondary" },
            { c: "Luís E. Magalhães · BA", n: "3 postos na BR-242", s: "abordagem enviada", v: "secondary" },
            { c: "Barreiras · BA", n: "Rede oeste (12 postos)", s: "aguardando visita", v: "outline" },
          ].map((x) => (
            <div key={x.c} className="rounded-xl bg-secondary p-3">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{x.c}</p>
              <p className="mt-1 text-[12.5px] font-semibold text-foreground">{x.n}</p>
              <Badge variant={x.v as "secondary" | "outline"} className="mt-2 text-[9px]">{x.s}</Badge>
            </div>
          ))}
        </div>
      </PanelCard>
    </div>
  );
}

/* ================= 5 · Suprimento ================= */

export function SuprimentoView({ sim, tema }: ViewProps) {
  const th = chartTheme(tema);
  const pal = PAL[tema];
  const custo = useMemo(() => serieDias(14, 77, 5.42, 0.22).map((v, i) => ({ d: `d${i + 1}`, custo: +v.toFixed(2) })), []);
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Stat label="Cobertura média" value={fmtDec(sim.tanques.reduce((a, t) => a + t.cover, 0) / sim.tanques.length, 0) + " dias"} nota="reposição antecipada pela previsão" />
        <Stat label="Tanques críticos" value={String(sim.tanques.filter((t) => t.critico).length)} nota={sim.modo === "integrada" ? "reposição já acionada" : "descoberta na hora"} />
        <Stat label="Custo médio (R$/L)" value={fmtDec(sim.precos.reduce((a, p) => a + p.custo, 0) / sim.precos.length, 3)} delta="▲ +1,1%" nota="custo de reposição por base" />
        <Stat label="Compras em aberto" value="3 POs" nota="confirmadas com refinaria/trading" />
      </div>

      <div className="grid gap-3 xl:grid-cols-12">
        <PanelCard className="xl:col-span-6" title="Tanques por base" sub="Nível e dias de cobertura — simulação">
          <div className="space-y-3">
            {sim.tanques.map((t) => (
              <div key={t.base + t.produto}>
                <div className="mb-1 flex items-center gap-2 text-[11px]">
                  <Fuel className={`h-3.5 w-3.5 ${t.critico ? "text-destructive" : "text-muted-foreground"}`} />
                  <span className="font-semibold text-foreground">{t.base}</span>
                  <span className="text-muted-foreground">· {t.produto}</span>
                  <span className={`ml-auto tabular-nums ${t.nivel < 35 ? "text-foreground font-semibold" : "text-muted-foreground"}`}>{Math.round(t.nivel)}% · {t.cover}d</span>
                </div>
                <div className="h-[7px] w-full overflow-hidden rounded-full bg-foreground/10">
                  <div className="h-full rounded-full bg-foreground transition-[width] duration-700" style={{ width: `${Math.max(0, Math.min(100, t.nivel))}%`, opacity: t.nivel < 16 ? 0.4 : 1 }} />
                </div>
                {t.nivel < 40 && (
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    {sim.modo === "integrada" ? (t.repostaEm > 0 ? `carga de reposição em rota — chega em ${t.repostaEm} ciclos` : "reposição agendada pela previsão") : "reposição depende de ligação manual ao terminal"}
                  </p>
                )}
              </div>
            ))}
          </div>
        </PanelCard>

        <div className="space-y-3 xl:col-span-6">
          <PanelCard title="Custo de aquisição (R$/L)" sub="14 dias · reajustes do fornecedor e subvenção refletidos" action={<Badge variant="secondary">copiloto de compra</Badge>}>
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={custo} margin={{ top: 6, right: 8, bottom: 0, left: -12 }}>
                  <defs>
                    <linearGradient id="gCusto" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={pal.s1} stopOpacity={0.18} />
                      <stop offset="100%" stopColor={pal.s1} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke={th.grid} vertical={false} />
                  <XAxis dataKey="d" tick={th.tick} axisLine={false} tickLine={false} />
                  <YAxis tick={th.tick} axisLine={false} tickLine={false} domain={["auto", "auto"]} tickFormatter={(v) => Number(v).toFixed(1)} />
                  <Tooltip contentStyle={th.tip} formatter={(v) => "R$ " + fmtDec(Number(v), 2)} />
                  <Area type="monotone" dataKey="custo" stroke={pal.s1} strokeWidth={2} fill="url(#gCusto)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </PanelCard>
          <PanelCard title="Compras em aberto" sub="pedidos de compra confirmados (simulação)">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-[10px] uppercase tracking-wider">PO</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-wider">Fornecedor</TableHead>
                  <TableHead className="text-right text-[10px] uppercase tracking-wider">Volume</TableHead>
                  <TableHead className="text-right text-[10px] uppercase tracking-wider">Chegada</TableHead>
                  <TableHead className="text-right text-[10px] uppercase tracking-wider">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  ["PO-1187", "Refino Mataripe", "120.000 L", "em 2 dias", "confirmado"],
                  ["PO-1191", "Importação Suape", "85.000 L", "em 5 dias", "em trânsito"],
                  ["PO-1196", "Trading interno", "64.000 L", "em 9 dias", "aguardando"],
                ].map(([po, f, vol, che, st]) => (
                  <TableRow key={po}>
                    <TableCell className="py-1.5 font-mono text-[10.5px] font-semibold">{po}</TableCell>
                    <TableCell className="py-1.5 text-[11.5px] text-muted-foreground">{f}</TableCell>
                    <TableCell className="py-1.5 text-right text-[11.5px] tabular-nums">{vol}</TableCell>
                    <TableCell className="py-1.5 text-right text-[11.5px] text-muted-foreground">{che}</TableCell>
                    <TableCell className="py-1.5 text-right">
                      <Badge variant={st === "aguardando" ? "outline" : "secondary"} className="text-[9px]">{st}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </PanelCard>
        </div>
      </div>

      <PanelCard title="Ação sugerida pelo copiloto" sub="com impacto no caixa">
        <AcoesLista sim={sim} />
      </PanelCard>
    </div>
  );
}

/* ================= 6 · Logística ================= */

export function LogisticaView({ sim, tema }: ViewProps) {
  const [emRota, setEmRota] = useState(0);
  const th = chartTheme(tema);
  const pal = PAL[tema];
  const km = useMemo(() => serieDias(14, 23, sim.modo === "integrada" ? 9.4 : 16.8, 3.4).map((v, i) => ({ d: `d${i + 1}`, v: +v.toFixed(1) })), [sim.modo]);
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Stat label="Cargas em rota" value={String(emRota)} nota="posição a cada segundo (simulada)" />
        <Stat label="Janela cumprida" value={sim.janela + "%"} delta={sim.modo === "integrada" ? "▲ +2,1 p.p." : "▼ -4,2 p.p."} />
        <Stat label="Km vazio" value={fmtDec(sim.kmVazio) + "%"} delta={sim.modo === "integrada" ? "▲ -3,8 p.p." : "▼ +5,1 p.p."} />
        <Stat label="Rotas monitoradas" value="30" nota="traçado rodoviário real (OSRM)" />
      </div>

      <MapaOperacao tema={tema} altura={540} onEmRota={setEmRota} />

      <div className="grid gap-3 xl:grid-cols-12">
        <PanelCard className="xl:col-span-7" title="Km vazio (14 dias)" sub="Cargas agrupadas pelo agente de rota (simulado)">
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={km} margin={{ top: 6, right: 8, bottom: 0, left: -18 }}>
                <defs>
                  <linearGradient id="gKm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={pal.s1} stopOpacity={0.18} />
                    <stop offset="100%" stopColor={pal.s1} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={th.grid} vertical={false} />
                <XAxis dataKey="d" tick={th.tick} axisLine={false} tickLine={false} />
                <YAxis tick={th.tick} axisLine={false} tickLine={false} tickFormatter={(v) => Number(v) + "%"} />
                <Tooltip contentStyle={th.tip} formatter={(v) => fmtDec(Number(v), 1) + "%"} />
                <Area type="monotone" dataKey="v" stroke={pal.s1} strokeWidth={2} fill="url(#gKm)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </PanelCard>
        <PanelCard className="xl:col-span-5" title="Janelas de carregamento" sub="Slots confirmados pelo agente nos terminais (simulado)">
          <div className="space-y-1.5">
            {[
              ["Refinaria de Mataripe", "06:00–07:00", "confirmada"],
              ["Porto de Suape", "07:30–08:00", "confirmada"],
              ["Porto do Itaqui", "09:00–10:00", "aguardando"],
              ["Terminal Senador Canedo", "10:30–11:00", "confirmada"],
            ].map(([b, j, s]) => (
              <div key={b} className="flex items-center justify-between gap-2 rounded-lg bg-secondary px-3 py-1.5 text-[11px]">
                <span className="text-foreground/80">{b}</span>
                <span className="ml-auto font-mono tabular-nums text-muted-foreground">{j}</span>
                <Badge variant={s === "confirmada" ? "secondary" : "outline"} className="text-[9px]">{s}</Badge>
              </div>
            ))}
          </div>
        </PanelCard>
      </div>
    </div>
  );
}

/* ================= 7 · Financeiro & Caixa ================= */

const STATUS_VAR: Record<string, "default" | "outline" | "secondary"> = {
  "acordo fechado": "default",
  "promessa em 7 dias": "secondary",
  "negociando via portal": "default",
  "em negociação": "secondary",
  aguardando: "outline",
  "sem contato": "default",
};

export function FinanceiroView({ sim, tema }: ViewProps) {
  const th = chartTheme(tema);
  const pal = PAL[tema];
  const totalVencido = sim.cobrancas.filter((c) => c.dias > 30 && !c.status.startsWith("acordo") && c.status !== "promessa em 7 dias").reduce((a, c) => a + c.valor, 0);
  const dso = sim.modo === "integrada" ? 27 : 41;
  const faixas = [
    ["0–15 dias", 412_000, "ok"],
    ["16–30 dias", 268_000, "ok"],
    ["31–60 dias", sim.cobrancas.filter((c) => c.dias > 30 && c.dias <= 60).reduce((a, c) => a + c.valor, 0), "alerta"],
    ["+60 dias", sim.cobrancas.filter((c) => c.dias > 60).reduce((a, c) => a + c.valor, 0), "erro"],
  ] as [string, number, string][];
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Stat label="Receita do dia" value={fmtMi(sim.receita)} delta={sim.modo === "integrada" ? "▲ +11,2%" : "▼ +5,6%"} />
        <Stat label="Títulos vencidos (>30d)" value={fmtRs(totalVencido)} nota="fila sob gestão do agente" />
        <Stat label="DSO" value={dso + " dias"} delta={sim.modo === "integrada" ? "▲ -9 dias vs. manual" : "▼ +4 dias vs. meta"} />
        <Stat label="Margem bruta" value={fmtRs(+margemRsM3(sim.precos).toFixed(2)) + "/m³"} nota={sim.modo === "integrada" ? "copiloto no controle" : "caindo com preço do vizinho"} />
      </div>

      <div className="grid gap-3 xl:grid-cols-12">
        <PanelCard className="xl:col-span-7" title="Fluxo de caixa diário" sub="Entradas × saídas — R$ milhões (simulação)">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sim.caixa.slice(-14)} margin={{ top: 6, right: 8, bottom: 0, left: -16 }}>
                <CartesianGrid stroke={th.grid} vertical={false} />
                <XAxis dataKey="d" tick={th.tick} axisLine={false} tickLine={false} tickFormatter={(d) => "d" + d} />
                <YAxis tick={th.tick} axisLine={false} tickLine={false} tickFormatter={(v) => Number(v).toFixed(1)} />
                <Tooltip contentStyle={th.tip} cursor={{ fill: "rgba(127,127,127,0.08)" }} formatter={(v) => "R$ " + fmtDec(Number(v), 2) + " mi"} />
                <Bar dataKey="in" fill={pal.s1} radius={[3, 3, 0, 0]} barSize={9} />
                <Bar dataKey="out" fill={pal.s3} radius={[3, 3, 0, 0]} barSize={9} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </PanelCard>

        <PanelCard
          className="xl:col-span-5"
          title="Aging e cobrança por agentes"
          sub="Lembrete, acordo e promessa registrados com trilha. Aprovação humana acima de R$ 500 mil."
          action={<Bot className="h-4 w-4 text-muted-foreground" />}
        >
          <div className="space-y-1.5">
            {sim.cobrancas.map((c) => (
              <div key={c.id} className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
                <span className="font-mono text-[10.5px] font-semibold text-foreground">{c.id}</span>
                <span className="text-[11.5px] font-semibold text-foreground">{c.posto}</span>
                <span className="text-[10.5px] tabular-nums text-muted-foreground">{fmtRs(c.valor)}</span>
                <span className="ml-auto flex items-center gap-2">
                  <span className={`text-[10.5px] tabular-nums ${c.dias > 60 ? "font-semibold text-destructive" : c.dias > 30 ? "text-foreground" : "text-muted-foreground"}`}>{c.dias}d</span>
                  <Badge variant={STATUS_VAR[c.status] ?? "outline"} className="text-[9px]">{c.status}</Badge>
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 border-t pt-3">
            <AcoesLista sim={sim} />
          </div>
        </PanelCard>
      </div>

      <PanelCard title="Aging em faixas" sub="Total em aberto por faixa de atraso (simulação)">
        <div className="grid gap-2 sm:grid-cols-4">
          {faixas.map(([f, v, tone]) => (
            <div key={f} className="rounded-xl bg-secondary p-3">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{f}</p>
              <p className={`mt-1 text-[15px] font-semibold tabular-nums ${tone === "erro" ? "text-destructive" : "text-foreground"}`}>{fmtRs(v)}</p>
            </div>
          ))}
        </div>
      </PanelCard>
    </div>
  );
}

/* ================= 8 · Fiscal & ANP ================= */

export function FiscalView({ sim, tema }: ViewProps) {
  const cbioObrig = 640_000;
  const cbioEmit = 612_400;
  const pct = (cbioEmit / cbioObrig) * 100;
  const R = 52;
  const C = 2 * Math.PI * R;
  const pal = PAL[tema];
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Stat label="NF-e emitidas hoje" value={fmtInt(sim.nfe)} nota={sim.modo === "integrada" ? "0 retrabalho fiscal" : "conferência manual pendente"} />
        <Stat label="ICMS apurado (IA)" value="R$ 1,42 mi" nota="por estado e alíquota, no ato da venda" />
        <Stat label="CBIOs pendentes" value={fmtInt(cbioObrig - cbioEmit)} nota="RenovaBio · meta trimestral" />
        <Stat label="Relatórios ANP" value="0 em atraso" nota="consolidado diário automático" />
      </div>

      <div className="grid gap-3 xl:grid-cols-12">
        <PanelCard className="xl:col-span-4" title="RenovaBio · CBIOs" sub="Obrigação estimada vs. emitido no período (simulação)">
          <div className="flex items-center justify-center gap-5">
            <svg viewBox="0 0 130 130" className="h-32 w-32">
              <circle cx="65" cy="65" r={R} fill="none" stroke="currentColor" strokeWidth="10" className="text-foreground/10" />
              <circle cx="65" cy="65" r={R} fill="none" stroke={pal.s1} strokeWidth="10" strokeLinecap="round" strokeDasharray={`${(C * pct) / 100} ${C}`} transform="rotate(-90 65 65)" />
              <text x="65" y="61" textAnchor="middle" fontSize="19" fontWeight="700" fill={pal.s1}>{fmtDec(pct, 1)}%</text>
              <text x="65" y="79" textAnchor="middle" fontSize="9" fill={pal.s2}>da meta</text>
            </svg>
            <div className="space-y-1.5 text-[11px]">
              <p className="text-muted-foreground">Obrigação: <span className="font-semibold text-foreground">{fmtInt(cbioObrig)}</span></p>
              <p className="text-muted-foreground">Emitidos: <span className="font-semibold text-foreground">{fmtInt(cbioEmit)}</span></p>
              <p className="text-muted-foreground">Divergências: <span className="font-semibold text-foreground">2 em conferência</span></p>
            </div>
          </div>
        </PanelCard>

        <PanelCard className="xl:col-span-4" title="IBS/CBS — transição em curso" sub="A reforma tributária muda a nota fiscal de todos. Os agentes já operam os dois modelos.">
          <div className="space-y-2">
            {[
              ["2026 · sistema de teste", "Emissões paralelas IBS/CBS nos pedidos-piloto.", "ok"],
              ["2027 · convivência", "ICMS + IBS/CBS lado a lado por operação.", "alerta"],
              ["2029 · extinção gradual", "Alíquota plena — apuração recalculada por agente.", "neutro"],
            ].map(([t, d, tone]) => (
              <div key={t} className="rounded-xl bg-secondary px-3 py-2.5">
                <p className="flex items-center gap-2 text-[11.5px] font-semibold text-foreground"><FileText className="h-3.5 w-3.5 text-muted-foreground" />{t}</p>
                <p className="mt-1 text-[10.5px] leading-snug text-muted-foreground">{d}</p>
                <Badge variant={tone === "ok" ? "secondary" : tone === "alerta" ? "outline" : "secondary"} className="mt-1.5 text-[9px]">{tone === "ok" ? "piloto rodando" : tone === "alerta" ? "mapeado" : "preparado"}</Badge>
              </div>
            ))}
          </div>
        </PanelCard>

        <div className="space-y-3 xl:col-span-4">
          <PanelCard title="Consolidado ANP do dia" sub="Volumes por produto (simulação)">
            <div className="space-y-2">
              {PRODUTOS.map((p) => {
                const vol = sim.precos.filter((x) => x.produto === p).length * 120_000 + 80_000;
                return (
                  <div key={p} className="flex items-center gap-2 text-[11px]">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: prodTone(p, tema) }} />
                    <span className="w-20 shrink-0 text-foreground/80">{p}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/10">
                      <div className="h-full rounded-full bg-foreground" style={{ width: `${(vol / 500_000) * 100}%` }} />
                    </div>
                    <span className="w-16 shrink-0 text-right tabular-nums text-muted-foreground">{fmtInt(vol)} L</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 border-t pt-3">
              <AcoesLista sim={sim} />
            </div>
          </PanelCard>
          <PanelCard title="Trilha de auditoria" sub="Tudo que o agente fiscal fez fica registrado" action={<Lock className="h-4 w-4 text-muted-foreground" />}>
            <FeedEventos sim={sim} max={4} />
          </PanelCard>
        </div>
      </div>
    </div>
  );
}

/* ================= 9 · Centro de IA ================= */

export function CentroIAView({ sim, tema }: ViewProps) {
  const pal = PAL[tema];
  const totalExecs = sim.agentes.reduce((a, g) => a + g.execs, 0);
  const totalImpacto = sim.agentes.reduce((a, g) => a + g.impacto, 0);
  const totalHoras = sim.agentes.reduce((a, g) => a + g.humanoH, 0);
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Stat label="Execuções hoje" value={fmtInt(totalExecs)} nota={sim.modo === "integrada" ? "agentes no ar" : "aguardando modo integrado"} />
        <Stat label="Impacto financeiro estimado" value={fmtRs(totalImpacto)} nota="modelo ilustrativo" />
        <Stat label="Horas humanas poupadas/dia" value={fmtDec(totalHoras, 1) + " h"} nota="equivalente a 1,5 pessoas" />
        <Stat label="Latência mediana" value={fmtDec(sim.agentes.reduce((a, g) => a + g.latencia, 0) / sim.agentes.length, 0) + " s"} nota="por execução" />
      </div>

      <PanelCard title="Os 8 agentes operando o fluxo" sub="Cada um com dono, foco e trilha de auditoria — sem agente solto na esteira.">
        <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
          {sim.agentes.map((g) => (
            <div key={g.id} className="rounded-xl bg-secondary p-3.5">
              <div className="flex items-start gap-2">
                <span className="mt-0.5 rounded-lg bg-card p-1.5 ring-1 ring-foreground/10"><Bot className="h-4 w-4 text-foreground/70" /></span>
                <div>
                  <p className="text-[12px] font-semibold text-foreground">{g.nome}</p>
                  <p className="text-[10px] leading-snug text-muted-foreground">{g.foco}</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-1.5 text-center">
                {[
                  ["execs", fmtInt(g.execs)],
                  ["impacto", "R$ " + fmtInt(g.impacto / 1000) + "k"],
                  ["latência", g.latencia + "s"],
                ].map(([l, v]) => (
                  <div key={l} className="rounded-lg bg-card py-1.5 ring-1 ring-foreground/[0.07]">
                    <p className="text-[8.5px] font-medium uppercase tracking-wider text-muted-foreground">{l}</p>
                    <p className="text-[10.5px] font-semibold tabular-nums text-foreground">{v}</p>
                  </div>
                ))}
              </div>
              <p className={`mt-2 truncate rounded-lg px-2 py-1.5 text-[10px] ${sim.modo === "integrada" ? "bg-card text-foreground/80 ring-1 ring-foreground/[0.07]" : "bg-card text-muted-foreground ring-1 ring-foreground/[0.07]"}`}>
                {sim.modo === "integrada" ? `última: ${g.ultima}` : `aguardando: ${g.humanoH.toFixed(1)} h/dia de time humano`}
              </p>
            </div>
          ))}
        </div>
      </PanelCard>

      <div className="grid gap-3 xl:grid-cols-12">
        <PanelCard className="xl:col-span-7" title="Dados que estavam dormindo" sub="A IA só entrega quando os dados da operação viram contexto — não relatório.">
          <div className="space-y-1.5">
            {[
              ["Cotações no WhatsApp", "vira pedido com cotação e crédito no portal"],
              ["Planilha de preços", "vira copiloto com piso de margem por base"],
              ["Notas fiscais em PDF", "vira apuração ICMS/IBS-CBS automática"],
              ["Relatório ANP manual", "vira consolidado diário com trilha"],
              ["Aging no e-mail", "vira fila de cobrança com script de acordo"],
            ].map(([de, para]) => (
              <div key={de} className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-[11px]">
                <span className="text-muted-foreground">{de}</span>
                <span className="shrink-0 text-muted-foreground/50">→</span>
                <span className="font-medium text-foreground/90">{para}</span>
              </div>
            ))}
          </div>
        </PanelCard>
        <PanelCard className="xl:col-span-5" title="Aprovação humana onde importa" sub="Agentes propõem; humanos decidem nas exceções.">
          <div className="space-y-1.5">
            {[
              ["Preço abaixo do piso", "copiloto propõe · gestor aprova no app", "#fbbf24"],
              ["Crédito acima de R$ 500 mil", "scoring automático · comitê aprova", "#fbbf24"],
              ["Desconto fora da régua", "bloqueado no portal até aprovação", pal.err],
              ["Roteirização e janelas", "agente decide sozinho (regra clara)", pal.ok],
              ["Cobrança até R$ 500 mil", "agente negocia com script", pal.ok],
            ].map(([t, d, cor]) => (
              <div key={t} className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: cor }} />
                <span className="text-[11.5px] font-medium text-foreground">{t}</span>
                <span className="ml-auto text-right text-[10.5px] text-muted-foreground">{d}</span>
              </div>
            ))}
          </div>
        </PanelCard>
      </div>
    </div>
  );
}

/* ================= 10 · Segurança & Compliance ================= */

export function SegurancaView({ sim }: ViewProps) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Stat label="Incidentes abertos" value={String(sim.incidentes.filter((i) => i.status !== "resolvido").length)} nota="triagem automática" />
        <Stat label="Trilhas de auditoria" value="100%" nota="append-only · imutável" />
        <Stat label="Acessos por SSO" value="94%" nota="SAML + MFA obrigatório" />
        <Stat label="Residência de dados" value="Brasil" nota="LGPD por padrão" />
      </div>

      <div className="grid gap-3 xl:grid-cols-12">
        <PanelCard className="xl:col-span-6" title="Incidentes e fraudes" sub="Câmeras + telemetria + conciliação de tanque viram contexto dos agentes de compliance">
          <div className="space-y-1.5">
            {sim.incidentes.map((i) => (
              <div key={i.id} className="flex items-center gap-3 rounded-lg bg-secondary px-3 py-2.5">
                <Badge variant={i.nivel === "alto" ? "default" : "outline"} className="w-14 shrink-0 justify-center text-[9px] uppercase">{i.nivel}</Badge>
                <div className="flex-1">
                  <p className="text-[11.5px] font-semibold text-foreground">{i.tipo}</p>
                  <p className="text-[10px] text-muted-foreground">{i.local} · {fmtMinTs(i.ts)}</p>
                </div>
                <Badge variant={i.status === "resolvido" ? "secondary" : "outline"} className="shrink-0 text-[9px]">{i.status}</Badge>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg bg-secondary px-3 py-2.5 text-[11px] leading-snug text-muted-foreground">
            <span className="font-semibold text-foreground">Por que importa:</span> fraude em distribuidoras pequenas e médias costuma aparecer no fechamento mensal — semanas depois. Aqui, o padrão de lavração e bomba-truque aparece em minutos, com OS aberta e trilha para auditoria.
          </div>
        </PanelCard>

        <div className="space-y-3 xl:col-span-6">
          <PanelCard title="Controles de segurança" sub="O que a plataforma integra por padrão">
            <div className="grid gap-1.5 sm:grid-cols-2">
              {[
                "SSO SAML + MFA obrigatório",
                "Criptografia em repouso e trânsito",
                "Trilha append-only por ação",
                "Backups e DR testados",
                "LGPD: minimização e consentimento",
                "OWASP Top 10 no pipeline",
                "Pentest e revisão contínua",
                "Isolamento por tenant",
              ].map((c) => (
                <div key={c} className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-[11px]">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-foreground/70" />
                  <span className="text-foreground/80">{c}</span>
                </div>
              ))}
            </div>
          </PanelCard>
          <PanelCard title="Auditoria viva" sub="Cada ação de agente gera registro verificável">
            <div className="space-y-1 font-mono text-[10px]">
              {sim.eventos.slice(0, 5).map((e, i) => (
                <div key={`${e.t}-a-${i}`} className="flex items-center gap-2 rounded-lg bg-secondary px-2.5 py-1.5">
                  <span className="text-muted-foreground/60">0x{(e.t * 7919 + i * 131).toString(16).padStart(4, "0")}</span>
                  <span className="font-semibold text-foreground/70">{e.tipo.toLowerCase()}</span>
                  <span className="truncate text-muted-foreground">{e.msg}</span>
                </div>
              ))}
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-[10px] text-muted-foreground"><ShieldCheck className="h-3 w-3" />Nada sai do ambiente do cliente; modelo não treina com dados da operação.</p>
          </PanelCard>
        </div>
      </div>
    </div>
  );
}

function fmtMinTs(t: number) {
  const m = 360 + t * 15;
  return `${String(Math.floor(m / 60) % 24).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

/* ================= 11 · Jornada (rodapé do demo) ================= */

export function JornadaStrip() {
  return (
    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
      {[
        ["Pedido no portal", JORNADA_KEY[0], "Portal B2B · Crédito"],
        ["Preço no copiloto", JORNADA_KEY[2], "Motor de preços"],
        ["Rota e janela", JORNADA_KEY[4], "TMS · Telemetria"],
        ["Fiscal e caixa", JORNADA_KEY[6], "Fiscal · Back-office"],
      ].map(([t, d, s], i) => (
        <div key={i} className="rounded-xl bg-secondary p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{t}</p>
          <p className="mt-1 text-[11px] leading-snug text-foreground/80">{d}</p>
          <p className="mt-1.5 text-[9.5px] text-muted-foreground/70">{s}</p>
        </div>
      ))}
    </div>
  );
}

import { JORNADA } from "./demo-sim";
const JORNADA_KEY = JORNADA;

/* ================= mapa de views ================= */

export const VIEW_MAP: Record<ViewId, (p: ViewProps) => ReactElement> = {
  visao: VisaoGeral,
  comercial: ComercialView,
  precos: PrecificacaoView,
  rede: RedeView,
  suprimento: SuprimentoView,
  logistica: LogisticaView,
  financeiro: FinanceiroView,
  fiscal: (p) => <RegulacaoView sim={p.sim} />,
  calor: (p) => <MapaCalor key={p.tema} tema={p.tema} />,
  ia: CentroIAView,
  seguranca: SegurancaView,
};
