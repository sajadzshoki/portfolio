import type { Locale, Project } from '~~/shared/types'

export type ProductShape = 'web' | 'mobile' | 'dashboard'
export type ViewportMode = 'desktop' | 'tablet' | 'mobile'
export type DeviceType = 'laptop' | 'tablet' | 'phone'

export function productShape(project: Pick<Project, 'descriptionEn' | 'techs'>): ProductShape {
  const text = `${project.descriptionEn} ${project.techs.join(' ')}`.toLowerCase()
  const mobile = /\b(capacitor|react native|flutter|android|ios)\b/.test(text)
  const web = /\b(nuxt|vue|next|website|web app|responsive)\b/.test(text)
  if (mobile && !web) return 'mobile'
  if (/\bdashboard/.test(text)) return 'dashboard'
  return 'web'
}

export function spanFor(mode: ViewportMode) {
  if (mode === 'mobile') return 38
  if (mode === 'tablet') return 68
  return 100
}

export function deviceForSpan(span: number): DeviceType {
  if (span < 48) return 'phone'
  if (span < 80) return 'tablet'
  return 'laptop'
}

export function safeHref(url: string) {
  const value = url.trim()
  if (!value) return '#'
  if (value.startsWith('email:')) return `mailto:${value.slice(6)}`
  if (/^(mailto:|tel:)/i.test(value)) return value
  if (/^https?:\/\//i.test(value)) return value
  return `https://${value.replace(/^\/\//, '')}`
}

export function isExternal(url: string) {
  return /^https?:\/\//i.test(safeHref(url))
}

export function localNum(value: number | string, locale: Locale) {
  const text = String(value)
  if (locale !== 'fa') return text
  const digits = '۰۱۲۳۴۵۶۷۸۹'
  return text.replace(/\d/g, digit => digits[Number(digit)] ?? digit)
}

export function padNum(value: number, locale: Locale) {
  return localNum(String(value).padStart(2, '0'), locale)
}
