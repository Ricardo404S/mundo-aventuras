export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

declare global {
  interface Window {
    fbq?: (
      ...args: [string, string, ...unknown[]]
    ) => void;
  }
}

export function fbEvent(nome: string, dados?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.fbq || !PIXEL_ID) return;
  if (dados) window.fbq("track", nome, dados);
  else window.fbq("track", nome);
}
