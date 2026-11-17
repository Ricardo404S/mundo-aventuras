import { Suspense } from "react";
import Obrigado from "./Obrigado";

export default function ObrigadoPage() {
  return (
    <Suspense
      fallback={
        <main className="tela obrigado">
          <div className="cartao-obrigado">
            <div className="spinner" />
            <h1>Carregando...</h1>
          </div>
        </main>
      }
    >
      <Obrigado />
    </Suspense>
  );
}
