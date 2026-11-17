"use client";

import { useState } from "react";
import Link from "next/link";
import { fbEvent } from "@/lib/metaPixel";

export default function Checkout() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function irParaPagamento(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    fbEvent("Lead", { content_name: "Checkout iniciado" });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, nome }),
      });
      const dados = await res.json();
      if (!res.ok) throw new Error(dados.error || "Erro no checkout");
      window.location.href = dados.url;
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Tente novamente.");
      setCarregando(false);
    }
  }

  return (
    <main className="tela checkout">
      <Link href="/landing" className="checkout-voltar">
        ← Voltar
      </Link>
      <div className="cartao-checkout">
        <div className="checkout-cabecalho">
          <span>🔒 Pagamento seguro</span>
          <h1>Falta pouco para começar! 🎉</h1>
          <p>
            Informe seu e-mail e você será levado ao checkout seguro da Cakto
            para pagar com Pix ou cartão.
          </p>
        </div>

        <div className="resumo-compra">
          <span>🚀 Mundo das Aventuras — Completo</span>
          <strong>R$ 47,00</strong>
        </div>

        <form onSubmit={irParaPagamento} className="form-checkout">
          <label>
            Nome da criança
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex.: Maria"
              maxLength={20}
            />
          </label>
          <label>
            Seu e-mail
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@email.com"
              required
            />
          </label>
          {erro && <p className="erro-checkout">⚠️ {erro}</p>}
          <button className="botao-jogar" type="submit" disabled={carregando}>
            {carregando ? "Abrindo pagamento..." : "Ir para o pagamento ➔"}
          </button>
        </form>
        <p className="checkout-seguro">
          🔐 Pagamento processado pela Cakto · Pix ou cartão · Garantia de 7 dias
        </p>
      </div>
    </main>
  );
}
