import crypto from "crypto";
import fs from "fs";
import path from "path";

export const CAKTO_OFERTA_ID = process.env.CAKTO_OFERTA_ID || "";
export const CAKTO_WEBHOOK_SECRET = process.env.CAKTO_WEBHOOK_SECRET || "";
export const LINK_BASE = "https://pay.cakto.com.br";

interface Pedido {
  token: string;
  nome: string;
  email: string;
  pago: boolean;
  refId?: string;
  valor?: number;
  criadoEm: number;
}

const ARQUIVO = path.join(process.cwd(), ".pedidos.json");

function ler(): Pedido[] {
  try {
    if (!fs.existsSync(ARQUIVO)) return [];
    return JSON.parse(fs.readFileSync(ARQUIVO, "utf8")) as Pedido[];
  } catch {
    return [];
  }
}

function gravar(pedidos: Pedido[]) {
  try {
    fs.writeFileSync(ARQUIVO, JSON.stringify(pedidos.slice(-500)), "utf8");
  } catch (erro) {
    console.error("Erro ao salvar pedidos:", erro);
  }
}

export function criarPedido(nome: string, email: string): Pedido {
  const pedido: Pedido = {
    token: crypto.randomUUID().replace(/-/g, ""),
    nome,
    email,
    pago: false,
    criadoEm: Date.now(),
  };
  gravar([...ler().filter((p) => Date.now() - p.criadoEm < 86400000), pedido]);
  return pedido;
}

export function buscarPedido(token: string): Pedido | undefined {
  return ler().find((p) => p.token === token);
}

export function marcarPago(
  token: string,
  dados: { refId?: string; valor?: number }
): Pedido | undefined {
  const pedidos = ler();
  const pedido = pedidos.find((p) => p.token === token);
  if (!pedido) return undefined;
  pedido.pago = true;
  pedido.refId = dados.refId;
  pedido.valor = dados.valor;
  gravar(pedidos);
  return pedido;
}

export function linkCheckout(token: string): string {
  return `${LINK_BASE}/${CAKTO_OFERTA_ID}?callback=${token}`;
}

export function assinaturaValida(
  corpo: string,
  timestamp: string | null,
  assinatura: string | null
): boolean {
  if (!CAKTO_WEBHOOK_SECRET || !timestamp || !assinatura) return false;
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 5 * 60) return false;

  const esperado = crypto
    .createHmac("sha256", CAKTO_WEBHOOK_SECRET)
    .update(`${timestamp}.`)
    .update(corpo)
    .digest("hex");
  const recebido = assinatura.replace(/^v1=/, "");
  const a = Buffer.from(recebido);
  const b = Buffer.from(esperado);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
