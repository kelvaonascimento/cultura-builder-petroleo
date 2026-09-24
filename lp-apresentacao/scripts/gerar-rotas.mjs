// Gera as rotas rodoviárias REAIS do mapa do DEMO a partir de src/demo/malha.json.
// Fonte: OSRM (router.project-osrm.org) sobre dados do OpenStreetMap — © OpenStreetMap contributors (ODbL).
// Uso: node scripts/gerar-rotas.mjs   → escreve public/geo/rotas.json
import { readFileSync, writeFileSync } from "node:fs";

const malha = JSON.parse(readFileSync(new URL("../src/demo/malha.json", import.meta.url), "utf8"));
const nos = Object.fromEntries(malha.nos.map((n) => [n.id, n]));
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

// Ramer–Douglas–Peucker: reduz pontos mantendo o traçado da estrada (tolerância em graus ≈ 200 m)
function simplificar(pts, tol = 0.002) {
  if (pts.length < 3) return pts;
  const [ax, ay] = pts[0];
  const [bx, by] = pts[pts.length - 1];
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy) || 1e-12;
  let maxD = 0;
  let idx = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = Math.abs(dy * pts[i][0] - dx * pts[i][1] + bx * ay - by * ax) / len;
    if (d > maxD) [maxD, idx] = [d, i];
  }
  if (maxD <= tol) return [pts[0], pts[pts.length - 1]];
  return [...simplificar(pts.slice(0, idx + 1), tol).slice(0, -1), ...simplificar(pts.slice(idx), tol)];
}

const saida = [];
for (const r of malha.rotas) {
  const a = nos[r.de];
  const b = nos[r.para];
  const url = `https://router.project-osrm.org/route/v1/driving/${a.lon},${a.lat};${b.lon},${b.lat}?overview=full&geometries=geojson`;
  let dados;
  for (let tentativa = 1; tentativa <= 3; tentativa++) {
    const resp = await fetch(url, { headers: { "User-Agent": "cultura-builder-demo/1.0" } });
    if (resp.ok) {
      dados = await resp.json();
      break;
    }
    await espera(2000 * tentativa);
  }
  if (!dados || dados.code !== "Ok") throw new Error(`OSRM falhou em ${r.id} (${r.de} → ${r.para})`);
  const rota = dados.routes[0];
  const coords = simplificar(rota.geometry.coordinates).map(([x, y]) => [+x.toFixed(4), +y.toFixed(4)]);
  saida.push({ ...r, km: +(rota.distance / 1000).toFixed(1), min: Math.round(rota.duration / 60), coords });
  console.log(`${r.id} ${a.nome} → ${b.nome}: ${(rota.distance / 1000).toFixed(1)} km, ${Math.round(rota.duration / 60)} min, ${coords.length} pontos`);
  await espera(1100); // política de uso do servidor público do OSRM
}

writeFileSync(
  new URL("../public/geo/rotas.json", import.meta.url),
  JSON.stringify({
    fonte: "OSRM (router.project-osrm.org) sobre OpenStreetMap — © OpenStreetMap contributors, ODbL",
    gerado_em: new Date().toISOString(),
    rotas: saida,
  }),
);
console.log(`\n${saida.length} rotas gravadas em public/geo/rotas.json`);
