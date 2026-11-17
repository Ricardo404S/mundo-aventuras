"use client";

import Link from "next/link";
import { fbEvent } from "@/lib/metaPixel";
import { useAvaliacoes } from "@/lib/useAvaliacoes";
import { useProgresso } from "@/lib/useProgresso";

const beneficios = [
  {
    emoji: "🎯",
    titulo: "Trilhas por série",
    texto:
      "Conteúdo separado para 1ª, 2ª e 3ª série. Cada missão respeita o ritmo e a idade da criança.",
  },
  {
    emoji: "📈",
    titulo: "Progresso REAL",
    texto:
      "Missões, acertos e tempo salvos automaticamente. Nada de começar do zero toda vez.",
  },
  {
    emoji: "🔒",
    titulo: "Painel dos pais",
    texto:
      "Acompanhe acertos, evolução semanal e desempenho por matéria em um painel simples e claro.",
  },
  {
    emoji: "🧠",
    titulo: "Aprendizado ativo",
    texto:
      "Matemática, lógica, curiosidades e inglês com explicações que ensinam de verdade.",
  },
  {
    emoji: "🚫",
    titulo: "Sem anúncios",
    texto:
      "Zero distrações, zero propagandas. Um ambiente seguro e focado só no aprendizado.",
  },
  {
    emoji: "📚",
    titulo: "Alinhado à BNCC",
    texto:
      "Questões pensadas para reforçar o que a criança aprende na escola, brincando.",
  },
];

export default function Landing() {
  const avaliacoes = useAvaliacoes();
  const progresso = useProgresso();
  const jaJogou = progresso.sessoes.length > 0;

  return (
    <main className="landing">
      <nav className="nav-landing">
        <Link href="/" className="nav-logo">
          🚀 Mundo das Aventuras
        </Link>
        <div className="nav-links">
          <a href="#beneficios">Benefícios</a>
          <a href="#depoimentos">Avaliações</a>
          <a href="#preco">Preço</a>
          <Link href="/checkout" className="nav-cta">
            Comprar agora
          </Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-conteudo">
          <span className="selo-hero">
            ✨ Jogo educativo para crianças de 6 a 9 anos
          </span>
          <h1>
            Seu filho aprende&nbsp;
            <span className="hero-destaque">brincando</span>
            <br />e você acompanha cada passo.
          </h1>
          <p className="hero-sub">
            Trilhas por série, progresso salvo e um painel exclusivo para pais.
            A diversão que a criança ama, com o resultado que a família precisa.
          </p>
          <div className="hero-acoes">
            <Link href="/checkout" className="botao-hero">
              Garantir acesso vitalício <span>➔</span>
            </Link>
            <Link href="/" className="botao-hero-sec">
              Testar grátis primeiro
            </Link>
          </div>
          {jaJogou && (
            <p className="hero-ja-jogou">
              👋 Você já jogou! Continue de onde parou.{" "}
              <Link href="/">Abrir jogo →</Link>
            </p>
          )}
        </div>
        <div className="hero-visual">
          <div className="hero-card-flutuante cartao-azul">
            <div className="mini-top">🎯 Missão da 2ª série</div>
            <div className="mini-pergunta">7 + 5 = ?</div>
            <div className="mini-opcoes">
              <span>11</span>
              <span className="certo">12 ✓</span>
              <span>13</span>
            </div>
          </div>
          <div className="hero-card-flutuante cartao-amarelo">
            <div className="mini-top">🔥 Sequência de 5 acertos!</div>
            <div className="mini-grande">+50 pontos</div>
          </div>
          <div className="hero-card-flutuante cartao-verde">
            <div className="mini-top">📈 Progresso semanal</div>
            <div className="mini-barras">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <span className="hero-emoji-1">🌈</span>
          <span className="hero-emoji-2">🚀</span>
          <span className="hero-emoji-3">⭐</span>
        </div>
      </section>

      <section className="faixa-confianca">
        <span>✅ Sem anúncios</span>
        <span>✅ Progresso salvo</span>
        <span>✅ Painel dos pais</span>
        <span>✅ Funciona no celular</span>
      </section>

      <section id="beneficios" className="secao-beneficios">
        <div className="secao-cabecalho">
          <span className="etiqueta">POR QUE ESCOLHER</span>
          <h2>Mais que um jogo. Uma ferramenta de aprendizado.</h2>
          <p>
            Feito para crianças que amam brincar — e para pais que querem ver
            resultado.
          </p>
        </div>
        <div className="grid-beneficios">
          {beneficios.map((b) => (
            <div key={b.titulo} className="card-beneficio">
              <span className="beneficio-emoji">{b.emoji}</span>
              <h3>{b.titulo}</h3>
              <p>{b.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="depoimentos" className="secao-depoimentos">
        <div className="secao-cabecalho">
          <span className="etiqueta">AVALIAÇÕES DE QUEM JÁ JOGOU</span>
          <h2>A voz das famílias.</h2>
          <p>As avaliações abaixo vêm de pais que jogaram com seus filhos.</p>
        </div>
        {avaliacoes.length > 0 ? (
          <div className="grid-depoimentos">
            {avaliacoes.slice(0, 6).map((a) => (
              <div key={a.id} className="card-depoimento">
                <div className="dep-estrelas">{"⭐".repeat(a.estrelas)}</div>
                <p>“{a.texto}”</p>
                <div className="dep-autor">
                  <span className="dep-avatar">👤</span>
                  <div>
                    <strong>{a.nome}</strong>
                    <small>{new Date(a.data).toLocaleDateString("pt-BR")}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="avaliacoes-vazias">
            <p>
              🌱 Seja a primeira família a avaliar! Jogue com seu filho e deixe
              sua opinião no final da missão.
            </p>
            <Link href="/" className="botao-hero-sec">
              Jogar agora
            </Link>
          </div>
        )}
      </section>

      <section id="preco" className="secao-preco">
        <div className="secao-cabecalho">
          <span className="etiqueta">PREÇO SIMPLES, SEM SURPRESAS</span>
          <h2>Comece grátis. Evolua quando quiser.</h2>
          <p>
            Uma compra única. Acesso liberado para sempre. Sem mensalidade
            escondida.
          </p>
        </div>
        <div className="card-preco">
          <div className="preco-lado">
            <span className="preco-selo">ACESSO VITALÍCIO ⭐</span>
            <h3>
              Mundo das Aventuras <span>Completo</span>
            </h3>
            <ul>
              <li>✅ Todas as 3 trilhas (1ª à 3ª série)</li>
              <li>✅ +48 missões educativas</li>
              <li>✅ Painel de progresso dos pais</li>
              <li>✅ Progresso salvo para sempre</li>
              <li>✅ Sem anúncios, para sempre</li>
              <li>✅ Atualizações futuras inclusas</li>
            </ul>
          </div>
          <div className="preco-lado direita">
            <div className="preco-valor">
              <span className="de">R$ 97,00</span>
              <strong>R$ 47</strong>
              <small>à vista no Pix ou cartão</small>
            </div>
            <div className="preco-garantia">
              🛡️ Garantia de 7 dias: não gostou, devolvemos cada centavo.
            </div>
            <Link
              href="/checkout"
              className="botao-hero"
              onClick={() =>
                fbEvent("Lead", { content_name: "Interesse no produto" })
              }
              style={{ justifyContent: "center", width: "100%" }}
            >
              Quero garantir o acesso! ➔
            </Link>
            <Link href="/" className="link-gratis">
              Ou testar grátis agora mesmo →
            </Link>
          </div>
        </div>
      </section>

      <section className="cta-final">
        <h2>🎮 A aventura começa agora.</h2>
        <p>Teste gratuitamente e veja seu filho pedir mais uma missão.</p>
        <Link href="/checkout" className="botao-hero">
          Garantir acesso vitalício <span>➔</span>
        </Link>
      </section>

      <footer className="footer-landing">
        <span>🚀 Mundo das Aventuras</span>
        <span>Feito com carinho para famílias que aprendem juntas. © 2026</span>
        <span>
          <Link href="/privacidade">Privacidade</Link> ·{" "}
          <Link href="/termos">Termos</Link>
        </span>
      </footer>
    </main>
  );
}
