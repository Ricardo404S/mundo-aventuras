# 🚀 Mundo das Aventuras

Jogo educativo para crianças de 6 a 9 anos, com trilhas por série, painel dos pais e checkout via Cakto.

## Como colocar no ar (Vercel)

### 1. Subir o código para o GitHub
1. Acesse https://github.com/new e crie um repositório chamado `mundo-aventuras` (pode ser privado).
2. **Não** marque "Initialize with README" (o projeto já tem arquivos).
3. No terminal, dentro desta pasta, rode:

```bash
git remote add origin https://github.com/SEU-USUARIO/mundo-aventuras.git
git branch -M main
git push -u origin main
```

(Se pedir login, use um **Personal Access Token**: GitHub → Settings → Developer settings → Personal access tokens → Generate new token com permissão `repo`.)

### 2. Importar na Vercel
1. Acesse https://vercel.com e faça login com sua conta GitHub (botão "Continue with GitHub").
2. Clique em **Add New... → Project**.
3. Selecione o repositório `mundo-aventuras` e clique em **Import**.
4. Em **Framework Preset**, a Vercel deve detectar **Next.js** automaticamente. Não mude nada.
5. Antes de clicar em **Deploy**, vá em **Environment Variables** e adicione:

| Nome | Valor |
|---|---|
| `CAKTO_OFERTA_ID` | `356a2i6` |
| `CAKTO_WEBHOOK_SECRET` | (cole o secret do webhook da Cakto) |
| `NEXT_PUBLIC_META_PIXEL_ID` | (ID numérico do seu pixel) |

6. Clique em **Deploy** e aguarde ~1 minuto.

### 3. URL final
A Vercel vai gerar algo como:

```
https://mundo-aventuras.vercel.app
```

A URL do webhook para cadastrar na Cakto será:

```
https://mundo-aventuras.vercel.app/api/webhook/cakto
```

### 4. Configurar o webhook na Cakto
1. Painel Cakto → **Integrações → Webhooks** → **Criar webhook**
2. URL: `https://mundo-aventuras.vercel.app/api/webhook/cakto`
3. Evento: **`purchase_approved`**
4. Salve e copie o **secret** → cole na variável `CAKTO_WEBHOOK_SECRET` da Vercel
5. Vá em **Deployments → (último) → ... → Redeploy** para a variável nova valer

### 5. Testar
- Acesse `https://mundo-aventuras.vercel.app/landing`
- Clique em "Garantir acesso vitalício" → deve abrir o checkout da Cakto
- Faça uma compra de teste (ou use o botão "Testar webhook" no painel Cakto)

## Rodando localmente

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abra http://localhost:3000 (jogo) e http://localhost:3000/landing (venda).
