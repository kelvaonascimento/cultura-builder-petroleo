import { FOTO, RESERVA_AO_VIVO, type Indicador } from "@/demo/mercado";

// Cotações públicas ao vivo (Banco Central e EIA) + foto datada do restante.
// Revalida a cada 1 h; se uma fonte falhar, entra o último valor conferido (marcado como "foto").
export const dynamic = "force-static";
export const revalidate = 3600;

const TEMPO_LIMITE = 8000;
const reserva = (id: string) => RESERVA_AO_VIVO.find((i) => i.id === id)!;
const brl = (n: number, casas: number) => n.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas });

// data "de hoje" no fuso de Brasília, nos formatos que cada API pede
function hojeSP(deslocDias = 0) {
  const d = new Date(Date.now() + deslocDias * 86_400_000);
  const [dia, mes, ano] = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit", year: "numeric" }).format(d).split("/");
  return { dia, mes, ano };
}

async function ptax(): Promise<Indicador> {
  const a = hojeSP(-10);
  const b = hojeSP();
  const url =
    "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)" +
    `?@dataInicial='${a.mes}-${a.dia}-${a.ano}'&@dataFinalCotacao='${b.mes}-${b.dia}-${b.ano}'&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`;
  const r = await fetch(url, { signal: AbortSignal.timeout(TEMPO_LIMITE) });
  const v: { cotacaoCompra: number; cotacaoVenda: number; dataHoraCotacao: string }[] = (await r.json()).value;
  const ult = v.at(-1)!;
  const ant = v.at(-2);
  const [data, hora] = ult.dataHoraCotacao.split(" ");
  const [ano, mes, dia] = data.split("-");
  return {
    ...reserva("ptax"),
    valor: `R$ ${brl(ult.cotacaoVenda, 4)}`,
    detalhe: `venda · compra R$ ${brl(ult.cotacaoCompra, 4)}`,
    data: `${dia}/${mes}/${ano} ${hora.slice(0, 5)}`,
    modo: "ao vivo",
    variacao: ant ? (ult.cotacaoVenda / ant.cotacaoVenda - 1) * 100 : undefined,
  };
}

const MESES: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };

async function brent(): Promise<Indicador> {
  // tabela diária pública da EIA (sem chave): linhas semanais com os 5 dias úteis
  const html = await (await fetch("https://www.eia.gov/dnav/pet/hist/RBRTED.htm", { signal: AbortSignal.timeout(TEMPO_LIMITE) })).text();
  const pontos: { d: Date; v: number }[] = [];
  for (const m of html.matchAll(/<td class='B6'>&nbsp;&nbsp;(\d{4}) (\w{3})-(\d{2}) to \w{3}-\d{2}<\/td>([\s\S]*?)<\/tr>/g)) {
    const inicio = new Date(Date.UTC(+m[1], MESES[m[2]], +m[3]));
    [...m[4].matchAll(/<td class='B3'>([^<]*)<\/td>/g)].forEach((c, i) => {
      const v = parseFloat(c[1]);
      if (!Number.isNaN(v)) pontos.push({ d: new Date(inicio.getTime() + i * 86_400_000), v });
    });
  }
  const ult = pontos.at(-1)!;
  const ant = pontos.at(-2);
  return {
    ...reserva("brent"),
    valor: `US$ ${brl(ult.v, 2)}`,
    data: ult.d.toLocaleDateString("pt-BR", { timeZone: "UTC" }),
    modo: "ao vivo",
    variacao: ant ? (ult.v / ant.v - 1) * 100 : undefined,
  };
}

async function selic(): Promise<Indicador> {
  const a = hojeSP(-10);
  const b = hojeSP();
  const url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados?formato=json&dataInicial=${a.dia}/${a.mes}/${a.ano}&dataFinal=${b.dia}/${b.mes}/${b.ano}`;
  const v: { data: string; valor: string }[] = await (await fetch(url, { signal: AbortSignal.timeout(TEMPO_LIMITE) })).json();
  const ult = v.at(-1)!;
  return { ...reserva("selic"), valor: `${brl(parseFloat(ult.valor), 2)}%`, data: ult.data, modo: "ao vivo" };
}

export async function GET() {
  const [p, b, s] = await Promise.allSettled([ptax(), brent(), selic()]);
  const aoVivo = [
    p.status === "fulfilled" ? p.value : reserva("ptax"),
    b.status === "fulfilled" ? b.value : reserva("brent"),
    s.status === "fulfilled" ? s.value : reserva("selic"),
  ];
  return Response.json({ atualizadoEm: new Date().toISOString(), indicadores: [...aoVivo, ...FOTO] });
}
