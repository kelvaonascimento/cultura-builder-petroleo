// Cálculo da margem por praça, usado pela tela "Margem por praça" e pelo agente (servidor).
// Frete com dado REAL: distância rodoviária (OSRM/OpenStreetMap) × piso mínimo de frete da ANTT.
// Referência pública por UF: parcela "distribuição e revenda" da composição de preços da Petrobras.

// ANTT — piso mínimo de frete, carga granel líquido perigosa, 5 eixos (tabela vigente, atualizada em 17/07/2026)
export const ANTT = { porKm: 7.6628, fixo: 861.51, fonte: "https://calculadorafrete.antt.gov.br/" };
export const CARGA_M3 = 45; // capacidade típica de um bitrem-tanque

// Petrobras — "distribuição e revenda" em R$/L (coleta ANP de 13 a 19/09/2026); ausente = Petrobras não publica a UF
export const PETROBRAS_DR: Record<string, { gasolina: number; diesel: number }> = {
  CE: { gasolina: 2.23, diesel: 2.06 },
  DF: { gasolina: 1.78, diesel: 1.83 },
  GO: { gasolina: 1.74, diesel: 1.69 },
  MG: { gasolina: 1.46, diesel: 1.64 },
  MT: { gasolina: 1.78, diesel: 2.1 },
  PE: { gasolina: 2.07, diesel: 2.03 },
};
export const PETROBRAS_BR = { gasolina: 1.72, diesel: 2.01 };
export const FONTE_PETROBRAS = "https://precos.petrobras.com.br/";

export const PRODUTO: Record<string, { rotulo: string; chave: string; ref: "gasolina" | "diesel" | null }> = {
  gasolina_c: { rotulo: "Gasolina C", chave: "Gasolina C", ref: "gasolina" },
  diesel_s10: { rotulo: "Diesel S10", chave: "Diesel S10", ref: "diesel" },
  diesel_s500: { rotulo: "Diesel S500", chave: "Diesel S500", ref: "diesel" },
  etanol: { rotulo: "Etanol hidratado", chave: "Etanol", ref: null },
};

export type NoMalha = { id: string; nome: string; tipo: string; uf: string };
export type RotaMalha = { id: string; de: string; para: string; produto: string; km: number; min: number };
export type LinhaPraca = {
  id: string;
  praca: string;
  origem: string;
  km: number;
  produto: string;
  base: number;
  frete: number;
  apos: number;
  refUF: number | null;
  refBrasil: number | null;
};

// margem na base (R$/m³ por produto) − frete ANTT até a praça, da pior para a melhor
export function linhasPracas(rotas: RotaMalha[], nos: Record<string, NoMalha>, margemBase: Record<string, number>): LinhaPraca[] {
  return rotas
    .filter((r) => nos[r.para]?.tipo === "praca")
    .map((r) => {
      const p = PRODUTO[r.produto];
      const praca = nos[r.para];
      const frete = (r.km * ANTT.porKm + ANTT.fixo) / CARGA_M3;
      const base = margemBase[p.chave] ?? 0;
      return {
        id: r.id,
        praca: `${praca.nome}/${praca.uf}`,
        origem: nos[r.de].nome,
        km: r.km,
        produto: p.rotulo,
        base,
        frete,
        apos: base - frete,
        refUF: p.ref ? (PETROBRAS_DR[praca.uf]?.[p.ref] ?? null) : null,
        refBrasil: p.ref ? PETROBRAS_BR[p.ref] : null,
      };
    })
    .sort((a, b) => a.apos - b.apos);
}
