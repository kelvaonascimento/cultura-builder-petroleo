import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import path from "node:path";
import { PRAZOS, RADAR } from "@/demo/regulacao-dados";
import { UFS } from "@/demo/calor-dados";
import { linhasPracas, type NoMalha, type RotaMalha } from "@/demo/margem-calc";
import malha from "@/demo/malha.json";

// Agente de Operações do DEMO: usa o Claude Code CLI da própria máquina (conta de quem apresenta), sem chave de API.
// Só atende chamadas locais. Responde em fluxo (NDJSON): {"t":"d","v":texto} … {"t":"fim","ms":…} ou {"t":"erro","v":…}.
// Roda em modo seguro, numa pasta neutra: o agente não enxerga CLAUDE.md, memórias nem plugins desta máquina.
export const dynamic = "force-dynamic";

const CLAUDE = process.env.CLAUDE_BIN ?? `${homedir()}/.local/bin/claude`;
const MODELO = process.env.COPILOTO_MODELO ?? "claude-sonnet-5";
// esforço baixo: menos raciocínio antes de escrever, resposta começa mais cedo (dá para subir com COPILOTO_ESFORCO=medium)
const ESFORCO = process.env.COPILOTO_ESFORCO ?? "low";
const TELAS = "cockpit (Cockpit do dono), visao (Visão geral), comercial (Comercial B2B), precos (Precificação), pracas (Margem por praça), rede (Rede e varejo), suprimento, logistica, financeiro, fiscal (Regulação ao vivo), calor (Oportunidades e riscos), ia (Centro de IA), seguranca";

const REGRAS = `Você é o Agente de Operações da Distribuidora Horizonte, uma distribuidora de combustíveis FICTÍCIA usada numa demonstração da Cultura Builder para donos e diretores do setor. Você acompanha o painel ao vivo e responde perguntas sobre a operação.

Regras:
- Responda em português do Brasil, sem palavras em inglês. Seja direto: no máximo 8 linhas; use tópicos curtos quando ajudar.
- Use APENAS os dados enviados na mensagem. Se o dado não estiver lá, diga que o painel não mostra esse dado. Nunca invente número, norma, empresa ou fato.
- Diga a origem de cada número: "dado público (fonte)" ou "simulado".
- Dinheiro sempre exato, como está nos dados, em reais com centavos. Nunca arredonde nem abrevie (nada de mil, mi, bi ou k).
- Quando fizer sentido, feche com uma recomendação prática e diga o que precisa de aprovação humana.
- Use o histórico da conversa quando a pergunta depender dele.
- Se a resposta usar dados de uma tela do painel, termine com uma última linha só com os códigos das telas (no máximo 2), no formato [[tela:codigo]]. Códigos: ${TELAS}.`;

type Msg = { de: "voce" | "ia"; texto: string };

function local(req: Request) {
  const host = (req.headers.get("host") ?? "").split(":")[0];
  return host === "localhost" || host === "127.0.0.1";
}

const NOS = Object.fromEntries((malha as unknown as { nos: NoMalha[] }).nos.map((n) => [n.id, n]));
let ROTAS: RotaMalha[] | null = null;
function rotas(): RotaMalha[] {
  if (!ROTAS) ROTAS = (JSON.parse(readFileSync(path.join(process.cwd(), "public/geo/rotas.json"), "utf8")) as { rotas: RotaMalha[] }).rotas;
  return ROTAS;
}

function mensagemDeErro(msg: string) {
  const deslogado = /Command failed|not logged|login|auth|401/i.test(msg) || msg.trim() === "";
  return deslogado ? "O Claude desta máquina não respondeu — rode /login no Claude Code e tente de novo." : `Falha no agente: ${msg.slice(0, 200)}`;
}

export async function POST(req: Request) {
  if (!local(req)) return Response.json({ erro: "O agente ao vivo só roda na apresentação local (localhost)." }, { status: 403 });
  if (!existsSync(/*turbopackIgnore: true*/ CLAUDE)) return Response.json({ erro: "Claude CLI não encontrado nesta máquina — o agente ao vivo roda só no computador da apresentação." }, { status: 503 });

  const { pergunta, painel, historico } = (await req.json()) as { pergunta?: string; painel?: Record<string, unknown>; historico?: Msg[] };
  const q = String(pergunta ?? "").slice(0, 600).trim();
  if (!q) return Response.json({ erro: "Pergunta vazia." }, { status: 400 });

  let mercado: unknown = null;
  try {
    mercado = (await (await fetch(new URL("/api/mercado", req.url))).json()).indicadores;
  } catch {
    mercado = "indisponível agora";
  }

  // margem por praça com as rotas reais (OSRM) e o frete da ANTT, sobre a margem por produto do painel de agora
  let margemPorPraca: unknown = "indisponível";
  try {
    const base = (painel?.margem_bruta_por_produto_rs_m3 ?? {}) as Record<string, number>;
    margemPorPraca = linhasPracas(rotas(), NOS, base).map((l) => ({
      praca: l.praca,
      origem: l.origem,
      km_rodoviario_dado_publico_OSRM: l.km,
      produto: l.produto,
      margem_na_base_rs_m3_simulada: Math.round(l.base * 100) / 100,
      frete_piso_ANTT_rs_m3_dado_publico: Math.round(l.frete * 100) / 100,
      margem_apos_frete_rs_m3: Math.round(l.apos * 100) / 100,
      distribuicao_e_revenda_na_UF_dado_publico_Petrobras_rs_l: l.refUF,
    }));
  } catch {
    /* segue sem a margem por praça */
  }

  const dados = {
    empresa: "Distribuidora Horizonte — empresa FICTÍCIA de demonstração (porte calibrado numa regional grande com dados públicos da ANP)",
    painel_simulado: painel ?? null,
    margem_por_praca: margemPorPraca,
    mercado_dado_publico: mercado,
    radar_regulatorio_dado_publico: RADAR.map((r) => ({ tema: r.titulo, categoria: r.categoria, severidade: r.severidade, situacao: r.situacao, data: r.data, impacto: r.impacto, fonte: r.fonte.rotulo })),
    prazos_oficiais_dado_publico: PRAZOS,
    mapa_de_calor_por_uf: UFS.filter((u) => u.risco !== null || u.enderecavel > 0).map((u) => ({
      uf: u.nome,
      mercado_2025_m3_dado_publico_ANP: u.mercado,
      participacao_simulada_pct: u.share,
      estrutura_simulada: u.estrutura,
      volume_enderecavel_simulado_m3_ano: u.enderecavel,
      indice_risco_simulado: u.risco,
      motivos_risco: u.motivos,
    })),
    malha_logistica: {
      bases_proprias_ficticias: malha.nos.filter((n) => n.tipo === "base").map((n) => `${n.nome} (${n.municipio}/${n.uf})`),
      refinarias_portos_e_terminais_reais: malha.nos.filter((n) => n.real && n.tipo !== "praca").map((n) => n.nome),
      pracas: malha.nos.filter((n) => n.tipo === "praca").map((n) => `${n.nome}/${n.uf}`),
    },
  };

  const conversa = (historico ?? [])
    .slice(-6)
    .map((m) => `${m.de === "voce" ? "EXECUTIVO" : "AGENTE"}: ${String(m.texto ?? "").slice(0, 1500)}`)
    .join("\n");

  const prompt = `DADOS DO PAINEL AGORA (JSON):
${JSON.stringify(dados)}
${conversa ? `\nCONVERSA ATÉ AQUI:\n${conversa}\n` : ""}
PERGUNTA DO EXECUTIVO: ${q}`;

  const enc = new TextEncoder();
  let proc: ChildProcessWithoutNullStreams | null = null;
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      let fechado = false;
      const envia = (o: Record<string, unknown>) => {
        if (!fechado) controller.enqueue(enc.encode(JSON.stringify(o) + "\n"));
      };
      const fecha = () => {
        if (!fechado) {
          fechado = true;
          controller.close();
        }
      };
      // o binário é da máquina de quem apresenta: fora do rastreio de arquivos do build
      const p = spawn(
        /*turbopackIgnore: true*/ CLAUDE,
        ["-p", "--safe-mode", "--no-session-persistence", "--model", MODELO, "--effort", ESFORCO, "--output-format", "stream-json", "--verbose", "--include-partial-messages", "--disallowedTools", "*", "--system-prompt", REGRAS],
        { cwd: tmpdir(), stdio: ["pipe", "pipe", "pipe"] },
      );
      proc = p;
      let buf = "";
      let err = "";
      let texto = "";
      const timer = setTimeout(() => {
        p.kill();
        envia({ t: "erro", v: "O agente demorou demais para responder — tente de novo." });
        fecha();
      }, 90_000);
      p.stdout.on("data", (d: Buffer) => {
        buf += d.toString("utf8");
        let i: number;
        while ((i = buf.indexOf("\n")) >= 0) {
          const linha = buf.slice(0, i).trim();
          buf = buf.slice(i + 1);
          if (!linha) continue;
          let j: { type?: string; event?: { type?: string; delta?: { type?: string; text?: string } }; is_error?: boolean; result?: string; duration_ms?: number };
          try {
            j = JSON.parse(linha);
          } catch {
            continue;
          }
          if (j.type === "stream_event" && j.event?.type === "content_block_delta" && j.event.delta?.type === "text_delta" && j.event.delta.text) {
            texto += j.event.delta.text;
            envia({ t: "d", v: j.event.delta.text });
          } else if (j.type === "result") {
            if (j.is_error) envia({ t: "erro", v: mensagemDeErro(String(j.result ?? "")) });
            else {
              if (!texto && j.result) envia({ t: "d", v: j.result });
              envia({ t: "fim", ms: j.duration_ms ?? 0, modelo: MODELO });
            }
          }
        }
      });
      p.stderr.on("data", (d: Buffer) => (err += d.toString("utf8")));
      p.on("error", (e) => {
        clearTimeout(timer);
        envia({ t: "erro", v: mensagemDeErro(e.message) });
        fecha();
      });
      p.on("close", (code) => {
        clearTimeout(timer);
        if (code !== 0 && !texto) envia({ t: "erro", v: mensagemDeErro(err || `código ${code}`) });
        fecha();
      });
      p.stdin.end(prompt);
    },
    cancel() {
      proc?.kill();
    },
  });

  return new Response(stream, { headers: { "content-type": "application/x-ndjson; charset=utf-8", "cache-control": "no-store" } });
}
