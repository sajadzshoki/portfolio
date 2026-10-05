export default defineEventHandler((event) => {
  const origin = getHeader(event, 'origin') || '*'
  setResponseHeader(event, 'Access-Control-Allow-Origin', origin)
  setResponseHeader(event, 'Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS')
  setResponseHeader(
    event,
    'Access-Control-Allow-Headers',
    getHeader(event, 'access-control-request-headers') || 'Content-Type, Authorization'
  )
  setResponseHeader(event, 'Access-Control-Allow-Credentials', 'true')
  setResponseHeader(event, 'Vary', 'Origin')

  if (event.method === 'OPTIONS') {
    setResponseStatus(event, 204)
    return ''
  }
})
