// Mapa de calor por UF.
// REAL: mercado 2025 (gasolina C + diesel + etanol hidratado, m³) — ANP, "Vendas de derivados de petróleo e biocombustíveis".
// SIMULADO: participação da empresa fictícia, estrutura logística, volume endereçável e índice de risco.
// Volume endereçável = mercado × alcance logístico (base própria 1,0 · terminal 0,8 · base vizinha 0,6 · sem estrutura 0,15) × (10% − participação).

export type UF = {
  sigla: string;
  cod: string;
  nome: string;
  mercado: number;
  share: number;
  estrutura: string;
  enderecavel: number;
  oportunidade: number;
  risco: number | null;
  motivos: string[];
};

export const FONTE_MERCADO = {
  rotulo: "ANP — Vendas de derivados de petróleo e biocombustíveis (2025)",
  url: "https://www.gov.br/anp/pt-br/centrais-de-conteudo/dados-abertos/vendas-de-derivados-de-petroleo-e-biocombustiveis",
};

export const UFS: UF[] = [
 {
  "sigla": "SP",
  "cod": "35",
  "nome": "São Paulo",
  "mercado": 34191827,
  "share": 0.1,
  "estrutura": "sem estrutura",
  "enderecavel": 507749,
  "risco": null,
  "motivos": [],
  "oportunidade": 48
 },
 {
  "sigla": "MG",
  "cod": "31",
  "nome": "Minas Gerais",
  "mercado": 15980672,
  "share": 1.8,
  "estrutura": "terminal contratado",
  "enderecavel": 1048332,
  "risco": 30,
  "motivos": [
   "baixa participação: pouca exposição"
  ],
  "oportunidade": 100
 },
 {
  "sigla": "PR",
  "cod": "41",
  "nome": "Paraná",
  "mercado": 11287433,
  "share": 0.4,
  "estrutura": "sem estrutura",
  "enderecavel": 162539,
  "risco": null,
  "motivos": [],
  "oportunidade": 16
 },
 {
  "sigla": "RS",
  "cod": "43",
  "nome": "Rio Grande do Sul",
  "mercado": 8273501,
  "share": 0.0,
  "estrutura": "fora da área de atuação",
  "enderecavel": 0,
  "risco": null,
  "motivos": [],
  "oportunidade": 0
 },
 {
  "sigla": "BA",
  "cod": "29",
  "nome": "Bahia",
  "mercado": 7003693,
  "share": 13.6,
  "estrutura": "base própria",
  "enderecavel": 0,
  "risco": 72,
  "motivos": [
   "33% do volume da empresa concentrado na UF",
   "margem de cada praça sob a régua da Res. ANP 1.004/2026"
  ],
  "oportunidade": 0
 },
 {
  "sigla": "GO",
  "cod": "52",
  "nome": "Goiás",
  "mercado": 6999316,
  "share": 3.6,
  "estrutura": "base própria",
  "enderecavel": 447956,
  "risco": 34,
  "motivos": [
   "preço de bomba pressionado pelo etanol hidratado com PIS/Cofins zerado até 09/10/2026"
  ],
  "oportunidade": 43
 },
 {
  "sigla": "SC",
  "cod": "42",
  "nome": "Santa Catarina",
  "mercado": 6757618,
  "share": 0.4,
  "estrutura": "sem estrutura",
  "enderecavel": 97310,
  "risco": null,
  "motivos": [],
  "oportunidade": 9
 },
 {
  "sigla": "RJ",
  "cod": "33",
  "nome": "Rio de Janeiro",
  "mercado": 6524381,
  "share": 0.0,
  "estrutura": "fora da área de atuação",
  "enderecavel": 0,
  "risco": null,
  "motivos": [],
  "oportunidade": 0
 },
 {
  "sigla": "MT",
  "cod": "51",
  "nome": "Mato Grosso",
  "mercado": 6015140,
  "share": 3.7,
  "estrutura": "terminal contratado",
  "enderecavel": 303163,
  "risco": 44,
  "motivos": [
   "carteira agro com crédito concentrado na safra"
  ],
  "oportunidade": 29
 },
 {
  "sigla": "PA",
  "cod": "15",
  "nome": "Pará",
  "mercado": 4837597,
  "share": 1.0,
  "estrutura": "sem estrutura",
  "enderecavel": 65308,
  "risco": 52,
  "motivos": [
   "Norte: estiagem de 2026 monitorada pela ANP (risco fluvial)"
  ],
  "oportunidade": 6
 },
 {
  "sigla": "PE",
  "cod": "26",
  "nome": "Pernambuco",
  "mercado": 3472344,
  "share": 6.4,
  "estrutura": "base própria",
  "enderecavel": 125004,
  "risco": 55,
  "motivos": [
   "diesel de Suape com subvenção de R$ 2,12/L dependente de MP",
   "concorrência de importadores na RMR"
  ],
  "oportunidade": 12
 },
 {
  "sigla": "CE",
  "cod": "23",
  "nome": "Ceará",
  "mercado": 3182853,
  "share": 1.5,
  "estrutura": "terminal contratado",
  "enderecavel": 216434,
  "risco": 33,
  "motivos": [
   "base contratada de terceiros (Maracanaú)"
  ],
  "oportunidade": 21
 },
 {
  "sigla": "MS",
  "cod": "50",
  "nome": "Mato Grosso do Sul",
  "mercado": 3146802,
  "share": 0.0,
  "estrutura": "fora da área de atuação",
  "enderecavel": 0,
  "risco": null,
  "motivos": [],
  "oportunidade": 0
 },
 {
  "sigla": "MA",
  "cod": "21",
  "nome": "Maranhão",
  "mercado": 2999242,
  "share": 5.5,
  "estrutura": "terminal contratado",
  "enderecavel": 107973,
  "risco": 61,
  "motivos": [
   "suprimento pelo Itaqui exposto à importação com janela fechada (Ministério da Fazenda, 09/09/2026)",
   "fila de navios em terminais do Maranhão"
  ],
  "oportunidade": 10
 },
 {
  "sigla": "ES",
  "cod": "32",
  "nome": "Espírito Santo",
  "mercado": 2562742,
  "share": 0.0,
  "estrutura": "fora da área de atuação",
  "enderecavel": 0,
  "risco": null,
  "motivos": [],
  "oportunidade": 0
 },
 {
  "sigla": "AM",
  "cod": "13",
  "nome": "Amazonas",
  "mercado": 1923212,
  "share": 0.0,
  "estrutura": "fora da área de atuação",
  "enderecavel": 0,
  "risco": null,
  "motivos": [],
  "oportunidade": 0
 },
 {
  "sigla": "TO",
  "cod": "17",
  "nome": "Tocantins",
  "mercado": 1758772,
  "share": 8.7,
  "estrutura": "terminal contratado",
  "enderecavel": 18291,
  "risco": 64,
  "motivos": [
   "praça Palmas com margem 38% acima do período-base (dossiê gerado)",
   "abastecimento por rodovia longa a partir da Base Oeste"
  ],
  "oportunidade": 2
 },
 {
  "sigla": "DF",
  "cod": "53",
  "nome": "Distrito Federal",
  "mercado": 1708962,
  "share": 7.0,
  "estrutura": "atendida por base vizinha",
  "enderecavel": 30761,
  "risco": 41,
  "motivos": [
   "praça atendida a 157 km da Base Planalto"
  ],
  "oportunidade": 3
 },
 {
  "sigla": "PB",
  "cod": "25",
  "nome": "Paraíba",
  "mercado": 1529730,
  "share": 5.9,
  "estrutura": "terminal contratado",
  "enderecavel": 50175,
  "risco": 38,
  "motivos": [
   "dependência de um único terminal (Cabedelo)"
  ],
  "oportunidade": 5
 },
 {
  "sigla": "RO",
  "cod": "11",
  "nome": "Rondônia",
  "mercado": 1492589,
  "share": 0.0,
  "estrutura": "fora da área de atuação",
  "enderecavel": 0,
  "risco": null,
  "motivos": [],
  "oportunidade": 0
 },
 {
  "sigla": "PI",
  "cod": "22",
  "nome": "Piauí",
  "mercado": 1477994,
  "share": 5.0,
  "estrutura": "atendida por base vizinha",
  "enderecavel": 44340,
  "risco": 47,
  "motivos": [
   "praça abastecida a 430 km do Itaqui"
  ],
  "oportunidade": 4
 },
 {
  "sigla": "RN",
  "cod": "24",
  "nome": "Rio Grande do Norte",
  "mercado": 1265310,
  "share": 2.7,
  "estrutura": "atendida por base vizinha",
  "enderecavel": 55421,
  "risco": 25,
  "motivos": [
   "volume pequeno e disperso"
  ],
  "oportunidade": 5
 },
 {
  "sigla": "AL",
  "cod": "27",
  "nome": "Alagoas",
  "mercado": 1066196,
  "share": 3.1,
  "estrutura": "atendida por base vizinha",
  "enderecavel": 44141,
  "risco": 30,
  "motivos": [
   "praça atendida por Suape, 238 km"
  ],
  "oportunidade": 4
 },
 {
  "sigla": "SE",
  "cod": "28",
  "nome": "Sergipe",
  "mercado": 920865,
  "share": 3.7,
  "estrutura": "atendida por base vizinha",
  "enderecavel": 34809,
  "risco": 28,
  "motivos": [
   "praça atendida pela Base Litoral, 286 km"
  ],
  "oportunidade": 3
 },
 {
  "sigla": "RR",
  "cod": "14",
  "nome": "Roraima",
  "mercado": 388139,
  "share": 0.0,
  "estrutura": "fora da área de atuação",
  "enderecavel": 0,
  "risco": null,
  "motivos": [],
  "oportunidade": 0
 },
 {
  "sigla": "AP",
  "cod": "16",
  "nome": "Amapá",
  "mercado": 310540,
  "share": 0.0,
  "estrutura": "fora da área de atuação",
  "enderecavel": 0,
  "risco": null,
  "motivos": [],
  "oportunidade": 0
 },
 {
  "sigla": "AC",
  "cod": "12",
  "nome": "Acre",
  "mercado": 292230,
  "share": 0.0,
  "estrutura": "fora da área de atuação",
  "enderecavel": 0,
  "risco": null,
  "motivos": [],
  "oportunidade": 0
 }
];
