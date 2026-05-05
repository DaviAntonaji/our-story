import mysql from 'mysql2/promise'

/** @type {import('mysql2/promise').Pool | null} */
let pool = null

/**
 * Cria o pool de conexões para MySQL 5.7.
 * Retorna null se as variáveis obrigatórias não estiverem definidas
 * (modo "só e-mail", sem persistência).
 *
 * @param {NodeJS.ProcessEnv} env
 * @returns {import('mysql2/promise').Pool | null}
 */
export function createPool(env) {
  const host = env.DB_HOST
  const user = env.DB_USER
  const database = env.DB_NAME

  if (!host || !user || !database) return null

  pool = mysql.createPool({
    host,
    port: parseInt(env.DB_PORT || '3306', 10),
    user,
    password: env.DB_PASSWORD ?? '',
    database,
    charset: 'utf8mb4',
    timezone: 'Z',
    multipleStatements: false,
    connectTimeout: 10_000,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
  })

  return pool
}

/**
 * Cria a tabela `recados` se ainda não existir.
 * Compatível com MySQL 5.7 (utf8mb4_unicode_ci, sem colunas JSON).
 *
 * @param {import('mysql2/promise').Pool} [p]
 */
export async function initDb(p = pool) {
  if (!p) return

  await p.execute(`
    CREATE TABLE IF NOT EXISTS recados (
      id          INT UNSIGNED     NOT NULL AUTO_INCREMENT,
      name        VARCHAR(120)     NOT NULL,
      email       VARCHAR(254)     NOT NULL,
      message     TEXT             NOT NULL,
      ip_hash     VARCHAR(64)      NOT NULL DEFAULT '',
      visible     TINYINT(1)       NOT NULL DEFAULT 1,
      created_at  DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      INDEX idx_visible_created (visible, created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `)
}

/**
 * Persiste um recado já sanitizado.
 * O e-mail é armazenado para moderação/resposta interna,
 * mas nunca é exposto no endpoint público GET.
 *
 * @param {{ name: string, email: string, message: string, ipHash?: string }} payload
 * @param {import('mysql2/promise').Pool} [p]
 * @returns {Promise<number|null>} id inserido, ou null se DB não configurado
 */
export async function saveRecado({ name, email, message, ipHash = '' }, p = pool) {
  if (!p) return null

  const [result] = await p.execute(
    'INSERT INTO recados (name, email, message, ip_hash) VALUES (?, ?, ?, ?)',
    [name, email, message, ipHash],
  )

  return /** @type {import('mysql2').ResultSetHeader} */ (result).insertId
}

/**
 * Retorna recados visíveis em ordem cronológica inversa.
 * O campo `email` é intencionalmente omitido (privacidade).
 *
 * @param {{ limit?: number, offset?: number }} [opts]
 * @param {import('mysql2/promise').Pool} [p]
 * @returns {Promise<Array<{ id: number, name: string, message: string, created_at: string }>>}
 */
export async function getRecados({ limit = 50, offset = 0 } = {}, p = pool) {
  if (!p) return []

  const safeLimit = Math.min(Math.max(1, parseInt(String(limit), 10) || 50), 100)
  const safeOffset = Math.max(0, parseInt(String(offset), 10) || 0)

  const [rows] = await p.execute(
    `SELECT id, name, message,
            DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%sZ') AS created_at
     FROM recados
     WHERE visible = 1
     ORDER BY created_at DESC
     LIMIT ? OFFSET ?`,
    [safeLimit, safeOffset],
  )

  return /** @type {any[]} */ (rows)
}

/**
 * Conta o total de recados visíveis (para paginação no frontend).
 *
 * @param {import('mysql2/promise').Pool} [p]
 * @returns {Promise<number>}
 */
export async function countRecados(p = pool) {
  if (!p) return 0
  const [rows] = await p.execute(
    'SELECT COUNT(*) AS total FROM recados WHERE visible = 1',
  )
  return Number(/** @type {any[]} */ (rows)[0]?.total ?? 0)
}
