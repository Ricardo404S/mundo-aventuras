import { NextRequest, NextResponse } from "next/server";
import { buscarPedido } from "@/lib/cakto";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ pago: false }, { status: 400 });
  }
  const pedido = buscarPedido(token);
  return NextResponse.json({
    pago: pedido?.pago ?? false,
    nome: pedido?.nome || "",
    email: pedido?.email || "",
  });
}
