"use client";

import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { FOTO, RESERVA_AO_VIVO, type Indicador } from "./mercado";

// Faixa "Mercado agora": dado público real (ao vivo ou foto datada), sempre com fonte e data.
export function FaixaMercado() {
  const [itens, setItens] = useState<Indicador[] | null>(null);

  useEffect(() => {
    let vivo = true;
    fetch("/api/mercado")
      .then((r) => r.json())
      .then((d) => vivo && setItens(d.indicadores))
      .catch(() => vivo && setItens([...RESERVA_AO_VIVO, ...FOTO]));
    return () => {
      vivo = false;
    };
  }, []);

  return (
    <section aria-label="Mercado agora — dados públicos" className="rounded-2xl bg-card p-3 ring-1 ring-foreground/[0.07]">
      <div className="mb-2 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/40 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
        </span>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Mercado agora · dado público real</p>
        <p className="ml-auto hidden text-[10px] text-muted-foreground sm:block">passe o mouse para ver a fonte</p>
      </div>
      <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:thin]">
        {(itens ?? Array.from({ length: 7 }, () => null)).map((i, k) =>
          i ? (
            <a
              key={i.id}
              href={i.url}
              target="_blank"
              rel="noreferrer"
              title={`${i.fonte} · ${i.data}${i.modo === "ao vivo" ? " · atualizado automaticamente" : " · valor publicado na data indicada"}`}
              className="group min-w-[188px] snap-start rounded-xl bg-secondary px-3 py-2 transition-colors hover:bg-secondary/70"
            >
              <p className="flex items-center gap-1 whitespace-nowrap text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {i.rotulo}
                <ExternalLink className="h-2.5 w-2.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </p>
              <p className="mt-0.5 flex items-baseline gap-1 whitespace-nowrap">
                <span className="text-[16px] font-semibold tabular-nums tracking-tight text-foreground">{i.valor}</span>
                {i.unidade && <span className="text-[10.5px] text-muted-foreground">{i.unidade}</span>}
                {i.variacao !== undefined && (
                  <span className="ml-auto inline-flex items-center pl-1 text-[10.5px] tabular-nums text-muted-foreground">
                    {i.variacao >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {(i.variacao >= 0 ? "+" : "") + i.variacao.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                  </span>
                )}
              </p>
              <p className="mt-0.5 truncate text-[10px] text-muted-foreground">{i.detalhe}</p>
              <p className="mt-1 flex items-center gap-1 text-[9.5px] text-muted-foreground">
                <span className={`rounded-full px-1.5 py-px ${i.modo === "ao vivo" ? "bg-foreground text-background" : "ring-1 ring-foreground/15"}`}>{i.modo}</span>
                {i.data}
              </p>
            </a>
          ) : (
            <div key={k} className="h-[86px] min-w-[188px] animate-pulse rounded-xl bg-secondary" />
          ),
        )}
      </div>
    </section>
  );
}
