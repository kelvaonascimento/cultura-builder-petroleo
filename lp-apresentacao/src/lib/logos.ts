type LogoEntry = {
  file: string;
  alt: string;
  invert?: boolean;
};

const registry: Record<string, LogoEntry> = {
  petroreconcavo: { file: "/logos/petroreconcavo.svg", alt: "PetroReconcavo" },
  petrobras: { file: "/logos/petrobras.svg", alt: "Petrobras" },
  raizen: { file: "/logos/raizen.svg", alt: "Raízen" },
  vibra: { file: "/logos/vibra.png", alt: "Vibra Energia" },
  braskem: { file: "/logos/braskem.png", alt: "Braskem" },
  shell: { file: "/logos/shell.svg", alt: "Shell" },
  ipiranga: { file: "/logos/ipiranga.svg", alt: "Ipiranga" },
  ultrapar: { file: "/logos/ultrapar.png", alt: "Ultrapar" },
  cosan: { file: "/logos/cosan.png", alt: "Cosan" },
  acelen: { file: "/logos/acelen.png", alt: "Acelen" },
  larco: { file: "/logos/larco.png", alt: "Larco" },
  rodoil: { file: "/logos/rodoil.svg", alt: "Rodoil" },
  dislub: { file: "/logos/dislub.webp", alt: "Dislub Equador" },
  atem: { file: "/logos/ateam.svg", alt: "Atem" },
  ale: { file: "/logos/ale.png", alt: "ALE Combustíveis" },
  royalfic: { file: "/logos/royalfic.png", alt: "Royal FIC" },
  copercana: {
    file: "/logos/copercana.webp",
    alt: "Copercana Distribuidora",
    invert: true,
  },
  idaza: { file: "/logos/idaza.svg", alt: "Idaza" },
  fan: { file: "/logos/fan.png", alt: "FAN Distribuidora" },
  stang: { file: "/logos/stang.webp", alt: "Stang Distribuidora" },
  potencial: { file: "/logos/potencial.webp", alt: "Potencial" },
};

const orderedKeys = [
  "petroreconcavo",
  "petrobras",
  "raizen",
  "vibra",
  "braskem",
  "shell",
  "ipiranga",
  "ultrapar",
  "cosan",
  "acelen",
  "larco",
  "rodoil",
  "dislub",
  "atem",
  "ale",
  "royalfic",
  "copercana",
  "idaza",
  "fan",
  "stang",
  "potencial",
];

export function logoFor(name: string): LogoEntry | null {
  const n = name.toLowerCase();
  for (const key of orderedKeys) {
    if (n.includes(key)) return registry[key];
  }
  return null;
}

export function monogramFor(name: string): string {
  const stop = new Set([
    "s",
    "a",
    "e",
    "de",
    "do",
    "da",
    "dos",
    "das",
    "ex",
    "grupo",
    "distribuidora",
    "combustiveis",
    "combustíveis",
    "petroleum",
    "energia",
  ]);
  const words = name
    .replace(/[()]/g, "")
    .split(/\s+/)
    .filter((w) => /^[a-zà-ú]/i.test(w) && !stop.has(w.toLowerCase()))
    .map((w) => w.replace(/[^a-zà-ú]/gi, ""));
  const main = words[0] ?? name;
  const second = words[1];
  const ini = second
    ? (main[0] + second[0]).toUpperCase()
    : main.slice(0, 2).toUpperCase();
  return ini;
}
