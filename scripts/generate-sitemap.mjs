/**
 * Gera public/sitemap.xml com extensão de imagens do Google.
 * Requer SITE_URL (https://seu-dominio.com) para URLs absolutas em <image:loc>.
 * @see https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps
 */
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { FOTOS } from '../src/data/constants.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = join(__dirname, '../public/sitemap.xml')

const raw = process.env.SITE_URL?.trim()
const base = raw ? raw.replace(/\/$/, '') : ''

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const title = 'Foto — Nossa história'

let imageBlocks = ''
if (base) {
  for (const rel of FOTOS) {
    const path = rel.startsWith('/') ? rel : `/${rel}`
    const loc = `${base}${path}`
    imageBlocks += `
    <image:image>
      <image:loc>${escapeXml(loc)}</image:loc>
      <image:title>${escapeXml(title)}</image:title>
    </image:image>`
  }
} else {
  console.warn(
    '[generate-sitemap] SITE_URL não definido: sitemap sem blocos <image:image>. ' +
      'Defina SITE_URL (ex.: no .env ou secret do CI) para listar as fotos para o Google.'
  )
}

const locHome = base ? `${base}/` : '/'

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${escapeXml(locHome)}</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>${imageBlocks}
  </url>
</urlset>
`

writeFileSync(outPath, xml.trim() + '\n', 'utf8')
if (base) {
  console.log(`[generate-sitemap] ${outPath} (${FOTOS.length} imagens, base ${base})`)
} else {
  console.log(`[generate-sitemap] ${outPath} (home apenas)`)
}
