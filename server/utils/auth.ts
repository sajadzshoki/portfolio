import { createHash, randomBytes, timingSafeEqual } from 'node:crypto'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

const COOKIE = 'atlas_session'
const WEEK = 1000 * 60 * 60 * 24 * 7

export function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex')
}

export async function loginAdmin(email: string, password: string) {
  const admin = await prisma.admin.findUnique({ where: { email: email.trim().toLowerCase() } })
  if (!admin) return null
  const ok = await bcrypt.compare(password, admin.password)
  if (!ok) return null

  const raw = randomBytes(32).toString('hex')
  await prisma.session.create({
    data: {
      token: hashToken(raw),
      adminId: admin.id,
      expiresAt: new Date(Date.now() + WEEK)
    }
  })
  return { token: raw, email: admin.email }
}

export async function logoutAdmin(token?: string) {
  if (!token) return
  await prisma.session.deleteMany({ where: { token: hashToken(token) } })
}

export async function getAdminSession(event: Parameters<typeof getCookie>[0]) {
  const raw = getCookie(event, COOKIE)
  if (!raw) return null
  const session = await prisma.session.findUnique({
    where: { token: hashToken(raw) },
    include: { admin: true }
  })
  if (!session || session.expiresAt.getTime() < Date.now()) {
    if (session) await prisma.session.delete({ where: { id: session.id } }).catch(() => {})
    return null
  }
  return session
}

export async function requireAdmin(event: Parameters<typeof getCookie>[0]) {
  const session = await getAdminSession(event)
  if (!session) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  return session.admin
}

function requestIsHttps(event: Parameters<typeof setCookie>[0]) {
  const forwarded = getRequestHeader(event, 'x-forwarded-proto')
  if (typeof forwarded === 'string' && forwarded.split(',')[0].trim().toLowerCase() === 'https') {
    return true
  }
  const socket = event.node?.req?.socket as { encrypted?: boolean } | undefined
  return socket?.encrypted === true
}

export function setSessionCookie(event: Parameters<typeof setCookie>[0], token: string) {
  setCookie(event, COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: WEEK / 1000,
    secure: requestIsHttps(event)
  })
}

export function clearSessionCookie(event: Parameters<typeof setCookie>[0]) {
  deleteCookie(event, COOKIE, { path: '/' })
}

export function safeEqual(a: string, b: string) {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  if (left.length !== right.length) return false
  return timingSafeEqual(left, right)
}
