"use client";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SavingsChart } from "@/components/charts";
import { CompanyLogo } from "@/components/logo";
import { AnimatedNumber, Reveal } from "@/components/motion";
import { concorrenciaIa, matrizMelhorias } from "@/lib/data";

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

function badgeVariant(m: string): "default" | "secondary" | "outline" {
  if (m.includes("Líder")) return "default";
  if (m.includes("Baixa")) return "outline";
  return "secondary";
}

function IaTable({ rows }: { rows: typeof concorrenciaIa }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-white">
          <TableHead className="text-[#6e6e73]">Player</TableHead>
          <TableHead className="text-[#6e6e73]">Maturidade</TableHead>
          <TableHead className="hidden text-[#6e6e73] md:table-cell">Onde aposta</TableHead>
          <TableHead className="text-[#6e6e73]">Ganhos documentados</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((c) => (
          <TableRow
            key={c.player}
            className="border-white transition-colors hover:bg-white"
          >
            <TableCell className="whitespace-nowrap font-medium text-[#1d1d1f]">
              <span className="flex items-center gap-2.5">
                <CompanyLogo name={c.player} size={20} />
                {c.player}
              </span>
            </TableCell>
            <TableCell>
              <Badge variant={badgeVariant(c.maturidade)} className="whitespace-nowrap font-medium">
                {c.maturidade}
              </Badge>
            </TableCell>
            <TableCell className="hidden text-[#6e6e73] md:table-cell">{c.ondeAposta}</TableCell>
            <TableCell className="text-[#1d1d1f]">{c.ganho}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function IA() {
  return (
    <section id="ia" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-sm font-medium text-[#6e6e73]">IA no setor</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#1d1d1f] md:text-6xl">
            IA não é promessa. É P&amp;L.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#6e6e73]">
            Economia reportada por empresa, maturidade, apostas e ganhos — incluindo o gap
            das distribuidoras regionais.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <CardGray>
              <p className="text-base font-semibold text-[#1d1d1f]">
                Economia reportada com IA
              </p>
              <p className="mt-1 text-sm text-[#6e6e73]">
                R$ milhões — cases brasileiros, fontes públicas
              </p>
              <div className="mt-6">
                <SavingsChart />
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#86868b]">
                Vibra: R$ 900 mi em estoque, declarado no Relato Integrado 2024 (GRI).
                Petrobras: US$ 120 mi em 3 semanas (fiscal + IA) — case divulgado por
                fornecedor, não em relatório oficial. Braskem: R$ 460 mi/ano, estimativa
                própria declarada. Raízen: R$ 230 mi em transportes desde 2021 (imprensa).
              </p>
            </CardGray>
          </Reveal>
          <Reveal delay={100}>
            <CardGray>
              <p className="text-base font-semibold text-[#1d1d1f]">Benchmark de mercado</p>
              <p className="mt-8 text-5xl font-semibold tracking-tight text-[#1d1d1f]">
                5-20%
              </p>
              <p className="mt-2 text-sm text-[#6e6e73]">de economia operacional com IA</p>
              <div className="my-8 border-t border-[#e5e5ea]" />
              <p className="text-5xl font-semibold tracking-tight text-[#1d1d1f]">
                <AnimatedNumber value={40} prefix="+" suffix="%" />
              </p>
              <p className="mt-2 text-sm text-[#6e6e73]">de produtividade em processos</p>
              <div className="mt-8 border-t border-[#e5e5ea] pt-6">
                <p className="text-sm leading-relaxed text-[#6e6e73]">
                  Em margens apertadas e capital de giro caro, isso é margem líquida — não
                  &ldquo;inovação&rdquo;.
                </p>
              </div>
            </CardGray>
          </Reveal>
        </div>

        <Reveal className="mt-4">
          <CardGray>
            <p className="text-base font-semibold text-[#1d1d1f]">
              Maturidade de IA por player
            </p>
            <p className="mt-1 text-sm text-[#6e6e73]">Quem aposta em quê e quanto já capturou</p>
            <div className="mt-6 space-y-8">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#6e6e73]">
                  Brasil — cases com fonte oficial (RI, GRI, imprensa)
                </p>
                <IaTable rows={concorrenciaIa.filter((c) => c.origem === "brasil")} />
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#6e6e73]">
                  Global — ordens de grandeza (fontes secundárias)
                </p>
                <IaTable rows={concorrenciaIa.filter((c) => c.origem === "global")} />
                <p className="mt-3 text-xs leading-relaxed text-[#86868b]">
                  Números globais circulam em blogs de especialistas e relatórios de
                  consultoria (C3 AI, Palantir, McKinsey) — não são declarações auditadas.
                  Servem de referência de magnitude, não de comparativo direto.
                </p>
              </div>
            </div>
          </CardGray>
        </Reveal>
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
            Cada linha traz a aplicação de IA e o ganho real documentado — a régua que o
            mercado já provou ser possível.
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
                          <TableHead className="text-[#6e6e73]">Ganho documentado</TableHead>
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
