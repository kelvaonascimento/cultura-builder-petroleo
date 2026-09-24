import { CbLogo } from "@/components/cb-logo";
import { CONTATO, SITE_CB, WHATSAPP_DIAGNOSTICO } from "@/lib/contato";

// Rodapé no padrão do site institucional da Cultura Builder
const colunas: { h: string; links: { t: string; href: string; externo?: boolean }[] }[] = [
  { h: "Plataforma", links: [ { t: "O harness", href: `${SITE_CB}/#plataforma` }, { t: "Qualquer modelo", href: `${SITE_CB}/#modelos` }, { t: "Soberania", href: `${SITE_CB}/#soberania` } ] },
  { h: "Método", links: [ { t: "Implantação e formação", href: `${SITE_CB}/#metodo` }, { t: "Builder dedicado", href: `${SITE_CB}/#builders` } ] },
  { h: "Empresa", links: [ { t: "Casos", href: `${SITE_CB}/#casos` }, { t: "Time", href: `${SITE_CB}/#time` }, { t: "Contato", href: WHATSAPP_DIAGNOSTICO }, { t: "culturabuilder.com", href: "https://culturabuilder.com" } ] },
  { h: "Contato", links: [ { t: CONTATO.email, href: `mailto:${CONTATO.email}` }, { t: CONTATO.telefone, href: `https://wa.me/${CONTATO.whatsapp}` } ] },
];

export function CbFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[rgba(244,245,241,0.11)] bg-[#0A0A0B] pt-14 text-[#F4F5F1] [font-family:var(--font-host),sans-serif] md:pt-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[minmax(0,3.6fr)_repeat(3,minmax(0,2fr))_minmax(0,2.6fr)]">
          <div className="col-span-2 md:col-span-1">
            <CbLogo id="cb-logo-rodape" className="h-7 w-auto text-[#F4F5F1]" />
            <p className="mt-4 max-w-[30ch] text-sm leading-relaxed text-[#8E8F8A]">
              Sua IA, instalada. Seu time, formado. Harness privado, white-label, operado por builders da sua casa.
            </p>
            <a
              href={WHATSAPP_DIAGNOSTICO}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-10 items-center rounded-full border border-[rgba(244,245,241,0.11)] bg-[rgba(244,245,241,0.02)] px-[18px] text-sm font-medium text-[#F4F5F1] transition-colors hover:border-[rgba(244,245,241,0.4)]"
            >
              Agendar diagnóstico
            </a>
          </div>
          {colunas.map((c) => (
            <div key={c.h} className={c.h === "Contato" ? "col-span-2 md:col-span-1" : undefined}>
              <p className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#8E8F8A]">{c.h}</p>
              {c.links.map((l) => (
                <a
                  key={l.t}
                  href={l.href}
                  target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="block py-[5px] text-[14.5px] md:whitespace-nowrap text-[rgba(244,245,241,0.78)] transition-colors hover:text-[#F4F5F1]"
                >
                  {l.t}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-[rgba(244,245,241,0.11)] pt-[22px] font-mono text-[11px] tracking-[0.06em] text-[#8E8F8A] md:mt-16">
          <span>Cultura Builder Educação e Tecnologia Ltda · CNPJ 62.995.760/0001-33</span>
          <span>© 2026 Cultura Builder</span>
        </div>
      </div>
      <div aria-hidden="true" className="relative mt-6 h-[clamp(40px,7.6vw,110px)] overflow-hidden">
        <div className="absolute inset-x-0 top-0 select-none whitespace-nowrap text-center text-[clamp(64px,12.2vw,176px)] font-medium leading-[0.78] tracking-[-0.05em] text-[#18181B]">
          cultura builder
        </div>
      </div>
    </footer>
  );
}
