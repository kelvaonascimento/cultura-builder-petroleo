export const panorama = {
  producao: "1.376 mi bbl de petróleo + 65,4 bi m³ de gás em 2024 (ANP, Boletim de Recursos e Reservas 2025 — verificado no projeto)",
  petrobrasShare: "Maior parte da produção nacional (80-90% — ANP/imprensa setorial)",
  reservas: "~16,8 bi barris de petróleo e ~573 bi m³ de gás provados em dez/2024 (ANP, Boletim de Recursos e Reservas 2025 — verificado no projeto)",
  refinarias: "~17-20 em operação (ANP — número redondo via imprensa; verificar portal ANP antes de uso contratual)",
  demanda: "+2,0% em 2025 (+3,1 bi L); +2,3% em 2026 (+3,7 bi L) — EPE via imprensa; verificar EPE",
  maiorRefinoPrivado: "Mataripe (Acelen, BA): 262,1 mil bbl/dia = 14% da capacidade nacional (imprensa/Acelen)",
  misturaEtanol: "E30 → E32 vigente; testes autorizados para E35 (MME via NovaCana)",
  mercadoIaOng: "US$ 7,6 bi (2025) → US$ 25,2 bi (2034) — pesquisa de mercado secundária (derekwilson.ai citando MarketsandMarkets/Precedence)",
};

export const fontesPrimarias: { label: string; url: string }[] = [
  { label: "ANP — Agência Nacional do Petróleo (shares, refinarias, RenovaBio)", url: "https://www.gov.br/anp" },
  { label: "EPE — Empresa de Pesquisa Energética (demanda, balanço energético)", url: "https://www.epe.gov.br" },
  { label: "Agência Petrobras de Notícias (casos oficiais de IA: ChatPetrobras, Lê-AI, Smart Tocha)", url: "https://agencia.petrobras.com.br" },
  { label: "RI Vibra — Relato Integrado 2024 (GRI, documento auditado)", url: "https://ri.vibraenergia.com.br" },
  { label: "IBP — Instituto Brasileiro de Petróleo (R$ 34 bi em PD&I via cláusula ANP)", url: "https://ibp.org.br" },
  { label: "Valor 1000 — ranking das 46 maiores de O&G (base: balanços auditados na CVM)", url: "https://valor.globo.com/empresas/noticia/2024/11/12/as-maiores-empresas-de-petroleo-e-gas-do-brasil.ghtml" },
  { label: "Estadão — Raízen: R$ 230 mi economizados com IA em transportes", url: "https://estadao.com.br" },
  { label: "Época Negócios — Vibra: R$ 900 mi de estoque liberados com IA preditiva", url: "https://epocanegocios.globo.com" },
  { label: "braskem.com.br — página oficial de transformação digital (Control Tower)", url: "https://www.braskem.com.br/digital-transformation" },
  { label: "raizen.com.br — blog oficial de inovação (IA no agronegócio, hub Pulse)", url: "https://www.raizen.com.br" },
];

export const rankingUpstream: {
  empresa: string;
  porte: string;
  destaques: string;
}[] = [
  { empresa: "Petrobras", porte: "R$ 512 bi (2023) — maior empresa do Brasil", destaques: "~90% da produção; 12-13 refinarias; 2,21 mi bpd; lidera Exame MM 2025" },
  { empresa: "Acelen (Mubadala)", porte: "2ª maior refinaria do país", destaques: "Mataripe/BA: 262,1 mil bbl/dia (14% da capacidade); R$ 340 mi investidos em 2025; +10% capacidade de diesel" },
  { empresa: "PRIO (ex-PetroRio)", porte: "~US$ 5,8 bi", destaques: "Maior produtora privada; campos maduros da Bacia de Campos" },
  { empresa: "3R Petroleum", porte: "~US$ 1,21 bi", destaques: "Consolidação de campos maduros onshore/offshore" },
  { empresa: "Enauta", porte: "~US$ 1,08 bi", destaques: "Offshore (Atlanta); foco em eficiência operacional" },
  { empresa: "PetroReconcavo", porte: "~US$ 792 mi", destaques: "Maior produtora onshore do Brasil; 100% no Recôncavo Baiano" },
  { empresa: "Shell, TotalEnergies, BP, Exxon, Chevron, Equinor", porte: "Majors globais", destaques: "Presença no pré-sal; tecnologia e IA de classe mundial" },
];

export const rankingDistribuicao: {
  empresa: string;
  receita: string;
  rede: string;
  posicao: string;
}[] = [
  { empresa: "Vibra Energia (ex-BR)", receita: "R$ 162,9 bi (2023)", rede: "8.350+ postos", posicao: "Maior distribuidora (21,8-23% do mercado); comprou a distribuição Ipiranga por R$ 7,6 bi (2023); IA transversal" },
  { empresa: "Raízen (Shell/Cosan)", receita: "R$ 220,5 bi (2023)", rede: "8.100+ postos Shell", posicao: "2ª distribuidora; maior produtora de etanol; recuperação extrajudicial (R$ 65,1 bi, mar/2026)" },
  { empresa: "Ipiranga (Ultrapar)", receita: "R$ 126 bi (Ultrapar, 2023)", rede: "~8 mil postos", posicao: "3ª rede (19% de share); núcleo Sul/Sudeste" },
  { empresa: "ALE (AleSat, Glencore)", receita: "R$ 13,8 bi (2023)", rede: "1.500+ postos, 21 estados", posicao: "4ª maior distribuidora; Glencore controla 78% desde 2018; sem IA documentada" },
  { empresa: "Larco (Grupo Evangelista)", receita: "R$ 11 bi (2023, +24%)", rede: "n/d", posicao: "Maior regional da Bahia; maior regional fora do top-10; sem IA documentada" },
  { empresa: "Copa Energia", receita: "R$ 10,3 bi (2023)", rede: "n/d", posicao: "Grupo Copagaz; sem IA documentada" },
  { empresa: "Rodoil", receita: "R$ 6,5 bi (2023)", rede: "n/d", posicao: "Sul; sem IA documentada" },
  { empresa: "Potencial", receita: "R$ 5,8 bi (2023)", rede: "150+ postos", posicao: "Paraná; sem IA documentada" },
  { empresa: "Petrovia", receita: "R$ 3,2 bi (2023)", rede: "n/d", posicao: "PE/NE; sem IA documentada" },
  { empresa: "Atem + Ream", receita: "R$ 22,9 bi (2023)", rede: "Distribuição + refinaria Ream", posicao: "Verticalização única fora da Petrobras; sem IA documentada" },
  { empresa: "Setta Combustíveis", receita: "n/d", rede: "~80 postos", posicao: "Recife/PE; 8 estados do NE; sem IA documentada" },
  { empresa: "Dislub Equador", receita: "n/d", rede: "n/d", posicao: "Uma das maiores do Nordeste; 27+ anos; sem IA documentada" },
  { empresa: "Braskem", receita: "petroquímica", rede: "—", posicao: "Control Tower com IA: R$ 460 mi/ano estimados" },
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

export const dores = {
  tributario: [
    "150 páginas de regras fiscais por período só na Petrobras; ICMS diferente por estado; base de cálculo com frete, encargos, interestaduais e isenções regionais",
    "Reforma tributária: transição IBS/CBS começa em 2026 — toda a esteira fiscal de distribuidoras será reescrita",
    "Diesel importado bateu recorde (acima de R$ 6,50/l); ~R$ 10 bi em subvenções à Petrobras distorcem o mercado",
  ],
  financeiro: [
    "Câmbio + Brent: margem exposta à volatilidade (receita da Petrobras oscila R$ 9 bi/semana)",
    "Capital de giro: revenda paga em 30-45 dias, ICMS por antecipação, Selic alta",
    "Raízen — 2ª maior do setor — pediu recuperação extrajudicial com R$ 65,1 bi de dívida",
  ],
  operacao: [
    "Refino abaixo da capacidade instalada; dependência de diesel importado",
    "Pilflagem (furto em dutos/tanques) movimenta bilhões no crime organizado",
    "Fraude no varejo: adulteração, bomba-truque, sonegação",
    "Frota de transportadores envelhecida; escassez de motoristas",
  ],
  regulacao: [
    "ANP: Fiel Qualidade, outorgas, CMN/bunkering, metas RenovaBio (CBIOs)",
    "Histórico de cartel e corrupção (BR/Ipiranga/Shell, Lava Jato): compliance é dor real e carreira-ending",
  ],
  comercial: [
    "Guerra de preço no bico; margens comprimidas",
    "Concorrência de imports (EUA, Argentina) e novas distribuidoras; Acelen crescendo no Nordeste",
    "Elétricos no longo prazo + misturas mudando (E30→E32→E35)",
    "Digitalização lenta na base: revendas e regionais operam com WhatsApp, planilha e telefone",
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
  "OFICIAIS — Agência Petrobras (agencia.petrobras.com.br): ChatPetrobras, Lê-AI, Smart Tocha, Projeto Cortex · RI Vibra: Relato Integrado 2024 (GRI) · ANP: shares, RenovaBio, refinarias · EPE: demanda · EC 132/2023",
  "RANKING — Valor 1000 (12/11/2024): as 46 maiores de O&G, receitas líquidas 2023 (base: balanços auditados na CVM)",
  "IMPRENSA MAJOR — Valor (IA logística Vibra, -67% acidentes) · Estadão (Raízen R$ 230 mi) · Época Negócios (Vibra R$ 900 mi) · VEJA (precisão 98%) · Bloomberg Línea · Exame · Gazeta do Povo/Minaspetro · NovaCana · Movimento Econômico",
  "SETORIAL — IBP (R$ 34 bi em PD&I via cláusula ANP) · Fecombustíveis · sites oficiais: ale.com.br, larcopetroleo.com.br, braskem.com.br, raizen.com.br",
  "INTERNACIONAIS (secundários) — derekwilson.ai; enkiai: ordens de grandeza de BP/Shell/Exxon/Chevron/TotalEnergies — verificar nos comunicados oficiais das empresas antes de uso contratual",
];

export const mapaEmpresas46: { n: number; empresa: string; sede: string; receita: string; ia: string }[] = [
  { n: 1, empresa: "Petrobras", sede: "RJ", receita: "R$ 512 bi", ia: "SIM — líder nacional" },
  { n: 2, empresa: "Raízen", sede: "RJ", receita: "R$ 220,5 bi", ia: "SIM — R$ 230 mi transportes" },
  { n: 3, empresa: "Vibra", sede: "RJ", receita: "R$ 162,9 bi", ia: "SIM — R$ 900 mi estoque" },
  { n: 4, empresa: "Cosan", sede: "SP", receita: "R$ 149,9 bi", ia: "— (conglomerado)" },
  { n: 5, empresa: "Ultrapar (Ipiranga)", sede: "SP", receita: "R$ 126 bi", ia: "Parcial — núcleo de inovação" },
  { n: 6, empresa: "Shell", sede: "RJ", receita: "R$ 52,6 bi", ia: "SIM — líder global" },
  { n: 7, empresa: "Acelen", sede: "BA", receita: "R$ 43,8 bi", ia: "SIM — modernização Mataripe" },
  { n: 8, empresa: "Petrogal (Galp)", sede: "RJ", receita: "R$ 14,2 bi", ia: "NÃO MAPEADO" },
  { n: 9, empresa: "ALE Combustíveis", sede: "RN", receita: "R$ 13,8 bi", ia: "NÃO — oportunidade" },
  { n: 10, empresa: "Atem", sede: "AM", receita: "R$ 12,1 bi", ia: "NÃO MAPEADO" },
  { n: 11, empresa: "PRIO", sede: "RJ", receita: "R$ 11,9 bi (+87%)", ia: "NÃO MAPEADO" },
  { n: 12, empresa: "Larco", sede: "BA", receita: "R$ 11 bi (+24%)", ia: "NÃO — oportunidade direta" },
  { n: 13, empresa: "Refinaria Ream (Atem)", sede: "AM", receita: "R$ 10,8 bi (+220%)", ia: "NÃO MAPEADO" },
  { n: 14, empresa: "Copa Energia", sede: "SP", receita: "R$ 10,3 bi", ia: "NÃO MAPEADO" },
  { n: 15, empresa: "Repsol Sinopec Brasil", sede: "RJ", receita: "R$ 8 bi", ia: "NÃO MAPEADO" },
  { n: 16, empresa: "PETROBAHIA", sede: "BA", receita: "R$ 6,95 bi (+23,6%)", ia: "NÃO MAPEADO" },
  { n: 17, empresa: "Rodoil", sede: "RS", receita: "R$ 6,5 bi", ia: "NÃO MAPEADO" },
  { n: 18, empresa: "Potencial", sede: "PR", receita: "R$ 5,8 bi", ia: "NÃO MAPEADO" },
  { n: 19, empresa: "3R Petroleum", sede: "RJ", receita: "R$ 5,6 bi (+226%)", ia: "NÃO MAPEADO" },
  { n: 20, empresa: "CEG", sede: "RJ", receita: "R$ 5,6 bi", ia: "Parcial (gás)" },
  { n: 21, empresa: "Refit", sede: "RJ", receita: "R$ 5 bi", ia: "NÃO MAPEADO" },
  { n: 22, empresa: "TT Work", sede: "PE", receita: "R$ 4,1 bi", ia: "NÃO MAPEADO" },
  { n: 23, empresa: "Bahiagás", sede: "BA", receita: "R$ 3,6 bi", ia: "Parcial (gás)" },
  { n: 24, empresa: "Gasmig", sede: "MG", receita: "R$ 3,6 bi", ia: "Parcial (gás)" },
  { n: 25, empresa: "Cigás", sede: "AM", receita: "R$ 3,4 bi", ia: "NÃO MAPEADO" },
  { n: 26, empresa: "Karoon Energy", sede: "RJ", receita: "R$ 3,2 bi", ia: "NÃO MAPEADO" },
  { n: 27, empresa: "CEG Rio", sede: "RJ", receita: "R$ 3,2 bi", ia: "Parcial (gás)" },
  { n: 28, empresa: "Petrovia", sede: "PE", receita: "R$ 3,2 bi", ia: "NÃO — oportunidade" },
  { n: 29, empresa: "PetroReconcavo", sede: "BA", receita: "R$ 2,8 bi", ia: "NÃO MAPEADO" },
  { n: 30, empresa: "Buffon", sede: "RS", receita: "R$ 2,8 bi", ia: "NÃO MAPEADO" },
  { n: 31, empresa: "Rede 7", sede: "SP", receita: "R$ 2,6 bi", ia: "NÃO MAPEADO" },
  { n: 32, empresa: "Rio Branco de Petróleo", sede: "MG", receita: "R$ 2,5 bi", ia: "NÃO MAPEADO" },
  { n: 33, empresa: "Santa Lúcia", sede: "RS", receita: "R$ 2,3 bi (+20,6%)", ia: "NÃO MAPEADO" },
  { n: 34, empresa: "SC Gás", sede: "SC", receita: "R$ 2,1 bi", ia: "Parcial (gás)" },
  { n: 35, empresa: "Galp Energia", sede: "RJ", receita: "R$ 2,1 bi", ia: "NÃO MAPEADO" },
  { n: 36, empresa: "Ruff Cidade Jardim", sede: "SP", receita: "R$ 2 bi", ia: "NÃO MAPEADO" },
  { n: 37, empresa: "ES Gás", sede: "ES", receita: "R$ 1,9 bi", ia: "Parcial (gás)" },
  { n: 38, empresa: "Constellation", sede: "RJ", receita: "R$ 1,9 bi", ia: "NÃO MAPEADO" },
  { n: 39, empresa: "Origem Energia", sede: "RJ", receita: "R$ 1,6 bi (+39%)", ia: "NÃO MAPEADO" },
  { n: 40, empresa: "Ocyan", sede: "RJ", receita: "R$ 1,6 bi", ia: "Parcial (serviços)" },
  { n: 41, empresa: "Copergás", sede: "PE", receita: "R$ 1,4 bi", ia: "Parcial (gás)" },
  { n: 42, empresa: "Enauta", sede: "RJ", receita: "R$ 1,4 bi (-36,2%)", ia: "NÃO MAPEADO" },
  { n: 43, empresa: "Rede Sol Fuel", sede: "SP", receita: "R$ 1,2 bi", ia: "NÃO MAPEADO" },
  { n: 44, empresa: "Commit", sede: "RJ", receita: "R$ 1 bi", ia: "NÃO MAPEADO" },
  { n: 45, empresa: "Gás Natural SP Sul", sede: "SP", receita: "R$ 988 mi", ia: "Parcial (gás)" },
  { n: 46, empresa: "Compagás", sede: "PR", receita: "R$ 979 mi", ia: "Parcial (gás)" },
];

export const cadeiaResumo: { elo: string; processos: string; exemplo: string; ganho: string }[] = [
  { elo: "1. Exploração & Produção", processos: "Sísmica, reservatórios, perfuração, manutenção, segurança, ESG — tudo análise humana hoje", exemplo: "Interpretação sísmica manual (semanas)", ganho: "BP: -90% do tempo; Shell: US$ 2 bi/ano" },
  { elo: "2. Trading & Importação", processos: "Preço de compra, contratos, afretamento, clearance, hedging — mesa comercial e jurídico humanos", exemplo: "Afretamento manual de navios", ganho: "Vibra prevê consumo com meses de antecedência com IA" },
  { elo: "3. Refino", processos: "Planejamento, operação 24/7, qualidade em linha, manutenção, energia", exemplo: "Planners montam campanhas manualmente", ganho: "ExxonMobil: US$ 9,7 bi; Braskem: R$ 460 mi/ano" },
  { elo: "4. Logística & Armazenagem", processos: "Abastecimento regional, roteirização, frota, pilflagem, terminais", exemplo: "Rotas e conferência manuais", ganho: "Vibra: -R$ 900 mi em estoque; -24% custo logístico" },
  { elo: "5. Distribuição & Revenda (B2B)", processos: "Cotação, pedido, crédito, pricing, prospecção, gestão de rede, contratos — telefone e WhatsApp hoje", exemplo: "Cotação por telefone, dias de ida e volta", ganho: "Funil 3-5x mais barato; +0,5-1,5% margem" },
  { elo: "6. Varejo (posto)", processos: "Preço na bomba, fluxo de veículos, conveniência, antifraude, fidelização, bico", exemplo: "Dono ajusta preço na experiência", ganho: "Vibra: câmeras + IA no posto; recupera 0,5-2 p.p." },
  { elo: "7. Fiscal & Back-office", processos: "ICMS multi-estado, IBS/CBS, NF-e, conciliação, cobrança, compliance ANP, contratos, RH", exemplo: "150 páginas de regras fiscais processadas por contadores", ganho: "Petrobras: US$ 120 mi em 3 semanas" },
  { elo: "8. Pessoas & Cultura", processos: "Copilotos, treinamento, recrutamento", exemplo: "Onização depende de especialistas", ganho: "+40% produtividade (benchmark)" },
];

export const whiteSpace: { titulo: string; texto: string }[] = [
  { titulo: "WhatsApp como CRM invisível", texto: "Todo o histórico de cotações dos revendedores está em chats — minerável hoje, nenhum regional faz." },
  { titulo: "NF-e como sensor de demanda", texto: "Notas fiscais em tempo real revelam demanda por município antes do fechamento mensal." },
  { titulo: "Agenda dos vendedores", texto: "Rotas de visitação feitas à mão; otimizável como roteirização logística." },
  { titulo: "Preço de conveniência", texto: "Gerido à mão enquanto todo o foco vai para o combustível." },
  { titulo: "Crédito em tempo real", texto: "Aprovação manual de limite enquanto o pedido do revendedor espera dias." },
  { titulo: "Renovação de contratos", texto: "Ninguém tem sistema de alerta; churn de postos acontece silenciosamente." },
  { titulo: "Furto interno (lavração)", texto: "Inconsistências compra×venda×tanque detectáveis com IA simples." },
  { titulo: "Turnover de motoristas", texto: "Previsão de saída com dados de jornada da frota." },
  { titulo: "Afretamento e prazos", texto: "Renovações deixadas para a última hora, sem otimização." },
  { titulo: "Relatórios da ANP", texto: "Montados manualmente todo mês; 33 distribuidoras descumpriram RenovaBio em 2025." },
];

export const fatosNovos: string[] = [
  "As 3 gigantes (Vibra, Raízen, Ipiranga) subiram de 53,16% para 55,41% da gasolina em 1 ano; diesel: 56,15% — dado ANP via imprensa",
  "Redes de bandeira branca tomaram 4% das líderes; informais tomaram mais 3% — ilegalidade é o concorrente nº 1",
  "Operação Carbono Oculto (Cade): investigações de cartel; governo autuou Vibra, Raízen e Ipiranga (mar/2026)",
  "ANP (planilha oficial, atualização 14/07/2026): 37 distribuidoras ficaram abaixo de 100% da meta do RenovaBio em 2025 — 19 zeraram",
  "Regionais do NE cresceram até +23,6% em 2023 enquanto as gigantes recuaram -7% a -12% — Valor 1000",
  "Vibra: R$ 900 mi de estoque liberados e precisão de demanda de 98% com IA; -67% de acidentes na frota (Valor/VEJA, ago/2026)",
  "Petrobras declara IA em canal oficial: ChatPetrobras, Lê-AI, Smart Tocha e Projeto Cortex (2021-2026)",
  "ANP via IBP: R$ 34 bi mobilizados em PD&I pela cláusula contratual em 27 anos — incluindo IA e automação",
];
