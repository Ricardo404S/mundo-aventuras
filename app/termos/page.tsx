import Link from "next/link";

export default function Termos() {
  return (
    <main className="pagina-legal">
      <Link href="/landing" className="checkout-voltar">← Voltar</Link>
      <h1>Termos de Uso</h1>
      <p>Última atualização: novembro de 2026.</p>
      <h2>1. Produto</h2>
      <p>
        O Mundo das Aventuras é um jogo educativo digital com acesso vitalício
        após pagamento único. O acesso é individual e não transferível.
      </p>
      <h2>2. Garantia</h2>
      <p>
        Oferecemos garantia de 7 dias. Se o produto não atender suas
        expectativas, solicite o reembolso integral informando o e-mail da
        compra.
      </p>
      <h2>3. Uso permitido</h2>
      <p>
        O conteúdo é licenciado para uso familiar. É proibida a revenda,
        redistribuição ou engenharia reversa do produto.
      </p>
      <h2>4. Disponibilidade</h2>
      <p>
        O produto funciona em navegadores modernos com conexão à internet.
        Buscamos manter o serviço disponível, mas não garantimos funcionamento
        ininterrupto.
      </p>
      <h2>5. Alterações</h2>
      <p>
        Podemos atualizar conteúdos e funcionalidades. Mudanças nos termos
        serão comunicadas nesta página.
      </p>
    </main>
  );
}
