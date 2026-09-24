import { ImageResponse } from "next/og";

// Prévia do link (WhatsApp, LinkedIn, e-mail)
export const alt = "Raio-X do setor de petróleo e combustíveis — Cultura Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#1d1d1f", color: "#ffffff", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ fontSize: 28, opacity: 0.7 }}>Cultura Builder</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>Raio-X do setor de petróleo e combustíveis</div>
          <div style={{ fontSize: 32, marginTop: 24, opacity: 0.75 }}>Dados públicos e verificáveis · painel operacional com agentes de IA</div>
        </div>
        <div style={{ fontSize: 24, opacity: 0.6 }}>ANP · CVM · Planalto · Banco Central · EIA</div>
      </div>
    ),
    size,
  );
}
