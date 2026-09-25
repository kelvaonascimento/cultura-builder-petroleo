// O que o agente "está vendo": regras sobre o estado da simulação, sem chamar o modelo (custo zero).
// Cada observação vira uma pergunta pronta para o agente responder com os dados do painel.
import { fmtDec, fmtRs, type SimData } from "@/components/sections/demo-sim";
import { proximosPrazos } from "./dono";
import type { ViewId } from "./telas";

export type Observacao = { id: string; nivel: "alta" | "media" | "info"; texto: string; pergunta: string; tela: ViewId };

const PISO_MARGEM_M3 = 380; // R$/m³ — o mesmo piso da tela de Precificação
const ORDEM = { alta: 0, media: 1, info: 2 } as const;

export function observar(sim: SimData, agora = new Date()): Observacao[] {
  const obs: Observacao[] = [];

  // prazos regulatórios reais (dado público) que vencem nos próximos 10 dias
  for (const p of proximosPrazos(agora, 6)) {
    if (p.dias === null || p.dias > 10) continue;
    const quando = p.dias === 0 ? "hoje" : p.dias === 1 ? "amanhã" : `em ${p.dias} dias`;
    obs.push({
      id: `prazo-${p.data}`,
      nivel: p.dias <= 3 ? "alta" : "media",
      texto: `${p.o_que} ${quando} (${p.data}) · dado público`,
      pergunta: `${p.o_que} em ${p.data}. O que isso muda na minha operação e o que eu faço antes?`,
      tela: "fiscal",
    });
  }

  for (const t of sim.tanques) {
    if (t.nivel >= 35) continue;
    obs.push({
      id: `tanque-${t.base}-${t.produto}`,
      nivel: t.nivel < 20 ? "alta" : "media",
      texto: `Tanque de ${t.produto} da Base ${t.base} em ${Math.round(t.nivel)}% (${fmtDec(t.cover, 1)} dias de venda)${t.repostaEm > 0 ? " — reposição a caminho" : ""}`,
      pergunta: `O tanque de ${t.produto} da Base ${t.base} está em ${Math.round(t.nivel)}%. Qual o risco de faltar produto e o que eu faço agora?`,
      tela: "suprimento",
    });
  }

  for (const p of sim.precos) {
    const m = Math.round((p.preco - p.custo) * 100_000) / 100;
    if (m >= PISO_MARGEM_M3) continue;
    obs.push({
      id: `piso-${p.base}-${p.produto}`,
      nivel: "alta",
      texto: `${p.produto} na Base ${p.base} com margem de ${fmtRs(m)}/m³, abaixo do piso de R$ 380,00/m³`,
      pergunta: `${p.produto} na Base ${p.base} está abaixo do piso de margem. Quanto estou deixando de ganhar por dia e qual preço você sugere?`,
      tela: "precos",
    });
  }

  const gas = sim.precos.find((p) => p.produto === "Gasolina C" && p.base === "Litoral");
  if (gas && !gas.aplicado && gas.concorrente - gas.preco > 0.01) {
    obs.push({
      id: "folga-gasolina-litoral",
      nivel: "info",
      texto: `Gasolina C na Base Litoral R$ ${fmtDec(gas.concorrente - gas.preco, 3)}/L abaixo do concorrente — dá para subir`,
      pergunta: "Vale subir o preço da gasolina C na Base Litoral? Quanto isso rende por dia?",
      tela: "precos",
    });
  }

  for (const c of sim.cobrancas) {
    if (c.status !== "sem contato" || c.dias <= 60) continue;
    obs.push({
      id: `cobranca-${c.id}`,
      nivel: "media",
      texto: `${c.posto}: ${fmtRs(c.valor)} vencidos há ${c.dias} dias, sem contato`,
      pergunta: `O que eu faço com o ${c.posto}, que deve ${fmtRs(c.valor)} há ${c.dias} dias sem contato?`,
      tela: "financeiro",
    });
  }

  const atrasadas = sim.rotas.filter((r) => r.prog < 100 && r.atrasada);
  if (atrasadas.length) {
    obs.push({
      id: "cargas-fora-da-janela",
      nivel: "media",
      texto: `${atrasadas.length} ${atrasadas.length === 1 ? "carga fora" : "cargas fora"} da janela de entrega (${atrasadas.slice(0, 2).map((r) => r.para).join(", ")})`,
      pergunta: "Quais cargas estão fora da janela de entrega e qual o impacto no cliente?",
      tela: "logistica",
    });
  }

  for (const i of sim.incidentes) {
    if (i.status === "resolvido" || i.nivel !== "alto") continue;
    obs.push({
      id: `incidente-${i.id}`,
      nivel: "alta",
      texto: `Incidente alto: ${i.tipo.toLowerCase()} (${i.local})`,
      pergunta: `Me explique o incidente "${i.tipo}" em ${i.local}: o que aconteceu e o que já foi feito?`,
      tela: "seguranca",
    });
  }

  if (sim.modo === "manual") {
    const semResposta = sim.cotacoes.filter((c) => c.respEm === null).length;
    obs.push({
      id: "modo-manual",
      nivel: "info",
      texto: `Modo manual: ${semResposta} ${semResposta === 1 ? "cotação" : "cotações"} sem resposta e km vazio em ${fmtDec(sim.kmVazio)}%`,
      pergunta: "Quanto a operação manual está me custando hoje em relação à integrada?",
      tela: "comercial",
    });
  }

  return obs.sort((a, b) => ORDEM[a.nivel] - ORDEM[b.nivel]);
}
