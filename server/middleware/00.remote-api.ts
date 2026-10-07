const hop = new Set(['host', 'connection', 'keep-alive', 'transfer-encoding', 'content-length', 'accept-encoding'])

export default defineEventHandler(async (event) => {
  if (!import.meta.dev) return

  const origin = (process.env.API_ORIGIN || '').trim().replace(/\/$/, '')
  if (!origin) return

  const path = event.path.split('?')[0] || ''
  const proxied = path === '/api' || path.startsWith('/api/') || path === '/uploads' || path.startsWith('/uploads/')
  if (!proxied) return

  const incoming = getRequestURL(event)
  const target = new URL(`${incoming.pathname}${incoming.search}`, origin)
  const headers = new Headers()

  for (const [key, value] of Object.entries(getRequestHeaders(event))) {
    if (!value || hop.has(key.toLowerCase())) continue
    headers.set(key, value)
  }

  const method = event.method || 'GET'
  const body = method === 'GET' || method === 'HEAD' ? undefined : await readRawBody(event, false)

  let response: Response
  try {
    response = await fetch(target, {
      method,
      headers,
      body: body ?? undefined,
      redirect: 'manual'
    })
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Server data is unreachable' })
  }

  setResponseStatus(event, response.status, response.statusText)

  response.headers.forEach((value, key) => {
    const name = key.toLowerCase()
    if (name === 'set-cookie' || name === 'content-encoding' || name === 'transfer-encoding' || name === 'content-length') return
    setHeader(event, key, value)
  })

  const cookies = typeof response.headers.getSetCookie === 'function' ? response.headers.getSetCookie() : []
  for (const cookie of cookies) {
    appendHeader(event, 'set-cookie', cookie.replace(/;\s*Secure/gi, '').replace(/;\s*Domain=[^;]*/gi, ''))
  }

  return Buffer.from(await response.arrayBuffer())
})
