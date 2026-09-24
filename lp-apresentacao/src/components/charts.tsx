"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
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

export function MarketGrowthChart() {
  const data = [
    { ano: "2025", valor: 7.6 },
    { ano: "2027", valor: 9.9 },
    { ano: "2029", valor: 12.9 },
    { ano: "2031", valor: 16.8 },
    { ano: "2032", valor: 19.2 },
    { ano: "2034", valor: 25.2 },
  ];
  return (
    <AnimatedChart height={280}>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 16, bottom: 0, left: -10 }}>
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={GRAYS.ink} stopOpacity={0.9} />
              <stop offset="100%" stopColor={GRAYS.ink} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={GRAYS.line} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="ano" tick={{ fill: GRAYS.mid, fontSize: 12 }} axisLine={{ stroke: GRAYS.faint }} tickLine={false} />
          <YAxis
            tick={{ fill: GRAYS.mid, fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `US$ ${v} bi`}
          />
          <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`US$ ${Number(v)} bi`, "Mercado de IA em O&G"]} />
          <Area
            type="monotone"
            dataKey="valor"
            stroke={GRAYS.ink}
            strokeWidth={2}
            fill="url(#g1)"
            animationDuration={1400}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </AnimatedChart>
  );
}

export function DemandChart() {
  const data = [
    { ano: "2024", delta: 1.8 },
    { ano: "2025", delta: 3.1 },
    { ano: "2026", delta: 3.7 },
  ];
  return (
    <AnimatedChart height={280}>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 10, right: 16, bottom: 0, left: -10 }}>
          <CartesianGrid stroke={GRAYS.line} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="ano" tick={{ fill: GRAYS.mid, fontSize: 12 }} axisLine={{ stroke: GRAYS.faint }} tickLine={false} />
          <YAxis
            tick={{ fill: GRAYS.mid, fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `+${v} bi L`}
          />
          <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`+${Number(v)} bilhões de litros`, "Crescimento da demanda"]} />
          <Bar dataKey="delta" fill={GRAYS.dark} radius={[6, 6, 0, 0]} barSize={64} animationDuration={1000} animationEasing="ease-out" />
        </BarChart>
      </ResponsiveContainer>
    </AnimatedChart>
  );
}

export function SavingsChart() {
  const data = [
    { empresa: "Vibra", ganho: 900, obs: "estoque liberado com IA preditiva (Época Negócios, 2025)" },
    { empresa: "Petrobras", ganho: 650, obs: "US$ 120 mi em 3 semanas — fiscal + IA (case de fornecedor)" },
    { empresa: "Braskem", ganho: 460, obs: "por ano — estimativa própria declarada (2024)" },
    { empresa: "Raízen", ganho: 230, obs: "transportes, desde 2021 (Estadão, 2024)" },
  ];
  return (
    <AnimatedChart height={280}>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 24, bottom: 0, left: 8 }}>
          <CartesianGrid stroke={GRAYS.line} strokeDasharray="3 3" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fill: GRAYS.mid, fontSize: 12 }}
            axisLine={{ stroke: GRAYS.faint }}
            tickLine={false}
            tickFormatter={(v: number) => `R$ ${v} mi`}
          />
          <YAxis
            type="category"
            dataKey="empresa"
            width={90}
            tick={{ fill: GRAYS.ink, fontSize: 12, fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(v, _n, p) => {
              const obs = (p?.payload as { obs?: string })?.obs ?? "";
              return [`R$ ${Number(v).toLocaleString("pt-BR")} mi — ${obs}`, "Ganho documentado"];
            }}
          />
          <Bar dataKey="ganho" barSize={28} radius={[0, 6, 6, 0]} animationDuration={1200} animationEasing="ease-out">
            {data.map((entry, i) => (
              <Cell key={entry.empresa} fill={[GRAYS.ink, GRAYS.dark, GRAYS.mid, GRAYS.light][i]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </AnimatedChart>
  );
}

export function ForecastChart() {
  const data = [
    { semana: "S1", real: 94, modelo: null },
    { semana: "S2", real: 97, modelo: null },
    { semana: "S3", real: 91, modelo: null },
    { semana: "S4", real: 105, modelo: null },
    { semana: "S5", real: 99, modelo: null },
    { semana: "S6", real: 108, modelo: null },
    { semana: "S7", real: 104, modelo: 103 },
    { semana: "S8", real: 111, modelo: 109 },
    { semana: "S9", real: null, modelo: 116 },
    { semana: "S10", real: null, modelo: 121 },
    { semana: "S11", real: null, modelo: 118 },
    { semana: "S12", real: null, modelo: 126 },
  ];
  return (
    <AnimatedChart height={300}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 16, bottom: 0, left: -10 }}>
          <CartesianGrid stroke={GRAYS.line} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="semana" tick={{ fill: GRAYS.mid, fontSize: 12 }} axisLine={{ stroke: GRAYS.faint }} tickLine={false} />
          <YAxis tick={{ fill: GRAYS.mid, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${v} mil L`} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend
            formatter={(v: string) => (v === "real" ? "Volume real" : "Previsto pelo modelo")}
            wrapperStyle={{ fontSize: "12px", color: GRAYS.mid }}
          />
          <Line type="monotone" dataKey="real" stroke={GRAYS.ink} strokeWidth={2.5} dot={{ r: 3, fill: GRAYS.ink }} connectNulls={false} name="real" animationDuration={1600} animationEasing="ease-out" />
          <Line type="monotone" dataKey="modelo" stroke={GRAYS.mid} strokeWidth={2.5} strokeDasharray="6 4" dot={{ r: 3, fill: GRAYS.mid }} connectNulls name="modelo" animationDuration={1600} animationEasing="ease-out" />
        </LineChart>
      </ResponsiveContainer>
    </AnimatedChart>
  );
}

export function MarginChart() {
  const data = [
    { regiao: "Bahia", antes: 2.1, depois: 2.9 },
    { regiao: "Pernambuco", antes: 1.8, depois: 2.6 },
    { regiao: "Goiás", antes: 2.4, depois: 3.1 },
    { regiao: "Maranhão", antes: 2.0, depois: 2.8 },
  ];
  return (
    <AnimatedChart height={300}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 16, bottom: 0, left: -10 }}>
          <CartesianGrid stroke={GRAYS.line} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="regiao" tick={{ fill: GRAYS.mid, fontSize: 12 }} axisLine={{ stroke: GRAYS.faint }} tickLine={false} />
          <YAxis tick={{ fill: GRAYS.mid, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${v}%`} />
          <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${Number(v)}%`, ""]} />
          <Legend formatter={(v: string) => (v === "antes" ? "Antes (preço manual)" : "Depois (copiloto de precificação)")} wrapperStyle={{ fontSize: "12px", color: GRAYS.mid }} />
          <Bar dataKey="antes" fill={GRAYS.faint} radius={[6, 6, 0, 0]} barSize={26} name="antes" animationDuration={1000} animationEasing="ease-out" />
          <Bar dataKey="depois" fill={GRAYS.ink} radius={[6, 6, 0, 0]} barSize={26} name="depois" animationDuration={1000} animationEasing="ease-out" />
        </BarChart>
      </ResponsiveContainer>
    </AnimatedChart>
  );
}

export function NetworkChart() {
  const data = [
    { rede: "Vibra", postos: 8350 },
    { rede: "Ipiranga", postos: 8000 },
    { rede: "Raízen (Shell)", postos: 8100 },
    { rede: "ALE", postos: 1500 },
    { rede: "Setta", postos: 80 },
  ];
  return (
    <AnimatedChart height={300}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 30, bottom: 0, left: 10 }}>
          <CartesianGrid stroke={GRAYS.line} strokeDasharray="3 3" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fill: GRAYS.mid, fontSize: 12 }}
            axisLine={{ stroke: GRAYS.faint }}
            tickLine={false}
            tickFormatter={(v: number) => v.toLocaleString("pt-BR")}
          />
          <YAxis
            type="category"
            dataKey="rede"
            width={110}
            tick={{ fill: GRAYS.ink, fontSize: 12, fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${Number(v).toLocaleString("pt-BR")} postos`, "Rede"]} />
          <Bar dataKey="postos" barSize={24} radius={[0, 6, 6, 0]} label={{ position: "right", fill: GRAYS.ink, fontSize: 11, fontWeight: 600 }} animationDuration={1200} animationEasing="ease-out">
            {data.map((entry, i) => (
              <Cell key={entry.rede} fill={[GRAYS.ink, GRAYS.ink, GRAYS.ink, GRAYS.dark, GRAYS.light, GRAYS.light][i]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </AnimatedChart>
  );
}
