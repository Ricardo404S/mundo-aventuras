import { NextRequest, NextResponse } from "next/server";
import { assinaturaValida, marcarPago } from "@/lib/cakto";

export async function POST(req: NextRequest) {
  const corpo = await req.text();

  if (
    !assinaturaValida(
      corpo,
      req.headers.get("x-cakto-timestamp"),
      req.headers.get("x-cakto-signature")
    )
  ) {
    return NextResponse.json({ error: "Assinatura inválida" }, { status: 401 });
  }

  try {
    const payload = JSON.parse(corpo) as {
      event?: string;
      data?: {
        id?: string;
        refId?: string;
        status?: string;
        amount?: number;
        callback?: string | null;
        customer?: { email?: string };
      };
    };

    if (
      payload.event === "purchase_approved" &&
      payload.data?.status === "paid" &&
      payload.data.callback
    ) {
      const pedido = marcarPago(payload.data.callback, {
        refId: payload.data.refId || payload.data.id,
        valor: payload.data.amount,
      });
      if (pedido) console.log("✅ Venda Cakto confirmada:", pedido.email);
    }

    return NextResponse.json({ recebido: true });
  } catch {
    return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
  }
}
