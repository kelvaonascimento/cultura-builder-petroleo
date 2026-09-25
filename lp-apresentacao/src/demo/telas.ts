// Telas do DEMO: id, grupo, rótulos e ícone. Módulo sem componentes para não criar import circular.
import type { LucideIcon } from "lucide-react";
import { Bot, Cylinder, Gauge, Handshake, LayoutDashboard, MapPinned, Radar, Scale, ShieldCheck, Store, Tags, Truck, Wallet } from "lucide-react";
import type { SimData, Tema } from "@/components/sections/demo-sim";

export type ViewId =
  | "cockpit"
  | "visao"
  | "comercial"
  | "precos"
  | "pracas"
  | "rede"
  | "suprimento"
  | "logistica"
  | "financeiro"
  | "fiscal"
  | "calor"
  | "ia"
  | "seguranca";

export const VIEW_DEFS: { id: ViewId; grupo: string; label: string; curto: string; sub: string; icone: LucideIcon }[] = [
  { id: "cockpit", grupo: "Painel de gestão", label: "Cockpit do dono", curto: "Cockpit", sub: "Resultado, orçamento, estoque e riscos agora", icone: Gauge },
  { id: "visao", grupo: "Painel de gestão", label: "Visão geral", curto: "Visão", sub: "Retrato executivo da operação", icone: LayoutDashboard },
  { id: "comercial", grupo: "Comercial", label: "Comercial B2B", curto: "Comercial", sub: "Funil, fila de pedidos e crédito", icone: Handshake },
  { id: "precos", grupo: "Comercial", label: "Precificação", curto: "Preços", sub: "Copiloto e margem por base", icone: Tags },
  { id: "pracas", grupo: "Comercial", label: "Margem por praça", curto: "Praças", sub: "Base − frete real até a praça", icone: MapPinned },
  { id: "rede", grupo: "Comercial", label: "Rede & Varejo", curto: "Rede", sub: "Postos, demanda e captação", icone: Store },
  { id: "suprimento", grupo: "Operação", label: "Suprimento", curto: "Estoque", sub: "Tanques, compras e custos", icone: Cylinder },
  { id: "logistica", grupo: "Operação", label: "Logística", curto: "Logística", sub: "Rotas, frota e janelas", icone: Truck },
  { id: "financeiro", grupo: "Financeiro", label: "Financeiro & Caixa", curto: "Caixa", sub: "Fluxo, carteira e cobrança", icone: Wallet },
  { id: "fiscal", grupo: "Risco e regulação", label: "Regulação ao vivo", curto: "Regulação", sub: "Normas, prazos e agentes", icone: Scale },
  { id: "calor", grupo: "Risco e regulação", label: "Oportunidades & Riscos", curto: "Riscos", sub: "Mapa de calor por UF", icone: Radar },
  { id: "seguranca", grupo: "Risco e regulação", label: "Segurança & Compliance", curto: "Segurança", sub: "Trilha, controles e LGPD", icone: ShieldCheck },
  { id: "ia", grupo: "Inteligência", label: "Centro de IA", curto: "Agentes", sub: "Agentes operando o fluxo", icone: Bot },
];

export const ehViewId = (s: string): s is ViewId => VIEW_DEFS.some((d) => d.id === s);

export type ViewProps = { sim: SimData; tema: Tema; onNav: (v: ViewId) => void };
