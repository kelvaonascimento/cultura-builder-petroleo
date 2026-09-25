// Cores por produto — as mesmas do mapa (mapa-operacao.tsx), validadas para contraste nos dois temas.
// A cor segue o produto em todas as telas: diesel azul, gasolina laranja, etanol verde.
export const COR_PRODUTO = {
  light: { diesel: "#2a78d6", gasolina: "#eb6834", etanol: "#1baf7a" },
  dark: { diesel: "#3987e5", gasolina: "#d95926", etanol: "#199e70" },
} as const;

export type GrupoProduto = keyof (typeof COR_PRODUTO)["light"];

export const grupoProduto = (produto: string): GrupoProduto => (/diesel/i.test(produto) ? "diesel" : /etanol/i.test(produto) ? "etanol" : "gasolina");

export const corProduto = (produto: string, tema: "light" | "dark" = "light") => COR_PRODUTO[tema][grupoProduto(produto)];

// verde da marca Cultura Builder: sinal de "ao vivo" e do agente
export const VERDE_VIVO = "#2FC492";
