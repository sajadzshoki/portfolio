import { clearSessionCookie, logoutAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'atlas_session')
  await logoutAdmin(token)
  clearSessionCookie(event)
  return { ok: true }
})
