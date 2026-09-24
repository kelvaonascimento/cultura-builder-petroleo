import { AnimatedNumber, Reveal } from "@/components/motion";
import { LogoStrip } from "@/components/logo";
import { CbLogo } from "@/components/cb-logo";

const nav = [
  { href: "#mercado", label: "Mercado" },
  { href: "#ranking", label: "Ranking" },
  { href: "#empresas", label: "Fatos" },
  { href: "#cadeia", label: "Cadeia" },
  { href: "#ia", label: "IA no setor" },
  { href: "#dores", label: "Dores" },
  { href: "#melhorias", label: "Melhorias" },
  { href: "#demo", label: "Demo" },
];

// Todos os números do topo são dado oficial, com fonte e data (conferidos em 24/09/2026)
const stats: {
  value: number;
  prefix: string;
  suffix: string;
  decimals: number;
  label: string;
  fonte: string;
  url: string;
}[] = [
  {
    value: 54.46,
    prefix: "",
    suffix: "%",
    decimals: 2,
    label: "Das vendas de gasolina C, diesel B e etanol hidratado em 2025 ficaram com as 3 maiores distribuidoras.",
    fonte: "ANP — vendas por distribuidora (137.401.752 m³ no ano; 181 distribuidoras)",
    url: "https://www.gov.br/anp/pt-br/centrais-de-conteudo/dados-abertos/vendas-de-derivados-de-petroleo-e-biocombustiveis",
  },
  {
    value: 48.42,
    prefix: "",
    suffix: "%",
    decimals: 2,
    label: "Dos 45.807 postos do país são bandeira branca — no Nordeste, 61,61%.",
    fonte: "ANP — cadastro de revendedores varejistas (24/09/2026)",
    url: "https://www.gov.br/anp/pt-br/centrais-de-conteudo/dados-abertos/revendedores-varejistas-de-combustiveis-automotivos",
  },
  {
    value: 17.488,
    prefix: "",
    suffix: " bi",
    decimals: 3,
    label: "De barris em reservas provadas de petróleo no fim de 2025 (+3,84% no ano).",
    fonte: "ANP — Boletim Anual de Recursos e Reservas 2025 (10/04/2026)",
    url: "https://www.gov.br/anp/pt-br/canais_atendimento/imprensa/noticias-comunicados/reservas-provadas-de-petroleo-no-brasil-cresceram-3-84-em-2025",
  },
  {
    value: 48090000,
    prefix: "",
    suffix: "",
    decimals: 0,
    label: "CBIOs de meta de descarbonização para as distribuidoras em 2026, com prazo em 31/12.",
    fonte: "ANP — metas individuais do RenovaBio 2026 (Res. CNPE 21/2025)",
    url: "https://www.gov.br/anp/pt-br/canais_atendimento/imprensa/noticias-comunicados/renovabio-anp-divulga-metas-definitivas-para-as-distribuidoras-em-2026",
  },
];

const stripCompanies = [
  "Petrobras",
  "Raízen",
  "Vibra Energia",
  "Ultrapar",
  "Shell",
  "Braskem",
  "Acelen",
  "ALE Combustíveis",
  "Atem",
  "Larco",
  "Cosan",
];

export function Hero() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col px-6 md:h-12 md:flex-row md:items-center md:justify-between">
          <a href="#" className="flex h-11 items-center text-[#1d1d1f] md:h-auto" aria-label="Cultura Builder — início">
            <CbLogo id="cb-logo-topo" className="h-[22px] w-auto" />
          </a>
          <nav className="-mx-6 flex gap-5 overflow-x-auto px-6 pb-2 text-xs font-medium text-[#6e6e73] [scrollbar-width:none] md:mx-0 md:gap-7 md:overflow-visible md:p-0">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="whitespace-nowrap py-1.5 transition-colors hover:text-[#1d1d1f] md:py-0">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section className="bg-white pb-24 pt-28 text-center md:pt-36">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-[#1d1d1f] md:text-6xl">
              Raio-X do setor de
              <br className="hidden md:block" />
              petróleo e combustíveis.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#6e6e73] md:text-xl">
              Quem vende quanto, o que a regulação muda na margem e onde a IA já
              entrega resultado — da sonda ao bico, só com dado público e verificável.
            </p>
          </Reveal>
        </div>
        <div className="mx-auto mt-16 max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90}>
                <div className="h-full rounded-3xl bg-[#f5f5f7] p-8 text-left transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
                  <p className="whitespace-nowrap text-3xl font-semibold tracking-tight text-[#1d1d1f] md:text-4xl">
                    <AnimatedNumber
                      value={s.value}
                      prefix={s.prefix}
                      suffix={s.suffix}
                      decimals={s.decimals}
                    />
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#6e6e73]">{s.label}</p>
                  <a href={s.url} target="_blank" rel="noreferrer" className="mt-2 block text-[11px] leading-snug text-[#86868b] underline-offset-2 hover:underline">
                    {s.fonte} ↗
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={200} className="mx-auto mt-20 max-w-6xl px-6">
          <p className="mb-8 text-xs font-medium uppercase tracking-widest text-[#86868b]">
            Empresas mapeadas nesta pesquisa
          </p>
          <LogoStrip companies={stripCompanies} />
        </Reveal>
      </section>
    </>
  );
}
