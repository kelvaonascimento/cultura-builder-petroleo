import { PostosBandeiraChart, VendasAnuaisChart } from "@/components/charts";
import { CompanyLogo } from "@/components/logo";
import { AnimatedNumber, Reveal } from "@/components/motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DISTRIBUIDORAS_COM_VENDA_2025,
  FONTE_ANUARIO,
  FONTES,
  REFINO_2025,
  POSTOS,
  PRODUCAO_PETROLEO_2025,
  RANKING_DISTRIBUICAO_2025,
  RESERVAS_2025,
  TOP3_PARTICIPACAO,
  TOTAL_VENDAS_DISTRIBUIDORAS_2024,
  TOTAL_VENDAS_DISTRIBUIDORAS_2025,
  VENDAS_ANUAIS,
  type Fonte,
} from "@/lib/dados-oficiais";

const int = (n: number) => n.toLocaleString("pt-BR");
const dec = (n: number, d = 2) => n.toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d });

const CardGray = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-3xl bg-[#f5f5f7] p-8 transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] ${className}`}>{children}</div>
);

const CardWhite = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-3xl bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] ${className}`}>{children}</div>
);

const Kicker = ({ children }: { children: React.ReactNode }) => <p className="text-sm font-medium text-[#6e6e73]">{children}</p>;

export function FonteLink({ f, className = "" }: { f: Fonte; className?: string }) {
  return (
    <a href={f.url} target="_blank" rel="noreferrer" className={`block text-[11px] leading-snug text-[#86868b] underline-offset-2 hover:underline ${className}`}>
      Fonte: {f.rotulo} · {f.data} ↗
    </a>
  );
}

export function Mercado() {
  const ult = VENDAS_ANUAIS.at(-1)!;
  const pri = VENDAS_ANUAIS[0];
  const total = (v: typeof ult) => v.gasolina + v.diesel + v.etanol;
  const cresc = (total(ult) / total(pri) - 1) * 100;
  return (
    <section id="mercado" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Kicker>Panorama do setor</Kicker>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#1d1d1f] md:text-6xl">O setor em números.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#6e6e73]">
            Mercado grande e em crescimento, concentrado no topo e pulverizado na ponta. Todos os números desta página são
            oficiais, com fonte e data.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <CardGray className="lg:col-span-2">
            <p className="text-base font-semibold text-[#1d1d1f]">Vendas de combustíveis no Brasil (m³)</p>
            <p className="mt-1 text-sm text-[#6e6e73]">
              Gasolina C, óleo diesel e etanol hidratado · {int(total(ult))} m³ em {ult.ano} · +{dec(cresc)}% desde {pri.ano}
            </p>
            <div className="mt-6">
              <VendasAnuaisChart data={VENDAS_ANUAIS} />
            </div>
            <FonteLink f={FONTES.vendasUF} className="mt-3" />
          </CardGray>
          <CardGray>
            <p className="text-base font-semibold text-[#1d1d1f]">Mix de {ult.ano}</p>
            <ul className="mt-5 space-y-4">
              {[
                ["Óleo diesel", ult.diesel, "#2a78d6"],
                ["Gasolina C", ult.gasolina, "#eb6834"],
                ["Etanol hidratado", ult.etanol, "#1baf7a"],
              ].map(([n, v, c]) => (
                <li key={n as string}>
                  <p className="flex items-center gap-2 text-sm font-medium text-[#1d1d1f]">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: c as string }} />
                    {n}
                  </p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight text-[#1d1d1f]">{dec(((v as number) / total(ult)) * 100)}%</p>
                  <p className="text-xs text-[#86868b]">{int(v as number)} m³</p>
                </li>
              ))}
            </ul>
            <FonteLink f={FONTES.vendasUF} className="mt-5" />
          </CardGray>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CardGray>
            <p className="text-xs font-medium uppercase tracking-wide text-[#86868b]">Produção de petróleo 2025</p>
            <p className="mt-3 text-sm font-medium leading-snug text-[#1d1d1f]">
              {PRODUCAO_PETROLEO_2025.m3.toLocaleString("pt-BR", { minimumFractionDigits: 3 })} m³, {dec(PRODUCAO_PETROLEO_2025.mar_pct)}% no mar.
            </p>
            <FonteLink f={FONTES.producao} className="mt-3" />
          </CardGray>
          <CardGray>
            <p className="text-xs font-medium uppercase tracking-wide text-[#86868b]">Reservas provadas (fim de 2025)</p>
            <p className="mt-3 text-sm font-medium leading-snug text-[#1d1d1f]">
              {dec(RESERVAS_2025.petroleo1P_bi_bbl, 3)} bilhões de barris de petróleo (+{dec(RESERVAS_2025.variacao_1P_pct)}%) e{" "}
              {dec(RESERVAS_2025.gas1P_bi_m3, 3)} bilhões de m³ de gás; reposição de {dec(RESERVAS_2025.reposicao_pct)}%.
            </p>
            <FonteLink f={FONTES.reservas} className="mt-3" />
          </CardGray>
          <CardGray>
            <p className="text-xs font-medium uppercase tracking-wide text-[#86868b]">Postos</p>
            <p className="mt-3 text-sm font-medium leading-snug text-[#1d1d1f]">
              {int(POSTOS.total)} postos; {dec((POSTOS.bandeiraBranca / POSTOS.total) * 100)}% são bandeira branca.
            </p>
            <FonteLink f={FONTES.postos} className="mt-3" />
          </CardGray>
          <CardGray>
            <p className="text-xs font-medium uppercase tracking-wide text-[#86868b]">Refino (2025)</p>
            <p className="mt-3 text-sm font-medium leading-snug text-[#1d1d1f]">
              {REFINO_2025.refinarias} refinarias, {REFINO_2025.petrobras} da Petrobras ({dec(REFINO_2025.petrobrasCapacidadePct, 1)}% da capacidade).
              Mataripe (Acelen, BA) é a 2ª maior: {int(REFINO_2025.mataripeCapacidadeBpd)} barris/dia de capacidade nominal.
            </p>
            <FonteLink f={FONTE_ANUARIO} className="mt-3" />
          </CardGray>
        </div>
      </div>
    </section>
  );
}

export function Ranking() {
  const top3Postos = POSTOS.porBandeira.slice(1, 4).reduce((s, b) => s + b.postos, 0);
  return (
    <section id="ranking" className="bg-[#f5f5f7] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Kicker>Ranking das maiores</Kicker>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#1d1d1f] md:text-6xl">Quem vende quanto.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#6e6e73]">
            Três grupos somam mais da metade do volume. Abaixo deles, {DISTRIBUIDORAS_COM_VENDA_2025 - 3} distribuidoras disputam o
            restante — e quase metade dos postos do país não tem bandeira.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <CardWhite className="lg:col-span-2">
            <p className="text-base font-semibold text-[#1d1d1f]">As 12 maiores distribuidoras em 2025</p>
            <p className="mt-1 text-sm text-[#6e6e73]">
              Volume de gasolina C, diesel B e etanol hidratado · total do mercado: {int(TOTAL_VENDAS_DISTRIBUIDORAS_2025)} m³
            </p>
            <div className="mt-6 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-[#f5f5f7]">
                    <TableHead className="text-[#6e6e73]">#</TableHead>
                    <TableHead className="text-[#6e6e73]">Distribuidora</TableHead>
                    <TableHead className="text-right text-[#6e6e73]">Volume 2025</TableHead>
                    <TableHead className="text-right text-[#6e6e73]">Participação</TableHead>
                    <TableHead className="hidden text-right text-[#6e6e73] sm:table-cell">vs. 2024</TableHead>
                    <TableHead className="hidden text-right text-[#6e6e73] md:table-cell">Postos com a bandeira</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {RANKING_DISTRIBUICAO_2025.map((r) => (
                    <TableRow key={r.empresa} className="border-[#f5f5f7]">
                      <TableCell className="tabular-nums text-[#86868b]">{r.pos}</TableCell>
                      <TableCell className="font-medium text-[#1d1d1f]">
                        <span className="flex items-center gap-2.5" title={r.razaoSocial}>
                          <CompanyLogo name={r.empresa} size={20} />
                          {r.empresa}
                        </span>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right tabular-nums text-[#1d1d1f]">{int(r.m3_2025)} m³</TableCell>
                      <TableCell className="text-right tabular-nums text-[#6e6e73]">{dec(r.participacao)}%</TableCell>
                      <TableCell className="hidden text-right tabular-nums text-[#6e6e73] sm:table-cell">
                        {r.variacao > 0 ? "+" : ""}
                        {dec(r.variacao, 1)}%
                      </TableCell>
                      <TableCell className="hidden text-right tabular-nums text-[#6e6e73] md:table-cell">{int(r.postos)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-[#86868b]">
              Participação das 3 maiores por produto em 2025: gasolina C {dec(TOP3_PARTICIPACAO["Gasolina C 2025"])}% (
              {dec(TOP3_PARTICIPACAO["Gasolina C 2024"])}% em 2024), diesel B {dec(TOP3_PARTICIPACAO["Diesel B 2025"])}% (
              {dec(TOP3_PARTICIPACAO["Diesel B 2024"])}%), etanol hidratado {dec(TOP3_PARTICIPACAO["Etanol Hidratado 2025"])}% (
              {dec(TOP3_PARTICIPACAO["Etanol Hidratado 2024"])}%). Volume de uma distribuidora não depende da rede de postos: boa parte
              vai para postos bandeira branca, TRRs e grandes consumidores.
            </p>
            <FonteLink f={FONTES.vendasDistribuidora} className="mt-2" />
            <FonteLink f={FONTES.postos} className="mt-1" />
          </CardWhite>

          <CardWhite>
            <p className="text-base font-semibold text-[#1d1d1f]">Postos por bandeira</p>
            <p className="mt-1 text-sm text-[#6e6e73]">
              Vibra, Ipiranga e Raízen somam {int(top3Postos)} postos ({dec((top3Postos / POSTOS.total) * 100)}% do total).
            </p>
            <div className="mt-6">
              <PostosBandeiraChart data={POSTOS.porBandeira} />
            </div>
            <FonteLink f={FONTES.postos} className="mt-2" />
          </CardWhite>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <CardWhite className="lg:col-span-1">
            <p className="text-base font-semibold text-[#1d1d1f]">Bandeira branca no Nordeste</p>
            <p className="mt-8 text-7xl font-semibold tracking-tight text-[#1d1d1f] md:text-8xl">
              <AnimatedNumber value={(POSTOS.nordesteBandeiraBranca / POSTOS.nordesteTotal) * 100} suffix="%" decimals={2} />
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#6e6e73]">
              dos {int(POSTOS.nordesteTotal)} postos do Nordeste não têm bandeira ({int(POSTOS.nordesteBandeiraBranca)} postos). Para essa
              rede, preço, prazo e disponibilidade decidem a compra.
            </p>
            <FonteLink f={FONTES.postos} className="mt-4" />
          </CardWhite>
          <CardWhite className="lg:col-span-2">
            <p className="text-base font-semibold text-[#1d1d1f]">O que esses números dizem</p>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#6e6e73]">
              <li>
                • As três maiores seguem estáveis: cresceram de 1,5% a 3,0% em 2025, contra {dec((TOTAL_VENDAS_DISTRIBUIDORAS_2025 / TOTAL_VENDAS_DISTRIBUIDORAS_2024 - 1) * 100, 1)}%
                do mercado.
              </li>
              <li>
                • Entre as 12 maiores, quem mais cresceu foram {RANKING_DISTRIBUICAO_2025.filter((r) => r.variacao >= 8).map((r) => `${r.empresa} (+${dec(r.variacao, 1)}%)`).join(", ")}.
              </li>
              <li>• Na ponta, quase metade dos postos compra sem contrato de bandeira: o funil comercial pesa tanto quanto a logística.</li>
            </ul>
            <FonteLink f={FONTES.vendasDistribuidora} className="mt-5" />
          </CardWhite>
        </div>
      </div>
    </section>
  );
}
