"use client";

import { useEffect, useRef, useState } from "react";
import { Pergunta, categorias, embaralhar } from "@/lib/perguntas";
import { Serie, perguntasDaSerie, series } from "@/lib/trilhas";
import { registrarSessao, salvarProgresso } from "@/lib/progresso";
import { notificarProgresso, useProgresso } from "@/lib/useProgresso";
import PainelPai from "./PainelPai";
import FormAvaliacao from "./FormAvaliacao";

type Estado = "inicio" | "jogando" | "resultado";

const TOTAL_PERGUNTAS = 8;

const elogios = [
  "Mandou bem! 🎉",
  "Você é demais! 🌟",
  "Excelente! 👏",
  "Que inteligência! 🧠",
  "Continua assim! 🚀",
  "Arrasou! 💥",
];

function tocarSom(tipo: "acerto" | "erro" | "vitoria") {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AudioCtx();
    const notas =
      tipo === "acerto"
        ? [523, 659, 784]
        : tipo === "vitoria"
        ? [523, 659, 784, 1047]
        : [300, 200];
    notas.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = tipo === "erro" ? "sawtooth" : "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + i * 0.1 + 0.25
      );
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.1);
      osc.stop(ctx.currentTime + i * 0.1 + 0.3);
    });
    setTimeout(() => ctx.close(), 1000);
  } catch {
    // áudio é opcional
  }
}

export default function Jogo() {
  const progressoSalvo = useProgresso();
  const [estado, setEstado] = useState<Estado>("inicio");
  const [nome, setNome] = useState(() => progressoSalvo.nome);
  const [serie, setSerie] = useState<Serie>("1");
  const desbloqueadas = progressoSalvo.seriesDesbloqueadas;
  const [painelAberto, setPainelAberto] = useState(false);
  const [lista, setLista] = useState<Pergunta[]>([]);
  const [indice, setIndice] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [selecionada, setSelecionada] = useState<number | null>(null);
  const [bloqueado, setBloqueado] = useState(false);
  const [feedback, setFeedback] = useState<"certo" | "errado" | null>(null);
  const [combo, setCombo] = useState(0);
  const [melhorCombo, setMelhorCombo] = useState(0);
  const [particulas, setParticulas] = useState<
    { id: number; x: number; y: number; emoji: string }[]
  >([]);
  const [tempo, setTempo] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const perguntaAtual = lista[indice];

  useEffect(() => {
    if (estado === "jogando" && !bloqueado) {
      timerRef.current = setInterval(() => setTempo((t) => t + 1), 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [estado, bloqueado]);

  function iniciar(s: Serie = serie) {
    setSerie(s);
    setLista(embaralhar(perguntasDaSerie(s)).slice(0, TOTAL_PERGUNTAS));
    setIndice(0);
    setAcertos(0);
    setCombo(0);
    setMelhorCombo(0);
    setTempo(0);
    setSelecionada(null);
    setFeedback(null);
    setBloqueado(false);
    setEstado("jogando");
  }

  function responder(opcao: number) {
    if (bloqueado) return;
    setBloqueado(true);
    setSelecionada(opcao);
    const certo = opcao === perguntaAtual.resposta;

    if (certo) {
      setAcertos((a) => a + 1);
      setCombo((c) => {
        const novo = c + 1;
        setMelhorCombo((m) => Math.max(m, novo));
        return novo;
      });
      setFeedback("certo");
      tocarSom("acerto");
      const novas = Array.from({ length: 10 }, (_, i) => ({
        id: Date.now() + i,
        x: 50 + (Math.random() - 0.5) * 60,
        y: 50 + (Math.random() - 0.5) * 40,
        emoji: ["⭐", "🎉", "✨", "🌟"][i % 4],
      }));
      setParticulas(novas);
      setTimeout(() => setParticulas([]), 1200);
    } else {
      setCombo(0);
      setFeedback("errado");
      tocarSom("erro");
    }

    setTimeout(() => {
      setFeedback(null);
      setSelecionada(null);
      setBloqueado(false);
      if (indice + 1 >= lista.length) {
        tocarSom("vitoria");
        registrarSessao({
          data: new Date().toISOString(),
          serie,
          acertos: certo ? acertos + 1 : acertos,
          total: lista.length,
          tempo,
          melhorCombo,
        });
        notificarProgresso();
        setEstado("resultado");
      } else {
        setIndice((i) => i + 1);
      }
    }, 1600);
  }

  const progresso = estado === "jogando" ? (indice / lista.length) * 100 : 0;
  const categoria = perguntaAtual ? categorias[perguntaAtual.categoria] : null;

  if (estado === "inicio") {
    return (
      <main className="tela inicio">
        <div className="nuvens">
          <span>☁️</span>
          <span>☁️</span>
          <span>☁️</span>
        </div>
        <button className="botao-pai-topo" onClick={() => setPainelAberto(true)}>
          🔒 Área dos pais
        </button>
        <div className="cartao-inicio">
          <div className="titulo-grande">
            <span className="emoji-flutuante">🚀</span>
            <h1>
              Mundo das
              <br />
              <span className="destaque">Aventuras</span>
            </h1>
            <span className="emoji-flutuante direita">🌈</span>
          </div>
          <p className="subtitulo">
            Aprenda brincando! Escolha sua série e embarque numa missão.
          </p>

          <div className="seletor-serie">
            {(Object.keys(series) as Serie[]).map((s) => {
              const lib = !desbloqueadas.includes(s);
              return (
                <button
                  key={s}
                  className={`serie-card ${serie === s ? "ativa" : ""} ${lib ? "bloqueada" : ""}`}
                  style={{ "--cor": series[s].cor } as React.CSSProperties}
                  onClick={() => !lib && setSerie(s)}
                  disabled={lib}
                >
                  <span className="serie-emoji">{lib ? "🔒" : series[s].emoji}</span>
                  <strong>{series[s].nome}</strong>
                  <small>{series[s].faixa}</small>
                </button>
              );
            })}
          </div>
          <p className="serie-desc">{series[serie].descricao}</p>

          <input
            className="campo-nome"
            placeholder="Qual é o seu nome?"
            value={nome}
            maxLength={20}
            onChange={(e) => {
              setNome(e.target.value);
              salvarProgresso({ ...progressoSalvo, nome: e.target.value });
              notificarProgresso();
            }}
            onKeyDown={(e) => e.key === "Enter" && iniciar()}
          />

          <button className="botao-jogar" onClick={() => iniciar()}>
            Começar missão <span>➔</span>
          </button>
          <p className="dica">{TOTAL_PERGUNTAS} perguntas · cerca de 2 minutos</p>
        </div>
        {painelAberto && <PainelPai onFechar={() => setPainelAberto(false)} />}
      </main>
    );
  }

  if (estado === "resultado") {
    const percentual = Math.round((acertos / lista.length) * 100);
    const estrelas = percentual >= 90 ? 3 : percentual >= 60 ? 2 : 1;
    return (
      <main className="tela resultado">
        <div className="confete">
          {Array.from({ length: 30 }, (_, i) => (
            <span
              key={i}
              style={{
                left: `${(i * 37) % 100}%`,
                animationDelay: `${(i % 10) * 0.2}s`,
              }}
            >
              {["🎉", "🎊", "⭐", "🌈", "✨"][i % 5]}
            </span>
          ))}
        </div>
        <div className="cartao-resultado">
          <div className="estrelas">
            {[1, 2, 3].map((n) => (
              <span key={n} className={n <= estrelas ? "acesa" : "apagada"}>
                ⭐
              </span>
            ))}
          </div>
          <h1>Parabéns, {nome || "campeão"}!</h1>
          <p className="resultado-sub">
            {percentual >= 90
              ? "Você é um verdadeiro gênio! 🧠✨"
              : percentual >= 60
              ? "Muito bem! Você mandou muito! 👏"
              : "Boa tentativa! O importante é nunca desistir! 💪"}
          </p>

          <div className="placar-final">
            <div className="placar-item">
              <span className="placar-numero">
                {acertos}/{lista.length}
              </span>
              <span className="placar-label">Acertos</span>
            </div>
            <div className="placar-item">
              <span className="placar-numero">{percentual}%</span>
              <span className="placar-label">Aproveitamento</span>
            </div>
            <div className="placar-item">
              <span className="placar-numero">{melhorCombo}🔥</span>
              <span className="placar-label">Melhor sequência</span>
            </div>
            <div className="placar-item">
              <span className="placar-numero">
                {Math.floor(tempo / 60)}:{String(tempo % 60).padStart(2, "0")}
              </span>
              <span className="placar-label">Tempo</span>
            </div>
          </div>

          {percentual >= 60 && serie !== "3" && (
            <div className="desbloqueio">
              🎉 Nova série desbloqueada: {series[(String(Number(serie) + 1) as Serie)].nome}!
            </div>
          )}

          <div className="acoes-resultado">
            <button className="botao-jogar" onClick={() => iniciar()}>
              Jogar de novo <span>🔄</span>
            </button>
            <button className="botao-secundario" onClick={() => setEstado("inicio")}>
              Escolher série
            </button>
          </div>

          <FormAvaliacao nome={nome} onEnviada={() => {}} />
        </div>
      </main>
    );
  }

  return (
    <main className="tela jogo">
      <div className="particulas">
        {particulas.map((p) => (
          <span
            key={p.id}
            className="particula"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            {p.emoji}
          </span>
        ))}
      </div>

      <header className="cabecalho">
        <button className="logo-pequena" onClick={() => setEstado("inicio")}>
          🚀 Mundo das Aventuras
        </button>
        <div className="info-jogador">
          <span className="serie-tag" style={{ background: series[serie].cor }}>
            {series[serie].emoji} {series[serie].nome}
          </span>
          <span className="avatar">🧑‍🚀</span>
          <span>{nome || "Aventureiro"}</span>
        </div>
      </header>

      <div className="barra-progresso-container">
        <div className="barra-progresso" style={{ width: `${progresso}%` }} />
        <span className="progresso-texto">
          {indice + 1} / {lista.length}
        </span>
      </div>

      <div className="status-jogo">
        <div className="status-item"><span>✅</span> {acertos}</div>
        <div className="status-item">
          <span>⏱️</span> {Math.floor(tempo / 60)}:{String(tempo % 60).padStart(2, "0")}
        </div>
        {combo >= 2 && <div className="status-item combo">🔥 {combo} seguidas!</div>}
      </div>

      <div
        className={`area-pergunta ${
          feedback ? (feedback === "certo" ? "certo" : "errado") : ""
        }`}
      >
        <div className="pergunta-card">
          <div
            className="categoria-badge"
            style={{ background: categoria?.cor }}
          >
            {categoria?.emoji} {categoria?.nome}
          </div>
          <div className="pergunta-emoji">{perguntaAtual.emoji}</div>
          <h2>{perguntaAtual.pergunta}</h2>

          <div className="opcoes">
            {perguntaAtual.opcoes.map((opcao, i) => {
              let classe = "opcao";
              if (selecionada !== null) {
                if (i === perguntaAtual.resposta) classe += " correta";
                else if (i === selecionada) classe += " incorreta";
              }
              return (
                <button
                  key={i}
                  className={classe}
                  onClick={() => responder(i)}
                  disabled={bloqueado}
                >
                  <span className="opcao-letra">{["A", "B", "C", "D"][i]}</span>
                  {opcao}
                </button>
              );
            })}
          </div>

          {feedback && (
            <div className={`feedback ${feedback}`}>
              {feedback === "certo" ? (
                <>
                  <strong>{elogios[indice % elogios.length]}</strong>
                  <span>{perguntaAtual.explicacao}</span>
                </>
              ) : (
                <>
                  <strong>Quase! 😊</strong>
                  <span>{perguntaAtual.explicacao}</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
