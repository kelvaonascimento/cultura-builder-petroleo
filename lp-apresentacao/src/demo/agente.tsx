"use client";

// Agente de Operações ao vivo: vê a operação (regras locais, custo zero) e responde perguntas com o Claude desta máquina, em fluxo.
import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, Loader2, RotateCcw, Sparkles, X } from "lucide-react";
import type { SimData } from "@/components/sections/demo-sim";
import { VERDE_VIVO } from "./cores";
import { observar, type Observacao } from "./observador";
import { montarPainel } from "./painel";
import { ehViewId, VIEW_DEFS, type ViewId } from "./telas";

export type MsgAgente = { de: "voce" | "ia"; texto: string; ms?: number; erro?: boolean; telas?: ViewId[]; fluindo?: boolean };

const TOKEN_TELA = /\[\[tela:([a-z]+)\]\]/g;
// tira os códigos de tela (e um código ainda incompleto no fim, durante o fluxo)
const limpar = (t: string) => t.replace(TOKEN_TELA, "").replace(/\[\[[^\]]*$/, "").trimEnd();

const SUGESTOES = [
  "Como fecha o mês se o ritmo de hoje continuar?",
  "Qual praça tem a pior margem depois do frete?",
  "Quanto me custa fechar a meta do RenovaBio hoje?",
  "O que muda no diesel se a subvenção cair?",
];

export function useAgente(sim: SimData, tela: string) {
  const [msgs, setMsgs] = useState<MsgAgente[]>([]);
  const [ocupado, setOcupado] = useState(false);

  async function perguntar(q: string) {
    const pergunta = q.trim();
    if (!pergunta || ocupado) return;
    const historico = msgs.filter((m) => !m.erro && m.texto).slice(-6).map((m) => ({ de: m.de, texto: limpar(m.texto) }));
    const painel = montarPainel(sim, tela);
    setMsgs((m) => [...m, { de: "voce", texto: pergunta }, { de: "ia", texto: "", fluindo: true }]);
    setOcupado(true);
    const ultima = (f: (m: MsgAgente) => MsgAgente) => setMsgs((ms) => ms.map((m, i) => (i === ms.length - 1 ? f(m) : m)));
    try {
      const r = await fetch("/api/copiloto", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ pergunta, historico, painel }) });
      const tipo = r.headers.get("content-type") ?? "";
      if (!r.ok || !r.body || tipo.includes("application/json")) {
        const j = (await r.json().catch(() => ({}))) as { erro?: string };
        ultima(() => ({ de: "ia", texto: j.erro ?? `Não consegui falar com o agente (${r.status}).`, erro: true }));
        return;
      }
      const leitor = r.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      let texto = "";
      for (;;) {
        const { value, done } = await leitor.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        let i: number;
        while ((i = buf.indexOf("\n")) >= 0) {
          const linha = buf.slice(0, i).trim();
          buf = buf.slice(i + 1);
          if (!linha) continue;
          const ev = JSON.parse(linha) as { t: string; v?: string; ms?: number };
          if (ev.t === "d" && ev.v) {
            texto += ev.v;
            const t = texto;
            ultima((m) => ({ ...m, texto: t }));
          } else if (ev.t === "fim") {
            const telas = [...new Set([...texto.matchAll(TOKEN_TELA)].map((x) => x[1]).filter(ehViewId))].slice(0, 2);
            const t = texto;
            ultima((m) => ({ ...m, texto: limpar(t), telas, ms: ev.ms, fluindo: false }));
          } else if (ev.t === "erro") {
            ultima(() => ({ de: "ia", texto: ev.v ?? "Erro no agente.", erro: true }));
          }
        }
      }
      ultima((m) => (m.fluindo ? { ...m, texto: limpar(m.texto) || "Sem resposta.", fluindo: false } : m));
    } catch {
      ultima(() => ({ de: "ia", texto: "Não consegui falar com o agente nesta máquina.", erro: true }));
    } finally {
      setOcupado(false);
    }
  }

  return { msgs, ocupado, perguntar, recomecar: () => setMsgs([]) };
}

export type Agente = ReturnType<typeof useAgente>;

const COR_NIVEL: Record<Observacao["nivel"], string> = { alta: "var(--destructive)", media: "#d97706", info: "var(--muted-foreground)" };

// negrito (**texto**), itálico (*texto*) e quebras de linha, sem HTML cru
function Texto({ t }: { t: string }) {
  return (
    <p className="whitespace-pre-wrap">
      {t.split(/(\*\*[^*]+\*\*|\*[^*\n]+\*)/g).map((parte, i) =>
        parte.startsWith("**") && parte.endsWith("**") && parte.length > 4 ? (
          <strong key={i}>{parte.slice(2, -2)}</strong>
        ) : parte.startsWith("*") && parte.endsWith("*") && parte.length > 2 ? (
          <em key={i} className="text-muted-foreground">
            {parte.slice(1, -1)}
          </em>
        ) : (
          <span key={i}>{parte}</span>
        ),
      )}
    </p>
  );
}

export function AvatarAgente({ tamanho = "h-8 w-8" }: { tamanho?: string }) {
  return (
    <span className={`relative flex ${tamanho} shrink-0 items-center justify-center rounded-full bg-foreground text-background`}>
      <Sparkles className="h-4 w-4" />
      <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:hidden" style={{ background: VERDE_VIVO }} />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full ring-2 ring-card" style={{ background: VERDE_VIVO }} />
      </span>
    </span>
  );
}

export function PainelAgente({ sim, agente, onNav, onFechar }: { sim: SimData; agente: Agente; onNav: (v: ViewId) => void; onFechar?: () => void }) {
  const [texto, setTexto] = useState("");
  const fim = useRef<HTMLDivElement>(null);
  const obs = observar(sim);
  const { msgs, ocupado, perguntar, recomecar } = agente;

  useEffect(() => {
    fim.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [msgs]);

  const enviar = (q: string) => {
    setTexto("");
    perguntar(q);
  };

  return (
    <div className="flex h-full min-h-0 flex-col text-foreground">
      <header className="flex items-center gap-2.5 border-b border-border px-4 py-3">
        <AvatarAgente />
        <div className="min-w-0">
          <p className="text-[13px] font-semibold leading-tight">Agente de Operações</p>
          <p className="truncate text-[10.5px] text-muted-foreground">ao vivo · Claude nesta máquina · lê todas as telas</p>
        </div>
        <div className="ml-auto flex items-center gap-0.5">
          {msgs.length > 0 && (
            <button type="button" onClick={recomecar} className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="Recomeçar a conversa" title="Recomeçar a conversa">
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}
          {onFechar && (
            <button type="button" onClick={onFechar} className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="Fechar o agente">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </header>

      <section className="border-b border-border px-4 py-3">
        <p className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Estou vendo agora
          <span className="font-normal normal-case tracking-normal tabular-nums">{sim.hora}</span>
        </p>
        {obs.length === 0 ? (
          <p className="text-[11px] text-muted-foreground">Nada fora do normal na operação agora.</p>
        ) : (
          <ul className="space-y-1.5">
            {obs.slice(0, 3).map((o) => (
              <li key={o.id} className="flex items-start gap-2 rounded-lg bg-secondary px-2.5 py-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: COR_NIVEL[o.nivel] }} aria-label={`prioridade ${o.nivel}`} />
                <button type="button" onClick={() => enviar(o.pergunta)} disabled={ocupado} className="flex-1 text-left text-[11px] leading-snug text-foreground/85 hover:text-foreground disabled:opacity-60" title="Perguntar ao agente">
                  {o.texto}
                </button>
                <button type="button" onClick={() => onNav(o.tela)} className="shrink-0 rounded p-0.5 text-muted-foreground hover:bg-card hover:text-foreground" aria-label={`Abrir ${VIEW_DEFS.find((d) => d.id === o.tela)?.label}`} title={`Abrir ${VIEW_DEFS.find((d) => d.id === o.tela)?.label}`}>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
            {obs.length > 3 && (
              <li className="px-1 text-[10px] text-muted-foreground">
                + {obs.length - 3} {obs.length - 3 === 1 ? "ponto" : "pontos"} de atenção
              </li>
            )}
          </ul>
        )}
      </section>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-3 text-[12.5px] leading-relaxed">
        {msgs.length === 0 && (
          <div className="space-y-2">
            <div className="rounded-2xl rounded-bl-md bg-secondary px-3 py-2 text-foreground">
              Estou acompanhando a operação ao vivo: 5 bases, 24 praças e 30 rotas.{" "}
              {obs.length ? (
                <>
                  Agora vejo {obs.length} {obs.length === 1 ? "ponto" : "pontos"} de atenção — o mais urgente: <strong>{obs[0].texto}</strong>.
                </>
              ) : (
                "Nada fora do normal agora."
              )}{" "}
              Pergunte o que quiser sobre os números do painel.
            </div>
            {SUGESTOES.map((s) => (
              <button key={s} type="button" onClick={() => enviar(s)} disabled={ocupado} className="block w-full rounded-xl px-3 py-2 text-left text-[11.5px] text-foreground/80 ring-1 ring-foreground/10 transition-colors hover:bg-secondary disabled:opacity-60">
                {s}
              </button>
            ))}
          </div>
        )}
        {msgs.map((m, i) =>
          m.de === "voce" ? (
            <div key={i} className="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-foreground px-3 py-2 text-background">
              {m.texto}
            </div>
          ) : (
            <div key={i} className={`max-w-[95%] rounded-2xl rounded-bl-md px-3 py-2 ${m.erro ? "bg-secondary text-muted-foreground ring-1 ring-foreground/10" : "bg-secondary text-foreground"}`}>
              {m.fluindo && !m.texto ? (
                <span className="flex items-center gap-2 text-[11.5px] text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> lendo o painel…
                </span>
              ) : (
                <Texto t={m.fluindo ? limpar(m.texto) + " ▍" : m.texto} />
              )}
              {!!m.telas?.length && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {m.telas.map((t) => (
                    <button key={t} type="button" onClick={() => onNav(t)} className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1 text-[10.5px] font-medium text-foreground ring-1 ring-foreground/10 hover:bg-background">
                      Abrir {VIEW_DEFS.find((d) => d.id === t)?.label} <ArrowUpRight className="h-3 w-3" />
                    </button>
                  ))}
                </div>
              )}
              {m.ms !== undefined && <p className="mt-1.5 text-[10px] text-muted-foreground">Claude · {(m.ms / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} s</p>}
            </div>
          ),
        )}
        <div ref={fim} />
      </div>

      <form
        className="flex items-end gap-2 border-t border-border px-3 py-3"
        onSubmit={(e) => {
          e.preventDefault();
          enviar(texto);
        }}
      >
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              enviar(texto);
            }
          }}
          rows={2}
          maxLength={600}
          placeholder="Pergunte sobre a operação…"
          aria-label="Pergunta para o agente"
          className="min-h-[44px] flex-1 resize-none rounded-xl bg-secondary px-3 py-2 text-[12.5px] outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-foreground/20"
        />
        <button type="submit" disabled={!texto.trim() || ocupado} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background disabled:opacity-40" aria-label="Enviar pergunta">
          {ocupado ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUp className="h-4 w-4" />}
        </button>
      </form>
    </div>
  );
}
