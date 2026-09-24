"use client";

import { Reveal } from "@/components/motion";
import { CompanyLogo } from "@/components/logo";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cadeiaResumo, whiteSpace, fatosNovos } from "@/lib/data";
import { EMPRESAS_LISTADAS, FONTE_CVM } from "@/lib/dados-oficiais";

const reais = (v: number) => "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pct = (v: number) => (v > 0 ? "+" : "") + v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%";

export function Empresas() {
  return (
    <section id="empresas" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-sm font-medium text-[#6e6e73]">Empresas e fatos de mercado</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#1d1d1f] md:text-6xl">O que mudou no último ano.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#6e6e73]">
            Receita das maiores empresas listadas do setor, direto das demonstrações entregues à CVM, e os fatos que mexeram
            no mercado — cada um com o link da fonte.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <div className="rounded-3xl bg-[#f5f5f7] p-8">
            <p className="text-base font-semibold text-[#1d1d1f]">Receita líquida — empresas listadas do setor</p>
            <p className="mt-1 text-sm text-[#6e6e73]">Receita de venda de bens e serviços, demonstração consolidada</p>
            <div className="mt-6 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white">
                    <TableHead className="text-[#6e6e73]">Empresa</TableHead>
                    <TableHead className="text-right text-[#6e6e73]">Receita</TableHead>
                    <TableHead className="hidden text-right text-[#6e6e73] sm:table-cell">Ano anterior</TableHead>
                    <TableHead className="text-right text-[#6e6e73]">Variação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {EMPRESAS_LISTADAS.map((e) => (
                    <TableRow key={e.cnpj} className="border-white">
                      <TableCell className="font-medium text-[#1d1d1f]">
                        <span className="flex items-center gap-2.5" title={`CNPJ ${e.cnpj}${e.nota ? " · " + e.nota : ""}`}>
                          <CompanyLogo name={e.empresa} size={20} />
                          <span>
                            {e.empresa}
                            {e.periodo !== "2025" && <span className="ml-1.5 text-[11px] font-normal text-[#86868b]">({e.periodo})</span>}
                          </span>
                        </span>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right tabular-nums text-[#1d1d1f]">{reais(e.receita)}</TableCell>
                      <TableCell className="hidden whitespace-nowrap text-right tabular-nums text-[#6e6e73] sm:table-cell">{reais(e.receitaAnterior)}</TableCell>
                      <TableCell className="text-right tabular-nums text-[#6e6e73]">{pct((e.receita / e.receitaAnterior - 1) * 100)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <a href={FONTE_CVM.url} target="_blank" rel="noreferrer" className="mt-4 block text-[11px] text-[#86868b] underline-offset-2 hover:underline">
              Fonte: {FONTE_CVM.rotulo} · {FONTE_CVM.data} ↗
            </a>
          </div>
        </Reveal>

        <Reveal className="mt-4">
          <ul className="grid gap-4 md:grid-cols-2">
            {fatosNovos.map((f) => (
              <li key={f.texto} className="rounded-3xl bg-[#f5f5f7] p-7 text-sm leading-relaxed text-[#1d1d1f]">
                {f.texto}
                <a href={f.fonte.url} target="_blank" rel="noreferrer" className="mt-3 block text-[11px] text-[#86868b] underline-offset-2 hover:underline">
                  Fonte: {f.fonte.rotulo} ↗
                </a>
              </li>
            ))}
          </ul>
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
            Raio-X operacional da cadeia completa — da sonda ao bico: como cada elo funciona hoje e onde a IA entra.
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
                      Onde a IA entra
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
            Como começamos: mapa de valor cronometrado → inventário dos dados que já existem → matriz impacto × facilidade →
            piloto de 2 semanas → escala em agentes.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
