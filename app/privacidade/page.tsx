import Link from "next/link";

export default function Privacidade() {
  return (
    <main className="pagina-legal">
      <Link href="/landing" className="checkout-voltar">← Voltar</Link>
      <h1>Política de Privacidade</h1>
      <p>Última atualização: novembro de 2026.</p>
      <h2>1. Dados que coletamos</h2>
      <p>
        Coletamos apenas o nome da criança e o e-mail do responsável no
        checkout, além de dados de navegação via Meta Pixel (Facebook) para
        medir campanhas. O progresso no jogo fica salvo apenas no seu
        navegador (localStorage).
      </p>
      <h2>2. Como usamos</h2>
      <p>
        Seus dados são usados para liberar o acesso ao produto, enviar
        comunicações de suporte e medir a eficácia de anúncios. Não vendemos
        dados a terceiros.
      </p>
      <h2>3. Pagamentos</h2>
      <p>
        Pagamentos são processados pela Cakto. Não armazenamos dados de cartão
        nem chaves Pix. As informações de pagamento ficam no checkout da Cakto.
      </p>
      <h2>4. Crianças</h2>
      <p>
        Não coletamos dados de crianças diretamente. O nome informado no
        checkout é opcional e usado apenas para personalizar a experiência.
      </p>
      <h2>5. Seus direitos</h2>
      <p>
        Você pode solicitar a exclusão dos seus dados a qualquer momento
        entrando em contato pelo e-mail de suporte informado no comprovante de
        compra.
      </p>
      <h2>6. Cookies e Pixel</h2>
      <p>
        Usamos o Meta Pixel para acompanhar visitas e conversões. Você pode
        bloquear cookies nas configurações do seu navegador.
      </p>
    </main>
  );
}
