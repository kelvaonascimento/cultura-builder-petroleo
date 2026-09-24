import { fontes, fontesPrimarias } from "@/lib/data";

export function Final() {
  return (
    <>
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-[#1d1d1f] md:text-3xl">
            Como ler esta pesquisa.
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              [
                "Núcleo duro",
                "Receitas do Valor 1000 (balanços auditados na CVM), planilha oficial da ANP (RenovaBio) e Boletim de Reservas 2025 — verificadas nos arquivos do projeto.",
              ],
              [
                "Imprensa major",
                "Cases de IA brasileiros (Vibra, Raízen, Braskem, Petrobras) declarados em veículos nacionais e canais oficiais das empresas.",
              ],
              [
                "Estimativas marcadas",
                "Benchmarks internacionais e modelagens próprias estão identificadas como ordens de grandeza — nada está apresentado como medida auditada.",
              ],
            ].map(([t, d]) => (
              <div key={t} className="rounded-3xl bg-[#f5f5f7] p-8">
                <p className="text-base font-semibold text-[#1d1d1f]">{t}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#6e6e73]">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-xs leading-relaxed text-[#86868b]">
            A simulação operacional da seção anterior usa uma empresa fictícia com dados
            sintéticos gerados em tempo real — nenhum número da demo representa uma empresa
            real. Os benchmarks de mercado citados na torre (Vibra, Petrobras, ANP) são os
            mesmos auditados nesta página.
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
              Cultura Builder · Documento de apresentação (não é captação de leads) ·
              Setembro 2026 · Dados de fontes públicas; números conforme citado nas fontes.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
