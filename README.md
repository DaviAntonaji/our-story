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
    │   └── NavDots.jsx
    ├── recados/
    │   └── RecadoForm.jsx    # Formulário + Turnstile
    └── slides/
        ├── LandingPage.jsx
        ├── IntroSlide.jsx
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

Recomenda-se definir antes as variáveis `VITE_*` do `.env` (ou equivalente no CI) para o formulário de recados funcionar no build que for publicado.

---

<div align="center">

Feito com muito ☕, algumas noites sem dormir, e um amor enorme

por **Davi Antonaji** - para a **Maysa**, que tornou tudo isso real 🌹

*Juntos desde 04 de março de 2026*

❤️

</div>
