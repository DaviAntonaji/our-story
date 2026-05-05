/**
 * Proteção contra XSS antes de persistir no banco.
 *
 * Todas as entradas de usuário são tratadas como texto puro:
 *  - Tags HTML e scripts são removidos inteiramente
 *  - Bytes nulos são descartados
 *  - Quebras de linha são normalizadas
 *  - Espaços excessivos em nome/e-mail são colapsados
 *
 * O retorno é sempre texto simples — nunca HTML.
 * Na API (JSON), o cliente é responsável por renderizar com
 * textContent (nunca innerHTML) para garantir segurança end-to-end.
 */

const TAGS_RE = /<[^>]*>/g
const NUL_RE = /\0/g
const CRLF_RE = /\r\n?/g
// javascript: / vbscript: / data: mesmo fora de tags (por segurança extra)
const DANGEROUS_PROTO_RE = /(?:javascript|vbscript|data)\s*:/gi

/**
 * Remove todas as tags HTML, bytes nulos e protocolos perigosos de uma string.
 * Preserva quebras de linha simples (útil para mensagens multiline).
 *
 * @param {string} s
 * @returns {string}
 */
export function sanitizeText(s) {
  return String(s)
    .replace(NUL_RE, '')
    .replace(TAGS_RE, '')
    .replace(DANGEROUS_PROTO_RE, '')
    .replace(CRLF_RE, '\n')
    .trim()
}

/**
 * Variante para campos de linha única (nome, e-mail):
 * além da sanitização base, colapsa espaços e remove quebras de linha.
 *
 * @param {string} s
 * @returns {string}
 */
export function sanitizeLine(s) {
  return sanitizeText(s)
    .replace(/[\n\t]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
}
