export interface Avaliacao {
  id: string;
  nome: string;
  estrelas: number;
  texto: string;
  data: string;
}

const CHAVE = "mundo-aventuras-avaliacoes-v1";

export function carregarAvaliacoes(): Avaliacao[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CHAVE);
    return raw ? (JSON.parse(raw) as Avaliacao[]) : [];
  } catch {
    return [];
  }
}

export function salvarAvaliacao(a: Avaliacao): Avaliacao[] {
  if (typeof window === "undefined") return [];
  const lista = [a, ...carregarAvaliacoes()].slice(0, 20);
  localStorage.setItem(CHAVE, JSON.stringify(lista));
  return lista;
}
