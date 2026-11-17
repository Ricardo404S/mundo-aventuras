import type { Metadata } from "next";
import Landing from "@/components/Landing";

export const metadata: Metadata = {
  title: "Mundo das Aventuras | Jogo educativo que as crianças amam e os pais aprovam",
  description:
    "Trilhas por série, progresso salvo e painel dos pais. Jogo educativo para crianças de 6 a 9 anos. Acesso vitalício com garantia de 7 dias.",
};

export default function LandingPage() {
  return <Landing />;
}
