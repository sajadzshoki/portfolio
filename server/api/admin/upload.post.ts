import { randomUUID } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { requireAdmin } from '../../utils/auth'

const ALLOWED = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.pdf'])

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const form = await readMultipartFormData(event)
  const file = form?.find(p => p.name === 'file' && p.filename && p.data)
  if (!file?.filename || !file.data) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
  }
  const ext = extname(file.filename).toLowerCase()
  if (!ALLOWED.has(ext)) {
    throw createError({ statusCode: 400, statusMessage: 'Unsupported file type' })
  }
  const dir = process.env.UPLOAD_DIR || join(process.cwd(), 'public', 'uploads')
  await mkdir(dir, { recursive: true })
  const name = `${randomUUID()}${ext}`
  await writeFile(join(dir, name), file.data)
  return { url: `/uploads/${name}` }
})
