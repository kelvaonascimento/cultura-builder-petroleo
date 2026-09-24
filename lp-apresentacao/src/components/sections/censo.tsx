"use client";

import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Reveal } from "@/components/motion";
import { DISTRIBUIDORAS, TOTAL_CBIOS, TIERS, tier, type Distribuidora } from "@/lib/censo";

const BR = "pt-BR";

function fmtInt(v: number) {
  return v.toLocaleString(BR);
}

function fmtPct(p: number | null) {
  if (p === null) return "liminar";
  const s = p % 1 === 0 ? String(Math.round(p)) : p.toFixed(2).replace(".", ",");
  return `${s} %`;
}

function pctTone(p: number | null): string {
  if (p === null) return "text-[#6e6e73]";
  if (p === 100) return "text-emerald-600";
  if (p === 0) return "text-red-600";
  return "text-amber-600";
}

function tierBadge(id: number): string {
  const tones: Record<number, string> = {
    1: "bg-[#1d1d1f] text-white",
    2: "bg-emerald-600 text-white",
    3: "bg-[#6e6e73] text-white",
    4: "bg-[#e5e5ea] text-[#1d1d1f]",
  };
  return `inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${tones[id]}`;
}

function CensoTable({ rows }: { rows: (Distribuidora & { rank: number })[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-white">
          <TableHead className="w-10 text-[#6e6e73]">#</TableHead>
          <TableHead className="text-[#6e6e73]">Distribuidora</TableHead>
          <TableHead className="w-40 text-right text-[#6e6e73]">A aposentar (2025)</TableHead>
          <TableHead className="w-24 text-right text-[#6e6e73]">Cumprimento</TableHead>
          <TableHead className="hidden w-24 text-center text-[#6e6e73] md:table-cell">Grupo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((d) => (
          <TableRow key={d.rs} className="border-white">
            <TableCell className="text-[#6e6e73]">{d.rank}</TableCell>
            <TableCell className="whitespace-normal font-medium text-[#1d1d1f]">
              {d.rs}
              {/sub judice/i.test(d.obs) && <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-[#6e6e73]" title={d.obs}>sub judice</span>}
            </TableCell>
            <TableCell className="text-right tabular-nums text-[#1d1d1f]">{fmtInt(d.meta)}</TableCell>
            <TableCell className={`text-right tabular-nums ${pctTone(d.pct)}`}>{fmtPct(d.pct)}</TableCell>
            <TableCell className="hidden text-center md:table-cell">
              <span className={tierBadge(tier(d.meta))}>G{tier(d.meta)}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const abaixo100 = DISTRIBUIDORAS.filter((d) => d.pct !== null && d.pct < 100).length;
const zeradas = DISTRIBUIDORAS.filter((d) => d.pct === 0).length;
const cumpriram = DISTRIBUIDORAS.filter((d) => d.pct === 100).length;
const liminar = DISTRIBUIDORAS.filter((d) => d.pct === null).length;
const porMeta = [...DISTRIBUIDORAS].sort((a, b) => b.meta - a.meta);
const fatia = (n: number) =>
  ((porMeta.slice(0, n).reduce((s, d) => s + d.meta, 0) / TOTAL_CBIOS) * 100).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const kpis = [
  { v: TOTAL_CBIOS.toLocaleString("pt-BR"), l: "CBIOs a aposentar em 2025 (metas + saldo de 2024)" },
  { v: `${fatia(25)}%`, l: "do total está nas 25 maiores obrigações" },
  { v: String(cumpriram), l: "distribuidoras cumpriram 100%" },
  { v: String(abaixo100), l: `abaixo de 100% (${zeradas} com 0%); ${liminar} sem percentual por liminar` },
];

export function Censo() {
  const [q, setQ] = useState("");
  const [full, setFull] = useState(false);

  const ranked = useMemo(
    () => [...DISTRIBUIDORAS].sort((a, b) => b.meta - a.meta).map((d, i) => ({ ...d, rank: i + 1 })),
    [],
  );

  const filtradas = useMemo(() => {
    const norm = (x: string) => x.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    const t = norm(q.trim());
    if (!t) return null;
    return ranked.filter((d) => norm(d.rs).includes(t));
  }, [q, ranked]);

  const tierStats = useMemo(
    () =>
      TIERS.map((t) => {
        const g = ranked.filter((d) => tier(d.meta) === t.id);
        const vol = g.reduce((s, d) => s + d.meta, 0) / TOTAL_CBIOS;
        return { ...t, n: g.length, vol };
      }),
    [ranked],
  );

  const top25 = useMemo(() => ranked.slice(0, 25), [ranked]);

  return (
    <section id="censo" className="mx-auto w-full max-w-6xl px-6 py-28 md:py-40">
      <Reveal>
        <p className="text-sm font-medium text-[#6e6e73]">RenovaBio · cumprimento das metas de 2025 (ANP)</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#1d1d1f] md:text-6xl">
          163 distribuidoras, uma meta de descarbonização.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#6e6e73]">
          Cada distribuidora de combustíveis fósseis precisa aposentar créditos de descarbonização (CBIOs) na
          proporção das suas vendas. A planilha oficial da ANP soma a meta de 2025 com o que ficou pendente de 2024 —
          por isso algumas posições aparecem acima do tamanho de mercado. Para participação de mercado, veja o ranking
          de vendas acima.
        </p>
      </Reveal>

      <Reveal className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.l} className="rounded-3xl bg-[#f5f5f7] p-6">
            <p className="whitespace-nowrap text-2xl font-semibold tracking-tight text-[#1d1d1f] md:text-3xl">{k.v}</p>
            <p className="mt-1 text-sm text-[#6e6e73]">{k.l}</p>
          </div>
        ))}
      </Reveal>

      <Reveal className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        {tierStats.map((t) => (
          <div key={t.id} className="rounded-3xl border border-[#e5e5ea] bg-white p-6">
            <div className="flex items-center justify-between">
              <span className={tierBadge(t.id as number)}>G{t.id}</span>
              <span className="text-sm font-medium text-[#1d1d1f]">{t.n} empresas</span>
            </div>
            <p className="mt-4 text-2xl font-semibold tracking-tight text-[#1d1d1f]">
              {(t.vol * 100).toFixed(1).replace(".", ",")} %
            </p>
            <p className="text-sm text-[#6e6e73]">do total a aposentar</p>
            <p className="mt-3 text-[13px] leading-snug text-[#6e6e73]">{t.serv}</p>
          </div>
        ))}
      </Reveal>

      <Reveal className="mt-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm font-medium text-[#1d1d1f]">
            {filtradas
              ? `${filtradas.length} resultado${filtradas.length === 1 ? "" : "s"} para “${q}” no censo completo (163)`
              : full
                ? "Censo completo — 163 distribuidoras (fonte oficial ANP)"
                : `25 maiores obrigações — ${fatia(25)}% do total`}
          </p>
          <div className="flex items-center gap-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por razão social…"
              className="w-full rounded-full bg-[#f5f5f7] px-5 py-2.5 text-sm text-[#1d1d1f] outline-none placeholder:text-[#6e6e73]/60 focus:ring-2 focus:ring-[#1d1d1f]/20 md:w-64"
            />
            <button
              onClick={() => setFull((v) => !v)}
              className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#6e6e73] shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-colors hover:text-[#1d1d1f]"
            >
              {full ? "Ver só o Top 25" : "Ver as 163"}
            </button>
          </div>
        </div>
        <div className="mt-4 overflow-hidden rounded-3xl bg-[#f5f5f7]">
          <div className="max-h-[30rem] overflow-y-auto p-2">
            {filtradas ? (
              <CensoTable rows={filtradas} />
            ) : full ? (
              <div className="space-y-10 p-4">
                {TIERS.map((t) => (
                  <div key={t.id}>
                    <p className="mb-2 text-sm font-semibold text-[#1d1d1f]">
                      {t.nome} · <span className="font-normal text-[#6e6e73]">{t.crit}</span>
                    </p>
                    <CensoTable rows={ranked.filter((d) => tier(d.meta) === t.id)} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4">
                <CensoTable rows={top25} />
              </div>
            )}
          </div>
        </div>
        <p className="mt-3 text-xs text-[#6e6e73]">
          Fonte:{" "}
          <a
            href="https://www.gov.br/anp/pt-br/assuntos/renovabio/cumprimento-das-metas-individuais-de-2025-por-distribuidor-de-combustiveis"
            target="_blank"
            rel="noreferrer"
            className="underline-offset-2 hover:underline"
          >
            ANP — cumprimento das metas individuais de 2025 por distribuidor (publicado em 30/01/2026, atualizado em 14/07/2026) ↗
          </a>
          . &quot;Liminar&quot; = cumprimento suspenso por decisão judicial. Descumprir a meta é crime ambiental, com multa de
          R$ 100.000,00 a R$ 500.000.000,00 (Lei 15.082/2024).
        </p>
      </Reveal>
    </section>
  );
}
