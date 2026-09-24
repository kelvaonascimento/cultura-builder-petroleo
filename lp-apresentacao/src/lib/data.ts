// Conteúdo textual da apresentação. Regra: todo fato traz fonte pública (rótulo + link).
// Números de mercado ficam em dados-oficiais.ts; aqui ficam textos e referências.

export type Ref = { rotulo: string; url: string };
export type Item = { texto: string; fonte: Ref };

const ANP_ADREM: Ref = { rotulo: "CONFAZ — Conv. ICMS 112/25 e 113/25", url: "https://www.confaz.fazenda.gov.br/legislacao/convenios/2025/CV112_25" };
const LC214: Ref = { rotulo: "Planalto — LC 214/2025", url: "https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm" };
const FAZENDA_0909: Ref = { rotulo: "Ministério da Fazenda, 09/09/2026", url: "https://www.gov.br/fazenda/pt-br/assuntos/noticias/2026/setembro/governo-federal-adota-novas-medidas-para-combustiveis-frente-a-oscilacoes-do-petroleo" };
const EIA_BRENT: Ref = { rotulo: "EIA — Europe Brent Spot Price FOB", url: "https://www.eia.gov/dnav/pet/hist/RBRTED.htm" };
const MP1391: Ref = { rotulo: "Planalto — MP 1.391/2026", url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/mpv/mpv1391.htm" };
const BCB_SELIC: Ref = { rotulo: "Banco Central — taxa Selic", url: "https://www.bcb.gov.br/controleinflacao/taxaselic" };
const ANP_NORTE: Ref = { rotulo: "ANP — abastecimento na Região Norte", url: "https://www.gov.br/anp/pt-br/canais_atendimento/imprensa/noticias-comunicados/seca-na-regiao-norte-anp-acompanha-abastecimento-de-combustiveis" };
const ANP_E32: Ref = { rotulo: "ANP — E32", url: "https://www.gov.br/anp/pt-br/canais_atendimento/imprensa/noticias-comunicados/e32-gasolina-com-32-de-etanol-passa-a-valer-temporariamente-a-partir-de-amanha-1-8" };
const ANP_ABUSO: Ref = { rotulo: "ANP — critérios de aumento abusivo", url: "https://www.gov.br/anp/pt-br/canais_atendimento/imprensa/noticias-comunicados/anp-aprova-resolucoes-que-estabelecem-criterios-para-caracterizacao-da-elevacao-abusiva-dos-precos-de-combustiveis" };
const ANP_CBIO26: Ref = { rotulo: "ANP — metas do RenovaBio 2026", url: "https://www.gov.br/anp/pt-br/canais_atendimento/imprensa/noticias-comunicados/renovabio-anp-divulga-metas-definitivas-para-as-distribuidoras-em-2026" };
const LC225: Ref = { rotulo: "Planalto — LC 225/2026", url: "https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp225.htm" };
const ANP_POSTOS: Ref = { rotulo: "ANP — cadastro de revendedores (24/09/2026)", url: "https://www.gov.br/anp/pt-br/centrais-de-conteudo/dados-abertos/revendedores-varejistas-de-combustiveis-automotivos" };
const ANP_BOMBA_OCULTA: Ref = { rotulo: "ANP — Operação Bomba Oculta", url: "https://www.gov.br/anp/pt-br/canais_atendimento/imprensa/noticias-comunicados/operacao-bomba-oculta-fecha-o-cerco-a-postos-de-combustiveis-clandestinos" };
const ANP_VENDAS: Ref = { rotulo: "ANP — vendas por distribuidora (2025)", url: "https://www.gov.br/anp/pt-br/centrais-de-conteudo/dados-abertos/vendas-de-derivados-de-petroleo-e-biocombustiveis" };
const ANP_CBIO25: Ref = { rotulo: "ANP — cumprimento das metas de 2025", url: "https://www.gov.br/anp/pt-br/assuntos/renovabio/cumprimento-das-metas-individuais-de-2025-por-distribuidor-de-combustiveis" };
const ANP_RESERVAS: Ref = { rotulo: "ANP — Boletim de Recursos e Reservas 2025", url: "https://www.gov.br/anp/pt-br/canais_atendimento/imprensa/noticias-comunicados/reservas-provadas-de-petroleo-no-brasil-cresceram-3-84-em-2025" };

export const fontesPrimarias: { label: string; url: string }[] = [
  { label: "ANP — dados abertos: vendas por distribuidora e por UF", url: ANP_VENDAS.url },
  { label: "ANP — cadastro de revendedores varejistas (postos e bandeiras)", url: ANP_POSTOS.url },
  { label: "ANP — Boletim Anual de Recursos e Reservas 2025", url: ANP_RESERVAS.url },
  { label: "ANP — RenovaBio: cumprimento das metas de 2025", url: ANP_CBIO25.url },
  { label: "ANP — RenovaBio: metas definitivas de 2026", url: ANP_CBIO26.url },
  { label: "Planalto — LC 214/2025 (reforma tributária do consumo)", url: LC214.url },
  { label: "Planalto — LC 225/2026 (devedor contumaz e capital mínimo)", url: LC225.url },
  { label: "CONFAZ — ICMS ad rem sobre combustíveis (Conv. 112/25 e 113/25)", url: ANP_ADREM.url },
  { label: "Banco Central — PTAX e Selic (APIs públicas)", url: "https://www.bcb.gov.br/estabilidadefinanceira/historicocotacoes" },
  { label: "EIA — preço spot do Brent", url: EIA_BRENT.url },
  { label: "Petrobras — preços de venda às distribuidoras e composição por UF", url: "https://precos.petrobras.com.br/" },
  { label: "ANTT — piso mínimo de frete rodoviário", url: "https://calculadorafrete.antt.gov.br/" },
  { label: "IBGE — malhas territoriais (API v3)", url: "https://servicodados.ibge.gov.br/api/docs/malhas?versao=3" },
  { label: "OpenStreetMap / OSRM — rotas rodoviárias", url: "https://www.openstreetmap.org/copyright" },
];

// Casos de IA no setor: só entram com fonte identificada (veículo/canal oficial e data).
// Casos que circulam sem fonte primária (inclusive globais) ficaram de fora até serem confirmados.
export const casosIa: { empresa: string; oQueFez: string; resultado: string; fonte: Ref }[] = [
  {
    empresa: "Vibra",
    oQueFez: "IA na logística para prever demanda e dimensionar estoques.",
    resultado: "R$ 900 milhões a menos parados em estoque.",
    fonte: { rotulo: "VEJA, 05/08/2026", url: "https://news.google.com/search?q=IA%20libera%20R%24%20900%20milh%C3%B5es%20que%20a%20Vibra%20mantinha%20em%20estoques&hl=pt-BR" },
  },
  {
    empresa: "Raízen",
    oQueFez: "IA para otimizar operações, com foco em transporte.",
    resultado: "Redução de custos de R$ 230 milhões.",
    fonte: { rotulo: "Estadão, 08/04/2024", url: "https://news.google.com/search?q=Ra%C3%ADzen%20reduz%20custos%20em%20R%24%20230%20milh%C3%B5es%20intelig%C3%AAncia%20artificial&hl=pt-BR" },
  },
  {
    empresa: "Petrobras",
    oQueFez: "ChatPetrobras: ferramenta de IA generativa para uso interno.",
    resultado: "Disponível para mais de 100 mil trabalhadores.",
    fonte: { rotulo: "Agência Petrobras, 05/12/2023", url: "https://news.google.com/search?q=Petrobras%20cria%20ferramenta%20com%20Intelig%C3%AAncia%20Artificial%20Generativa%20para%20apoiar%20mais%20de%20100%20mil%20trabalhadores&hl=pt-BR" },
  },
  {
    empresa: "Petrobras",
    oQueFez: "Machine learning para prever receitas.",
    resultado: "Ampliação do uso de IA em finanças e planejamento.",
    fonte: { rotulo: "Agência eixos, 07/11/2024", url: "https://news.google.com/search?q=Petrobras%20amplia%20uso%20da%20tecnologia%20e%20prev%C3%AA%20receitas%20com%20machine%20learning&hl=pt-BR" },
  },
];

export const dores: Record<"tributario" | "financeiro" | "operacao" | "regulacao" | "comercial", Item[]> = {
  tributario: [
    { texto: "ICMS monofásico por litro, igual em todo o país: R$ 1,57/L na gasolina e R$ 1,17/L no diesel desde 01/01/2026.", fonte: ANP_ADREM },
    { texto: "A CBS por litro substitui PIS/Cofins nos combustíveis em 01/01/2027; o IBS por litro começa em 2029 e a transição termina em 2033.", fonte: LC214 },
    { texto: "Tributo muda por ato do governo com dias de aviso: PIS/Cofins da gasolina reduzido e o do etanol hidratado zerado de 10/09 a 09/10/2026.", fonte: FAZENDA_0909 },
  ],
  financeiro: [
    { texto: "Brent spot a US$ 114,89 em 22/09/2026, depois de pico de US$ 138,21 em 07/04/2026.", fonte: EIA_BRENT },
    { texto: "O custo do diesel carrega R$ 2,12/L de subvenção que depende de medida provisória renovada a cada 30 dias.", fonte: MP1391 },
    { texto: "Selic meta de 13,75% ao ano desde 17/09/2026: capital de giro e estoque ficam caros.", fonte: BCB_SELIC },
  ],
  operacao: [
    { texto: "Mais de 25% do diesel consumido no país é importado; com a janela de importação fechada, cresce o risco de falta pontual.", fonte: FAZENDA_0909 },
    { texto: "Estiagem de 2026 na Região Norte acompanhada pela ANP, com planos de contingência pedidos às distribuidoras.", fonte: ANP_NORTE },
    { texto: "Mistura muda por resolução: E32 temporário desde 01/08/2026 e B15 em vigor — compra de anidro e biodiesel e blending precisam acompanhar.", fonte: ANP_E32 },
  ],
  regulacao: [
    { texto: "A ANP compara a margem bruta de cada distribuidora entre períodos (Res. 1.004/2026) e anunciou multas de primeira instância em 23/09/2026.", fonte: ANP_ABUSO },
    { texto: "RenovaBio: meta de 48.090.000 CBIOs para as distribuidoras em 2026, com prazo em 31/12; descumprir é crime ambiental (Lei 15.082/2024).", fonte: ANP_CBIO26 },
    { texto: "Capital social mínimo de R$ 10.000.000,00 para distribuidoras, com comprovação até 01/12/2026.", fonte: LC225 },
  ],
  comercial: [
    { texto: "48,42% dos 45.807 postos do país são bandeira branca: preço, prazo e disponibilidade decidem a compra.", fonte: ANP_POSTOS },
    { texto: "As operações contra o crime organizado no setor (Carbono Oculto, 2025; Bomba Oculta, 2026) tiraram CNPJs do mercado e aumentaram o risco de contraparte.", fonte: ANP_BOMBA_OCULTA },
    { texto: "Etanol hidratado com PIS/Cofins zerado até 09/10/2026 muda a relação de preço com a gasolina nas bombas.", fonte: FAZENDA_0909 },
  ],
};

export type Melhoria = { area: string; aplicacao: string; ganho: string };

export const matrizMelhorias: Record<string, Melhoria[]> = {
  "Exploração & Produção": [
    { area: "Manutenção de plataformas", aplicacao: "Sensores + manutenção preditiva", ganho: "Menos paradas não programadas; manutenção pela condição do equipamento" },
    { area: "Interpretação de dados técnicos", aplicacao: "IA sobre sísmica, poços e relatórios", ganho: "Menos horas de especialista por análise" },
    { area: "Segurança operacional", aplicacao: "Análise preditiva de incidentes", ganho: "Risco identificado antes do acidente" },
  ],
  "Suprimento & Logística": [
    { area: "Estoque por base", aplicacao: "Previsão de demanda por produto e praça", ganho: "Menos capital parado em estoque — caso Vibra (VEJA, 05/08/2026)" },
    { area: "Roteirização", aplicacao: "Otimização de rotas, cargas e janelas", ganho: "Menos km vazio e menos custo de frete — caso Raízen (Estadão, 08/04/2024)" },
    { area: "Custo de reposição", aplicacao: "Recalcular custo a cada reajuste, subvenção ou tributo", ganho: "Preço por praça atualizado no mesmo dia" },
  ],
  "Comercial & Preço": [
    { area: "Margem por praça", aplicacao: "Preço por produto × praça × concorrência, com piso de margem", ganho: "Margem defendida e trilha de custos para a régua da ANP" },
    { area: "Portal B2B", aplicacao: "Cotação, pedido e crédito digitais", ganho: "Resposta ao revendedor em minutos, não em dias" },
    { area: "Previsão de receita", aplicacao: "Machine learning sobre séries de vendas", ganho: "Planejamento financeiro com menos erro — caso Petrobras (Agência eixos, 07/11/2024)" },
  ],
  "Fiscal & Regulação": [
    { area: "NF-e e tributos", aplicacao: "Conferência automática de ICMS ad rem, PIS/Cofins e subvenção", ganho: "Erro pego antes da emissão, não na fiscalização" },
    { area: "Reforma tributária", aplicacao: "Simulação de CBS/IBS por praça (2027–2033)", ganho: "Preço e contrato prontos para a transição" },
    { area: "RenovaBio e ANP", aplicacao: "Controle de meta de CBIO, mistura e prazos", ganho: "Prazos cumpridos sem planilha paralela" },
  ],
  "Pessoas & Back-office": [
    { area: "Copilotos internos", aplicacao: "IA generativa sobre normas e documentos internos", ganho: "Resposta com a fonte citada — caso ChatPetrobras (Agência Petrobras, 05/12/2023)" },
    { area: "Cobrança e crédito", aplicacao: "Score de risco e régua de cobrança", ganho: "Menos inadimplência e limite aprovado mais rápido" },
  ],
};

export const fontes = [
  "OFICIAIS — ANP (vendas, postos, reservas, produção, RenovaBio), Planalto (leis e MPs), CONFAZ (ICMS), Banco Central (PTAX, Selic), EIA (Brent), Petrobras (preços às distribuidoras), ANTT (frete), IBGE (malhas).",
  "EMPRESAS — comunicados, releases de resultados e relatórios oficiais citados em cada caso.",
  "IMPRENSA — só como complemento, sempre com veículo e data; números sem fonte primária foram retirados.",
  "SIMULAÇÃO — a empresa da DEMO é fictícia; os números internos dela são simulados e marcados como tal.",
];

export const cadeiaResumo: { elo: string; processos: string; exemplo: string; ganho: string }[] = [
  { elo: "1. Exploração & Produção", processos: "Sísmica, reservatórios, perfuração, manutenção, segurança e ESG, com forte dependência de especialistas.", exemplo: "Interpretação sísmica e planos de manutenção feitos por especialistas", ganho: "Manutenção preditiva e apoio à interpretação de dados técnicos" },
  { elo: "2. Suprimento & Importação", processos: "Compra de derivados, contratos, cotas, importação, câmbio e subvenções — mesa comercial e jurídico.", exemplo: "Janela de importação acompanhada em planilha", ganho: "Custo de reposição recalculado a cada reajuste, subvenção ou mudança de tributo" },
  { elo: "3. Refino", processos: "Planejamento de campanhas, operação contínua, qualidade em linha, manutenção e energia.", exemplo: "Campanhas de produção montadas manualmente", ganho: "Otimização de campanhas, energia e qualidade" },
  { elo: "4. Logística & Armazenagem", processos: "Recebimento, tancagem, mistura (E32/B15), roteirização, frota e janelas de carregamento.", exemplo: "Rotas e conferência de tanque feitas à mão", ganho: "Roteirização, previsão de estoque por base e conciliação de tanque" },
  { elo: "5. Distribuição & Revenda (B2B)", processos: "Cotação, pedido, crédito, preço por praça, prospecção e gestão de rede — muito telefone e WhatsApp.", exemplo: "Cotação por telefone, com dias de ida e volta", ganho: "Portal B2B com cotação, crédito e preço por praça em minutos" },
  { elo: "6. Varejo (posto)", processos: "Preço na bomba, conveniência, antifraude, fidelização.", exemplo: "Preço ajustado pela percepção do dono", ganho: "Preço por concorrência local e alertas de fraude" },
  { elo: "7. Fiscal & Back-office", processos: "ICMS monofásico, PIS/Cofins, CBS/IBS a partir de 2027, NF-e, subvenções, conciliação, cobrança e ANP.", exemplo: "Conciliação de NF-e e subvenção feita por analistas", ganho: "Conferência automática de NF-e, tributo, mistura e subvenção" },
  { elo: "8. Pessoas & Cultura", processos: "Copilotos, treinamento, recrutamento.", exemplo: "Conhecimento concentrado em poucos especialistas", ganho: "Copilotos com resposta citando a fonte interna" },
];

export const whiteSpace: { titulo: string; texto: string }[] = [
  { titulo: "WhatsApp como CRM invisível", texto: "O histórico de cotações com revendedores costuma ficar em conversas de WhatsApp — dá para organizar e analisar." },
  { titulo: "NF-e como sensor de demanda", texto: "Notas fiscais em tempo real revelam a demanda por município antes do fechamento do mês." },
  { titulo: "Agenda dos vendedores", texto: "Rotas de visitação planejadas à mão; dá para otimizar como uma roteirização logística." },
  { titulo: "Preço de conveniência", texto: "Gerido à mão enquanto o foco vai todo para o combustível." },
  { titulo: "Crédito em tempo real", texto: "Aprovação manual de limite enquanto o pedido do revendedor espera." },
  { titulo: "Renovação de contratos", texto: "Sem alerta de vencimento, a saída de um posto aparece tarde demais." },
  { titulo: "Perdas e sobras de tanque", texto: "Diferenças entre compra, venda e medição de tanque aparecem com conciliação automática." },
  { titulo: "Turnover de motoristas", texto: "Dados de jornada da frota ajudam a prever saídas e planejar escalas." },
  { titulo: "Contratos de frete e armazenagem", texto: "Renovações deixadas para a última hora, sem comparação de alternativas." },
  { titulo: "Obrigações com a ANP", texto: "Na apuração de 2025, 37 distribuidoras ficaram abaixo de 100% da meta de CBIO (19 com 0%)." },
];

export const fatosNovos: Item[] = [
  { texto: "As 3 maiores distribuidoras ficaram com 53,76% da gasolina C, 57,27% do diesel B e 46,86% do etanol hidratado em 2025 (em 2024: 53,43%, 57,37% e 50,02%).", fonte: ANP_VENDAS },
  { texto: "Entre as 12 maiores, as que mais cresceram em 2025 foram Federal Energia (+19,0%), Ciapetro (+15,2%), Petrobahia (+8,3%) e ALE (+8,2%).", fonte: ANP_VENDAS },
  { texto: "RenovaBio 2025: 122 distribuidoras cumpriram 100% da meta; 37 ficaram abaixo (19 com 0%) e 4 estão sem percentual por liminar.", fonte: ANP_CBIO25 },
  { texto: "Reservas provadas de petróleo: 17,488 bilhões de barris no fim de 2025, alta de 3,84% no ano.", fonte: ANP_RESERVAS },
  { texto: "Mais de 25% do diesel consumido no Brasil é importado.", fonte: FAZENDA_0909 },
  { texto: "Gasolina C com 32% de etanol anidro desde 01/08/2026, em caráter temporário (Res. CNPE 9/2026).", fonte: ANP_E32 },
  { texto: "Distribuidoras precisam comprovar capital social mínimo de R$ 10.000.000,00 até 01/12/2026.", fonte: LC225 },
  { texto: "Operação Bomba Oculta (28/08/2026) declarou inaptos 1.283 CNPJs de postos clandestinos.", fonte: ANP_BOMBA_OCULTA },
];
