"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useInView } from "@/components/motion";

function AnimatedChart({
  height,
  children,
}: {
  height: number;
  children: React.ReactNode;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  return (
    <div ref={ref}>
      <div style={{ height, visibility: inView ? "visible" : "hidden" }}>
        {inView ? children : null}
      </div>
    </div>
  );
}

const GRAYS = {
  ink: "#18181B",
  dark: "#3F3F46",
  mid: "#71717A",
  light: "#A1A1AA",
  faint: "#D4D4D8",
  line: "#E4E4E7",
};

const tooltipStyle = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E5E5EA",
  borderRadius: "10px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  color: "#1D1D1F",
  fontSize: "12px",
};

// Paleta categórica validada (skill dataviz): diesel, gasolina, etanol — a mesma do mapa do DEMO
const PRODUTO = { diesel: "#2a78d6", gasolina: "#eb6834", etanol: "#1baf7a" };
const m3 = (v: number) => v.toLocaleString("pt-BR") + " m³";

// Vendas nacionais por produto, 2016–2025 (ANP, dados abertos)
export function VendasAnuaisChart({ data }: { data: { ano: number; gasolina: number; diesel: number; etanol: number }[] }) {
  return (
    <AnimatedChart height={260}>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
          <CartesianGrid stroke={GRAYS.line} vertical={false} />
          <XAxis dataKey="ano" tick={{ fill: GRAYS.mid, fontSize: 12 }} axisLine={{ stroke: GRAYS.faint }} tickLine={false} />
          <YAxis
            tick={{ fill: GRAYS.mid, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={96}
            tickFormatter={(v: number) => v.toLocaleString("pt-BR")}
          />
          <Tooltip contentStyle={tooltipStyle} formatter={(v, n) => [m3(Number(v)), String(n)]} labelFormatter={(l) => `Ano ${l}`} />
          <Legend wrapperStyle={{ fontSize: 12, color: GRAYS.dark }} />
          <Bar dataKey="diesel" name="Óleo diesel" stackId="v" fill={PRODUTO.diesel} isAnimationActive={false} />
          <Bar dataKey="gasolina" name="Gasolina C" stackId="v" fill={PRODUTO.gasolina} isAnimationActive={false} />
          <Bar dataKey="etanol" name="Etanol hidratado" stackId="v" fill={PRODUTO.etanol} radius={[4, 4, 0, 0]} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </AnimatedChart>
  );
}

// Postos por bandeira (ANP, cadastro de revendedores) — uma série, um matiz, rótulo direto
export function PostosBandeiraChart({ data }: { data: { bandeira: string; postos: number }[] }) {
  return (
    <AnimatedChart height={300}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 56, bottom: 0, left: 4 }}>
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="bandeira" width={108} tick={{ fill: GRAYS.ink, fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} formatter={(v) => [Number(v).toLocaleString("pt-BR") + " postos", "Cadastro ANP"]} />
          <Bar
            dataKey="postos"
            barSize={18}
            radius={[0, 4, 4, 0]}
            isAnimationActive={false}
            label={{ position: "right", fill: GRAYS.dark, fontSize: 11, formatter: (v: unknown) => Number(v).toLocaleString("pt-BR") }}
          >
            {data.map((d) => (
              <Cell key={d.bandeira} fill={d.bandeira === "Bandeira branca" ? GRAYS.mid : PRODUTO.diesel} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </AnimatedChart>
  );
}
