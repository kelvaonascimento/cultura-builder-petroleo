// Números do Cockpit do dono: resultado de hoje, mês × orçamento, estoque valorizado, RenovaBio e prazos.
// Tudo é SIMULADO para a empresa fictícia, exceto o que vem marcado como dado público:
// meta nacional de CBIO (ANP), preço do CBIO (B3), prazos regulatórios e o radar de normas.
import { FONTES, META_CBIO_2026, TOTAL_VENDAS_DISTRIBUIDORAS_2025 } from "@/lib/dados-oficiais";
import { margemRsM3, TANQUE_CAP_M3, TANQUE_VENDA_M3_DIA, VOLUME_DIA, type SimData } from "@/components/sections/demo-sim";
import { FOTO } from "./mercado";
import { PRAZOS } from "./regulacao-dados";

const centavos = (v: number) => Math.round(v * 100) / 100;
const DIA_MS = 86_400_000;

// frete médio de entrega em R$/m³ — premissa da simulação, na faixa do piso ANTT sobre as rotas reais da malha
export const FRETE_MEDIO_M3 = 63.4;

// orçamento diário da empresa fictícia; o do mês é o diário × dias do mês
const ORC_DIA = { volume: 7_800, receita: 42_432_000, margem: 3_354_000, frete: 494_520, despesas: 1_620_000 };
type Chave = keyof typeof ORC_DIA;

// realizado de um dia já fechado: variação determinística por dia (igual em toda renderização)
function diaFechado(d: number, agora = new Date()): Record<Chave, number> {
  const semana = new Date(agora.getFullYear(), agora.getMonth(), d).getDay(); // 0 = domingo
  const ritmo = semana === 0 ? 0.9 : semana === 6 ? 0.95 : 1.02 + (semana === 5 ? 0.02 : 0);
  const ruido = (((d * 37) % 11) - 5) * 0.002;
  const volume = Math.round(ORC_DIA.volume * (ritmo + ruido));
  const preco = 5.418 + (((d * 17) % 5) - 2) * 0.004;
  const margemM3 = 432 + Math.sin(d / 4) * 6 + (((d * 53) % 9) - 4) * 0.6;
  const freteM3 = 63.1 + Math.sin(d / 5) * 1.2 + (((d * 29) % 7) - 3) * 0.15;
  return {
    volume,
    receita: centavos(volume * 1000 * preco),
    margem: centavos(volume * margemM3),
    frete: centavos(volume * freteM3),
    despesas: 1_581_000 + ((d * 71) % 13) * 6_450,
  };
}

export function mesCorrente(agora = new Date()) {
  const dia = agora.getDate();
  const diasNoMes = new Date(agora.getFullYear(), agora.getMonth() + 1, 0).getDate();
  return { dia, diasNoMes, fechados: dia - 1, nome: agora.toLocaleDateString("pt-BR", { month: "long", year: "numeric" }) };
}

export type LinhaOrc = { rotulo: string; un: "m³" | "R$"; custo: boolean; orcado: number; realizado: number; projecao: number; desvioPct: number };

export function hojeAteAgora(sim: SimData) {
  const volume = sim.volume / 1000;
  const frac = Math.min(1, sim.volume / VOLUME_DIA);
  const margem = centavos(volume * margemRsM3(sim.precos));
  const frete = centavos(volume * FRETE_MEDIO_M3);
  const despesas = centavos(ORC_DIA.despesas * frac);
  return { volume, frac, receita: sim.receita, margem, frete, despesas, resultado: centavos(margem - frete - despesas) };
}

export function mesAteAgora(sim: SimData, agora = new Date()) {
  const { diasNoMes, fechados, nome, dia } = mesCorrente(agora);
  const dias = Array.from({ length: fechados }, (_, i) => diaFechado(i + 1, agora));
  const hoje = hojeAteAgora(sim);
  const decorrido = fechados + hoje.frac;
  const linha = (rotulo: string, k: Chave, un: "m³" | "R$", custo = false): LinhaOrc => {
    const realizado = centavos(dias.reduce((a, d) => a + d[k], 0) + hoje[k]);
    const orcado = ORC_DIA[k] * diasNoMes;
    const projecao = decorrido > 0 ? centavos((realizado / decorrido) * diasNoMes) : 0;
    return { rotulo, un, custo, orcado, realizado, projecao, desvioPct: ((projecao - orcado) / orcado) * 100 };
  };
  const vol = linha("Volume vendido", "volume", "m³");
  const rec = linha("Receita", "receita", "R$");
  const mar = linha("Margem bruta", "margem", "R$");
  const fre = linha("Frete de entrega", "frete", "R$", true);
  const des = linha("Despesas operacionais", "despesas", "R$", true);
  const r = (o: "orcado" | "realizado" | "projecao") => centavos(mar[o] - fre[o] - des[o]);
  const res: LinhaOrc = { rotulo: "Resultado operacional", un: "R$", custo: false, orcado: r("orcado"), realizado: r("realizado"), projecao: r("projecao"), desvioPct: ((r("projecao") - r("orcado")) / r("orcado")) * 100 };
  return {
    nome,
    dia,
    diasNoMes,
    linhas: [vol, rec, mar, fre, des, res],
    series: {
      volume: dias.map((d) => d.volume),
      receita: dias.map((d) => d.receita),
      margem: dias.map((d) => d.margem),
      frete: dias.map((d) => d.frete),
      resultado: dias.map((d) => d.margem - d.frete - d.despesas),
    },
  };
}

// estoque nas bases valorizado a custo de reposição e a exposição a reajuste do fornecedor
export function estoqueValorizado(sim: SimData) {
  const linhas = sim.tanques.map((t) => {
    const k = `${t.base}|${t.produto}`;
    const m3 = centavos(((TANQUE_CAP_M3[k] ?? 0) * t.nivel) / 100);
    const custo = sim.precos.find((p) => p.base === t.base && p.produto === t.produto)?.custo ?? 0;
    return { base: t.base, produto: t.produto, cap: TANQUE_CAP_M3[k] ?? 0, m3, custo, valor: centavos(m3 * 1000 * custo), dias: t.cover };
  });
  const m3 = centavos(linhas.reduce((a, l) => a + l.m3, 0));
  const cap = Object.values(TANQUE_CAP_M3).reduce((a, b) => a + b, 0);
  const vendaDia = Object.values(TANQUE_VENDA_M3_DIA).reduce((a, b) => a + b, 0);
  return {
    linhas,
    m3,
    cap,
    valor: centavos(linhas.reduce((a, l) => a + l.valor, 0)),
    ocupacaoPct: (m3 / cap) * 100,
    coberturaDias: m3 / vendaDia,
    porDezCentavos: centavos(m3 * 1000 * 0.1),
  };
}

// RenovaBio: meta nacional e preço do CBIO são dado público; a fatia da empresa e o que já foi aposentado são simulados
const CBIO = FOTO.find((f) => f.id === "cbio");
const PRECO_CBIO = Number((CBIO?.valor ?? "0").replace(/[^\d,]/g, "").replace(",", "."));

export function renovabio(agora = new Date()) {
  const volumeAno = (VOLUME_DIA / 1000) * 365;
  const participacaoPct = (volumeAno / TOTAL_VENDAS_DISTRIBUIDORAS_2025) * 100;
  const meta = Math.round((META_CBIO_2026 * volumeAno) / TOTAL_VENDAS_DISTRIBUIDORAS_2025);
  const aposentados = Math.round(meta * 0.58);
  const faltam = meta - aposentados;
  return {
    metaNacional: META_CBIO_2026,
    participacaoPct,
    meta,
    aposentados,
    faltam,
    preco: PRECO_CBIO,
    precoData: CBIO?.data ?? "",
    custoFaltante: centavos(faltam * PRECO_CBIO),
    diasAtePrazo: Math.max(0, Math.ceil((new Date(2026, 11, 31).getTime() - agora.getTime()) / DIA_MS)),
    fonteMeta: FONTES.cbio2026,
    fontePreco: { rotulo: CBIO?.fonte ?? "B3", url: CBIO?.url ?? "https://www.b3.com.br/" },
  };
}

// prazos regulatórios reais com a contagem de dias a partir de hoje
export function proximosPrazos(agora = new Date(), n = 4) {
  return PRAZOS.map((p) => {
    const m = p.data.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    const dias = m ? Math.ceil((new Date(+m[3], +m[2] - 1, +m[1]).getTime() - agora.getTime()) / DIA_MS) : null;
    return { ...p, dias };
  })
    .filter((p) => p.dias === null || p.dias >= 0)
    .slice(0, n);
}
