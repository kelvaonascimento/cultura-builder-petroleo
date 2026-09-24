import { ScrollProgress } from "@/components/motion";
import { Hero } from "@/components/sections/hero";
import { Mercado, Ranking } from "@/components/sections/mercado";
import { Empresas, Cadeia } from "@/components/sections/empresas";
import { Censo } from "@/components/sections/censo";
import { Stack } from "@/components/sections/stack";
import { IA, Melhorias } from "@/components/sections/ia";
import { Dores } from "@/components/sections/dores";
import { Demo } from "@/components/sections/demo";
import { Final } from "@/components/sections/proposta";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Hero />
      <Mercado />
      <Ranking />
      <Empresas />
      <Censo />
      <Cadeia />
      <Stack />
      <IA />
      <Dores />
      <Melhorias />
      <Demo />
      <Final />
    </main>
  );
}
