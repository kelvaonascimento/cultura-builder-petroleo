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
  if (p === null) return "—";
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
          <TableHead className="w-40 text-right text-[#6e6e73]">Meta CBIO 2025</TableHead>
          <TableHead className="w-24 text-right text-[#6e6e73]">Cumprimento</TableHead>
          <TableHead className="w-24 text-center text-[#6e6e73]">Tier</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((d) => (
          <TableRow key={d.rs} className="border-white">
            <TableCell className="text-[#6e6e73]">{d.rank}</TableCell>
            <TableCell className="font-medium text-[#1d1d1f]">{d.rs}</TableCell>
            <TableCell className="text-right tabular-nums text-[#1d1d1f]">{fmtInt(d.meta)}</TableCell>
            <TableCell className={`text-right tabular-nums ${pctTone(d.pct)}`}>{fmtPct(d.pct)}</TableCell>
            <TableCell className="text-center">
              <span className={tierBadge(tier(d.meta))}>G{tier(d.meta)}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const abaixo100 = DISTRIBUIDORAS.filter((d) => d.pct !== null && d.pct < 100).length;
const zeradas19 = DISTRIBUIDORAS.filter((d) => d.pct === 0).length;

const kpis = [
  { v: "25", l: "distribuidoras no Top 25 — 79,7% do volume nacional" },
  { v: "46,1 mi", l: "CBIOs em metas 2025" },
  { v: "56,6 %", l: "do volume nas 5 maiores" },
  { v: String(abaixo100), l: `fora de 100% (${zeradas19} zeradas; risco de juros SELIC)` },
];

export function Censo() {
  const [q, setQ] = useState("");
  const [full, setFull] = useState(false);

  const ranked = useMemo(
    () => [...DISTRIBUIDORAS].sort((a, b) => b.meta - a.meta).map((d, i) => ({ ...d, rank: i + 1 })),
    [],
  );

  const filtradas = useMemo(() => {
    const t = q.trim().toUpperCase();
    if (!t) return null;
    return ranked.filter((d) => d.rs.toUpperCase().includes(t));
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
        <p className="text-sm font-medium text-[#6e6e73]">Termômetro de volume · ANP × RenovaBio 2025</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#1d1d1f] md:text-6xl">
          As 25 maiores movem 80% do país.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#6e6e73]">
          O benchmark de receita é o Valor 1000 (as 46 maiores). Este mapa ANP mede o que
          ninguém mais vê: volume real de diesel distribuído, via meta CBIO — dado público
          e auditado. As 163 completas ficam no arquivo oficial da ANP; aqui fica o que
          importa.
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
            <p className="text-sm text-[#6e6e73]">do volume nacional</p>
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
                : "Top 25 por volume real — 79,7% do diesel do país"}
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
          Fonte: ANP, Relatório de Cumprimento de Metas de CBIO 2025 — dado público (planilha
          oficial em fontes/anp-relatorio-cumprimento-meta-2025.xlsx; 167 linhas, 163
          distribuidoras). Déficit de CBIO rende juros sobre a taxa SELIC (Lei 13.576/2017,
          art. 6º). Benchmark de receita: Valor 1000, as 46 maiores de O&amp;G (seção
          anterior).
        </p>
      </Reveal>
    </section>
  );
}
