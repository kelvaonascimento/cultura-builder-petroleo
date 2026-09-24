"use client";

import dynamic from "next/dynamic";

// MapLibre + deck.gl só no navegador e só quando o mapa aparece (não pesa o carregamento da página)
export const MapaOperacao = dynamic(() => import("./mapa-operacao"), {
  ssr: false,
  loading: () => <div className="h-full min-h-[320px] animate-pulse rounded-2xl bg-secondary" />,
});
