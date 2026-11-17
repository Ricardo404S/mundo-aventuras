import { useSyncExternalStore } from "react";
import type { Progresso } from "./progresso";
import { carregarProgresso } from "./progresso";

const VAZIO: Progresso = { nome: "", sessoes: [], seriesDesbloqueadas: ["1"] };

function assinar(callback: () => void) {
  window.addEventListener("mundo-aventuras-progresso", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("mundo-aventuras-progresso", callback);
    window.removeEventListener("storage", callback);
  };
}

function obterSnapshot() {
  const p = carregarProgresso();
  return JSON.stringify(p);
}

export function useProgresso(): Progresso {
  const raw = useSyncExternalStore(
    assinar,
    () => {
      const json = obterSnapshot();
      return json === JSON.stringify(VAZIO) ? null : json;
    },
    () => null
  );
  if (!raw) return VAZIO;
  try {
    return JSON.parse(raw) as Progresso;
  } catch {
    return VAZIO;
  }
}

export function notificarProgresso() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("mundo-aventuras-progresso"));
  }
}
