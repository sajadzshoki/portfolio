import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { extname, isAbsolute, join, normalize, relative, sep } from 'node:path'

const TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf'
}

export default defineEventHandler(async (event) => {
  const raw = getRouterParam(event, 'path') || ''
  const rel = Array.isArray(raw) ? raw.join('/') : String(raw)
  if (!rel || rel.includes('\0') || rel.split('/').some(part => !part || part === '.' || part === '..')) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid path' })
  }

  const root = normalize(process.env.UPLOAD_DIR || join(process.cwd(), 'public', 'uploads'))
  const file = normalize(join(root, rel))
  const fromRoot = relative(root, file)
  if (!fromRoot || fromRoot.startsWith('..') || fromRoot.includes(`..${sep}`) || isAbsolute(fromRoot)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid path' })
  }

  const info = await stat(file).catch(() => null)
  if (!info?.isFile()) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  const type = TYPES[extname(file).toLowerCase()]
  if (type) setHeader(event, 'content-type', type)
  return sendStream(event, createReadStream(file))
})
