import { MapaOperacao } from "@/demo/mapa";

export const metadata = { robots: { index: false } };

export default function LabMapa() {
  return (
    <main className="mx-auto grid w-full max-w-6xl gap-6 p-6">
      <MapaOperacao tema="light" altura={560} />
      <div className="dark rounded-3xl bg-background p-3">
        <MapaOperacao tema="dark" altura={560} />
      </div>
    </main>
  );
}
