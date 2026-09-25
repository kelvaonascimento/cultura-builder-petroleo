"use client";

// Peças visuais compartilhadas pelas telas do DEMO.
import type { ReactElement, ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { SimData } from "@/components/sections/demo-sim";

// minigráfico de tendência (sem eixo): a forma importa, o valor exato está no número do cartão
function Sparkline({ serie, rotulo }: { serie: number[]; rotulo: string }) {
  if (serie.length < 2) return null;
  const min = Math.min(...serie);
  const max = Math.max(...serie);
  const amp = max - min || 1;
  const pts = serie.map((v, i) => `${((i / (serie.length - 1)) * 100).toFixed(2)},${(22 - ((v - min) / amp) * 20).toFixed(2)}`).join(" ");
  return (
    <svg viewBox="0 0 100 24" preserveAspectRatio="none" className="h-6 w-full text-foreground/45" role="img" aria-label={rotulo}>
      <title>{rotulo}</title>
      <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

// ▲/▼ = direção do número; a cor diz se é bom ou ruim (por padrão ▼ é ruim; `tom` sobrescreve, ex.: km vazio caindo é bom)
export function Stat({
  label,
  value,
  delta,
  nota,
  tom,
  serie,
  icone,
}: {
  label: string;
  value: string;
  delta?: string;
  nota?: string;
  tom?: "bom" | "ruim";
  serie?: number[];
  icone?: ReactNode;
}) {
  const up = delta?.startsWith("▲");
  const down = delta?.startsWith("▼");
  const ruim = tom ? tom === "ruim" : down;
  return (
    <div className="flex min-w-0 flex-col justify-between gap-1.5 rounded-xl bg-card p-3.5 ring-1 ring-foreground/[0.07]">
      <p className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {icone}
        <span className="truncate">{label}</span>
      </p>
      <p className={`${value.length > 15 ? "text-[14.5px]" : value.length > 13 ? "text-[15.5px]" : "text-[19px]"} whitespace-nowrap font-semibold tabular-nums leading-tight tracking-tight text-foreground`}>{value}</p>
      {serie && <Sparkline serie={serie} rotulo={`Tendência de ${label.toLowerCase()}`} />}
      {(delta || nota) && (
        <p className={`flex items-center gap-1 text-[10.5px] ${ruim ? "text-destructive" : up || down ? "text-foreground" : "text-muted-foreground"}`}>
          {up && <ArrowUpRight className="h-3 w-3 shrink-0" />}
          {down && <ArrowDownRight className="h-3 w-3 shrink-0" />}
          {delta?.replace("▲ ", "").replace("▼ ", "") ?? nota}
        </p>
      )}
      {delta && nota && <p className="text-[10px] text-muted-foreground/70">{nota}</p>}
    </div>
  );
}

export function PanelCard({ title, sub, action, children, className = "" }: { title: string; sub?: string; action?: ReactElement; children: ReactNode; className?: string }) {
  return (
    <Card className={`min-w-0 ${className}`}>
      <CardHeader>
        <CardTitle className="text-[13px]">{title}</CardTitle>
        {sub && <CardDescription className="text-[11px] leading-snug">{sub}</CardDescription>}
        {action && <CardAction>{action}</CardAction>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

// `view` mostra só as ações daquela tela; sem ela, a fila inteira
export function AcoesLista({ sim, limite, view }: { sim: SimData; limite?: number; view?: string }) {
  const daTela = view ? sim.acoes.filter((a) => a.view === view) : sim.acoes;
  const lista = limite ? daTela.slice(0, limite) : daTela;
  return (
    <div className="space-y-1.5">
      {lista.map((a) => (
        <div key={a.chave} className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-lg bg-secondary px-3 py-2">
          <Badge variant="outline" className="shrink-0 text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground">{a.tipo}</Badge>
          <p className="min-w-[11rem] flex-1 text-[11.5px] leading-snug text-foreground/90">{a.msg}</p>
          {a.usada ? (
            <Badge variant="secondary" className="shrink-0 text-[9.5px]">aplicado</Badge>
          ) : sim.modo === "integrada" ? (
            <Button size="sm" onClick={() => sim.executarAcao(a.chave)} className="ml-auto h-6 shrink-0 rounded-full px-3 text-[10.5px]">
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
