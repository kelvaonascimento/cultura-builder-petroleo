// Radar regulatório (dados públicos reais, situação em 24/09/2026) e os agentes simulados que o monitoram.
// Cada item traz a fonte oficial; os agentes são simulação, mas citam as normas reais abaixo.

export type Categoria = "Tributário" | "ANP" | "Biocombustíveis" | "Compliance" | "Mercado" | "Logística" | "ESG" | "IA";
export type Severidade = "alta" | "média" | "baixa";
export type TipoRadar = "risco" | "oportunidade" | "risco e oportunidade";

export type ItemRadar = {
  id: string;
  titulo: string;
  categoria: Categoria;
  severidade: Severidade;
  tipo: TipoRadar;
  situacao: string;
  data: string;
  impacto: string;
  agente: string;
  fonte: { rotulo: string; url: string };
};

export const RADAR: ItemRadar[] = [
  {
    id: "abusividade",
    titulo: "Margem bruta sob fiscalização por aumento abusivo",
    categoria: "ANP",
    severidade: "alta",
    tipo: "risco",
    situacao: "Res. ANP 1.004/2026 (distribuição): compara a margem bruta do próprio agente entre períodos, com filtro inicial de alta de 70% e 30 dias para comprovar custos. A infração veio das MPs 1.340 e 1.349 (multas de R$ 50.000,00 a R$ 500.000.000,00), que perderam eficácia em 10/07 e 04/08/2026; em 23/09/2026 a ANP anunciou multas de primeira instância a distribuidoras.",
    data: "23/09/2026",
    impacto: "Todo aumento de margem acima do histórico da própria empresa pode virar notificação. Exige série de margem e memória de custo por base e produto.",
    agente: "Agente de Margem",
    fonte: { rotulo: "ANP", url: "https://www.gov.br/anp/pt-br/canais_atendimento/imprensa/noticias-comunicados/anp-aprova-resolucoes-que-estabelecem-criterios-para-caracterizacao-da-elevacao-abusiva-dos-precos-de-combustiveis" },
  },
  {
    id: "subvencao-diesel",
    titulo: "Subvenção de R$ 2,12/L no diesel depende de MP",
    categoria: "Mercado",
    severidade: "alta",
    tipo: "risco e oportunidade",
    situacao: "R$ 1,12/L da MP 1.363 (até 31/12/2026, perde validade em 26/09/2026 sem conversão) + R$ 1,00/L da MP 1.391 (Portaria MF 2.813/2026, prazo de até 30 dias prorrogável). O desconto é destacado na NF-e.",
    data: "24/09/2026",
    impacto: "O custo de reposição do diesel depende de um ato renovado a cada 30 dias; o fim abrupto recoloca até R$ 2,12/L no preço de cada praça.",
    agente: "Agente de Subvenção",
    fonte: { rotulo: "Planalto — MP 1.391/2026", url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/mpv/mpv1391.htm" },
  },
  {
    id: "reforma",
    titulo: "Reforma tributária: CBS ad rem sobre combustíveis em 2027",
    categoria: "Tributário",
    severidade: "alta",
    tipo: "risco e oportunidade",
    situacao: "Combustíveis têm regime próprio (incidência única, alíquota por litro, uniforme no país). A CBS substitui PIS/Cofins em 01/01/2027, com IBS de 0,1% dedutível em 2027 e 2028; o IBS por litro começa em 2029 e a transição termina em 2033 (LC 214/2025, alterada pelas LCs 227 e 235/2026).",
    data: "28/08/2026",
    impacto: "A CBS por litro muda a formação de preço de cada praça; a NF-e passa a destacar CBS/IBS por unidade e o teor de mistura ganha efeito tributário.",
    agente: "Agente Tributário",
    fonte: { rotulo: "Planalto — LC 214/2025", url: "https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm" },
  },
  {
    id: "icms-adrem",
    titulo: "ICMS monofásico ad rem de 2026",
    categoria: "Tributário",
    severidade: "média",
    tipo: "risco",
    situacao: "R$ 1,57/L para gasolina e etanol anidro (Conv. ICMS 112/25) e R$ 1,17/L para diesel e biodiesel (Conv. ICMS 113/25), desde 01/01/2026. O convênio de 2027 precisa sair até o início de outubro/2026.",
    data: "24/09/2026",
    impacto: "Com ICMS igual por litro em todas as UFs, a diferença de margem entre praças vem de frete, base, mix e preço de compra.",
    agente: "Agente Fiscal",
    fonte: { rotulo: "CONFAZ — Conv. ICMS 112/25", url: "https://www.confaz.fazenda.gov.br/legislacao/convenios/2025/CV112_25" },
  },
  {
    id: "renovabio",
    titulo: "RenovaBio: meta de 2026 com CBIO em mínima histórica",
    categoria: "Biocombustíveis",
    severidade: "alta",
    tipo: "risco e oportunidade",
    situacao: "Meta nacional de 48.090.000 CBIOs (Res. CNPE 21/2025), rateada pela ANP em 31/03/2026; prazo de aposentadoria em 31/12/2026. Descumprir é crime ambiental, com multa de R$ 100.000,00 a R$ 500.000.000,00 (Lei 15.082/2024).",
    data: "04/09/2026",
    impacto: "Com o CBIO barato, antecipar compra e aposentadoria custa pouco; vender a distribuidor da lista de inadimplentes sujeita a empresa a multa.",
    agente: "Agente RenovaBio",
    fonte: { rotulo: "ANP — metas 2026", url: "https://www.gov.br/anp/pt-br/canais_atendimento/imprensa/noticias-comunicados/renovabio-anp-divulga-metas-definitivas-para-as-distribuidoras-em-2026" },
  },
  {
    id: "e32",
    titulo: "E32 temporário na gasolina C e B15 no diesel",
    categoria: "Biocombustíveis",
    severidade: "média",
    tipo: "risco e oportunidade",
    situacao: "Res. CNPE 9/2026: etanol anidro a 32% na gasolina C comum e aditivada desde 01/08/2026, por 180 dias prorrogáveis uma vez; premium segue com 25%. O MPF pediu na Justiça a suspensão (22/07/2026), sem decisão até 24/09/2026. Biodiesel segue em B15; os testes do B16 vão até fevereiro de 2027.",
    data: "31/07/2026",
    impacto: "Cada mudança de teor obriga a reprogramar a compra de anidro e B100, o blending em todas as bases e a conciliação fiscal.",
    agente: "Agente de Mistura",
    fonte: { rotulo: "ANP — E32", url: "https://www.gov.br/anp/pt-br/canais_atendimento/imprensa/noticias-comunicados/e32-gasolina-com-32-de-etanol-passa-a-valer-temporariamente-a-partir-de-amanha-1-8" },
  },
  {
    id: "biodiesel-nfe",
    titulo: "ANP quer acesso diário às NF-e de biodiesel e diesel",
    categoria: "ANP",
    severidade: "média",
    tipo: "risco",
    situacao: "Proposta em Consulta Pública (CP ANP 17/2026, aprovada em 21/08/2026): distribuidores teriam de comprovar estoques e compras de biodiesel compatíveis com o diesel B vendido, com acesso diário da ANP às NF-e; hoje o controle é mensal, pelo i-SIMP.",
    data: "27/08/2026",
    impacto: "Acaba a folga de um mês: descasamento entre compra de B100 e venda de diesel B aparece quase em tempo real.",
    agente: "Agente de Mistura",
    fonte: { rotulo: "ANP — CP 17/2026", url: "https://www.gov.br/anp/pt-br/canais_atendimento/imprensa/noticias-comunicados/anp-fara-consulta-e-audiencia-publicas-sobre-monitoramento-da-mistura-obrigatoria-de-biodiesel" },
  },
  {
    id: "std",
    titulo: "Transparência na Distribuição: preços e volumes na ANP",
    categoria: "ANP",
    severidade: "média",
    tipo: "risco e oportunidade",
    situacao: "O Decreto 12.930/2026 criou o envio quinzenal de volumes e preços ao Sistema de Transparência na Distribuição (STD) dentro do Regime Emergencial, encerrado em 04/08/2026 com a perda de eficácia da MP 1.349; a continuidade da obrigação não está confirmada. O painel público agregado da ANP segue no ar desde 25/06/2026.",
    data: "25/06/2026",
    impacto: "Se a obrigação voltar, erro ou atraso vira infração; enquanto isso, o painel público serve de benchmark para comparar a margem de cada praça.",
    agente: "Agente ANP",
    fonte: { rotulo: "ANP — painel STD", url: "https://www.gov.br/anp/pt-br/canais_atendimento/imprensa/noticias-comunicados/painel-dinamico-da-anp-mostra-dados-de-comercializacao-dos-distribuidores-de-combustiveis-decreto-no-12-930-2026" },
  },
  {
    id: "carbono-oculto",
    titulo: "Crime organizado no setor: Carbono Oculto e novas fases",
    categoria: "Compliance",
    severidade: "alta",
    tipo: "risco e oportunidade",
    situacao: "Deflagrada em 28/08/2025 (Receita Federal e MPSP/Gaeco, com PF), com mais de 350 alvos. Em 2026 vieram as fases Fluxo Oculto (nafta e fintechs) e Bomba Oculta (1.283 CNPJs de postos clandestinos declarados inaptos).",
    data: "24/09/2026",
    impacto: "Mais volume migra para quem opera formalmente; o risco é o contágio por contraparte (postos, TRRs, terminais, fintechs e fundos).",
    agente: "Agente de KYC",
    fonte: { rotulo: "ANP — Bomba Oculta", url: "https://www.gov.br/anp/pt-br/canais_atendimento/imprensa/noticias-comunicados/operacao-bomba-oculta-fecha-o-cerco-a-postos-de-combustiveis-clandestinos" },
  },
  {
    id: "contumaz",
    titulo: "Devedor contumaz e capital social mínimo",
    categoria: "Compliance",
    severidade: "alta",
    tipo: "risco e oportunidade",
    situacao: "LC 225/2026: devedor contumaz federal a partir de R$ 15.000.000,00 em débitos irregulares; capital social mínimo integralizado de R$ 10.000.000,00 para distribuição e R$ 1.000.000,00 para revenda, com comprovação até 01/12/2026.",
    data: "16/09/2026",
    impacto: "Tira do mercado concorrentes subcapitalizados; clientes ou fornecedores declarados contumazes ficam inaptos de uma hora para outra.",
    agente: "Agente de KYC",
    fonte: { rotulo: "Planalto — LC 225/2026", url: "https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp225.htm" },
  },
  {
    id: "importacao",
    titulo: "Dependência de diesel importado e filas nos terminais",
    categoria: "Logística",
    severidade: "alta",
    tipo: "risco e oportunidade",
    situacao: "Mais de 25% do diesel consumido no Brasil é importado (Ministério da Fazenda, 09/09/2026); com a janela de importação fechada, cresce o risco de falta pontual e de sobre-estadia nos portos.",
    data: "24/09/2026",
    impacto: "Quem tem tancagem em porto e contrato firme de suprimento ganha participação; quem depende de importação spot enfrenta falta e frete mais caro.",
    agente: "Agente de Suprimento",
    fonte: { rotulo: "Ministério da Fazenda", url: "https://www.gov.br/fazenda/pt-br/assuntos/noticias/2026/setembro/governo-federal-adota-novas-medidas-para-combustiveis-frente-a-oscilacoes-do-petroleo" },
  },
  {
    id: "ia",
    titulo: "Regulação de IA: PL 2338/2023 na Câmara",
    categoria: "IA",
    severidade: "baixa",
    tipo: "risco e oportunidade",
    situacao: "Aprovado no Senado em 10/12/2024; na Câmara, em Comissão Especial, aguardando parecer. Ainda não há lei geral de IA em vigor.",
    data: "02/09/2026",
    impacto: "Adotar desde já trilha de auditoria das decisões de preço e crédito prepara a empresa para qualquer texto final e para fiscalizações.",
    agente: "Agente de Governança",
    fonte: { rotulo: "Câmara — dados abertos", url: "https://dadosabertos.camara.leg.br/api/v2/proposicoes/2487262" },
  },
];

// prazos regulatórios reais dos próximos meses
export const PRAZOS: { data: string; o_que: string; fonte: string }[] = [
  { data: "26/09/2026", o_que: "MP 1.363 (subvenção de R$ 1,12/L no diesel) perde validade", fonte: "Planalto" },
  { data: "início de out/2026", o_que: "Prazo para o convênio de ICMS ad rem valer em 2027", fonte: "CONFAZ" },
  { data: "09/10/2026", o_que: "Fim do corte de PIS/Cofins na gasolina e no etanol", fonte: "Ministério da Fazenda" },
  { data: "01/12/2026", o_que: "Comprovação do capital social mínimo (Res. ANP 994/2026)", fonte: "ANP" },
  { data: "31/12/2026", o_que: "Prazo para aposentar os CBIOs da meta de 2026", fonte: "ANP" },
  { data: "01/01/2027", o_que: "CBS substitui PIS/Cofins; SAF obrigatório a partir de 1%", fonte: "Planalto" },
];

// modelos de ação dos agentes (simulação). {n} vira um número de documento.
export const ACOES: { agente: string; acao: string; norma: string; resultado: "ok" | "atenção" | "bloqueado" }[] = [
  { agente: "Agente Fiscal", acao: "Validou NF-e {n} de gasolina C com ICMS ad rem de R$ 1,57/L", norma: "Conv. ICMS 112/25", resultado: "ok" },
  { agente: "Agente Fiscal", acao: "Conferiu ICMS ad rem de R$ 1,17/L na NF-e {n} de diesel S10", norma: "Conv. ICMS 113/25", resultado: "ok" },
  { agente: "Agente de Mistura", acao: "Teor de anidro de 32% conferido no lote {n}", norma: "Res. CNPE 9/2026 (E32)", resultado: "ok" },
  { agente: "Agente de Mistura", acao: "Balanço B100 × diesel B da Base Planalto com desvio de 0,4 p.p.; lote {n} retido", norma: "B15 · CP ANP 17/2026", resultado: "atenção" },
  { agente: "Agente de Margem", acao: "Margem bruta das 24 praças dentro do histórico do período-base", norma: "Res. ANP 1.004/2026", resultado: "ok" },
  { agente: "Agente de Margem", acao: "Praça Palmas com margem 38% acima do período-base; dossiê de custos gerado", norma: "Res. ANP 1.004/2026", resultado: "atenção" },
  { agente: "Agente RenovaBio", acao: "Aposentou lote {n} de CBIOs para a meta de 2026", norma: "Lei 13.576/2017 · Res. CNPE 21/2025", resultado: "ok" },
  { agente: "Agente de KYC", acao: "Cliente {n}: CNPJ ativo, autorização ANP válida, sem débito de devedor contumaz", norma: "LC 225/2026", resultado: "ok" },
  { agente: "Agente de KYC", acao: "Pedido {n} bloqueado: fornecedor com CNPJ declarado inapto", norma: "IN RFB 2.340/2026", resultado: "bloqueado" },
  { agente: "Agente ANP", acao: "Margem por praça comparada com o painel público de Transparência na Distribuição", norma: "Painel ANP · Decreto 12.930/2026", resultado: "ok" },
  { agente: "Agente de Subvenção", acao: "Desconto de R$ 2,12/L destacado na NF-e {n} de diesel", norma: "MPs 1.363 e 1.391/2026", resultado: "ok" },
  { agente: "Agente Tributário", acao: "Leu o DOU: nenhuma alteração de alíquota de combustíveis hoje", norma: "DOU · Planalto", resultado: "ok" },
];
