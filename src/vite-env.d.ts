/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RECADOS_API_URL?: string
  readonly VITE_TURNSTILE_SITE_KEY?: string
  /** Google Analytics 4 — Measurement ID (ex.: G-XXXXXXXX). Se vazio, o aviso de cookies não aparece. */
  readonly VITE_GA_MEASUREMENT_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
