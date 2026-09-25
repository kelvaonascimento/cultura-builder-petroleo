// Retrato completo do painel que o agente recebe a cada pergunta: todas as telas, no estado de agora.
// O servidor junta a isso o que é dado público (mercado ao vivo, radar regulatório, mapa de calor, malha e margem por praça).
import { margemPorProduto, margemRsM3, SISTEMAS, type SimData } from "@/components/sections/demo-sim";
import { estoqueValorizado, hojeAteAgora, mesAteAgora, renovabio } from "./dono";

const r2 = (v: number) => Math.round(v * 100) / 100;

export function montarPainel(sim: SimData, tela: string) {
  const hoje = hojeAteAgora(sim);
  const mes = mesAteAgora(sim);
  const est = estoqueValorizado(sim);
  const rb = renovabio();
  return {
    observacao: "Números SIMULADOS da empresa fictícia, exceto os campos com 'dado_publico' no nome.",
    tela_aberta: tela,
    modo: sim.modo === "integrada" ? "Integrada (agentes de IA ativos)" : "Manual (processos humanos)",
    hora_simulada: sim.hora,
    hoje: {
      volume_m3: r2(hoje.volume),
      receita_rs: hoje.receita,
      margem_bruta_rs: hoje.margem,
      margem_bruta_rs_por_m3: r2(margemRsM3(sim.precos)),
      frete_rs: hoje.frete,
      despesas_rs: hoje.despesas,
      resultado_operacional_rs: hoje.resultado,
      janela_cumprida_pct: sim.janela,
      km_vazio_pct: sim.kmVazio,
      alertas_abertos: sim.alertas,
      nfe_emitidas: sim.nfe,
    },
    mes_ate_agora: {
      mes: mes.nome,
      dia: mes.dia,
      dias_no_mes: mes.diasNoMes,
      linhas: mes.linhas.map((l) => ({
        linha: l.rotulo,
        unidade: l.un,
        orcado: l.orcado,
        realizado: l.realizado,
        projecao_fechamento: l.projecao,
        desvio_projecao_vs_orcado_pct: r2(l.desvioPct),
      })),
    },
    margem_bruta_por_produto_rs_m3: Object.fromEntries(Object.entries(margemPorProduto(sim.precos)).map(([k, v]) => [k, r2(v)])),
    precos_por_base: sim.precos.map((p) => ({
      produto: p.produto,
      base: p.base,
      preco_venda_rs_l: p.preco,
      custo_reposicao_rs_l: p.custo,
      preco_sugerido_rs_l: p.sugerido,
      preco_concorrente_rs_l: p.concorrente,
      piso_margem_rs_m3: 380,
    })),
    estoque: {
      total_m3: est.m3,
      valor_a_custo_rs: est.valor,
      ocupacao_da_tancagem_pct: r2(est.ocupacaoPct),
      cobertura_dias: r2(est.coberturaDias),
      variacao_do_valor_por_reajuste_de_10_centavos_por_litro_rs: est.porDezCentavos,
      tanques: est.linhas.map((l) => ({ base: l.base, produto: l.produto, estoque_m3: l.m3, capacidade_m3: l.cap, valor_rs: l.valor, cobertura_dias: l.dias })),
    },
    renovabio_2026: {
      meta_nacional_dado_publico_ANP_cbios: rb.metaNacional,
      meta_da_empresa_cbios: rb.meta,
      participacao_da_empresa_no_mercado_pct: r2(rb.participacaoPct),
      cbios_aposentados: rb.aposentados,
      cbios_faltando: rb.faltam,
      preco_cbio_dado_publico_B3_rs: rb.preco,
      preco_cbio_data: rb.precoData,
      custo_para_fechar_a_meta_rs: rb.custoFaltante,
      prazo_dado_publico: "31/12/2026",
      dias_ate_o_prazo: rb.diasAtePrazo,
    },
    caixa: {
      ultimos_dias: sim.caixa.slice(-5).map((c) => ({ dia: c.d, recebimentos_rs: c.in, pagamentos_rs: c.out })),
      carteira_vencida_sem_acordo_rs: sim.vencidoTotal,
      carteira_por_faixa_de_atraso_rs: sim.aging,
      fila_de_cobranca_hoje: sim.cobrancas.map((c) => ({ titulo: c.id, cliente: c.posto, valor_rs: c.valor, dias_de_atraso: c.dias, situacao: c.status })),
    },
    pedidos_na_fila: sim.ordens.map((o) => ({
      pedido: o.id,
      cliente: o.posto,
      cidade: o.cidade,
      produto: o.produto,
      volume_l: o.volume,
      valor_rs: o.valor,
      score_de_credito: o.score,
      etapa: `${Math.min(o.step, 8)}/8`,
      sistema_atual: SISTEMAS[o.step] ?? "concluído",
    })),
    cotacoes: sim.cotacoes.map((c) => ({ cotacao: c.id, cliente: c.posto, cidade: c.cidade, produto: c.produto, volume_l: c.volume, valor_rs: c.valor, respondida: c.respEm !== null })),
    cargas_em_rota: sim.rotas
      .filter((r) => r.prog < 100)
      .map((r) => ({ carga: r.id, de: `Base ${r.de}`, para: r.para, produto: r.produto, volume_l: r.volume, progresso_pct: Math.round(r.prog), fora_da_janela: r.atrasada, caminhao: r.placa })),
    agentes_de_ia: sim.agentes.map((a) => ({ agente: a.nome, foco: a.foco, execucoes_hoje: a.execs, impacto_estimado_rs: r2(a.impacto), ultima_acao: a.ultima })),
    incidentes: sim.incidentes.map((i) => ({ incidente: i.id, tipo: i.tipo, local: i.local, nivel: i.nivel, situacao: i.status })),
    acoes_esperando_aprovacao: sim.acoes.filter((a) => !a.usada).map((a) => a.msg),
    captacao_bandeira_branca_dado_publico_ANP: [
      { municipio: "Luís Eduardo Magalhães/BA", postos_bandeira_branca: 31, postos_total: 40 },
      { municipio: "Petrolina/PE", postos_bandeira_branca: 46, postos_total: 83 },
      { municipio: "Anápolis/GO", postos_bandeira_branca: 46, postos_total: 91 },
    ],
  };
}
