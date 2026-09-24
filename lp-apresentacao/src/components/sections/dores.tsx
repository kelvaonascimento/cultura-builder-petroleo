import { dores, type Item } from "@/lib/data";
import { Reveal } from "@/components/motion";

const Card = ({
  titulo,
  itens,
  className = "",
}: {
  titulo: string;
  itens: Item[];
  className?: string;
}) => (
  <div
    className={`rounded-3xl bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] ${className}`}
  >
    <p className="text-base font-semibold text-[#1d1d1f]">{titulo}</p>
    <ul className="mt-5 space-y-3.5">
      {itens.map((item) => (
        <li key={item.texto} className="flex gap-3 text-sm leading-relaxed text-[#6e6e73]">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d2d2d7]" />
          <span>
            {item.texto}{" "}
            <a href={item.fonte.url} target="_blank" rel="noreferrer" className="whitespace-nowrap text-[11px] text-[#86868b] underline-offset-2 hover:underline">
              {item.fonte.rotulo} ↗
            </a>
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export function Dores() {
  return (
    <section id="dores" className="bg-[#f5f5f7] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-sm font-medium text-[#6e6e73]">Dores do mercado</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#1d1d1f] md:text-6xl">
            Onde o setor sangra.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#6e6e73]">
            Cada dor é uma porta de entrada — e todas estão em documento oficial. Tributo, subvenção e mistura mudam por
            ato do governo; a margem de cada praça está sob a régua da ANP.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card titulo="Tributário" itens={dores.tributario} className="md:col-span-2" />
          <Card titulo="Financeiro" itens={dores.financeiro} />
          <Card titulo="Operação e logística" itens={dores.operacao} />
          <Card titulo="Regulação e compliance" itens={dores.regulacao} />
          <Card titulo="Comercial e estrutural" itens={dores.comercial} />
        </div>
      </div>
    </section>
  );
}
