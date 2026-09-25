"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* ---------- formatação ---------- */
export const fmtInt = (v: number) => v.toLocaleString("pt-BR", { maximumFractionDigits: 0 });
// dinheiro sempre exato (regra do painel): centavos só somem quando são zero
export const fmtRs = (v: number) => "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: Number.isInteger(v) ? 0 : 2, maximumFractionDigits: 2 });
export const fmtMi = (v: number) => "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// margem bruta em R$/m³ (unidade do setor), ponderada pelo mix de vendas da empresa fictícia
export const MIX: Record<string, number> = { "Diesel S10": 0.36, "Gasolina C": 0.37, "Diesel S500": 0.15, Etanol: 0.12 };
export function margemPorProduto(precos: { produto: string; preco: number; custo: number }[]) {
  const acc: Record<string, { s: number; n: number }> = {};
  for (const p of precos) {
    acc[p.produto] = acc[p.produto] ?? { s: 0, n: 0 };
    acc[p.produto].s += (p.preco - p.custo) * 1000;
    acc[p.produto].n += 1;
  }
  return Object.fromEntries(Object.entries(acc).map(([k, v]) => [k, v.s / v.n]));
}
export function margemRsM3(precos: { produto: string; preco: number; custo: number }[]) {
  const m = margemPorProduto(precos);
  let soma = 0;
  let peso = 0;
  for (const [k, v] of Object.entries(m)) {
    soma += v * (MIX[k] ?? 0);
    peso += MIX[k] ?? 0;
  }
  return peso ? soma / peso : 0;
}
export const fmtDec = (v: number, d = 1) =>
  v.toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d });
export const fmtMin = (m: number) =>
  `${String(Math.floor(m / 60) % 24).padStart(2, "0")}:${String(Math.round(m) % 60).padStart(2, "0")}`;

/* ---------- tipos ---------- */
export type Modo = "manual" | "integrada";

export type Rota = {
  id: string;
  de: string;
  para: string;
  produto: string;
  volume: number;
  prog: number;
  atrasada: boolean;
  placa: string;
  motorista: string;
  inicioMin: number;
  minTotal: number;
  selo: boolean;
  descarregando: boolean;
};

export type Ordem = {
  id: string;
  posto: string;
  cidade: string;
  produto: string;
  volume: number;
  valor: number;
  score: number;
  step: number;
  stepTick: number;
};

export type Tanque = { base: string; produto: string; nivel: number; cover: number; critico: boolean; repostaEm: number };
export type Cotacao = { id: string; posto: string; cidade: string; produto: string; volume: number; minuto: number; respEm: number | null; valor: number };
export type PrecoLinha = { produto: string; base: string; preco: number; custo: number; sugerido: number; concorrente: number; aplicado: boolean };
export type Evento = { t: number; tipo: string; msg: string };
export type Agente = { id: string; nome: string; foco: string; execs: number; impacto: number; latencia: number; humanoH: number; ultima: string };
export type Cobranca = { id: string; posto: string; valor: number; dias: number; status: string };
export type Incidente = { id: string; tipo: string; local: string; nivel: "baixo" | "medio" | "alto"; status: string; ts: number };

export type SimData = {
  tick: number;
  modo: Modo;
  hora: string;
  minuto: number;
  volume: number;
  receita: number;
  margem: number;
  janela: number;
  kmVazio: number;
  alertas: number;
  nfe: number;
  capturado: number;
  naMesa: number;
  ordens: Ordem[];
  cotacoes: Cotacao[];
  tanques: Tanque[];
  rotas: Rota[];
  precos: PrecoLinha[];
  eventos: Evento[];
  agentes: Agente[];
  cobrancas: Cobranca[];
  incidentes: Incidente[];
  caixa: { d: number; in: number; out: number }[];
  aging: { faixa: string; valor: number }[];
  vencidoTotal: number;
  acoes: { tipo: string; msg: string; acao: string; chave: string; usada: boolean; view: string }[];
  executarAcao: (chave: string) => void;
  toast: string | null;
  setModo: (m: Modo) => void;
};

// as 5 bases fictícias da malha do mapa (src/demo/malha.json)
export const BASES: Record<string, string> = {
  Litoral: "Camaçari/BA",
  Sertão: "Vitória da Conquista/BA",
  Oeste: "Barreiras/BA",
  Vale: "Petrolina/PE",
  Planalto: "Anápolis/GO",
};

// carteira vencida simulada por faixa (inclui os títulos da fila do agente)
const AGING_BASE: { faixa: string; de: number; ate: number; valor: number }[] = [
  { faixa: "1–15 dias", de: 1, ate: 15, valor: 9_184_612.4 },
  { faixa: "16–30 dias", de: 16, ate: 30, valor: 6_203_388.15 },
  { faixa: "31–60 dias", de: 31, ate: 60, valor: 5_873_019.72 },
  { faixa: "+60 dias", de: 61, ate: Infinity, valor: 3_651_415.91 },
];
export const emAcordo = (status: string) => status === "acordo fechado" || status === "promessa em 7 dias";
const centavos = (v: number) => Math.round(v * 100) / 100;

export const SISTEMAS = [
  "Portal B2B",
  "Crédito",
  "Motor de preços",
  "ERP · Estoque",
  "TMS · Rota",
  "Telemetria",
  "Fiscal · ANP",
  "Back-office",
];

export const JORNADA = [
  "Pedido chega pelo portal — 2 min, cotação pré-calculada. Hoje: WhatsApp solto, transcrição manual.",
  "Scoring automático: 18 meses de histórico, limite pré-aprovado. Hoje: 1-3 dias por e-mail.",
  "Copiloto: custo de reposição (Petrobras/importação) + tributos + frete + margem da praça, recalculado a cada reajuste. Hoje: tabela e planilha.",
  "Volume reservado na base; reposição antecipada pela previsão. Hoje: falta descoberta na hora.",
  "Rota com cargas agrupadas: menos km vazio; janela aceita no portal. Hoje: despachante.",
  "Telemetria ao vivo; desvio acima de 5 km aciona alerta. Hoje: posto liga para perguntar.",
  "NF-e com a tributação monofásica conferida; a movimentação entra no i-SIMP da ANP e na conta do RenovaBio. Hoje: planilha mensal.",
  "Boleto no portal, conciliação automática; margem real alimenta o copiloto. Hoje: fechamento mensal.",
];

export const POSTOS: [string, string][] = [
  ["Posto Cliente 117", "Feira de Santana/BA"],
  ["Posto Cliente 204", "Camaçari/BA"],
  ["Rede Cliente 318", "Salvador/BA"],
  ["Posto Cliente 402", "Barreiras/BA"],
  ["Posto Cliente 526", "Vitória da Conquista/BA"],
  ["Posto Cliente 611", "Petrolina/PE"],
  ["Rede Cliente 735", "Anápolis/GO"],
  ["Posto Cliente 829", "Guanambi/BA"],
];

export const PRODUTOS = ["Diesel S10", "Gasolina C", "Diesel S500", "Etanol"];

// score de crédito por cliente (simulação)
export const SCORE: Record<string, number> = {
  "Posto Cliente 117": 92,
  "Posto Cliente 204": 88,
  "Rede Cliente 318": 76,
  "Posto Cliente 402": 84,
  "Posto Cliente 526": 71,
  "Posto Cliente 611": 90,
  "Rede Cliente 735": 81,
  "Posto Cliente 829": 67,
};

export type Tema = "light" | "dark";

/* rampa de cinza por tema — s1 é o tom principal (Diesel S10) */
export const PAL: Record<Tema, { s1: string; s2: string; s3: string; s4: string; ok: string; warn: string; err: string; info: string }> = {
  light: { s1: "#1d1d1f", s2: "#6e6e73", s3: "#a1a1a6", s4: "#d2d2d7", ok: "#248a3d", warn: "#b25000", err: "#d70015", info: "#0071e3" },
  dark: { s1: "#f5f5f7", s2: "#a1a1a6", s3: "#636366", s4: "#48484a", ok: "#30d158", warn: "#ff9f0a", err: "#ff453a", info: "#2997ff" },
};

export function prodTone(produto: string, tema: Tema): string {
  const idx = ["Diesel S10", "Gasolina C", "Diesel S500", "Etanol"].indexOf(produto);
  const p = PAL[tema];
  return [p.s1, p.s2, p.s3, p.s4][idx === -1 ? 2 : idx];
}

export const AGENTES_INICIAIS: Agente[] = [
  { id: "preco", nome: "Copiloto de Preço", foco: "Preço por produto × base × região", execs: 0, impacto: 0, latencia: 30, humanoH: 9.5, ultima: "—" },
  { id: "fiscal", nome: "Agente Fiscal", foco: "NF-e · ICMS monofásico · CBS/IBS 2027", execs: 0, impacto: 0, latencia: 2, humanoH: 7.0, ultima: "—" },
  { id: "rota", nome: "Agente de Rota", foco: "Roteirização e janelas de entrega", execs: 0, impacto: 0, latencia: 5, humanoH: 6.5, ultima: "—" },
  { id: "credito", nome: "Agente de Crédito", foco: "Score e limite de cada revenda", execs: 0, impacto: 0, latencia: 1, humanoH: 4.0, ultima: "—" },
  { id: "cobranca", nome: "Agente de Cobrança", foco: "Atrasos, lembretes e acordo", execs: 0, impacto: 0, latencia: 3, humanoH: 5.5, ultima: "—" },
  { id: "prospeccao", nome: "Agente de Prospecção", foco: "Bandeira branca perto das bases", execs: 0, impacto: 0, latencia: 12, humanoH: 11.0, ultima: "—" },
  { id: "compliance", nome: "Agente de Compliance", foco: "ANP · RenovaBio · auditoria", execs: 0, impacto: 0, latencia: 8, humanoH: 3.5, ultima: "—" },
  { id: "vendedor", nome: "Copiloto do Vendedor", foco: "Retorno ao cliente e resumo de conta", execs: 0, impacto: 0, latencia: 4, humanoH: 8.0, ultima: "—" },
];

const MOTORISTAS = ["Rodrigo M.", "Elaine S.", "Carlos T.", "Bruna F.", "Tiago A.", "Marcos L.", "Fernanda P.", "Diego R.", "Ana C.", "Jailson N."];

const PLACAS = ["CT-03", "CT-06", "CT-08", "CT-10", "CT-07", "CT-04", "CT-09", "CT-01", "CT-02", "CT-05"];

function rndPlaca(i: number) {
  return PLACAS[i % PLACAS.length];
}
function rndMotorista(i: number) {
  return MOTORISTAS[i % MOTORISTAS.length];
}

function novaRota(i: number, minuto: number, integrada: boolean): Rota {
  const pares: [string, string][] = [
    ["Litoral", "Feira de Santana"],
    ["Litoral", "Salvador"],
    ["Sertão", "Guanambi"],
    ["Litoral", "Aracaju"],
    ["Oeste", "Bom Jesus da Lapa"],
    ["Litoral", "Itabuna"],
    ["Oeste", "Palmas"],
    ["Vale", "Juazeiro"],
    ["Litoral", "Base Sertão"],
    ["Vale", "Salgueiro"],
    ["Planalto", "Brasília"],
    ["Planalto", "Goiânia"],
  ];
  const par = pares[i % pares.length];
  const produto = PRODUTOS[(i * 3) % PRODUTOS.length];
  const minTotal = 90 + ((i * 47) % 18) * 10;
  return {
    id: `R${String(400 + i).padStart(4, "0")}`,
    de: par[0],
    para: par[1],
    produto,
    volume: 12000 + ((i * 7) % 26) * 1000,
    prog: 2 + (i % 5) * 14,
    atrasada: false,
    placa: rndPlaca(i + 3),
    motorista: rndMotorista(i + 5),
    inicioMin: minuto - Math.round(minTotal * 0.15),
    minTotal,
    selo: integrada,
    descarregando: false,
  };
}

function serieDias(n: number, seed: number, base: number, amp: number, dec = 0) {
  let s = seed >>> 0;
  const r = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  return Array.from({ length: n }, (_, i) => {
    const wobble = Math.sin(i / 3.1) * amp * 0.4;
    return +(base + (r() - 0.5) * amp + wobble).toFixed(dec);
  });
}
export { serieDias };

const EVENTOS_IA: [string, string][] = [
  ["IA", "Pedido movido para roteirização sem toque humano."],
  ["PREÇO", "Copiloto recalculou 480 preços com o novo custo de reposição."],
  ["LOG", "Caminhão entregue dentro da janela — comprovante digital assinado."],
  ["FISC", "Movimentação do dia conciliada para o i-SIMP da ANP."],
  ["REDE", "Posto Cliente 402: demanda +9% — IA sugere escalar volume."],
  ["CRÉD", "Consulta de crédito concluída em 40 segundos."],
  ["COBR", "Acordo de pagamento fechado por agente — parcelamento aceito."],
  ["SEG", "Divergência de medição em 3 tanques — auditoria aberta."],
  ["TRAD", "Paridade de importação recalculada com o Brent e o dólar do dia — compra da semana revisada."],
  ["REDE", "Câmeras + IA: 2 vendas no bico sem veículo na imagem — ordem de serviço aberta."],
];

const EVENTOS_MAN: [string, string][] = [
  ["ALERTA", "Tanque de gasolina da Base Litoral consumindo sem reposição automática."],
  ["B2B", "Cotação sem resposta há 41h — vendedor não lembrou."],
  ["PREÇO", "Concorrente tomou o bico: preço recalculado manualmente."],
  ["LOG", "Entrega fora da janela — reagendada por telefone."],
  ["FISC", "Movimentação do i-SIMP aguardando montagem manual no fim do mês."],
  ["ALERTA", "Km vazio acima do padrão — rota sem otimização."],
  ["FIN", "Fatura vencida há 12 dias sem cobrança registrada."],
  ["SEG", "Divergência compra×venda×tanque só aparece no fechamento."],
  ["B2B", "Pedido anotado em caderno — entrada manual no ERP."],
  ["REDE", "Posto com queda de demanda descoberta no relatório mensal."],
];

export const VOLUME_DIA = 7_800_000; // litros/dia do porte calibrado
const TETO_CAPTURADO = 420_000;
const TETO_NA_MESA = 360_000;

export function useSim(): SimData {
  const [tick, setTick] = useState(0);
  const [modo, setModoState] = useState<Modo>("integrada");
  const modoRef = useRef(modo);
  useEffect(() => {
    modoRef.current = modo;
  }, [modo]);

  // porte calibrado numa regional grande (~7.800 m³/dia); preço médio de venda ≈ R$ 5,44/L pelo mix
  const [volume, setVolume] = useState(2_350_000);
  const volRef = useRef(2_350_000);
  const [receita, setReceita] = useState(12_784_000);
  const [margem, setMargem] = useState(2.38);
  const [janela, setJanela] = useState(96);
  const [kmVazio, setKmVazio] = useState(9.2);
  const [alertas, setAlertas] = useState(3);
  const [nfe, setNfe] = useState(1_240);
  const [capturado, setCapturado] = useState(184_600);
  const [naMesa, setNaMesa] = useState(0);

  const [ordens, setOrdens] = useState<Ordem[]>([
    { id: "P-8412", posto: "Posto Cliente 117", cidade: "Feira de Santana/BA", produto: "Diesel S10", volume: 20000, valor: 122_400, score: SCORE["Posto Cliente 117"], step: 5, stepTick: 0 },
    { id: "P-8413", posto: "Posto Cliente 204", cidade: "Camaçari/BA", produto: "Gasolina C", volume: 12000, valor: 63_720, score: SCORE["Posto Cliente 204"], step: 3, stepTick: 0 },
    { id: "P-8414", posto: "Rede Cliente 318", cidade: "Salvador/BA", produto: "Diesel S500", volume: 34000, valor: 197_030, score: SCORE["Rede Cliente 318"], step: 1, stepTick: 0 },
  ]);

  const [cotacoes, setCotacoes] = useState<Cotacao[]>([
    { id: "C-5011", posto: "Posto Cliente 829", cidade: "Guanambi/BA", produto: "Diesel S10", volume: 28000, minuto: 366, respEm: null, valor: 163_520 },
    { id: "C-5012", posto: "Rede Cliente 735", cidade: "Anápolis/GO", produto: "Gasolina C", volume: 9000, minuto: 372, respEm: 374, valor: 47_790 },
    { id: "C-5013", posto: "Posto Cliente 526", cidade: "Vitória da Conquista/BA", produto: "Etanol", volume: 14000, minuto: 380, respEm: null, valor: 58_660 },
  ]);

  const [tanques, setTanques] = useState<Tanque[]>([
    { base: "Litoral", produto: "Diesel S10", nivel: 62, cover: 9, critico: false, repostaEm: 0 },
    { base: "Litoral", produto: "Gasolina C", nivel: 54, cover: 8, critico: false, repostaEm: 0 },
    { base: "Sertão", produto: "Diesel S500", nivel: 71, cover: 10, critico: false, repostaEm: 0 },
    { base: "Oeste", produto: "Diesel S10", nivel: 47, cover: 7, critico: false, repostaEm: 0 },
    { base: "Vale", produto: "Gasolina C", nivel: 58, cover: 8, critico: false, repostaEm: 0 },
    { base: "Planalto", produto: "Etanol", nivel: 66, cover: 9, critico: false, repostaEm: 0 },
  ]);

  const [rotas, setRotas] = useState<Rota[]>(() =>
    Array.from({ length: 7 }, (_, i) => novaRota(i, 370, true)),
  );

  const [precos, setPrecos] = useState<PrecoLinha[]>([
    { produto: "Diesel S10", base: "Litoral", preco: 5.842, custo: 5.412, sugerido: 5.891, concorrente: 5.918, aplicado: false },
    { produto: "Gasolina C", base: "Litoral", preco: 5.31, custo: 4.882, sugerido: 5.339, concorrente: 5.345, aplicado: false },
    { produto: "Diesel S500", base: "Sertão", preco: 5.795, custo: 5.388, sugerido: 5.842, concorrente: 5.861, aplicado: false },
    { produto: "Etanol", base: "Planalto", preco: 4.19, custo: 3.72, sugerido: 4.199, concorrente: 4.208, aplicado: false },
    { produto: "Diesel S10", base: "Oeste", preco: 5.918, custo: 5.462, sugerido: 5.987, concorrente: 6.012, aplicado: false },
    { produto: "Gasolina C", base: "Vale", preco: 5.276, custo: 4.845, sugerido: 5.284, concorrente: 5.29, aplicado: false },
  ]);

  const [eventos, setEventos] = useState<Evento[]>([
    { t: 0, tipo: "IA", msg: "Previsão de demanda na Base Oeste (Barreiras): +8% na quinzena do dia 12." },
    { t: 0, tipo: "LOG", msg: "Rotas da Base Oeste reordenadas: −12% de km vazio." },
    { t: 0, tipo: "CRÉD", msg: "Limite pré-aprovado: Posto Cliente 117, R$ 340.000,00." },
  ]);

  const [agentes, setAgentes] = useState<Agente[]>(AGENTES_INICIAIS);
  const [cobrancas, setCobrancas] = useState<Cobranca[]>([
    { id: "F-2231", posto: "Posto Cliente 402", valor: 48_200, dias: 34, status: "aguardando" },
    { id: "F-2232", posto: "Rede Cliente 318", valor: 91_400, dias: 61, status: "em negociação" },
    { id: "F-2233", posto: "Posto Cliente 526", valor: 27_800, dias: 12, status: "aguardando" },
    { id: "F-2234", posto: "Posto Cliente 829", valor: 63_500, dias: 96, status: "sem contato" },
    { id: "F-2235", posto: "Posto Cliente 611", valor: 18_900, dias: 3, status: "aguardando" },
  ]);
  const [incidentes] = useState<Incidente[]>([
    { id: "INC-81", tipo: "Divergência de medição de tanque", local: "Base Litoral · Camaçari/BA", nivel: "medio", status: "investigando", ts: 312 },
    { id: "INC-82", tipo: "Venda no bico sem veículo na câmera", local: "Posto Cliente 204 · Camaçari/BA", nivel: "alto", status: "OS aberta", ts: 407 },
    { id: "INC-83", tipo: "Desvio de rota 22 km", local: "Caminhão CT-08", nivel: "baixo", status: "resolvido", ts: 478 },
  ]);
  const [caixa, setCaixa] = useState<{ d: number; in: number; out: number }[]>(
    (() => {
      const ent = serieDias(12, 17, 42_400_000, 4_000_000, 2);
      const sai = serieDias(12, 29, 40_100_000, 3_600_000, 2);
      return ent.map((v, i) => ({ d: i + 1, in: v, out: sai[i] }));
    })(),
  );

  const [aplicadas, setAplicadas] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const tickRef = useRef(0);
  const rotaRef = useRef(7);

  const pushEvento = (tipo: string, msg: string) =>
    setEventos((evs) => [{ t: tickRef.current, tipo, msg }, ...evs].slice(0, 12));

  useEffect(() => {
    const iv = setInterval(() => {
      const m = modoRef.current;
      tickRef.current += 1;
      setTick((t) => t + 1);
      // o "dia" tem teto (~7.800 m³, porte calibrado): os totais param de subir quando o dia fecha
      const inc = (m === "integrada" ? 36 + Math.round(Math.random() * 24) : 21 + Math.round(Math.random() * 13)) * 1000;
      const efetivo = Math.min(inc, Math.max(0, VOLUME_DIA - volRef.current));
      volRef.current += efetivo;
      setVolume(volRef.current);
      setReceita((r) => Math.round((r + efetivo * 5.44) * 100) / 100);
      if (efetivo > 0) setNfe((n) => n + (m === "integrada" ? 14 + Math.round(Math.random() * 12) : 6 + Math.round(Math.random() * 6)));

      const alvoMargem = m === "integrada" ? 2.86 : 2.06;
      const alvoJanela = m === "integrada" ? 96 : 84;
      const alvoKm = m === "integrada" ? 9.2 : 17.4;
      setMargem((v) => +(v + (alvoMargem - v) * 0.28 + (Math.random() - 0.5) * 0.05).toFixed(2));
      setJanela((v) => Math.round(v + (alvoJanela - v) * 0.3 + (Math.random() - 0.5) * 2));
      setKmVazio((v) => +(v + (alvoKm - v) * 0.3 + (Math.random() - 0.5) * 0.4).toFixed(1));
      setAlertas(() => Math.max(1, Math.round((m === "integrada" ? 3 : 9) + (Math.random() - 0.5) * 2)));
      if (m === "integrada") setCapturado((c) => Math.min(TETO_CAPTURADO, c + 3_200 + Math.round(Math.random() * 1_400)));
      else setNaMesa((n) => Math.min(TETO_NA_MESA, n + 2_300 + Math.round(Math.random() * 1_200)));

      /* ordens avançam nos 8 sistemas */
      setOrdens((ords) => {
        let next = ords.map((o) => {
          if (o.step >= SISTEMAS.length) return o;
          const passo = m === "integrada" ? 2 : 6;
          const novoTick = o.stepTick + 1;
          if (novoTick >= passo) return { ...o, step: o.step + 1, stepTick: 0 };
          return { ...o, stepTick: novoTick };
        });
        const concluidas = next.filter((o) => o.step >= SISTEMAS.length);
        if (concluidas.length > 2) {
          const velha = concluidas[concluidas.length - 1];
          next = next.filter((o) => o !== velha);
        }
        if (next.length < 6 && Math.random() < 0.35) {
          const pi = Math.floor(Math.random() * POSTOS.length);
          const prod = PRODUTOS[Math.floor(Math.random() * PRODUTOS.length)];
          const vol = 8000 + Math.floor(Math.random() * 30) * 1000;
          const precoBase = prod === "Etanol" ? 4.19 : prod === "Gasolina C" ? 5.31 : 5.8;
          next = [
            {
              id: `P-${8400 + Math.floor(Math.random() * 900)}`,
              posto: POSTOS[pi][0],
              cidade: POSTOS[pi][1],
              produto: prod,
              volume: vol,
              valor: Math.round(vol * precoBase),
              score: SCORE[POSTOS[pi][0]] ?? 75,
              step: 0,
              stepTick: 0,
            },
            ...next,
          ];
        }
        if (next.length > 7) next = next.slice(0, 7);
        return next;
      });

      /* cotações: chegam e respondem */
      setCotacoes((cs) => {
        let next = cs.map((c) => {
          if (c.respEm !== null) return c;
          const atraso = m === "integrada" ? 1 : 6 + Math.floor(Math.random() * 5);
          if (tickRef.current - c.minuto >= atraso) return { ...c, respEm: tickRef.current };
          return c;
        });
        const respondidas = next.filter((c) => c.respEm !== null);
        if (respondidas.length > 2) {
          const velha = respondidas[respondidas.length - 1];
          next = next.filter((c) => c !== velha);
        }
        if (next.length < 6 && Math.random() < 0.4) {
          const pi = Math.floor(Math.random() * POSTOS.length);
          const prod = PRODUTOS[Math.floor(Math.random() * PRODUTOS.length)];
          const vol = 8000 + Math.floor(Math.random() * 30) * 1000;
          const precoBase = prod === "Etanol" ? 4.19 : prod === "Gasolina C" ? 5.31 : 5.8;
          next = [
            { id: `C-${5100 + Math.floor(Math.random() * 900)}`, posto: POSTOS[pi][0], cidade: POSTOS[pi][1], produto: prod, volume: vol, minuto: tickRef.current, respEm: null, valor: Math.round(vol * precoBase) },
            ...next,
          ];
        }
        if (next.length > 6) next = next.slice(0, 6);
        return next;
      });

      /* tanques */
      setTanques((ts) =>
        ts.map((tq) => {
          let nivel = tq.nivel - (tq.base === "Litoral" && tq.produto === "Gasolina C" ? 1.7 : 1.1);
          let repostaEm = tq.repostaEm;
          // Integrada: agente pede reposição cedo (35%); Manual: alguém percebe tarde (18%) e demora mais
          if (repostaEm > 0) {
            repostaEm -= 1;
            if (repostaEm === 0) nivel += 30;
          } else if (nivel < (m === "integrada" ? 35 : 18)) {
            repostaEm = m === "integrada" ? 2 : 6;
          }
          nivel = Math.max(4, Math.min(97, nivel));
          return { ...tq, nivel, cover: Math.round(nivel / 7), repostaEm, critico: nivel < 16 };
        }),
      );

      /* rotas: progresso e regeneração com ids únicos */
      setRotas((rs) => {
        const atualMin = 360 + tickRef.current * 15;
        return rs.map((r) => {
          if (r.prog >= 100) {
            const i = rotaRef.current++;
            return novaRota(i, atualMin, m === "integrada");
          }
          const delta = m === "integrada" ? 4 + Math.random() * 1.6 : 2 + Math.random() * 1.1;
          const prog = Math.min(100, r.prog + delta);
          const eta = r.inicioMin + ((100 - prog) / 100) * r.minTotal;
          const alvoJanela = r.inicioMin + r.minTotal * (m === "integrada" ? 1.02 : 1.22);
          return { ...r, prog, atrasada: eta > alvoJanela, selo: m === "integrada" ? r.selo : false };
        });
      });

      /* preços com concorrente */
      setPrecos((ps) =>
        ps.map((p) => {
          // Manual: preço escorrega atrás do vizinho, mas nunca abaixo do custo + 3 centavos
          // Integrada: copiloto puxa de volta para o preço sugerido
          const custo = +(p.custo + (Math.random() - 0.5) * 0.004).toFixed(3);
          const alvo = m === "integrada" ? p.preco + (p.sugerido - p.preco) * 0.2 + (Math.random() - 0.5) * 0.004 : p.preco - 0.002 - Math.random() * 0.003;
          const dConc = (Math.random() - 0.5) * 0.012;
          return {
            ...p,
            custo,
            preco: Math.max(custo + 0.03, +alvo.toFixed(3)),
            concorrente: Math.max(4.0, +(p.concorrente + dConc).toFixed(3)),
          };
        }),
      );

      /* agentes */
      setAgentes((ags) =>
        ags.map((a) => {
          if (m !== "integrada") return a;
          const execs = a.execs + Math.floor(Math.random() * 3);
          const impacto = a.impacto + (a.id === "preco" ? 900 + Math.random() * 700 : a.id === "cobranca" ? 1_400 + Math.random() * 900 : a.id === "prospeccao" ? 2_600 + Math.random() * 1_400 : 420 + Math.random() * 380);
          return { ...a, execs, impacto, ultima: ultimaAcao(a.id) };
        }),
      );

      /* cobranças: agente resolve quando integrada */
      setCobrancas((cbs) => {
        if (m !== "integrada") return cbs;
        const pend = cbs.findIndex((c) => c.status === "aguardando" || c.status === "em negociação");
        if (pend >= 0 && Math.random() < 0.3) {
          return cbs.map((c, i) =>
            i === pend
              ? { ...c, status: Math.random() < 0.5 ? "acordo fechado" : "promessa em 7 dias" }
              : c,
          );
        }
        return cbs;
      });

      /* caixa */
      setCaixa((cx) => {
        // integrada recebe mais (cobrança por agente); valores em reais, com centavos
        const inFlow = (m === "integrada" ? 43_300_000 : 40_600_000) + Math.random() * 2_400_000;
        const outFlow = 40_100_000 + Math.random() * 2_200_000;
        return [...cx.slice(-40), { d: (cx[cx.length - 1]?.d ?? 0) + 1, in: centavos(inFlow), out: centavos(outFlow) }];
      });

      if (Math.random() < 0.38) {
        const pool = m === "integrada" ? EVENTOS_IA : EVENTOS_MAN;
        const e = pool[Math.floor(Math.random() * pool.length)];
        pushEvento(e[0], e[1]);
      }
    }, 1500);
    return () => clearInterval(iv);
  }, []);

  const minutos = 360 + tick * 15;
  const hora = `${String(Math.floor(minutos / 60) % 24).padStart(2, "0")}:${String(minutos % 60).padStart(2, "0")}`;

  // carteira vencida: títulos que entram em acordo ou promessa saem do vencido
  const aging = useMemo(
    () =>
      AGING_BASE.map((f) => ({
        faixa: f.faixa,
        valor: centavos(f.valor - cobrancas.filter((c) => emAcordo(c.status) && c.dias >= f.de && c.dias <= f.ate).reduce((a, c) => a + c.valor, 0)),
      })),
    [cobrancas],
  );
  const vencidoTotal = centavos(aging.reduce((a, f) => a + f.valor, 0));

  const acoes = useMemo(() => {
    const gas = precos.find((p) => p.produto === "Gasolina C" && p.base === "Litoral");
    const folga = gas ? gas.concorrente - gas.preco : 0;
    return [
      {
        tipo: "PREÇO",
        msg: gas && folga > 0.0005
          ? `Gasolina C na Base Litoral R$ ${fmtDec(folga, 3)}/L abaixo do concorrente — dá para subir sem perder o posto.`
          : "Gasolina C na Base Litoral alinhada ao concorrente — preço sugerido pronto.",
        acao: "Aplicar preço sugerido",
        chave: "preco-pojuca",
        usada: precos.some((p) => p.produto === "Gasolina C" && p.base === "Litoral" && p.aplicado),
        view: "precos",
      },
      { tipo: "SUPRI", msg: "Demanda +8% na quinzena do dia 12 — antecipar 2 cargas.", acao: "Antecipar carga", chave: "supri-antecipa", usada: aplicadas.includes("supri-antecipa"), view: "suprimento" },
      { tipo: "LOG", msg: "Reordenar as entregas de Guanambi e Bom Jesus da Lapa economiza 26 km de vazio.", acao: "Reordenar rota", chave: "log-reordena", usada: aplicadas.includes("log-reordena"), view: "logistica" },
      { tipo: "CRÉD", msg: "Rede Cliente 318 sem resposta há 41h — follow-up com crédito em destaque.", acao: "Enviar follow-up", chave: "cred-follow", usada: aplicadas.includes("cred-follow"), view: "comercial" },
      { tipo: "COBR", msg: `${fmtRs(vencidoTotal)} vencidos na carteira — agente de cobrança pronto para negociar a fila de hoje.`, acao: "Rodar cobrança", chave: "cobr-rodar", usada: aplicadas.includes("cobr-rodar"), view: "financeiro" },
      { tipo: "FISC", msg: "Movimentação do mês para o i-SIMP da ANP pronta para conferência.", acao: "Conferir e assinar", chave: "fiscal-anp", usada: aplicadas.includes("fiscal-anp"), view: "fiscal" },
    ];
  }, [precos, aplicadas, vencidoTotal]);

  const executarAcao = (chave: string) => {
    if (modo !== "integrada") return;
    if (chave === "preco-pojuca") {
      const gas = precos.find((p) => p.produto === "Gasolina C" && p.base === "Litoral");
      setPrecos((ps) => ps.map((p) => (p.produto === "Gasolina C" && p.base === "Litoral" ? { ...p, preco: p.sugerido, aplicado: true } : p)));
      setToast(
        gas
          ? `Aplicado: gasolina C da Base Litoral a R$ ${fmtDec(gas.sugerido, 3)}/L (${fmtRs(centavos((gas.sugerido - gas.preco) * 1000))}/m³ a mais de margem).`
          : "Aplicado: gasolina C da Base Litoral no preço sugerido.",
      );
    }
    if (chave === "supri-antecipa") {
      setTanques((ts) => ts.map((tq) => (tq.base === "Oeste" || (tq.base === "Litoral" && tq.produto === "Gasolina C") ? { ...tq, nivel: Math.min(96, tq.nivel + 22), repostaEm: 0 } : tq)));
      setToast("Aplicado: 2 cargas antecipadas para as bases Oeste (Barreiras) e Litoral (Camaçari).");
    }
    if (chave === "log-reordena") {
      setRotas((rs) => rs.map((r) => (r.para === "Guanambi" || r.para === "Bom Jesus da Lapa" ? { ...r, prog: Math.min(99, r.prog + 9), atrasada: false } : r)));
      setKmVazio((k) => Math.max(7, +(k - 0.8).toFixed(1)));
      setToast("Aplicado: rotas reordenadas — km vazio caiu 0,8 p.p.");
    }
    if (chave === "cred-follow") {
      setOrdens((os) => os.map((o) => (o.posto === "Rede Cliente 318" ? { ...o, step: Math.max(o.step, 2) } : o)));
      setToast("Aplicado: follow-up enviado com crédito pré-aprovado em destaque.");
    }
    if (chave === "cobr-rodar") {
      setCobrancas((cbs) => cbs.map((c) => (c.status === "sem contato" ? { ...c, status: "negociando via portal" } : c)));
      setToast("Aplicado: agente de cobrança acionou a fila — proposta de acordo enviada.");
    }
    if (chave === "fiscal-anp") {
      setToast("Aplicado: movimentação do i-SIMP conferida e assinada — trilha registrada.");
    }
    setAplicadas((ap) => (ap.includes(chave) ? ap : [...ap, chave]));
    pushEvento("IA", "Ação executada pelo copiloto com auditoria registrada.");
    setTimeout(() => setToast(null), 3200);
  };

  const setModo = (m: Modo) => {
    setModoState(m);
    if (m === "integrada") {
      pushEvento("IA", "Operação integrada ativada — agentes assumiram o fluxo.");
      setTanques((ts) => ts.map((tq) => ({ ...tq, repostaEm: tq.nivel < 40 ? 2 : tq.repostaEm })));
    } else {
      pushEvento("HUMANO", "Operação manual simulada — processos humanos no controle.");
    }
  };

  return {
    tick, modo, hora, minuto: minutos, volume, receita, margem, janela, kmVazio, alertas, nfe, capturado, naMesa,
    ordens, cotacoes, tanques, rotas, precos, eventos, agentes, cobrancas, incidentes, caixa, aging, vencidoTotal, acoes, executarAcao, toast, setModo,
  };
}

function ultimaAcao(id: string): string {
  const mapa: Record<string, string[]> = {
    preco: ["Gasolina C · Litoral: sugerido aplicado", "Diesel S10 · Oeste: −R$ 0,004/L", "Etanol · Planalto reprecificado"],
    fiscal: ["Repasse de ICMS conferido", "NF-e 1.247 validadas", "i-SIMP do mês conferido"],
    rota: ["Rota 0412 reagrupada", "Janela na Base Litoral confirmada", "Carga dupla: −26 km"],
    credito: ["Limite de R$ 180.000,00 aprovado", "Score reavaliado", "Limite ampliado: Rede Cliente 735"],
    cobranca: ["Acordo: 3 parcelas", "Lembrete enviado", "Promessa registrada"],
    prospeccao: ["31 postos bandeira branca mapeados (ANP)", "Lead em Petrolina qualificado", "Roteiro de abordagem enviado"],
    compliance: ["Auditoria: 3 divergências", "Checklist ANP ok", "Meta de CBIO 2026: aposentadoria em dia"],
    vendedor: ["Follow-up: Rede Cliente 318", "Resumo de conta gerado", "Proposta reenviada"],
  };
  const ops = mapa[id] ?? ["Ação executada"];
  return ops[Math.floor(Math.random() * ops.length)];
}

/* ---------- tema de gráficos ---------- */
export function chartTheme(tema: Tema) {
  const dark = tema === "dark";
  return {
    grid: dark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.07)",
    tick: { fill: dark ? "#a1a1a6" : "#86868b", fontSize: 10 },
    tip: {
      backgroundColor: dark ? "#2c2c2e" : "#ffffff",
      border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"}`,
      borderRadius: "12px",
      fontSize: "11px",
      color: dark ? "#f5f5f7" : "#1d1d1f",
      boxShadow: dark ? "0 8px 24px rgba(0,0,0,0.5)" : "0 8px 24px rgba(0,0,0,0.12)",
    },
  };
}
export const legendStyle = { fontSize: 11, color: "#86868b" };
