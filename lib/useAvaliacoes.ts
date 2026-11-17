"use client";

import { useSyncExternalStore } from "react";
import { carregarAvaliacoes, Avaliacao } from "./avaliacoes";

function assinar(cb: () => void) {
  window.addEventListener("mundo-aventuras-avaliacoes", cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener("mundo-aventuras-avaliacoes", cb);
    window.removeEventListener("storage", cb);
  };
}

function snapshot() {
  return JSON.stringify(carregarAvaliacoes());
}

export function useAvaliacoes(): Avaliacao[] {
  const raw = useSyncExternalStore(assinar, snapshot, () => "[]");
  try {
    return JSON.parse(raw) as Avaliacao[];
  } catch {
    return [];
  }
}

export function notificarAvaliacoes() {
  window.dispatchEvent(new Event("mundo-aventuras-avaliacoes"));
}
