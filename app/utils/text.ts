export function presentName(name: string) {
  if (!name) return ''
  const hasLatin = /[A-Za-z]/.test(name)
  if (hasLatin && name === name.toUpperCase()) {
    return name.toLowerCase().replace(/\b[a-z]/g, char => char.toUpperCase())
  }
  return name
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0] || '')
    .join('')
    .toUpperCase()
}

export function splitRole(role: string) {
  const parts = role.split('|').map(part => part.trim()).filter(Boolean)
  return {
    lead: parts[0] || '',
    rest: parts.slice(1).join(' · ')
  }
}

export function safeHref(url: string) {
  const value = (url || '').trim()
  if (!value) return ''
  if (value.startsWith('email:')) return `mailto:${value.slice(6)}`
  if (value.startsWith('mailto:') || value.startsWith('http://') || value.startsWith('https://')) return value
  if (value.includes('@') && !value.includes('/')) return `mailto:${value}`
  if (value.startsWith('t.me/') || value.startsWith('telegram.me/')) return `https://${value}`
  return `https://${value.replace(/^\/+/, '')}`
}

export function hostOf(url: string | null | undefined) {
  if (!url) return ''
  try {
    return new URL(safeHref(url)).host.replace(/^www\./, '')
  } catch {
    return ''
  }
}

export function nameParts(name: string) {
  const shown = presentName(name).trim()
  const parts = shown.split(/\s+/).filter(Boolean)
  if (parts.length <= 1) return [shown]
  return [parts[0], parts.slice(1).join(' ')]
}
