"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { fbEvent } from "@/lib/metaPixel";

export default function Obrigado() {
  const params = useSearchParams();
  const token = params.get("token") || params.get("callback");
  const [status, setStatus] = useState<"checando" | "pago" | "erro">(
    token ? "checando" : "erro"
  );
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (!token) return;
    let ativo = true;
    let tentativas = 0;
    let timer: ReturnType<typeof setTimeout>;

    async function verificar() {
      try {
        const r = await fetch(`/api/checkout/status?token=${encodeURIComponent(token!)}`);
        const d = await r.json();
        if (!ativo) return;
        if (d.pago) {
          setStatus("pago");
          setNome(d.nome || "");
          fbEvent("Purchase", {
            value: 47,
            currency: "BRL",
            content_name: "Mundo das Aventuras - Completo",
          });
          return;
        }
      } catch {
        if (!ativo) return;
      }
      tentativas += 1;
      if (tentativas >= 20) {
        setStatus("erro");
        return;
      }
      timer = setTimeout(verificar, 3000);
    }

    verificar();
    return () => {
      ativo = false;
      clearTimeout(timer);
    };
  }, [token]);

  return (
    <main className="tela obrigado">
      <div className="cartao-obrigado">
        {status === "checando" && (
          <>
            <div className="spinner" />
            <h1>Confirmando seu pagamento...</h1>
            <p>Já já liberamos seu acesso. ⏳</p>
          </>
        )}
        {status === "pago" && (
          <>
            <div className="obrigado-emoji">🎉</div>
            <h1>Pagamento confirmado!</h1>
            <p>
              Obrigado{nome ? `, ${nome}` : ""}! Seu acesso ao Mundo das
              Aventuras está liberado.
            </p>
            <p className="obrigado-email">
              Enviamos os detalhes para o e-mail informado no checkout.
            </p>
            <div className="acoes-resultado">
              <Link href="/" className="botao-jogar">
                Começar a jogar 🚀
              </Link>
              <Link href="/landing" className="botao-secundario">
                Voltar ao início
              </Link>
            </div>
          </>
        )}
        {status === "erro" && (
          <>
            <div className="obrigado-emoji">😕</div>
            <h1>Não conseguimos confirmar</h1>
            <p>
              Se você já pagou, aguarde alguns instantes — a confirmação pode
              levar até 1 minuto. Se o problema persistir, entre em contato.
            </p>
            <Link href="/checkout" className="botao-jogar">
              Tentar novamente
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
