// Indicadores públicos do painel "Mercado agora".
// "ao vivo" = buscado na fonte pela rota /api/mercado (cache de 1 h).
// "foto" = valor publicado na fonte, conferido em 24/09/2026 (atualizar pela data de vigência).

export type Indicador = {
  id: string;
  rotulo: string;
  valor: string; // já formatado, exatamente como publicado (sem arredondar)
  unidade?: string;
  detalhe: string; // praça/modalidade/observação
  data: string; // data de referência da fonte
  fonte: string;
  url: string;
  modo: "ao vivo" | "foto";
  variacao?: number; // variação % vs. leitura anterior (só nos "ao vivo")
};

export const FOTO: Indicador[] = [
  {
    id: "petrobras-gasolina",
    rotulo: "Petrobras · Gasolina A",
    valor: "R$ 3,0608",
    unidade: "/L",
    detalhe: "R$ 3.060,80/m³ · Paulínia/SP · sem tributos",
    data: "vigência 10/09/2026",
    fonte: "Petrobras — tabelas de preços às distribuidoras",
    url: "https://precos.petrobras.com.br/",
    modo: "foto",
  },
  {
    id: "petrobras-diesel",
    rotulo: "Petrobras · Diesel A S10",
    valor: "R$ 5,4511",
    unidade: "/L",
    detalhe: "com subvenção (MPs 1.363 e 1.391): R$ 3,3311/L · Paulínia/SP",
    data: "vigência 17/09/2026",
    fonte: "Petrobras — tabelas de preços às distribuidoras",
    url: "https://precos.petrobras.com.br/",
    modo: "foto",
  },
  {
    id: "bomba",
    rotulo: "Bomba · média Brasil",
    valor: "R$ 6,54",
    unidade: "/L",
    detalhe: "gasolina · diesel S10 R$ 7,13 · etanol R$ 4,08",
    data: "semana 13–19/09/2026",
    fonte: "ANP — Levantamento de Preços de Combustíveis",
    url: "https://www.gov.br/anp/pt-br/assuntos/precos-e-defesa-da-concorrencia/precos/levantamento-de-precos-de-combustiveis-ultimas-semanas-pesquisadas",
    modo: "foto",
  },
  {
    id: "cbio",
    rotulo: "CBIO · B3",
    valor: "R$ 26,2786",
    detalhe: "média ponderada · 621.146 CBIOs negociados",
    data: "24/09/2026 (parcial 18h06)",
    fonte: "B3 — negócios de CBIO no balcão",
    url: "https://www.b3.com.br/pt_br/produtos-e-servicos/negociacao/renda-fixa/cbio.htm",
    modo: "foto",
  },
];

// valores de reserva caso a fonte ao vivo esteja fora do ar (mesmos da conferência de 24/09/2026)
export const RESERVA_AO_VIVO: Indicador[] = [
  { id: "ptax", rotulo: "Dólar PTAX", valor: "R$ 5,1795", detalhe: "venda · compra R$ 5,1789", data: "24/09/2026 13:03", fonte: "Banco Central — PTAX", url: "https://www.bcb.gov.br/estabilidadefinanceira/historicocotacoes", modo: "foto" },
  { id: "brent", rotulo: "Brent", valor: "US$ 114,89", unidade: "/bbl", detalhe: "spot FOB", data: "22/09/2026", fonte: "EIA — Europe Brent Spot Price FOB", url: "https://www.eia.gov/dnav/pet/hist/RBRTED.htm", modo: "foto" },
  { id: "selic", rotulo: "Selic meta", valor: "13,75%", unidade: " a.a.", detalhe: "Copom", data: "desde 17/09/2026", fonte: "Banco Central — SGS 432", url: "https://www.bcb.gov.br/controleinflacao/taxaselic", modo: "foto" },
];
