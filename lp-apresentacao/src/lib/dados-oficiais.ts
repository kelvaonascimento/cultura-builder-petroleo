// Números OFICIAIS usados na apresentação, cada um com fonte e data de referência.
// Calculados a partir dos dados abertos da ANP em 24/09/2026.
// Regra: nenhum número entra na tela sem estar aqui ou em outro arquivo com fonte.

export type Fonte = { rotulo: string; url: string; data: string };

export const FONTES = {
  vendasDistribuidora: { rotulo: "ANP — vendas de combustíveis por distribuidora", url: "https://www.gov.br/anp/pt-br/centrais-de-conteudo/dados-abertos/vendas-de-derivados-de-petroleo-e-biocombustiveis", data: "dados de 2025, arquivo de 23/09/2026" },
  vendasUF: { rotulo: "ANP — vendas de derivados de petróleo e biocombustíveis por UF", url: "https://www.gov.br/anp/pt-br/centrais-de-conteudo/dados-abertos/vendas-de-derivados-de-petroleo-e-biocombustiveis", data: "série 2016–2025" },
  postos: { rotulo: "ANP — cadastro de revendedores varejistas de combustíveis", url: "https://www.gov.br/anp/pt-br/centrais-de-conteudo/dados-abertos/revendedores-varejistas-de-combustiveis-automotivos", data: "cadastro de 24/09/2026" },
  reservas: { rotulo: "ANP — Boletim Anual de Recursos e Reservas 2025", url: "https://www.gov.br/anp/pt-br/canais_atendimento/imprensa/noticias-comunicados/reservas-provadas-de-petroleo-no-brasil-cresceram-3-84-em-2025", data: "divulgado em 10/04/2026" },
  producao: { rotulo: "ANP — produção de petróleo por estado e localização", url: "https://www.gov.br/anp/pt-br/centrais-de-conteudo/dados-abertos/producao-de-petroleo-e-gas-natural-por-estado-e-localizacao", data: "ano de 2025" },
  cbio2026: { rotulo: "ANP — metas definitivas do RenovaBio 2026", url: "https://www.gov.br/anp/pt-br/canais_atendimento/imprensa/noticias-comunicados/renovabio-anp-divulga-metas-definitivas-para-as-distribuidoras-em-2026", data: "31/03/2026" },
} satisfies Record<string, Fonte>;

// Vendas nacionais (m³) — gasolina C, óleo diesel e etanol hidratado
export const VENDAS_ANUAIS: { ano: number; gasolina: number; diesel: number; etanol: number }[] = [{"ano": 2016, "gasolina": 43019082, "diesel": 54278570, "etanol": 14585844}, {"ano": 2017, "gasolina": 44149532, "diesel": 54772292, "etanol": 13644445}, {"ano": 2018, "gasolina": 38351779, "diesel": 55629467, "etanol": 19384719}, {"ano": 2019, "gasolina": 38165037, "diesel": 57298448, "etanol": 22544050}, {"ano": 2020, "gasolina": 35823614, "diesel": 57472056, "etanol": 19256221}, {"ano": 2021, "gasolina": 39317347, "diesel": 62111566, "etanol": 16703824}, {"ano": 2022, "gasolina": 43039272, "diesel": 63226940, "etanol": 15473947}, {"ano": 2023, "gasolina": 46029714, "diesel": 65518401, "etanol": 16233412}, {"ano": 2024, "gasolina": 44405318, "diesel": 67421678, "etanol": 21738758}, {"ano": 2025, "gasolina": 46654285, "diesel": 69476713, "etanol": 21238702}];

// Ranking das distribuidoras em 2025 (m³ de gasolina C + diesel B + etanol hidratado) e postos com a bandeira
export const TOTAL_VENDAS_DISTRIBUIDORAS_2025 = 137401752;
export const TOTAL_VENDAS_DISTRIBUIDORAS_2024 = 133697991;
export const DISTRIBUIDORAS_COM_VENDA_2025 = 181;
export const RANKING_DISTRIBUICAO_2025: { pos: number; empresa: string; razaoSocial: string; m3_2025: number; m3_2024: number; participacao: number; variacao: number; postos: number }[] = [
 {
  "pos": 1,
  "empresa": "Vibra Energia",
  "razaoSocial": "VIBRA ENERGIA S.A",
  "m3_2025": 29263944,
  "m3_2024": 28817518,
  "participacao": 21.3,
  "variacao": 1.5,
  "postos": 6869
 },
 {
  "pos": 2,
  "empresa": "Ipiranga (Ultrapar)",
  "razaoSocial": "IPIRANGA PRODUTOS DE PETRÓLEO S.A",
  "m3_2025": 23310099,
  "m3_2024": 22920442,
  "participacao": 16.96,
  "variacao": 1.7,
  "postos": 5624
 },
 {
  "pos": 3,
  "empresa": "Raízen",
  "razaoSocial": "RAIZEN S.A.",
  "m3_2025": 22262678,
  "m3_2024": 21608747,
  "participacao": 16.2,
  "variacao": 3.0,
  "postos": 4759
 },
 {
  "pos": 4,
  "empresa": "Larco",
  "razaoSocial": "LARCO COMERCIAL DE PRODUTOS DE PETRÓLEO LTDA.",
  "m3_2025": 3156286,
  "m3_2024": 3411824,
  "participacao": 2.3,
  "variacao": -7.5,
  "postos": 160
 },
 {
  "pos": 5,
  "empresa": "ALE",
  "razaoSocial": "ALE COMBUSTIVEIS S.A.",
  "m3_2025": 3002188,
  "m3_2024": 2774879,
  "participacao": 2.18,
  "variacao": 8.2,
  "postos": 1076
 },
 {
  "pos": 6,
  "empresa": "Atem's",
  "razaoSocial": "ATEM' S DISTRIBUIDORA DE PETRÓLEO S.A.",
  "m3_2025": 2710307,
  "m3_2024": 2676083,
  "participacao": 1.97,
  "variacao": 1.3,
  "postos": 463
 },
 {
  "pos": 7,
  "empresa": "Sabbá",
  "razaoSocial": "PETRÓLEO SABBÁ S.A.",
  "m3_2025": 2226321,
  "m3_2024": 2098390,
  "participacao": 1.62,
  "variacao": 6.1,
  "postos": 339
 },
 {
  "pos": 8,
  "empresa": "Royal FIC",
  "razaoSocial": "ROYAL FIC DISTRIBUIDORA DE DERIVADOS DE PETRÓLEO S/A",
  "m3_2025": 2159388,
  "m3_2024": 2058434,
  "participacao": 1.57,
  "variacao": 4.9,
  "postos": 2
 },
 {
  "pos": 9,
  "empresa": "Petrobahia",
  "razaoSocial": "PETROBAHIA S/A",
  "m3_2025": 2030040,
  "m3_2024": 1874541,
  "participacao": 1.48,
  "variacao": 8.3,
  "postos": 154
 },
 {
  "pos": 10,
  "empresa": "Ciapetro",
  "razaoSocial": "CIAPETRO DISTRIBUIDORA DE COMBUSTÍVEIS LTDA",
  "m3_2025": 2022730,
  "m3_2024": 1756408,
  "participacao": 1.47,
  "variacao": 15.2,
  "postos": 86
 },
 {
  "pos": 11,
  "empresa": "Federal Energia",
  "razaoSocial": "FEDERAL ENERGIA S/A",
  "m3_2025": 1760580,
  "m3_2024": 1478996,
  "participacao": 1.28,
  "variacao": 19.0,
  "postos": 40
 },
 {
  "pos": 12,
  "empresa": "SIM Distribuidora",
  "razaoSocial": "SIM DISTRIBUIDORA DE COMBUSTIVEIS LTDA",
  "m3_2025": 1468916,
  "m3_2024": 1430635,
  "participacao": 1.07,
  "variacao": 2.7,
  "postos": 6
 }
];

// Participação das 3 maiores (Vibra, Ipiranga, Raízen) por produto, em %
export const TOP3_PARTICIPACAO: Record<string, number> = {"Gasolina C 2024": 53.43, "Gasolina C 2025": 53.76, "Diesel B 2024": 57.37, "Diesel B 2025": 57.27, "Etanol Hidratado 2024": 50.02, "Etanol Hidratado 2025": 46.86};

// Postos por bandeira (cadastro ANP de 24/09/2026)
export const POSTOS = {
  total: 45807,
  bandeiraBranca: 22179,
  nordesteTotal: 12950,
  nordesteBandeiraBranca: 7978,
  porBandeira: [
    { bandeira: "Bandeira branca", postos: 22179 },
    { bandeira: "Vibra", postos: 6869 },
    { bandeira: "Ipiranga", postos: 5624 },
    { bandeira: "Raízen", postos: 4759 },
    { bandeira: "ALE", postos: 1076 },
    { bandeira: "Rodoil", postos: 583 },
    { bandeira: "Charrua", postos: 495 },
    { bandeira: "Atem's", postos: 463 },
  ],
};

export const RESERVAS_2025 = { petroleo1P_bi_bbl: 17.488, petroleo2P_bi_bbl: 24.265, gas1P_bi_m3: 572.752, reposicao_pct: 147.03, variacao_1P_pct: 3.84 };
export const PRODUCAO_PETROLEO_2025 = { m3: 218776942.302, mar_pct: 97.63 };
export const META_CBIO_2026 = 48090000;

// Receita de venda de bens e/ou serviços (conta 3.01, DRE consolidada) — CVM, DFP 2025, valores em reais
export const FONTE_CVM: Fonte = {
  rotulo: "CVM — dados abertos (DFP 2025, DRE consolidada, conta 3.01)",
  url: "https://dados.cvm.gov.br/dados/CIA_ABERTA/DOC/DFP/DADOS/",
  data: "exercício 2025 (Raízen: safra abr/2025–mar/2026)",
};
export const EMPRESAS_LISTADAS: { empresa: string; cnpj: string; receita: number; receitaAnterior: number; periodo: string; nota?: string }[] = [
  { empresa: "Petrobras", cnpj: "33.000.167/0001-01", receita: 497549000000, receitaAnterior: 490829000000, periodo: "2025" },
  { empresa: "Raízen", cnpj: "33.453.598/0001-23", receita: 225849347000, receitaAnterior: 255268454000, periodo: "safra 25/26", nota: "exercício de abril a março" },
  { empresa: "Vibra Energia", cnpj: "34.274.233/0001-02", receita: 189075000000, receitaAnterior: 172272000000, periodo: "2025" },
  { empresa: "Ultrapar (Ipiranga)", cnpj: "33.256.439/0001-39", receita: 142369540000, receitaAnterior: 133498913000, periodo: "2025" },
  { empresa: "Braskem", cnpj: "42.150.391/0001-70", receita: 70717000000, receitaAnterior: 77411000000, periodo: "2025" },
  { empresa: "Cosan", cnpj: "50.746.577/0001-15", receita: 40418596000, receitaAnterior: 43950742000, periodo: "2025" },
  { empresa: "Compass Gás e Energia", cnpj: "21.389.501/0001-81", receita: 16604055000, receitaAnterior: 18383448000, periodo: "2025" },
  { empresa: "PRIO", cnpj: "10.629.105/0001-68", receita: 15583960000, receitaAnterior: 14360653000, periodo: "2025" },
  { empresa: "Brava Energia", cnpj: "12.091.809/0001-55", receita: 11622991000, receitaAnterior: 8726361000, periodo: "2025", nota: "3R Petroleum + Enauta (incorporação eficaz em 31/07/2024)" },
  { empresa: "PetroReconcavo", cnpj: "03.342.704/0001-30", receita: 3157609000, receitaAnterior: 3264554000, periodo: "2025" },
];

// Refino — Anuário Estatístico ANP 2026 (dados de 2025)
export const FONTE_ANUARIO: Fonte = {
  rotulo: "ANP — Anuário Estatístico 2026 (seção 2, refino)",
  url: "https://www.gov.br/anp/pt-br/canais_atendimento/imprensa/noticias-comunicados/anp-divulga-dados-consolidados-do-setor-regulado-em-2025",
  data: "dados de 2025",
};
export const REFINO_2025 = { refinarias: 17, petrobras: 10, petrobrasCapacidadePct: 78.6, mataripeCapacidadeBpd: 377388, replanCapacidadeBpd: 433996, mataripeProcessadoBpd: 262086 };
