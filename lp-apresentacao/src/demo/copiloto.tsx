"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Loader2, Sparkles, X } from "lucide-react";

type Msg = { de: "voce" | "ia"; texto: string; ms?: number; erro?: boolean };

const SUGESTOES = [
  "Qual UF tem o maior risco agora e o que eu faço primeiro?",
  "Onde crescer primeiro com a estrutura que já temos?",
  "O que acontece com o custo do diesel se a subvenção cair?",
  "Quais prazos regulatórios vencem nos próximos 30 dias?",
];

// negrito simples (**texto**) e quebras de linha, sem HTML cru
function Texto({ t }: { t: string }) {
  return (
    <p className="whitespace-pre-wrap">
      {t.split(/(\*\*[^*]+\*\*)/g).map((parte, i) => (parte.startsWith("**") && parte.endsWith("**") ? <strong key={i}>{parte.slice(2, -2)}</strong> : <span key={i}>{parte}</span>))}
    </p>
  );
}

export function Copiloto({ painel }: { painel: Record<string, unknown> }) {
  const [aberto, setAberto] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [texto, setTexto] = useState("");
  const [carregando, setCarregando] = useState(false);
  const fim = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fim.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, carregando]);

  useEffect(() => {
    if (!aberto) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [aberto]);

  async function perguntar(q: string) {
    const pergunta = q.trim();
    if (!pergunta || carregando) return;
    setTexto("");
    setMsgs((m) => [...m, { de: "voce", texto: pergunta }]);
    setCarregando(true);
    try {
      const r = await fetch("/api/copiloto", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ pergunta, painel }) });
      const j = await r.json();
      setMsgs((m) => [...m, j.resposta ? { de: "ia", texto: j.resposta, ms: j.ms } : { de: "ia", texto: j.erro ?? "Sem resposta.", erro: true }]);
    } catch {
      setMsgs((m) => [...m, { de: "ia", texto: "Não consegui falar com o copiloto nesta máquina.", erro: true }]);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setAberto(true)}
        className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-[11px] font-semibold text-background shadow-sm transition-opacity hover:opacity-90"
      >
        <Sparkles className="h-3.5 w-3.5" />
        Copiloto
      </button>

      {aberto && (
        <div className="fixed inset-0 z-[70] flex justify-end bg-black/30 backdrop-blur-[2px]" onClick={() => setAberto(false)}>
          <aside
            role="dialog"
            aria-label="Copiloto de operações"
            className="flex h-full w-full max-w-md flex-col bg-background text-foreground shadow-2xl ring-1 ring-foreground/10"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="rounded-lg bg-secondary p-1.5 ring-1 ring-foreground/[0.07]">
                <Sparkles className="h-4 w-4 text-foreground/70" />
              </span>
              <div>
                <p className="text-[13px] font-semibold">Copiloto de Operações</p>
                <p className="text-[10.5px] text-muted-foreground">Claude ao vivo · lê o painel, as cotações, o radar e o mapa de calor</p>
              </div>
              <button type="button" onClick={() => setAberto(false)} className="ml-auto rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="Fechar">
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-[12.5px] leading-relaxed">
              {msgs.length === 0 && (
                <div className="space-y-2">
                  <p className="text-muted-foreground">Pergunte sobre a operação. O copiloto só responde com o que está no painel e diz o que é dado público e o que é simulado.</p>
                  {SUGESTOES.map((s) => (
                    <button key={s} type="button" onClick={() => perguntar(s)} className="block w-full rounded-xl bg-secondary px-3 py-2 text-left text-[12px] text-foreground/85 transition-colors hover:bg-secondary/70">
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {msgs.map((m, i) =>
                m.de === "voce" ? (
                  <div key={i} className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-foreground px-3 py-2 text-background">
                    {m.texto}
                  </div>
                ) : (
                  <div key={i} className={`max-w-[92%] rounded-2xl rounded-bl-md px-3 py-2 ${m.erro ? "bg-secondary text-muted-foreground ring-1 ring-foreground/10" : "bg-secondary text-foreground"}`}>
                    <Texto t={m.texto} />
                    {m.ms !== undefined && <p className="mt-1.5 text-[10px] text-muted-foreground">Claude · {(m.ms / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} s</p>}
                  </div>
                ),
              )}
              {carregando && (
                <div className="flex items-center gap-2 text-[11.5px] text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> analisando o painel…
                </div>
              )}
              <div ref={fim} />
            </div>

            <form
              className="flex items-end gap-2 border-t border-border px-4 py-3"
              onSubmit={(e) => {
                e.preventDefault();
                perguntar(texto);
              }}
            >
              <textarea
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    perguntar(texto);
                  }
                }}
                rows={2}
                maxLength={600}
                placeholder="Ex.: qual praça tem a pior margem de diesel?"
                className="min-h-[44px] flex-1 resize-none rounded-xl bg-secondary px-3 py-2 text-[12.5px] outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-foreground/20"
              />
              <button type="submit" disabled={!texto.trim() || carregando} className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background disabled:opacity-40" aria-label="Enviar">
                <ArrowUp className="h-4 w-4" />
              </button>
            </form>
          </aside>
        </div>
      )}
    </>
  );
}
