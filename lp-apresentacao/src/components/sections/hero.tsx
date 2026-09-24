import { AnimatedNumber, Reveal } from "@/components/motion";
import { LogoStrip } from "@/components/logo";

const nav = [
  { href: "#mercado", label: "Mercado" },
  { href: "#ranking", label: "Ranking" },
  { href: "#empresas", label: "Empresas" },
  { href: "#cadeia", label: "Cadeia" },
  { href: "#ia", label: "IA no setor" },
  { href: "#dores", label: "Dores" },
  { href: "#melhorias", label: "Melhorias" },
  { href: "#demo", label: "Demo" },
];

const stats: {
  value: number;
  prefix: string;
  suffix: string;
  decimals: number;
  label: string;
  fonte: string;
}[] = [
  {
    value: 512,
    prefix: "R$ ",
    suffix: " bi",
    decimals: 0,
    label: "Receita da Petrobras em 2023 — a maior empresa do Brasil.",
    fonte: "Valor 1000 (receita líquida auditada na CVM)",
  },
  {
    value: 120,
    prefix: "US$ ",
    suffix: " mi",
    decimals: 0,
    label: "Economia da Petrobras em 3 semanas com fiscal + IA.",
    fonte: "Case divulgado por fornecedor (Automation Anywhere / TI Inside)",
  },
  {
    value: 49.4,
    prefix: "",
    suffix: "%",
    decimals: 1,
    label: "Dos postos do Nordeste são bandeira branca.",
    fonte: "ANP via imprensa setorial (10.332 postos do NE)",
  },
  {
    value: 25.2,
    prefix: "US$ ",
    suffix: " bi",
    decimals: 1,
    label: "Mercado de IA em óleo & gás em 2034 (vs. 7,6 bi em 2025).",
    fonte: "Pesquisa de mercado secundária — ordem de grandeza",
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
          <span className="flex h-11 items-center text-sm font-semibold text-[#1d1d1f] md:h-auto">Cultura Builder</span>
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
              Pesquisa densa: quem manda, quanto fatura, quem usa IA, quanto ganhou com
              isso, onde o mercado sangra e todo elo melhorável — da sonda ao bico.
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
                  <p className="mt-2 text-[11px] leading-snug text-[#86868b]">{s.fonte}</p>
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
