import { dores } from "@/lib/data";
import { Reveal } from "@/components/motion";

const Card = ({
  titulo,
  itens,
  className = "",
}: {
  titulo: string;
  itens: string[];
  className?: string;
}) => (
  <div
    className={`rounded-3xl bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] ${className}`}
  >
    <p className="text-base font-semibold text-[#1d1d1f]">{titulo}</p>
    <ul className="mt-5 space-y-3.5">
      {itens.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#6e6e73]">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d2d2d7]" />
          {item}
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
            Cada dor é uma porta de entrada comercial. O tributário é a maior de todas — e a
            reforma de 2026 vai obrigar todo mundo a reescrever a esteira.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card titulo="Tributário — a dor nº 1" itens={dores.tributario} className="md:col-span-2" />
          <Card titulo="Financeiro" itens={dores.financeiro} />
          <Card titulo="Operação e logística" itens={dores.operacao} />
          <Card titulo="Regulação e compliance" itens={dores.regulacao} />
          <Card titulo="Comercial e estrutural" itens={dores.comercial} />
        </div>
      </div>
    </section>
  );
}
