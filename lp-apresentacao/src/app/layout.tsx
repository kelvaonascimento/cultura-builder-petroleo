import type { Metadata } from "next";
import { Geist, Geist_Mono, Host_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const hostGrotesk = Host_Grotesk({
  variable: "--font-host",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raio-X do setor: Petróleo & Combustíveis no Brasil — Cultura Builder",
  description:
    "Mercado, regulação e IA no setor de combustíveis com dados públicos e verificáveis (ANP, CVM, Planalto) — e a demonstração de um painel operacional com agentes de IA.",
  // apresentação comercial com análise de mercado: fora dos buscadores
  robots: { index: false, follow: false },
  openGraph: {
    title: "Raio-X do setor de petróleo e combustíveis",
    description: "Dados públicos e verificáveis + demonstração de um painel operacional com IA — Cultura Builder",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${hostGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
