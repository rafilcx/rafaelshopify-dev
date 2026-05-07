# Rafael Silva — Landing

Landing estática hospedada na Vercel em `https://rafaelshopify.dev`.

## Stack

- HTML estático + React 18 (UMD prod) compilado em runtime via Babel Standalone
- Animações via GSAP 3.12.5 + ScrollTrigger (CDN)
- Sem build step. Sem Next/Vite. Sem Node.

## Estrutura

```
/
├── index.html              # ponto de entrada
├── tokens.css              # design tokens globais
├── favicon.svg             # ícone do site
├── og-image.jpg            # imagem do Open Graph (1200x630) — gerar/colocar antes do deploy
├── robots.txt
├── sitemap.xml
├── vercel.json             # cleanUrls + trailingSlash:false
├── /assets
│   └── shopify.png         # logo Shopify usado no Hub do Hero
└── /landing
    ├── app.jsx             # shell + Nav + reveal observer
    ├── motion.js           # wrapper RSMotion (GSAP + ScrollTrigger)
    ├── sec-hero.jsx        # Hero
    ├── sec-mid.jsx         # Rail + Services + Flow
    └── sec-late.jsx        # Dashboard + Projetos + Timeline + Stack + FinalCTA
    └── landing.css         # estilos da landing
```

Outros arquivos `.jsx` na raiz pertencem ao **Tittanium Design System** (página separada) e estão listados em `.vercelignore` para não irem ao deploy.

## Desenvolvimento local

Não abra o `index.html` direto via `file://` — os scripts type=text/babel são bloqueados por CORS. Use um servidor estático:

```bash
python3 -m http.server 3000
# ou
npx serve .
```

Abra `http://localhost:3000`.

## Deploy

1. Push para GitHub
2. Importar o repositório na Vercel (sem framework — "Other")
3. Não precisa configurar build/output (deploy estático)
4. Após URL temporária responder, conectar `rafaelshopify.dev` em Settings → Domains
5. Configurar redirect `www.rafaelshopify.dev → rafaelshopify.dev`

## OG image

`og-image.jpg` deve ser uma imagem JPG 1200×630px na raiz. Se ainda não existir antes do deploy, remover temporariamente as meta tags `og:image` e `twitter:image` do `index.html` para evitar preview quebrado em LinkedIn/WhatsApp.
