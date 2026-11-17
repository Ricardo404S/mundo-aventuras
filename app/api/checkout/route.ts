import { NextRequest, NextResponse } from "next/server";
import { CAKTO_OFERTA_ID, criarPedido, linkCheckout } from "@/lib/cakto";

export async function POST(req: NextRequest) {
  try {
    const { email, nome } = (await req.json()) as {
      email?: string;
      nome?: string;
    };

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Informe um e-mail válido." },
        { status: 400 }
      );
    }
    if (!CAKTO_OFERTA_ID) {
      return NextResponse.json(
        { error: "CAKTO_OFERTA_ID não configurada." },
        { status: 500 }
      );
    }

    const pedido = criarPedido(nome || "Aventureiro", email);
    return NextResponse.json({
      url: linkCheckout(pedido.token),
      token: pedido.token,
    });
  } catch (erro) {
    console.error("Erro ao iniciar checkout:", erro);
    return NextResponse.json(
      { error: "Não foi possível iniciar o pagamento." },
      { status: 500 }
    );
  }
}
