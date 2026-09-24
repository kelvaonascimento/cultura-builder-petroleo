import { fontes, fontesPrimarias } from "@/lib/data";

export function Final() {
  return (
    <>
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-3xl bg-[#1d1d1f] p-10 text-white md:p-14">
            <p className="text-sm font-medium text-white/60">Próximo passo</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
              Um processo, duas semanas, um piloto funcionando com os seus dados.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              Escolhemos juntos um processo da operação — margem por praça, conciliação fiscal, suprimento ou atendimento
              B2B —, medimos quanto tempo ele consome hoje e entregamos um piloto rodando sobre os dados que a empresa já tem.
            </p>
          </div>
          <h2 className="mt-16 text-2xl font-semibold tracking-tight text-[#1d1d1f] md:text-3xl">
            Como ler esta pesquisa.
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              [
                "Dado oficial",
                "Vendas, postos, reservas, produção e RenovaBio vêm dos dados abertos da ANP; leis e MPs do Planalto; ICMS do CONFAZ; câmbio e Selic do Banco Central; Brent da EIA. Cada número tem link e data.",
              ],
              [
                "Casos de IA",
                "Só entram casos com comunicado oficial da empresa ou reportagem identificada, com veículo e data. O que não tinha fonte confirmável foi retirado.",
              ],
              [
                "Simulação marcada",
                "A DEMO usa uma empresa fictícia: os números internos dela são simulados e aparecem marcados. Cotações, normas, rotas e dados de mercado são reais.",
              ],
            ].map(([t, d]) => (
              <div key={t} className="rounded-3xl bg-[#f5f5f7] p-8">
                <p className="text-base font-semibold text-[#1d1d1f]">{t}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#6e6e73]">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-xs leading-relaxed text-[#86868b]">
            Na DEMO, nenhum número interno representa uma empresa real: o porte da empresa fictícia foi calibrado em
            padrões públicos do setor, com nomes e cidades trocados.
          </p>
        </div>
      </section>
      <footer className="bg-[#f5f5f7] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm font-semibold text-[#6e6e73]">Fontes primárias (indexadas)</p>
          <ul className="mt-4 grid gap-2 text-xs leading-relaxed md:grid-cols-2">
            {fontesPrimarias.map((f) => (
              <li key={f.url}>
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0066cc] underline decoration-[#0066cc]/30 underline-offset-2 transition-colors hover:decoration-[#0066cc]"
                >
                  {f.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs font-semibold text-[#6e6e73]">Fontes por nível</p>
          <ul className="mt-4 grid gap-2 text-xs leading-relaxed text-[#86868b] md:grid-cols-2">
            {fontes.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div className="mt-10 border-t border-[#d2d2d7] pt-6">
            <p className="text-xs leading-relaxed text-[#86868b]">
              Cultura Builder · Setembro de 2026 · Todos os números com fonte pública e data de referência.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
