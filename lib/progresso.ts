import type { Serie } from "./trilhas";

export interface Sessao {
  data: string;
  serie: Serie;
  acertos: number;
  total: number;
  tempo: number;
  melhorCombo: number;
}

export interface Progresso {
  nome: string;
  sessoes: Sessao[];
  seriesDesbloqueadas: Serie[];
}

const CHAVE = "mundo-aventuras-progresso-v1";

const vazio: Progresso = {
  nome: "",
  sessoes: [],
  seriesDesbloqueadas: ["1"],
};

export function carregarProgresso(): Progresso {
  if (typeof window === "undefined") return vazio;
  try {
    const raw = localStorage.getItem(CHAVE);
    if (!raw) return vazio;
    const dados = JSON.parse(raw) as Partial<Progresso>;
    return {
      nome: typeof dados.nome === "string" ? dados.nome : "",
      sessoes: Array.isArray(dados.sessoes) ? dados.sessoes : [],
      seriesDesbloqueadas:
        Array.isArray(dados.seriesDesbloqueadas) && dados.seriesDesbloqueadas.length
          ? dados.seriesDesbloqueadas
          : ["1"],
    };
  } catch {
    return vazio;
  }
}

export function salvarProgresso(progresso: Progresso) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CHAVE, JSON.stringify(progresso));
  } catch {
    // armazenamento indisponível
  }
}

export function registrarSessao(sessao: Sessao): Progresso {
  const atual = carregarProgresso();
  const proximo: Progresso = {
    ...atual,
    sessoes: [...atual.sessoes, sessao].slice(-100),
    seriesDesbloqueadas: [...atual.seriesDesbloqueadas],
  };

  const taxa = sessao.acertos / sessao.total;
  if (taxa >= 0.6) {
    if (sessao.serie === "1" && !proximo.seriesDesbloqueadas.includes("2")) {
      proximo.seriesDesbloqueadas.push("2");
    }
    if (sessao.serie === "2" && !proximo.seriesDesbloqueadas.includes("3")) {
      proximo.seriesDesbloqueadas.push("3");
    }
  }

  salvarProgresso(proximo);
  return proximo;
}

export function estatisticas(progresso: Progresso) {
  const sessoes = progresso.sessoes;
  const totalRespondidas = sessoes.reduce((s, x) => s + x.total, 0);
  const totalAcertos = sessoes.reduce((s, x) => s + x.acertos, 0);
  const minutos = Math.round(sessoes.reduce((s, x) => s + x.tempo, 0) / 60);

  const porSerie = (["1", "2", "3"] as Serie[]).map((serie) => {
    const lista = sessoes.filter((s) => s.serie === serie);
    const total = lista.reduce((s, x) => s + x.total, 0);
    const acertos = lista.reduce((s, x) => s + x.acertos, 0);
    return {
      serie,
      sessoes: lista.length,
      total,
      acertos,
      percentual: total ? Math.round((acertos / total) * 100) : 0,
    };
  });

  const ultimos7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const chave = d.toISOString().slice(0, 10);
    const doDia = sessoes.filter((s) => s.data.slice(0, 10) === chave);
    return {
      dia: d.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", ""),
      acertos: doDia.reduce((s, x) => s + x.acertos, 0),
      total: doDia.reduce((s, x) => s + x.total, 0),
    };
  });

  return {
    sessoes: sessoes.length,
    totalRespondidas,
    totalAcertos,
    percentual: totalRespondidas
      ? Math.round((totalAcertos / totalRespondidas) * 100)
      : 0,
    minutos,
    melhorCombo: sessoes.reduce((m, s) => Math.max(m, s.melhorCombo), 0),
    porSerie,
    ultimos7,
  };
}
