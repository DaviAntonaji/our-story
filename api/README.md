# API (Node)

Serviço HTTP para o formulário de recados (Turnstile no servidor, SMTP, CORS e rate limit). Código de referência apenas: **como publicar ou o que rodar em produção não é documentado neste repositório.**

## Uso local

```bash
cd api
cp .env.example .env
# Preencha o .env (valores reais não entram no Git)
npm install
npm run dev
```

Requer Node 20+.

## Rotas

| Método | Caminho | Descrição |
|--------|---------|-----------|
| GET | `/health` | Health check |
| POST | `/api/recados` | Recado (JSON: `name`, `email`, `message`, `turnstileToken`) |
