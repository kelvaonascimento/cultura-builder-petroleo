"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Reveal } from "@/components/motion";
import { SOFTWARES, SETORES } from "@/lib/softwares";

function Monogram({ name }: { name: string }) {
  const ini = name
    .replace(/\(.*\)/, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1d1d1f] text-sm font-bold text-white">
      {ini}
    </div>
  );
}

function Logo({ src, name }: { src: string; name: string }) {
  const [falhou, setFalhou] = useState(false);
  if (!src || falhou) return <Monogram name={name} />;
  return (
    <div className="flex h-10 w-10 items-center justify-center">
      {/* logos oficiais fornecidos em /logos/softwares — ver licenças no doc 09 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={name} className="max-h-10 max-w-10 object-contain" onError={() => setFalhou(true)} />
    </div>
  );
}

export function Stack() {
  const [setor, setSetor] = useState<string>(SETORES[0].id);
  const itens = SOFTWARES.filter((s) => s.s === setor);

  return (
    <section id="stack" className="mx-auto w-full max-w-6xl px-6 py-28 md:py-40">
      <Reveal>
        <p className="text-sm font-medium text-[#6e6e73]">Ecossistema de software</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#1d1d1f] md:text-6xl">
          O setor inteiro roda nesses sistemas.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#6e6e73]">
          Da petroleira ao posto de bairro: este é o stack real do setor de combustíveis no
          Brasil. A Cultura Builder não substitui nenhum deles — conecta, automatiza e injeta
          IA no espaço entre eles.
        </p>
      </Reveal>

      <Reveal className="mt-14">
        <Tabs
          value={setor}
          onValueChange={(v) => setSetor(v as string)}
          className="gap-0"
        >
          <TabsList className="flex h-auto w-full flex-wrap gap-2 rounded-none border-0 bg-transparent p-0">
            {SETORES.map((s) => (
              <TabsTrigger
                key={s.id}
                value={s.id}
                className="h-auto rounded-full border-0 bg-[#f5f5f7] px-5 py-2.5 text-sm font-medium text-[#6e6e73] shadow-none data-active:bg-[#1d1d1f] data-active:text-white"
              >
                {s.nome}
              </TabsTrigger>
            ))}
          </TabsList>
          {SETORES.map((s) => (
            <TabsContent key={s.id} value={s.id} className="mt-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {itens.map((it) => (
                  <div
                    key={it.k}
                    className="flex items-start gap-4 rounded-3xl border border-[#e5e5ea] bg-white p-5"
                  >
                    <Logo src={it.logo} name={it.n} />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate text-[15px] font-semibold text-[#1d1d1f]">{it.n}</p>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            it.c === "brasil"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-[#f5f5f7] text-[#6e6e73]"
                          }`}
                        >
                          {it.c === "brasil" ? "Brasil" : "Global"}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[13px] leading-snug text-[#6e6e73]">{it.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Reveal>

      <Reveal className="mt-10">
        <p className="text-xs leading-relaxed text-[#6e6e73]">
          Logos: referência de ecossistema, uso de imprensa (Simple Icons / favicons oficiais —
          licenças no doc 09). 45 de 45 logos prontos; WebPosto em 36px, trocar por press kit
          HD no design final. Catálogo é mapeamento de mercado, não censo auditado por
          empresa — a leitura de software em uso virá da troca direta em cada reunião. Lincros
          é do grupo Sankhya desde set/2025.
        </p>
      </Reveal>
    </section>
  );
}
