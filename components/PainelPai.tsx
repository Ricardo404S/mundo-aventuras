"use client";

import {
  estatisticas,
  salvarProgresso,
} from "@/lib/progresso";
import { series } from "@/lib/trilhas";
import type { Progresso } from "@/lib/progresso";
import { notificarProgresso, useProgresso } from "@/lib/useProgresso";

interface Props {
  onFechar: () => void;
}

export default function PainelPai({ onFechar }: Props) {
  const progresso = useProgresso();
  const stats = estatisticas(progresso);
  const maxDia = Math.max(...stats.ultimos7.map((d) => d.total), 1);

  function limpar() {
    if (!confirm("Tem certeza? Isso apaga todo o progresso salvo.")) return;
    const vazio: Progresso = { nome: progresso.nome, sessoes: [], seriesDesbloqueadas: ["1"] };
    salvarProgresso(vazio);
    notificarProgresso();
  }

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal-painel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-cabecalho">
          <div>
            <span className="modal-tag">🔒 Área dos pais</span>
            <h2>Painel de progresso</h2>
            <p>Acompanhe a evolução de {progresso.nome || "seu filho"}.</p>
          </div>
          <button className="botao-fechar" onClick={onFechar} aria-label="Fechar">✕</button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-num">{stats.sessoes}</span>
            <span className="stat-lab">missões jogadas</span>
          </div>
          <div className="stat-card destaque-stat">
            <span className="stat-num">{stats.percentual}%</span>
            <span className="stat-lab">acertos gerais</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">{stats.totalRespondidas}</span>
            <span className="stat-lab">perguntas respondidas</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">{stats.minutos} min</span>
            <span className="stat-lab">tempo de estudo</span>
          </div>
        </div>

        <div className="painel-secao">
          <h3>📊 Atividade nos últimos 7 dias</h3>
          <div className="grafico">
            {stats.ultimos7.map((d, i) => (
              <div key={i} className="grafico-coluna">
                <div className="grafico-barra-wrap">
                  <div
                    className="grafico-barra"
                    style={{
                      height: `${Math.max((d.total / maxDia) * 100, 4)}%`,
                      opacity: d.total ? 1 : 0.25,
                    }}
                    title={`${d.acertos}/${d.total}`}
                  />
                </div>
                <span className="grafico-dia">{d.dia}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="painel-secao">
          <h3>🎯 Desempenho por série</h3>
          <div className="serie-stats">
            {stats.porSerie.map((s) => (
              <div key={s.serie} className="serie-stat" style={{ borderColor: series[s.serie].cor }}>
                <div className="serie-stat-top">
                  <strong>{series[s.serie].emoji} {series[s.serie].nome}</strong>
                  <span>{s.percentual}%</span>
                </div>
                <div className="mini-barra">
                  <div
                    style={{ width: `${s.percentual}%`, background: series[s.serie].cor }}
                  />
                </div>
                <small>{s.acertos} acertos em {s.total} perguntas</small>
              </div>
            ))}
          </div>
        </div>

        {stats.sessoes === 0 && (
          <p className="painel-vazio">
            Ainda não há atividades. 💤 Jogue uma missão para ver os dados aqui!
          </p>
        )}

        <button className="botao-limpar" onClick={limpar}>
          Limpar histórico
        </button>
      </div>
    </div>
  );
}
