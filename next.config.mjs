/** @type {import('next').NextConfig} */
const nextConfig = {};

const faltando = [
  ["CAKTO_OFERTA_ID", process.env.CAKTO_OFERTA_ID],
  ["CAKTO_WEBHOOK_SECRET", process.env.CAKTO_WEBHOOK_SECRET],
  ["NEXT_PUBLIC_META_PIXEL_ID", process.env.NEXT_PUBLIC_META_PIXEL_ID],
]
  .filter(([, valor]) => !valor || valor.startsWith("SEU_"))
  .map(([chave]) => chave);

if (faltando.length && process.env.NODE_ENV !== "test") {
  console.warn(
    `\n⚠️  Configuração pendente em .env.local: ${faltando.join(", ")}\n` +
      `   Preencha antes de anunciar. Veja .env.example para saber onde achar cada valor.\n`
  );
}

export default nextConfig;
