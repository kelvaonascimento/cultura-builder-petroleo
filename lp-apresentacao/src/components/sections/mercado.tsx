import { MarketGrowthChart, DemandChart, NetworkChart } from "@/components/charts";
import { CompanyLogo } from "@/components/logo";
import { AnimatedNumber, Reveal } from "@/components/motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { panorama, rankingUpstream, rankingDistribuicao } from "@/lib/data";

const CardGray = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-3xl bg-[#f5f5f7] p-8 transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] ${className}`}
  >
    {children}
  </div>
);

const CardWhite = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-3xl bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] ${className}`}
  >
    {children}
  </div>
);

const Kicker = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm font-medium text-[#6e6e73]">{children}</p>
);

export function Mercado() {
  return (
    <section id="mercado" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Kicker>Panorama do setor</Kicker>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#1d1d1f] md:text-6xl">
            O setor em números.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#6e6e73]">
            Mercado maduro, concentrado no topo e fragmentado na base. A Bahia é o berço
            histórico do setor (Candeias, 1939) e hoje concentra a 2ª maior refinaria do
            país e o coração logístico do Nordeste.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <CardGray className="lg:col-span-2">
            <p className="text-base font-semibold text-[#1d1d1f]">
              Mercado de IA em óleo &amp; gás
            </p>
            <p className="mt-1 text-sm text-[#6e6e73]">
              US$ 7,6 bi (2025) → US$ 25,2 bi (2034)
            </p>
            <div className="mt-6">
              <MarketGrowthChart />
            </div>
          </CardGray>
          <CardGray>
            <p className="text-base font-semibold text-[#1d1d1f]">
              Demanda de combustíveis — Brasil
            </p>
            <p className="mt-1 text-sm text-[#6e6e73]">
              +3,1 bi L em 2025 · +3,7 bi L em 2026 (EPE)
            </p>
            <div className="mt-6">
              <DemandChart />
            </div>
          </CardGray>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Produção nacional", panorama.producao],
            ["Reservas provadas", panorama.reservas],
            ["Refinarias", panorama.refinarias],
            ["Maior refino privado", panorama.maiorRefinoPrivado],
          ].map(([t, v]) => (
            <CardGray key={t}>
              <p className="text-xs font-medium uppercase tracking-wide text-[#86868b]">{t}</p>
              <p className="mt-3 text-sm font-medium leading-snug text-[#1d1d1f]">{v}</p>
            </CardGray>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Ranking() {
  return (
    <section id="ranking" className="bg-[#f5f5f7] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Kicker>Ranking das maiores</Kicker>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#1d1d1f] md:text-6xl">
            Quem manda e quanto movimenta.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#6e6e73]">
            O elo mais fragmentado do setor — distribuição e revenda regional — é também o
            mais atrasado digitalmente. É onde o jogo acontece.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <CardWhite className="lg:col-span-2">
            <p className="text-base font-semibold text-[#1d1d1f]">
              Produção e refino — upstream + midstream
            </p>
            <div className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow className="border-[#f5f5f7]">
                    <TableHead className="text-[#6e6e73]">Empresa</TableHead>
                    <TableHead className="text-[#6e6e73]">Porte</TableHead>
                    <TableHead className="hidden text-[#6e6e73] md:table-cell">Destaques</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rankingUpstream.map((r) => (
                    <TableRow key={r.empresa} className="border-[#f5f5f7]">
                      <TableCell className="font-medium text-[#1d1d1f]">
                        <span className="flex items-center gap-2.5">
                          <CompanyLogo name={r.empresa} size={20} />
                          {r.empresa}
                        </span>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-[#6e6e73]">{r.porte}</TableCell>
                      <TableCell className="hidden text-[#6e6e73] md:table-cell">{r.destaques}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardWhite>

          <CardWhite>
            <p className="text-base font-semibold text-[#1d1d1f]">
              Concentração brutal — postos por rede
            </p>
            <div className="mt-6">
              <NetworkChart />
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[#86868b]">
              Escala linear proposital: o abismo entre gigantes e regionais é o espaço da
              Cultura Builder.
            </p>
          </CardWhite>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <CardWhite className="lg:col-span-2">
            <p className="text-base font-semibold text-[#1d1d1f]">
              Distribuição, revenda e trading
            </p>
            <div className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow className="border-[#f5f5f7]">
                    <TableHead className="text-[#6e6e73]">Empresa</TableHead>
                    <TableHead className="text-[#6e6e73]">Receita</TableHead>
                    <TableHead className="hidden text-[#6e6e73] sm:table-cell">Rede</TableHead>
                    <TableHead className="text-[#6e6e73]">Posição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rankingDistribuicao.map((r) => (
                    <TableRow
                      key={r.empresa}
                      className="border-[#f5f5f7]"
                    >
                      <TableCell className="font-medium text-[#1d1d1f]">
                        <span className="flex items-center gap-2.5">
                          <CompanyLogo name={r.empresa} size={20} />
                          {r.empresa}
                        </span>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-[#6e6e73]">{r.receita}</TableCell>
                      <TableCell className="hidden whitespace-nowrap text-[#6e6e73] sm:table-cell">{r.rede}</TableCell>
                      <TableCell className="text-[#6e6e73]">{r.posicao}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-[#86868b]">
              Vibra + Ipiranga + Raízen controlam 37% dos postos afiliados; ~60 marcas
              menores disputam os 13% restantes; ~43 distribuidoras regionais filiadas a
              sindicatos.
            </p>
          </CardWhite>

          <CardWhite>
            <p className="text-base font-semibold text-[#1d1d1f]">
              O mercado de captação — Nordeste
            </p>
            <p className="mt-8 text-7xl font-semibold tracking-tight text-[#1d1d1f] md:text-8xl">
              <AnimatedNumber value={49.4} suffix="%" decimals={1} />
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#6e6e73]">
              dos 10.332 postos do Nordeste são bandeira branca. A disputa é por força
              comercial e preço — quem digitaliza o funil captura mais rápido.
            </p>
            <div className="mt-6 border-t border-[#f5f5f7] pt-6">
              <p className="text-sm leading-relaxed text-[#6e6e73]">
                O produto já existe no mercado (crédito pré-aprovado, suprimento
                garantido — os grandes já vendem isso). Falta a esteira digital que conecta
                tudo nas regionais.
              </p>
            </div>
          </CardWhite>
        </div>
      </div>
    </section>
  );
}
