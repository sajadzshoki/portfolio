import { getAdminSession } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const session = await getAdminSession(event)
  if (!session) return { ok: false }
  return { ok: true, email: session.admin.email }
})
