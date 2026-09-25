"use client";

// Margem por praça: margem bruta na base (simulada) − frete até a praça.
// O frete usa dados REAIS: distância rodoviária (OSRM/OpenStreetMap) × piso mínimo de frete da ANTT.
// Referência pública por UF: parcela "distribuição e revenda" da composição de preços da Petrobras.

import { useEffect, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ExternalLink } from "lucide-react";
import malhaJson from "./malha.json";
import { chartTheme, margemPorProduto, type SimData, type Tema } from "@/components/sections/demo-sim";
import { ANTT, CARGA_M3, FONTE_PETROBRAS, linhasPracas, type NoMalha, type RotaMalha } from "./margem-calc";
import { COR_PRODUTO, corProduto } from "./cores";

const NOS = Object.fromEntries((malhaJson as unknown as { nos: NoMalha[] }).nos.map((n) => [n.id, n]));

const rs = (v: number) => "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function MargemPracasView({ sim, tema }: { sim: SimData; tema: Tema }) {
  const [rotas, setRotas] = useState<RotaMalha[] | null>(null);
  useEffect(() => {
    fetch("/geo/rotas.json").then((r) => r.json()).then((d) => setRotas(d.rotas));
  }, []);
  const th = chartTheme(tema);
  const margemBase = useMemo(() => margemPorProduto(sim.precos), [sim.precos]);

  const linhas = useMemo(() => (rotas ? linhasPracas(rotas, NOS, margemBase) : []), [rotas, margemBase]);

  const pior = linhas[0];
  const melhor = linhas.at(-1);
  const media = linhas.length ? linhas.reduce((s, l) => s + l.apos, 0) / linhas.length : 0;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 @3xl:grid-cols-4">
        <Tile rotulo="Praças atendidas" valor={String(new Set(linhas.map((l) => l.praca)).size)} nota={`${linhas.length} rotas rodoviárias reais (OSRM)`} />
        <Tile rotulo="Margem média após frete" valor={linhas.length ? rs(media) + "/m³" : "—"} nota="simulada · frete pelo piso da ANTT" />
        <Tile rotulo="Pior praça" valor={pior ? pior.praca : "—"} nota={pior ? `${rs(pior.apos)}/m³ · ${pior.km.toLocaleString("pt-BR")} km` : ""} />
        <Tile rotulo="Melhor praça" valor={melhor ? melhor.praca : "—"} nota={melhor ? `${rs(melhor.apos)}/m³ · ${melhor.km.toLocaleString("pt-BR")} km` : ""} />
      </div>

      <section className="rounded-2xl bg-card p-4 ring-1 ring-foreground/[0.07]">
        <h3 className="text-[13px] font-semibold text-foreground">Margem após frete por praça (R$/m³)</h3>
        <p className="text-[11px] text-muted-foreground">Da pior para a melhor · cor = produto da rota · margem na base simulada, frete com dado real</p>
        <div className="mt-2 h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={linhas} margin={{ top: 6, right: 8, bottom: 0, left: 8 }}>
              <CartesianGrid stroke={th.grid} vertical={false} />
              <XAxis dataKey="praca" tick={{ ...th.tick, fontSize: 9 }} axisLine={false} tickLine={false} interval={0} angle={-40} textAnchor="end" height={78} />
              <YAxis tick={th.tick} axisLine={false} tickLine={false} tickFormatter={(v) => "R$ " + Number(v).toLocaleString("pt-BR")} width={64} />
              <Tooltip contentStyle={th.tip} formatter={(v) => rs(Number(v)) + "/m³"} labelFormatter={(l) => String(l)} />
              <Bar dataKey="apos" name="Margem após frete" radius={[4, 4, 0, 0]} isAnimationActive={false}>
                {linhas.map((l) => (
                  <Cell key={l.id} fill={corProduto(l.produto, tema)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-1 flex flex-wrap gap-3 text-[10.5px] text-muted-foreground">
          {[["Diesel", COR_PRODUTO[tema].diesel], ["Gasolina C", COR_PRODUTO[tema].gasolina], ["Etanol hidratado", COR_PRODUTO[tema].etanol]].map(([r, c]) => (
            <span key={r} className="inline-flex items-center gap-1.5">
              <span className="h-2 w-3 rounded-sm" style={{ background: c }} />
              <span className="text-foreground">{r}</span>
            </span>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/[0.07]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-[11.5px]">
            <thead>
              <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-2.5 font-medium">Praça</th>
                <th className="px-2 py-2.5 font-medium">Origem · km real</th>
                <th className="px-2 py-2.5 font-medium">Produto</th>
                <th className="px-2 py-2.5 text-right font-medium">Margem na base</th>
                <th className="px-2 py-2.5 text-right font-medium">Frete mínimo ANTT</th>
                <th className="px-2 py-2.5 text-right font-medium">Margem após frete</th>
                <th className="px-4 py-2.5 text-right font-medium">Distrib. + revenda na UF (público)</th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {linhas.map((l) => (
                <tr key={l.id} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-2 font-medium text-foreground">{l.praca}</td>
                  <td className="px-2 py-2 text-muted-foreground">{l.origem} · {l.km.toLocaleString("pt-BR")} km</td>
                  <td className="px-2 py-2 text-foreground/80">{l.produto}</td>
                  <td className="px-2 py-2 text-right text-foreground/80">{rs(l.base)}/m³</td>
                  <td className="px-2 py-2 text-right text-foreground/80">{rs(l.frete)}/m³</td>
                  <td className="px-2 py-2 text-right font-semibold text-foreground">{rs(l.apos)}/m³</td>
                  <td className="px-4 py-2 text-right text-muted-foreground">
                    {l.refUF !== null ? `${rs(l.refUF)}/L` : l.refBrasil !== null ? `${rs(l.refBrasil)}/L (média Brasil)` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="border-t border-border px-4 py-2.5 text-[10px] leading-relaxed text-muted-foreground">
          Frete: piso mínimo da{" "}
          <a href={ANTT.fonte} target="_blank" rel="noreferrer" className="underline-offset-2 hover:underline">
            ANTT <ExternalLink className="inline h-2.5 w-2.5" />
          </a>{" "}
          (granel líquido perigoso, 5 eixos: R$ 7,6628/km + R$ 861,51 por viagem) ÷ {CARGA_M3} m³, sobre a distância rodoviária real (OSRM/OpenStreetMap). Referência pública: parcela &quot;distribuição e revenda&quot; da composição de preços da{" "}
          <a href={FONTE_PETROBRAS} target="_blank" rel="noreferrer" className="underline-offset-2 hover:underline">
            Petrobras <ExternalLink className="inline h-2.5 w-2.5" />
          </a>{" "}
          (coleta ANP de 13 a 19/09/2026), que soma distribuidora e posto; a Petrobras não publica a composição de todas as UFs (a Bahia, por exemplo, é suprida pela Acelen). Margem na base: simulada para a empresa fictícia.
        </p>
      </section>
    </div>
  );
}

function Tile({ rotulo, valor, nota }: { rotulo: string; valor: string; nota: string }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-xl bg-card p-3.5 ring-1 ring-foreground/[0.07]">
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{rotulo}</p>
      <p className="truncate text-[17px] font-semibold tabular-nums leading-tight tracking-tight text-foreground">{valor}</p>
      <p className="text-[10.5px] text-muted-foreground">{nota}</p>
    </div>
  );
}
