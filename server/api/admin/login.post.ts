import { loginAdmin, setSessionCookie } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string, password?: string }>(event)
  if (!body?.email || !body?.password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password required' })
  }
  const result = await loginAdmin(body.email, body.password)
  if (!result) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }
  setSessionCookie(event, result.token)
  return { ok: true, email: result.email }
})
