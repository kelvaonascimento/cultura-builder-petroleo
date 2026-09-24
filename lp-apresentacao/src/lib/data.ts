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

export const concorrenciaIa: {
  player: string;
  origem: "brasil" | "global";
  maturidade: string;
  ondeAposta: string;
  ganho: string;
}[] = [
  {
    player: "Petrobras",
    origem: "brasil",
    maturidade: "Líder nacional",
    ondeAposta: "Fiscal + IA generativa (Automation Anywhere), ML financeiro, ChatPetrobras (Azure OpenAI), manutenção preditiva, reservatórios, corrosão, recuperação de bens de devedores",
    ganho: "US$ 120 mi em 3 semanas; +51% de precisão em previsão de receita (~R$ 400 mi de erro evitado); >US$ 1 bi projetado",
  },
  {
    player: "Vibra",
    origem: "brasil",
    maturidade: "Líder nacional em IA transversal",
    ondeAposta: "IA preditiva de estoque; Premia (20 mi+ fidelizados); InterSystems IRIS; IA + câmeras no posto; IA logística (prevê consumo com meses de antecedência); IA B2B",
    ganho: "R$ 900 mi reduzidos em estoque; precisão de demanda 98%; -67% acidentes na frota; lucro R$ 6,4 bi (2024, +33,6%); declarado oficialmente no Relato Integrado 2024 (GRI)",
  },
  {
    player: "Raízen",
    origem: "brasil",
    maturidade: "Avançado (hub Pulse desde 2017)",
    ondeAposta: "Otimização de transporte de combustíveis com IA, IA no agronegócio, biogás",
    ganho: "R$ 230 mi de economia desde 2021 em transportes; mas em recuperação extrajudicial",
  },
  {
    player: "Braskem",
    origem: "brasil",
    maturidade: "Avançado (petroquímica)",
    ondeAposta: "Control Tower (visibilidade end-to-end, modelagem de cenários com IA + Big Data); IA transversal em 40 unidades",
    ganho: "R$ 460 mi/ano estimados; EBITDA 2025 +26,2%",
  },
  {
    player: "Acelen",
    origem: "brasil",
    maturidade: "Investindo pesado",
    ondeAposta: "Modernização de Mataripe; top-3 da América Latina em eficiência de refino",
    ganho: "Capacidade de diesel +10%",
  },
  {
    player: "ALE",
    origem: "brasil",
    maturidade: "Não mapeado publicamente",
    ondeAposta: "Crescimento via bandeira, conveniência, frota própria",
    ganho: "—",
  },
  {
    player: "Distribuidoras regionais (Larco, Setta, Dislub, ALE…)",
    origem: "brasil",
    maturidade: "Baixa — Excel, telefone, WhatsApp (inferência de mercado, não censo auditado)",
    ondeAposta: "Nada estruturado em IA",
    ganho: "GAP DE MERCADO — a oportunidade",
  },
  {
    player: "Shell",
    origem: "global",
    maturidade: "Líder global",
    ondeAposta: "Manutenção preditiva com C3 AI (10.000 equipamentos), trading, digitalização",
    ganho: "US$ 2 bi/ano; -40% falhas; -35% paradas não programadas; -20% custo de manutenção",
  },
  {
    player: "BP",
    origem: "global",
    maturidade: "Líder global",
    ondeAposta: "Digital twin (Palantir, 5 anos), interpretação sísmica, Open Energi, transição energética",
    ganho: "+4% produção; -10% paradas evitadas; -90% tempo de interpretação sísmica; US$ 10 mi (energia); meta -US$ 2 bi em custos",
  },
  {
    player: "ExxonMobil",
    origem: "global",
    maturidade: "Líder global",
    ondeAposta: "Trading inteligente, otimização de refino, simulação",
    ganho: "US$ 9,7 bi de economia estrutural → meta US$ 15 bi (2027)",
  },
  {
    player: "Chevron",
    origem: "global",
    maturidade: "Avançado",
    ondeAposta: "Parceria Microsoft, Permian, análise preditiva de segurança",
    ganho: "12 acidentes maiores evitados; US$ 12 mi no 1º ano",
  },
  {
    player: "TotalEnergies",
    origem: "global",
    maturidade: "Avançado",
    ondeAposta: "Monitoramento de emissões, IA transversal",
    ganho: "-47% emissões de metano",
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
  "Exploração & Produção (upstream)": [
    { area: "Interpretação sísmica", aplicacao: "IA de visão computacional sobre dados sísmicos", ganho: "BP: -90% do tempo de interpretação; melhor performance exploratória em anos" },
    { area: "Reservatórios", aplicacao: "ML para seleção e gestão de reservatórios", ganho: "Petrobras usa IA em reservatórios; BP: +4% de produção" },
    { area: "Perfuração", aplicacao: "Perfuração automatizada guiada por IA", ganho: "Menos horas de sonda, menos acidentes (referência: Exxon, Noble)" },
    { area: "Manutenção de plataformas", aplicacao: "Sensores + manutenção preditiva", ganho: "Shell: US$ 2 bi/ano; -40% falhas" },
    { area: "Segurança operacional", aplicacao: "Análise preditiva de acidentes", ganho: "Chevron: 12 acidentes maiores evitados; US$ 12 mi" },
    { area: "Emissões/ESG", aplicacao: "Monitoramento contínuo com IA", ganho: "TotalEnergies: -47% metano" },
  ],
  "Logística & Transporte (midstream)": [
    { area: "Roteirização de cargas", aplicacao: "Otimização de rotas e inventário com IA", ganho: "-24% de custo; -50% de erros no segmento de distribuição (benchmark secundário de mercado)" },
    { area: "Pilflagem/antifurto", aplicacao: "Sensores + IA para detecção em dutos e tanques", ganho: "Redução de bilhões em perdas do crime organizado" },
    { area: "Gestão de dutos", aplicacao: "Digital twin de dutos e terminais", ganho: "Prevenção de vazamentos; otimização de vazão" },
    { area: "Frota", aplicacao: "Telemetria + manutenção preditiva", ganho: "Menos quebras e multas; vida útil maior" },
  ],
  "Refino": [
    { area: "Otimização de processo", aplicacao: "IA para simulação e otimização de reações/energia", ganho: "ExxonMobil: US$ 9,7 bi estruturais → US$ 15 bi (2027)" },
    { area: "Planejamento de produção", aplicacao: "Otimização de campanhas e misturas", ganho: "Acelen: top-3 da AL em eficiência de refino com modernização digital" },
    { area: "Qualidade em linha", aplicacao: "Visão computacional + espectroscopia", ganho: "Menos retrabalho e refugo" },
  ],
  "Comercial & Trading": [
    { area: "Previsão de receita/demanda", aplicacao: "ML sobre séries temporais", ganho: "Petrobras: +51% de precisão; ~R$ 400 mi de erro evitado (base R$ 9 bi/semana)" },
    { area: "Precificação dinâmica", aplicacao: "Preço por produto × região × concorrência", ganho: "Margem líquida: +0,5% a 1,5% em distribuidoras (estimativa — modelagem própria)" },
    { area: "Hedging/trading", aplicacao: "Otimização de carteira com IA", ganho: "ExxonMobil: gains estruturais no trading" },
  ],
  "Distribuição & Revenda": [
    { area: "Portal B2B", aplicacao: "Cotação, pedido e crédito digital (Next.js + Postgres)", ganho: "Funil de captação 3-5x mais barato que telefone (modelagem própria); ciclo de venda menor" },
    { area: "Crédito de revenda", aplicacao: "Scoring com dados cadastrais + histórico", ganho: "Menos inadimplência; crédito pré-aprovado formalizado" },
    { area: "Prospecção de postos", aplicacao: "Agente de IA para listas e abordagens", ganho: "49,4% dos 10.332 postos do NE são bandeira branca — mercado gigante" },
    { area: "Gestão de rede", aplicacao: "Dashboard de volumes, contratos e margem por posto", ganho: "Decisão em tempo real vs. relatório mensal" },
  ],
  "Varejo (postos)": [
    { area: "Precificação no bico", aplicacao: "Reprecificação automática por concorrência local", ganho: "Margem do posto: recuperação de 0,5-2 p.p." },
    { area: "Antifraude", aplicacao: "Análise de padrões de venda x estoque", ganho: "Combate a adulteração e bomba-truque" },
    { area: "Conveniência", aplicacao: "Mix e precificação com IA", ganho: "Conveniência responde por parte relevante da margem do posto" },
  ],
  "Fiscal & Back-office": [
    { area: "Apuração multi-estado", aplicacao: "Automação + IA generativa para ICMS/PIS/Cofins", ganho: "Petrobras: US$ 120 mi em 3 semanas; impostos em 3 dias (1ª vez em 15 anos); +40% eficiência" },
    { area: "Reforma tributária (IBS/CBS)", aplicacao: "Pipelines de transição 2026+", ganho: "Toda distribuidora precisará reescrever a esteira fiscal — quem automatizar primeiro ganha" },
    { area: "Contas a pagar/receber", aplicacao: "IA para conciliação e cobrança", ganho: "Redução de inadimplência e custo administrativo" },
    { area: "Copilotos internos", aplicacao: "RAG sobre legislação e documentos", ganho: "ChatPetrobras: 100 mil+ funcionários; resposta com citação de fonte" },
  ],
  "Compliance & HSE": [
    { area: "Antifraude/crédito", aplicacao: "Padrões OWASP, trilha de auditoria, análise de risco", ganho: "Redução de exposição regulatória (histórico Lava Jato)" },
    { area: "Monitoramento ambiental", aplicacao: "IA em imagens de satélite e sensores", ganho: "TotalEnergies: -47% metano; multas evitadas" },
    { area: "Segurança de dados", aplicacao: "Hardening, monitoramento, resposta a incidentes", ganho: "Ransomware no setor é ameaça real e carreira-ending" },
  ],
  "Pessoas & Cultura": [
    { area: "Produtividade", aplicacao: "Copilotos para comercial, fiscal e operações", ganho: "+40% de eficiência em processos (benchmark)" },
    { area: "Atração de talento", aplicacao: "Automação de recrutamento e conteúdo", ganho: "Setor compete com tech por dados e IA" },
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
