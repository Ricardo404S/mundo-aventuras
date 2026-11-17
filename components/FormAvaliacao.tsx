"use client";

import { useState } from "react";
import { salvarAvaliacao } from "@/lib/avaliacoes";
import { notificarAvaliacoes } from "@/lib/useAvaliacoes";

interface Props {
  nome: string;
  onEnviada: () => void;
}

export default function FormAvaliacao({ nome, onEnviada }: Props) {
  const [estrelas, setEstrelas] = useState(5);
  const [texto, setTexto] = useState("");
  const [enviado, setEnviado] = useState(false);

  if (enviado) {
    return (
      <div className="avaliacao-enviada">
        Obrigado pela avaliação! 💜 Isso ajuda outras famílias.
      </div>
    );
  }

  return (
    <div className="form-avaliacao">
      <h3>💜 O que achou da aventura?</h3>
      <p>Sua opinião aparece na página do produto.</p>
      <div className="estrelas-input">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setEstrelas(n)}
            aria-label={`${n} estrelas`}
            className={n <= estrelas ? "acesa" : ""}
          >
            ⭐
          </button>
        ))}
      </div>
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Conte como foi a experiência..."
        maxLength={300}
        rows={3}
        required
      />
      <button
        className="botao-avaliar"
        disabled={texto.trim().length < 10}
        onClick={() => {
          salvarAvaliacao({
            id: crypto.randomUUID(),
            nome: nome || "Pai/Mãe",
            estrelas,
            texto: texto.trim(),
            data: new Date().toISOString(),
          });
          notificarAvaliacoes();
          setEnviado(true);
          onEnviada();
        }}
      >
        Enviar avaliação
      </button>
    </div>
  );
}
