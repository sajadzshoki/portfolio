import type { Locale } from '~~/shared/types'
import { pick, ui } from '~~/shared/i18n'

export function useLocale() {
  const cookie = useCookie<Locale>('atlas-locale', {
    default: () => 'en',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    watch: false
  })

  const locale = useState<Locale>('locale', () => {
    const fromCookie = cookie.value
    return fromCookie === 'fa' || fromCookie === 'en' ? fromCookie : 'en'
  })
  const switching = useState('locale-switching', () => false)

  const t = computed(() => ui[locale.value])
  const dir = computed(() => (locale.value === 'fa' ? 'rtl' : 'ltr'))
  const isFa = computed(() => locale.value === 'fa')

  function apply(next: Locale) {
    locale.value = next
    cookie.value = next
    if (import.meta.client) {
      document.documentElement.lang = next
      document.documentElement.dir = next === 'fa' ? 'rtl' : 'ltr'
      localStorage.setItem('atlas-locale', next)
      document.cookie = `atlas-locale=${next}; path=/; max-age=31536000; samesite=lax`
    }
  }

  async function setLocale(next: Locale) {
    if (next === locale.value || switching.value) return
    switching.value = true
    if (import.meta.client) {
      document.documentElement.classList.add('locale-switching')
      await new Promise(r => setTimeout(r, 160))
    }
    apply(next)
    if (import.meta.client) {
      await new Promise(r => setTimeout(r, 40))
      document.documentElement.classList.remove('locale-switching')
    }
    switching.value = false
  }

  function toggleLocale() {
    return setLocale(locale.value === 'en' ? 'fa' : 'en')
  }

  function field(en: string, fa: string) {
    return pick(locale.value, en, fa)
  }

  function init() {
    if (!import.meta.client) return
    const stored = localStorage.getItem('atlas-locale') as Locale | null
    if (stored === 'en' || stored === 'fa') {
      if (stored !== locale.value) apply(stored)
      else apply(stored)
      return
    }
    apply(locale.value)
  }

  return { locale, dir, isFa, t, setLocale, toggleLocale, field, init, switching }
}
