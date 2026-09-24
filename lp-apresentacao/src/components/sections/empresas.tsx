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
import { CompanyLogo } from "@/components/logo";
import { AnimatedNumber, Reveal } from "@/components/motion";
import { mapaEmpresas46, cadeiaResumo, whiteSpace, fatosNovos } from "@/lib/data";

type Filter = "todas" | "com-ia" | "sem-ia";

const filters: { value: Filter; label: string }[] = [
  { value: "todas", label: "Todas" },
  { value: "com-ia", label: "Com IA documentada" },
  { value: "sem-ia", label: "Sem IA documentada" },
];

function iaBucket(ia: string): "com" | "sem" | "outras" {
  if (ia.startsWith("NÃO")) return "sem";
  if (ia.startsWith("SIM") || ia.startsWith("Parcial")) return "com";
  return "outras";
}

function EmpresaTable({ rows }: { rows: typeof mapaEmpresas46 }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-white">
          <TableHead className="w-12 text-[#6e6e73]">#</TableHead>
          <TableHead className="text-[#6e6e73]">Empresa</TableHead>
          <TableHead className="text-[#6e6e73]">Sede</TableHead>
          <TableHead className="text-[#6e6e73]">Receita 2023</TableHead>
          <TableHead className="text-[#6e6e73]">Uso de IA</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((e) => (
          <TableRow
            key={e.n}
            className="border-white transition-colors hover:bg-white"
          >
            <TableCell className="text-[#86868b]">{e.n}</TableCell>
            <TableCell className="whitespace-nowrap font-medium text-[#1d1d1f]">
              <span className="flex items-center gap-2.5">
                <CompanyLogo name={e.empresa} size={20} />
                {e.empresa}
              </span>
            </TableCell>
            <TableCell className="text-[#6e6e73]">{e.sede}</TableCell>
            <TableCell className="whitespace-nowrap text-[#6e6e73]">{e.receita}</TableCell>
            <TableCell
              className={
                e.ia.startsWith("NÃO")
                  ? "text-[#86868b]"
                  : "font-medium text-[#1d1d1f]"
              }
            >
              {e.ia}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function Empresas() {
  const [filter, setFilter] = useState<Filter>("todas");
  const semIa = useMemo(
    () => mapaEmpresas46.filter((e) => e.ia.startsWith("NÃO")).length,
    [],
  );
  const rows = useMemo(() => {
    if (filter === "todas") return mapaEmpresas46;
    if (filter === "com-ia")
      return mapaEmpresas46.filter((e) => iaBucket(e.ia) === "com");
    return mapaEmpresas46.filter(
      (e) => iaBucket(e.ia) === "sem" || iaBucket(e.ia) === "outras",
    );
  }, [filter]);

  return (
    <section id="empresas" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-sm font-medium text-[#6e6e73]">Mapa de empresas</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#1d1d1f] md:text-6xl">
            As 46 maiores de O&amp;G, uma por uma.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#6e6e73]">
            Censo completo do Valor 1000: receita líquida de 2023, sede e maturidade de IA de
            cada empresa. Total do setor: ~R$ 1,45 trilhão. Das 46, {semIa} não têm qualquer
            uso de IA documentado.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              value: 46,
              prefix: "",
              suffix: "",
              decimals: 0,
              label: "empresas de O&G entre as 1.000 maiores do Brasil",
            },
            {
              value: 90,
              prefix: "> ",
              suffix: "%",
              decimals: 0,
              label: "da receita do setor está nas 11 primeiras",
            },
            {
              value: semIa,
              prefix: "",
              suffix: "/46",
              decimals: 0,
              label: "sem uso de IA documentado — o white space",
            },
            {
              value: 1.45,
              prefix: "R$ ",
              suffix: " tri",
              decimals: 2,
              label: "receita líquida somada do setor",
            },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="h-full rounded-3xl bg-[#f5f5f7] p-8 transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
                <p className="whitespace-nowrap text-3xl font-semibold tracking-tight text-[#1d1d1f] md:text-4xl">
                  <AnimatedNumber
                    value={s.value}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    decimals={s.decimals}
                  />
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#6e6e73]">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-4">
          <div className="rounded-3xl bg-[#f5f5f7] p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-base font-semibold text-[#1d1d1f]">
                  Censo Valor 1000 — receita líquida 2023 (R$ milhões conforme fonte)
                </p>
                <p className="mt-1 text-sm text-[#6e6e73]">
                  {rows.length} de {mapaEmpresas46.length} empresas
                </p>
              </div>
              <div className="flex gap-2">
                {filters.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFilter(f.value)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      filter === f.value
                        ? "bg-[#1d1d1f] text-white"
                        : "bg-white text-[#6e6e73] shadow-[0_1px_4px_rgba(0,0,0,0.05)] hover:text-[#1d1d1f]"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <EmpresaTable rows={rows} />
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-4">
          <div className="rounded-3xl bg-[#f5f5f7] p-8">
            <p className="text-base font-semibold text-[#1d1d1f]">Fatos de mercado (set/2026)</p>
            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {fatosNovos.map((f) => (
                <li key={f} className="flex gap-3 text-sm leading-relaxed text-[#6e6e73]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d2d2d7]" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-8 text-xs text-[#86868b]">
            Fonte do censo: Valor 1000 (12/11/2024) — receita líquida 2023, baseada em balanços
            auditados na CVM. Maturidade de IA: canais oficiais das empresas (Agência Petrobras,
            RI Vibra — Relato Integrado 2024 auditado, sites Braskem/Raízen) e declarações
            on-record à imprensa major (set/2026). Censo estendido com trading, logística e
            regionais no arquivo 04-empresas-completo.md. Auditoria completa de fontes:
            06-fontes.md.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Cadeia() {
  return (
    <section id="cadeia" className="bg-white pb-24 pt-4 md:pb-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-sm font-medium text-[#6e6e73]">Cadeia de processos</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#1d1d1f] md:text-6xl">
            Tudo que é humano e manual é passível de automação.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#6e6e73]">
            Raio-X operacional da cadeia completa — da sonda ao bico. Clique em cada elo para
            ver o estado atual, o que a IA já provou no mercado e o ganho esperado.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
            {cadeiaResumo.map((c, i) => (
              <div
                key={c.elo}
                className={`h-full rounded-3xl bg-[#f5f5f7] p-8 transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] ${
                  i % 4 === 0 || i % 4 === 3 ? "lg:col-span-4" : "lg:col-span-2"
                }`}
              >
                <p className="text-xs font-semibold tracking-widest text-[#86868b]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-xl font-semibold tracking-tight text-[#1d1d1f]">
                  {c.elo}
                </p>
                <p className="mt-5 text-xs font-medium uppercase tracking-wide text-[#86868b]">
                  Estado hoje
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#6e6e73]">{c.processos}</p>
                <div className="mt-6 grid grid-cols-1 gap-5 border-t border-[#e5e5ea] pt-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-[#86868b]">
                      Exemplo manual
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#6e6e73]">{c.exemplo}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-[#86868b]">
                      Ganho provado
                    </p>
                    <p className="mt-1.5 text-sm font-medium leading-relaxed text-[#1d1d1f]">
                      {c.ganho}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <h3 className="mt-20 text-3xl font-semibold tracking-tight text-[#1d1d1f]">
            Onde ninguém está olhando.
          </h3>
          <p className="mt-3 max-w-2xl text-[#6e6e73]">
            O white space: oportunidades invisíveis para as próprias empresas — o operacional
            que ninguém enxerga até alguém abrir.
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {whiteSpace.map((w, i) => (
            <Reveal key={w.titulo} delay={i * 60}>
              <div className="h-full rounded-3xl bg-[#f5f5f7] p-8 transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
                <p className="text-sm font-semibold text-[#1d1d1f]">
                  {String(i + 1).padStart(2, "0")} · {w.titulo}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#6e6e73]">{w.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-8 text-xs text-[#86868b]">
            Mapa completo, processo a processo, com referências e ganhos: arquivo
            05-cadeia-processos.md. Metodologia para abrir o operacional: mapa de valor
            cronometrado → inventário de dados dormindo → matriz impacto × facilidade →
            piloto de 2 semanas → escala em agentes.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
