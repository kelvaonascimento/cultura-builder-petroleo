"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CompanyLogo } from "@/components/logo";
import { Reveal } from "@/components/motion";
import { casosIa, casosIaGlobais, matrizMelhorias } from "@/lib/data";

const CardGray = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`h-full rounded-3xl bg-[#f5f5f7] p-8 transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] ${className}`}
  >
    {children}
  </div>
);

export function IA() {
  return (
    <section id="ia" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-sm font-medium text-[#6e6e73]">IA no setor</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#1d1d1f] md:text-6xl">IA não é promessa. É P&amp;L.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#6e6e73]">
            Casos com resultado divulgado — no Brasil e lá fora — cada um com o veículo e a data. Só entra o que tem fonte
            primária, com o número exatamente como foi publicado.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
          {casosIa.map((c, i) => (
            <Reveal key={c.empresa + i} delay={i * 80}>
              <CardGray>
                <p className="flex items-center gap-2.5 text-base font-semibold text-[#1d1d1f]">
                  <CompanyLogo name={c.empresa} size={22} />
                  {c.empresa}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#6e6e73]">{c.oQueFez}</p>
                <p className="mt-3 text-xl font-semibold leading-snug tracking-tight text-[#1d1d1f]">{c.resultado}</p>
                {c.nota && <p className="mt-2 text-xs text-[#86868b]">{c.nota}</p>}
                <a href={c.fonte.url} target="_blank" rel="noreferrer" className="mt-4 block text-[11px] text-[#86868b] underline-offset-2 hover:underline">
                  Fonte: {c.fonte.rotulo} ↗
                </a>
              </CardGray>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <p className="text-sm font-medium text-[#6e6e73]">Lá fora</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[#1d1d1f] md:text-3xl">As maiores do mundo já medem o retorno.</h3>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {casosIaGlobais.map((c, i) => (
            <Reveal key={c.empresa} delay={i * 60}>
              <div className="flex h-full flex-col rounded-3xl bg-[#f5f5f7] p-6">
                <p className="flex items-center gap-2.5 text-sm font-semibold text-[#1d1d1f]">
                  <CompanyLogo name={c.empresa} size={18} />
                  {c.empresa}
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-[#6e6e73]">{c.oQueFez}</p>
                <p className="mt-2 text-base font-semibold leading-snug tracking-tight text-[#1d1d1f]">{c.resultado}</p>
                {c.nota && <p className="mt-1.5 text-[11px] text-[#86868b]">{c.nota}</p>}
                <a href={c.fonte.url} target="_blank" rel="noreferrer" className="mt-auto block pt-4 text-[11px] text-[#86868b] underline-offset-2 hover:underline">
                  Fonte: {c.fonte.rotulo} ↗
                </a>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-xs leading-relaxed text-[#86868b]">
          Resultados como divulgados pelas empresas à imprensa ou em canal oficial. Ficaram de fora números que circulam sem fonte
          primária e os que não são de IA — como os cortes estruturais de custo da ExxonMobil desde 2019, citados com frequência
          como ganho de IA.
        </p>
      </div>
    </section>
  );
}

export function Melhorias() {
  const elos = Object.keys(matrizMelhorias);
  return (
    <section id="melhorias" className="bg-white pb-24 pt-4 md:pb-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-sm font-medium text-[#6e6e73]">Matriz de melhorias</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#1d1d1f] md:text-6xl">
            Da sonda ao bico: todo elo é melhorável.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#6e6e73]">
            Cada linha traz a aplicação de IA e o que muda na operação — com o caso brasileiro de referência quando ele
            existe e tem fonte.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <Tabs defaultValue={elos[0]} className="gap-0">
            <TabsList className="flex h-auto w-full flex-wrap gap-2 rounded-none border-0 bg-transparent p-0">
              {elos.map((elo) => (
                <TabsTrigger
                  key={elo}
                  value={elo}
                  className="h-auto rounded-full border-0 bg-[#f5f5f7] px-5 py-2.5 text-sm font-medium text-[#6e6e73] shadow-none data-active:bg-[#1d1d1f] data-active:text-white"
                >
                  {elo}
                </TabsTrigger>
              ))}
            </TabsList>
            {elos.map((elo) => (
              <TabsContent key={elo} value={elo} className="mt-4">
                <CardGray>
                  <p className="text-base font-semibold text-[#1d1d1f]">{elo}</p>
                  <div className="mt-6">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white">
                          <TableHead className="w-48 text-[#6e6e73]">Área</TableHead>
                          <TableHead className="text-[#6e6e73]">Aplicação de IA</TableHead>
                          <TableHead className="text-[#6e6e73]">O que muda</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {matrizMelhorias[elo].map((m) => (
                          <TableRow key={m.area} className="border-white">
                            <TableCell className="font-medium text-[#1d1d1f]">{m.area}</TableCell>
                            <TableCell className="text-[#6e6e73]">{m.aplicacao}</TableCell>
                            <TableCell className="text-[#1d1d1f]">{m.ganho}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardGray>
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>
      </div>
    </section>
  );
}
