import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { PRAZOS, RADAR } from "@/demo/regulacao-dados";
import { UFS } from "@/demo/calor-dados";
import malha from "@/demo/malha.json";

// Copiloto do DEMO: usa o Claude Code CLI da própria máquina (conta de quem apresenta), sem chave de API.
// Só atende chamadas locais — em produção (ou sem o CLI) responde 503 e a tela avisa.
export const dynamic = "force-dynamic";

const CLAUDE = process.env.CLAUDE_BIN ?? `${homedir()}/.local/bin/claude`;
const MODELO = process.env.COPILOTO_MODELO ?? "claude-sonnet-5";

function local(req: Request) {
  const host = (req.headers.get("host") ?? "").split(":")[0];
  return host === "localhost" || host === "127.0.0.1";
}

function rodarClaude(prompt: string): Promise<{ texto: string; ms: number }> {
  return new Promise((ok, falha) => {
    const p = spawn(CLAUDE, ["-p", "--model", MODELO, "--output-format", "json", "--disallowedTools", "*"], { stdio: ["pipe", "pipe", "pipe"] });
    let out = "";
    let err = "";
    const timer = setTimeout(() => {
      p.kill();
      falha(new Error("tempo esgotado"));
    }, 60_000);
    p.stdout.on("data", (d) => (out += d));
    p.stderr.on("data", (d) => (err += d));
    p.on("error", (e) => {
      clearTimeout(timer);
      falha(e);
    });
    p.on("close", (code) => {
      clearTimeout(timer);
      try {
        const j = JSON.parse(out);
        if (j.is_error || code !== 0) return falha(new Error(j.result || err || `código ${code}`));
        ok({ texto: String(j.result ?? "").trim(), ms: j.duration_ms ?? 0 });
      } catch {
        falha(new Error(err || out || `código ${code}`));
      }
    });
    p.stdin.end(prompt);
  });
}

export async function POST(req: Request) {
  if (!local(req)) return Response.json({ erro: "O copiloto ao vivo só roda na apresentação local (localhost)." }, { status: 403 });
  if (!existsSync(CLAUDE)) return Response.json({ erro: "Claude CLI não encontrado nesta máquina — o copiloto ao vivo roda só no computador da apresentação." }, { status: 503 });

  const { pergunta, painel } = (await req.json()) as { pergunta?: string; painel?: unknown };
  const q = String(pergunta ?? "").slice(0, 600).trim();
  if (!q) return Response.json({ erro: "Pergunta vazia." }, { status: 400 });

  let mercado: unknown = null;
  try {
    mercado = (await (await fetch(new URL("/api/mercado", req.url))).json()).indicadores;
  } catch {
    mercado = "indisponível agora";
  }

  const dados = {
    empresa: "Distribuidora Horizonte — empresa FICTÍCIA de demonstração (porte calibrado numa regional grande com dados públicos da ANP)",
    painel_simulado: painel ?? null,
    mercado_dado_publico: mercado,
    radar_regulatorio_dado_publico: RADAR.map((r) => ({ tema: r.titulo, categoria: r.categoria, severidade: r.severidade, situacao: r.situacao, data: r.data, impacto: r.impacto, fonte: r.fonte.rotulo })),
    prazos_oficiais: PRAZOS,
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
      refinarias_e_portos_reais: malha.nos.filter((n) => n.real && n.tipo !== "praca").map((n) => n.nome),
      pracas: malha.nos.filter((n) => n.tipo === "praca").map((n) => `${n.nome}/${n.uf}`),
    },
  };

  const prompt = `Você é o Copiloto de Operações da Distribuidora Horizonte, uma empresa FICTÍCIA usada numa demonstração da Cultura Builder para executivos do setor de combustíveis.

Regras:
- Responda em português do Brasil, sem palavras em inglês, direto ao ponto, em no máximo 7 linhas (use tópicos curtos quando ajudar).
- Use APENAS os dados abaixo. Se a resposta não estiver nos dados, diga que esse dado não está no painel. Não invente números, normas nem fatos.
- Diga de onde vem cada número: "dado público (fonte)" ou "simulado".
- Dinheiro sempre exato, como aparece nos dados (nunca arredonde nem abrevie em mil/mi/bi).
- Quando fizer sentido, termine com uma recomendação prática e o ponto que precisa de aprovação humana.

DADOS DO PAINEL (JSON):
${JSON.stringify(dados)}

PERGUNTA DO EXECUTIVO: ${q}`;

  try {
    const r = await rodarClaude(prompt);
    return Response.json({ resposta: r.texto, ms: r.ms, modelo: MODELO });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    const deslogado = /Command failed|not logged|login|auth/i.test(msg) || msg.trim() === "";
    return Response.json({ erro: deslogado ? "O Claude desta máquina não respondeu — rode /login no Claude Code e tente de novo." : `Falha no copiloto: ${msg.slice(0, 200)}` }, { status: 502 });
  }
}
