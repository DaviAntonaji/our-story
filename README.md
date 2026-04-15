# Our Story ❤️

![Deploy](https://img.shields.io/badge/deploy-live-brightgreen?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![License](https://img.shields.io/badge/feito%20com-amor-ff69b4?style=flat-square)

> *"Desde o primeiro dia eu senti que algo em você era diferente."*

Esse repositório não é só código - é amor compilado, commit por commit.

Aqui vive uma página que fiz especialmente para a **Maysa**, o amor da minha vida. Cada linha foi escrita pensando nela, em cada momento que vivemos juntos, em cada sorriso que me fez bem.

Se você está lendo isso e não é ela... bem-vindo ao repositório de um cara completamente apaixonado. 🥹

---

## O que tem aqui dentro 💌

Cada seção da página foi pensada com carinho:

| Seção | Conteúdo |
|-------|----------|
| 🌹 **Intro** | A primeira coisa que ela vê ao abrir |
| 🌗 **Antes & depois** | “Antes de Você” × “Depois de Você” - em duas colunas |
| ⏳ **Timer** | Contagem em tempo real - dias, horas, minutos e segundos juntos |
| 🎵 **Músicas** | As trilhas sonoras do nosso amor (via Spotify) |
| 💌 **Carta** | Uma carta escrita do coração, pra ser lida com calma |
| ✨ **Sobre ela** | As coisas que mais amo nela |
| ✝️ **Versículo** | 1 Coríntios 13 - a base de tudo |
| 📸 **Momentos** | Um carrossel com nossas fotos juntos |
| 📖 **Nossa história** | Cada momento marcante desde o começo |
| 🤍 **Promessas** | Compromissos reais, feitos pra durar |
| 🌅 **Futuro** | Os sonhos que quero construir ao lado dela |
| 💬 **Recado** | Formulário para amigos e família deixarem mensagem (Turnstile + API) |
| 💝 **Final** | O encerramento - com uma surpresa pra quem chegar até lá |

---

## Recados (formulário + API)

Quem chega até o final da história pode enviar **nome, e-mail e mensagem**. O envio é tratado por uma **API em Node** na pasta `api/`: validação, **Cloudflare Turnstile** no servidor, CORS fechado, rate limit e e-mail em **HTML** (com visual alinhado ao site e imagem de capa servida do próprio site). O modo texto puro continua sendo enviado junto para clientes que não renderizam HTML.

**Front (Vite):** variáveis em `.env` na raiz - veja [.env.example](.env.example) (`VITE_RECADOS_API_URL`, `VITE_TURNSTILE_SITE_KEY`).

**API:** variáveis em `api/.env` - veja [api/.env.example](api/.env.example). Resumo técnico em [api/README.md](api/README.md).

**CI:** o deploy do site estático injeta as variáveis do front a partir dos *secrets* do repositório; o fluxo da API é separado. Segredos e URLs reais não ficam documentados aqui (repo público).

---

## Deploy do site (GitHub Actions → SFTP)

No push na `main`, o workflow:

1. `npm ci`
2. **Gerar ícones PWA** - `npm run generate-pwa-icons` (a partir de `public/imgs/og-cover.jpg`)
3. **Gerar imagem de preview social** - `npm run generate-og-share` → `public/imgs/og-share.jpg` (1200×630, leve; usada em `og:image` para WhatsApp / Telegram não falharem com a foto 4K)
4. **Gerar sitemap** - `npm run generate-sitemap` (usa o secret `SITE_URL`)
5. **Build** - `npx vite build` com as variáveis abaixo injetadas no ambiente

### Secrets do repositório (site estático)

| Secret | Uso |
|--------|-----|
| `SITE_URL` | URL canônica do site (ex.: `https://ourstory.antonaji.com.br`) - sitemap com imagens |
| `RECADOS_API_URL` | Host + caminho da API de recados **sem** `https://` (o workflow monta `VITE_RECADOS_API_URL`) |
| `VITE_TURNSTILE_SITE_KEY` | Site key do Turnstile (front) |
| `VITE_GA_MEASUREMENT_ID` | Opcional - ID de medição (ex.: `G-…`). Se vazio, não há banner de cookies nem script de analytics |
| SFTP (`SFTP_HOST`, `SFTP_USER`, `SFTP_PASSWORD`, `SFTP_PORT`, `SFTP_DIR`) | Upload da pasta `dist/` |
| Cloudflare (opcional) | `CF_ZONE_ID`, `CF_API_TOKEN`, `CF_PURGE_CACHE_JSON` - purge de cache após deploy |

Variáveis locais: copie [.env.example](.env.example) para `.env` na raiz.

### Preview de link (WhatsApp, iMessage, etc.)

- O HTML aponta `og:image` para **`/imgs/og-share.jpg`** (gerada no build). Não use a `og-cover.jpg` original nas meta tags: arquivos muito grandes costumam fazer o WhatsApp **não mostrar** a miniatura.
- Depois de publicar, o cache dos apps pode demorar. Para forçar re-scrape: [Ferramenta de depuração do Facebook](https://developers.facebook.com/tools/debug/) (cole a URL e use **Buscar novamente**).

---

## Tecnologias

Porque até a stack foi escolhida com amor:

- ⚛️ **React + Vite** - rápido como meu coração quando ela aparece
- 🎨 **Tailwind CSS** - estiloso como ela
- 🎞️ **Framer Motion** - com animações tão suaves quanto o jeito dela de ser
- 💬 **Cloudflare Turnstile** - captcha no formulário de recados
- 📧 **Node (Express) + Nodemailer** - API de recados e e-mail formatado

---


## Estrutura do Projeto

```
src/
├── App.jsx                        # Orquestrador principal
├── data/
│   └── constants.js               # Constantes, textos e variantes de animação
├── hooks/
│   └── index.js                   # useTempoJuntos, useCountUp, useIsMobile
└── components/
    ├── animations/
    │   ├── HeartsRain.jsx
    │   ├── ButterfliesFloating.jsx
    │   └── SlideThemedAmbience.jsx
    ├── ui/
    │   ├── MI.jsx                 # Motion Item - wrapper de animação
    │   ├── Slide.jsx              # Wrapper de seção com InView
    │   ├── Divider.jsx
    │   ├── NavDots.jsx
    │   └── CookieConsent.jsx      # Cookies / medição (só se VITE_GA_MEASUREMENT_ID)
    ├── recados/
    │   └── RecadoForm.jsx    # Formulário + Turnstile
    └── slides/
        ├── LandingPage.jsx
        ├── IntroSlide.jsx
        ├── AntesDepoisSlide.jsx
        ├── TimerSlide.jsx
        ├── MusicaSlide.jsx
        ├── CartaSlide.jsx
        ├── TagsSlide.jsx
        ├── VersiculoSlide.jsx
        ├── MomentosSlide.jsx
        ├── HistoriaSlide.jsx
        ├── PromessasSlide.jsx
        ├── FuturoSlide.jsx
        ├── RecadoSlide.jsx
        └── FinalSlide.jsx
```

```
scripts/
├── generate-sitemap.mjs
├── generate-pwa-icons.mjs
└── generate-og-share.mjs      # og-share.jpg 1200×630 a partir de og-cover.jpg
```

```
api/                         # Serviço HTTP dos recados (opcional em dev)
├── src/
│   ├── index.js
│   ├── mail.js              # Template HTML + SMTP
│   ├── turnstile.js
│   └── validate.js
└── Dockerfile
```

---

## Como rodar localmente

```bash
npm install
npm run dev
```

Para testar o fluxo completo dos recados no dev, suba também a API (`cd api`, copie `api/.env.example` para `api/.env`, `npm install` e `npm run dev`) e aponte `VITE_RECADOS_API_URL` para `http://localhost:7000/api/recados` no `.env` da raiz.

## Build para produção

```bash
npm run build
```

O `prebuild` roda automaticamente: ícones PWA, **`og-share.jpg`** (preview social) e sitemap. Exige `public/imgs/og-cover.jpg` como fonte.

Recomenda-se definir antes as variáveis `VITE_*` do `.env` (ou equivalente no CI) para o formulário de recados (e analytics, se usar) no build publicado.

---

<div align="center">

Feito com muito ☕, algumas noites sem dormir, e um amor enorme

por **Davi Antonaji** - para a **Maysa**, que tornou tudo isso real 🌹

*Juntos desde 04 de março de 2026*

❤️

</div>
