"use client";

// Cockpit do dono: a operação inteira numa tela — resultado de hoje, mês × orçamento, estoque, RenovaBio, riscos e o que aprovar.
import type { ReactNode } from "react";
import { AlertTriangle, CalendarClock, CheckCircle2, Clock3, Cylinder, ExternalLink, Leaf, Receipt, Truck, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fmtDec, fmtInt, fmtRs, margemRsM3 } from "@/components/sections/demo-sim";
import { corProduto } from "./cores";
import { estoqueValorizado, FRETE_MEDIO_M3, hojeAteAgora, mesAteAgora, proximosPrazos, renovabio, type LinhaOrc } from "./dono";
import { RADAR } from "./regulacao-dados";
import type { ViewId, ViewProps } from "./telas";
import { AcoesLista, PanelCard, Stat } from "./ui";

const valor = (v: number, un: "m³" | "R$") => (un === "R$" ? fmtRs(v) : fmtInt(v) + " m³");

export function CockpitView({ sim, tema, onNav }: ViewProps) {
  const hoje = hojeAteAgora(sim);
  const mes = mesAteAgora(sim);
  const est = estoqueValorizado(sim);
  const rb = renovabio();
  const prazos = proximosPrazos();
  const riscos = RADAR.filter((r) => r.severidade === "alta").slice(0, 3);
  const resultadoMes = mes.linhas[mes.linhas.length - 1];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 @2xl:grid-cols-3 @5xl:grid-cols-6">
        <Stat label="Receita hoje" value={fmtRs(sim.receita)} serie={mes.series.receita} nota={`${fmtDec(hoje.frac * 100, 0)}% do dia orçado`} />
        <Stat label="Margem bruta hoje" value={fmtRs(hoje.margem)} serie={mes.series.margem} nota={`${fmtRs(+margemRsM3(sim.precos).toFixed(2))}/m³`} />
        <Stat label="Frete hoje" value={fmtRs(hoje.frete)} serie={mes.series.frete} nota={`${fmtRs(FRETE_MEDIO_M3)}/m³ na média das rotas`} />
        <Stat label="Resultado hoje" value={fmtRs(hoje.resultado)} serie={mes.series.resultado} nota="margem − frete − despesas" />
        <Stat label="Volume hoje" value={fmtInt(hoje.volume) + " m³"} serie={mes.series.volume} nota="saiu das 5 bases" />
        <Stat label="Carteira vencida" value={fmtRs(sim.vencidoTotal)} nota="sem acordo" tom="ruim" delta={sim.modo === "integrada" ? undefined : "▲ cresce sem cobrança"} />
      </div>

      <PanelCard
        title={`Mês até agora × orçamento · ${mes.nome}`}
        sub={`Dia ${mes.dia} de ${mes.diasNoMes} · projeção de fechamento no ritmo atual (simulação)`}
        action={
          <Badge variant={resultadoMes.desvioPct >= 0 ? "secondary" : "outline"} className="text-[10px] tabular-nums">
            resultado {resultadoMes.desvioPct >= 0 ? "+" : "−"}
            {fmtDec(Math.abs(resultadoMes.desvioPct), 1)}% vs. orçado
          </Badge>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-[11.5px]">
            <thead>
              <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="py-2 pr-2 font-medium">Linha</th>
                <th className="px-2 py-2 text-right font-medium">Orçado no mês</th>
                <th className="px-2 py-2 text-right font-medium">Realizado até agora</th>
                <th className="px-2 py-2 text-right font-medium">Projeção de fechamento</th>
                <th className="py-2 pl-2 text-right font-medium">vs. orçado</th>
              </tr>
            </thead>
            <tbody className="whitespace-nowrap tabular-nums">
              {mes.linhas.map((l) => (
                <LinhaOrcamento key={l.rotulo} l={l} destaque={l.rotulo === "Resultado operacional"} />
              ))}
            </tbody>
          </table>
        </div>
      </PanelCard>

      <div className="grid grid-cols-1 gap-3 @2xl:grid-cols-2 @5xl:grid-cols-3">
        <PanelCard title="Estoque nas bases" sub="Valorizado a custo de reposição (simulação)" action={<Cylinder className="h-4 w-4 text-muted-foreground" />}>
          <p className="text-[20px] font-semibold tabular-nums tracking-tight text-foreground">{fmtRs(est.valor)}</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            {fmtInt(est.m3)} m³ · {fmtDec(est.ocupacaoPct, 0)}% da tancagem de {fmtInt(est.cap)} m³ · cobre {fmtDec(est.coberturaDias, 1)} dias de venda
          </p>
          <div className="mt-3 space-y-1.5">
            {est.linhas.map((l) => (
              <button key={l.base + l.produto} type="button" onClick={() => onNav("suprimento")} className="block w-full text-left">
                <div className="flex items-center gap-2 text-[10.5px]">
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: corProduto(l.produto, tema) }} />
                  <span className="truncate text-foreground/85">
                    {l.base} · {l.produto}
                  </span>
                  <span className="ml-auto shrink-0 tabular-nums text-muted-foreground">{fmtInt(l.m3)} m³</span>
                </div>
                <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-foreground/10">
                  <div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${Math.min(100, (l.m3 / l.cap) * 100)}%`, background: corProduto(l.produto, tema) }} />
                </div>
              </button>
            ))}
          </div>
          <p className="mt-3 rounded-lg bg-secondary px-3 py-2 text-[11px] leading-snug text-muted-foreground">
            Cada <span className="font-semibold text-foreground">R$ 0,10/L</span> de reajuste do fornecedor muda o valor deste estoque em{" "}
            <span className="font-semibold text-foreground">{fmtRs(est.porDezCentavos)}</span>.
          </p>
        </PanelCard>

        <PanelCard title="RenovaBio 2026" sub="Meta, CBIOs aposentados e o custo para fechar" action={<Leaf className="h-4 w-4 text-muted-foreground" />}>
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-[20px] font-semibold tabular-nums tracking-tight text-foreground">{fmtInt(rb.aposentados)}</p>
            <p className="text-[11px] tabular-nums text-muted-foreground">de {fmtInt(rb.meta)} CBIOs</p>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-foreground/10">
            <div className="h-full rounded-full bg-foreground" style={{ width: `${(rb.aposentados / rb.meta) * 100}%` }} />
          </div>
          <dl className="mt-3 space-y-1.5 text-[11px]">
            <Linha rotulo="Faltam aposentar" valor={fmtInt(rb.faltam) + " CBIOs"} />
            <Linha rotulo={`Preço do CBIO (B3, ${rb.precoData.split(" ")[0]})`} valor={`R$ ${fmtDec(rb.preco, 4)}`} publico />
            <Linha rotulo="Custo para fechar a meta hoje" valor={fmtRs(rb.custoFaltante)} forte />
            <Linha rotulo="Prazo (31/12/2026)" valor={`${rb.diasAtePrazo} dias`} publico />
          </dl>
          <p className="mt-3 text-[10px] leading-snug text-muted-foreground">
            Meta simulada: {fmtDec(rb.participacaoPct, 2)}% da meta nacional de {fmtInt(rb.metaNacional)} CBIOs (
            <a href={rb.fonteMeta.url} target="_blank" rel="noreferrer" className="underline-offset-2 hover:underline">
              ANP
            </a>
            ), a fatia da empresa fictícia no volume do mercado. Preço:{" "}
            <a href={rb.fontePreco.url} target="_blank" rel="noreferrer" className="underline-offset-2 hover:underline">
              B3
            </a>
            . Descumprir é crime ambiental (Lei 15.082/2024).
          </p>
        </PanelCard>

        <PanelCard title="Operação agora" sub="Clique para abrir a tela" action={<Truck className="h-4 w-4 text-muted-foreground" />} className="@2xl:col-span-2 @5xl:col-span-1">
          <div className="@container">
          <div className="grid grid-cols-2 gap-2 @lg:grid-cols-4">
            <Mini icone={<Truck className="h-3.5 w-3.5" />} rotulo="Cargas em rota" valor={String(sim.rotas.filter((r) => r.prog < 100).length)} tela="logistica" onNav={onNav} />
            <Mini icone={<Clock3 className="h-3.5 w-3.5" />} rotulo="Fora da janela" valor={String(sim.rotas.filter((r) => r.prog < 100 && r.atrasada).length)} tela="logistica" onNav={onNav} alerta={sim.rotas.some((r) => r.prog < 100 && r.atrasada)} />
            <Mini icone={<Cylinder className="h-3.5 w-3.5" />} rotulo="Tanques abaixo de 35%" valor={String(sim.tanques.filter((t) => t.nivel < 35).length)} tela="suprimento" onNav={onNav} alerta={sim.tanques.some((t) => t.nivel < 20)} />
            <Mini icone={<Receipt className="h-3.5 w-3.5" />} rotulo="Pedidos na fila" valor={String(sim.ordens.filter((o) => o.step < 8).length)} tela="comercial" onNav={onNav} />
            <Mini icone={<Wallet className="h-3.5 w-3.5" />} rotulo="Cotações sem resposta" valor={String(sim.cotacoes.filter((c) => c.respEm === null).length)} tela="comercial" onNav={onNav} />
            <Mini icone={<AlertTriangle className="h-3.5 w-3.5" />} rotulo="Incidentes abertos" valor={String(sim.incidentes.filter((i) => i.status !== "resolvido").length)} tela="seguranca" onNav={onNav} alerta />
            <Mini icone={<CheckCircle2 className="h-3.5 w-3.5" />} rotulo="Janela cumprida" valor={sim.janela + "%"} tela="logistica" onNav={onNav} />
            <Mini icone={<Truck className="h-3.5 w-3.5" />} rotulo="Km vazio" valor={fmtDec(sim.kmVazio) + "%"} tela="logistica" onNav={onNav} />
          </div>
          </div>
        </PanelCard>
      </div>

      <div className="grid grid-cols-1 gap-3 @3xl:grid-cols-2">
        <PanelCard title="Riscos e prazos · dado público" sub="Normas que mexem na margem e no caixa, com fonte" action={<CalendarClock className="h-4 w-4 text-muted-foreground" />}>
          <div className="space-y-1.5">
            {riscos.map((r) => (
              <div key={r.id} className="rounded-lg bg-secondary px-3 py-2">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive" aria-label="risco alto" />
                  <button type="button" onClick={() => onNav("fiscal")} className="text-left text-[11.5px] font-semibold leading-snug text-foreground hover:underline">
                    {r.titulo}
                  </button>
                </div>
                <a href={r.fonte.url} target="_blank" rel="noreferrer" className="ml-5 mt-0.5 inline-flex items-center gap-1 text-[10px] text-muted-foreground underline-offset-2 hover:underline">
                  {r.fonte.rotulo} <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>
            ))}
          </div>
          <div className="mt-3 border-t pt-3">
            <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Próximos prazos</p>
            <div className="space-y-1">
              {prazos.map((p) => (
                <div key={p.data + p.o_que} className="flex items-baseline gap-3 text-[11px]">
                  <span className="w-[74px] shrink-0 tabular-nums text-muted-foreground">{p.data}</span>
                  <span className="flex-1 leading-snug text-foreground/85">{p.o_que}</span>
                  {p.dias !== null && <span className={`shrink-0 tabular-nums ${p.dias <= 7 ? "font-semibold text-destructive" : "text-muted-foreground"}`}>{p.dias === 0 ? "hoje" : `em ${p.dias} dias`}</span>}
                </div>
              ))}
            </div>
          </div>
        </PanelCard>

        <PanelCard title="O que o agente recomenda agora" sub="Os agentes propõem, você aprova — tudo fica na trilha de auditoria">
          <AcoesLista sim={sim} />
        </PanelCard>
      </div>
    </div>
  );
}

function LinhaOrcamento({ l, destaque }: { l: LinhaOrc; destaque: boolean }) {
  // receita/margem acima do orçado é bom; custo acima do orçado é ruim
  const bom = l.custo ? l.desvioPct <= 0 : l.desvioPct >= 0;
  return (
    <tr className={`border-b border-border/60 last:border-0 ${destaque ? "font-semibold" : ""}`}>
      <td className="py-2 pr-2 text-foreground">{l.rotulo}</td>
      <td className="px-2 py-2 text-right text-muted-foreground">{valor(l.orcado, l.un)}</td>
      <td className="px-2 py-2 text-right text-foreground/85">{valor(l.realizado, l.un)}</td>
      <td className="px-2 py-2 text-right text-foreground">{valor(l.projecao, l.un)}</td>
      <td className={`py-2 pl-2 text-right ${bom ? "text-foreground" : "text-destructive"}`}>
        <span className="inline-flex items-center gap-1">
          {bom ? <CheckCircle2 className="h-3 w-3" aria-label="dentro do orçado" /> : <AlertTriangle className="h-3 w-3" aria-label="fora do orçado" />}
          {l.desvioPct >= 0 ? "+" : "−"}
          {fmtDec(Math.abs(l.desvioPct), 1)}%
        </span>
      </td>
    </tr>
  );
}

function Linha({ rotulo, valor, forte, publico }: { rotulo: string; valor: string; forte?: boolean; publico?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-muted-foreground">
        {rotulo}
        {publico && <span className="ml-1 rounded bg-secondary px-1 py-px text-[9px] text-muted-foreground ring-1 ring-foreground/10">público</span>}
      </dt>
      <dd className={`shrink-0 tabular-nums ${forte ? "font-semibold text-foreground" : "text-foreground/85"}`}>{valor}</dd>
    </div>
  );
}

function Mini({ icone, rotulo, valor, tela, onNav, alerta }: { icone: ReactNode; rotulo: string; valor: string; tela: ViewId; onNav: (v: ViewId) => void; alerta?: boolean }) {
  const ativo = alerta && valor !== "0";
  return (
    <button type="button" onClick={() => onNav(tela)} className="rounded-lg bg-secondary px-2.5 py-2 text-left transition-colors hover:bg-secondary/70">
      <p className="flex items-center gap-1.5 text-[9.5px] font-medium uppercase tracking-wide text-muted-foreground">
        {icone}
        <span className="truncate">{rotulo}</span>
      </p>
      <p className={`mt-0.5 text-[15px] font-semibold tabular-nums ${ativo ? "text-destructive" : "text-foreground"}`}>{valor}</p>
    </button>
  );
}
