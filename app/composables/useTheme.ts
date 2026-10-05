import type { Theme } from '~~/shared/types'

const COLORS = { light: '#f4f7fb', dark: '#0e131b' } as const

export function useTheme() {
  const cookie = useCookie<Theme>('atlas-theme', {
    default: () => 'light',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 400,
    path: '/'
  })
  const theme = useState<Theme>('theme', () => (cookie.value === 'dark' ? 'dark' : 'light'))

  function apply(next: Theme, persist = true) {
    const value: Theme = next === 'dark' ? 'dark' : 'light'
    theme.value = value
    cookie.value = value
    if (!import.meta.client) return
    document.documentElement.classList.toggle('dark', value === 'dark')
    document.documentElement.style.colorScheme = value
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', COLORS[value])
    if (persist) localStorage.setItem('atlas-theme', value)
  }

  function toggleTheme(origin?: { x: number, y: number }) {
    const next: Theme = theme.value === 'dark' ? 'light' : 'dark'
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canReveal = typeof document.startViewTransition === 'function' && !reduced

    if (!canReveal) {
      document.documentElement.classList.add('sz-theme-anim')
      apply(next)
      window.setTimeout(() => document.documentElement.classList.remove('sz-theme-anim'), 520)
      return
    }

    const x = origin?.x ?? window.innerWidth / 2
    const y = origin?.y ?? 28
    const end = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const transition = document.startViewTransition(() => {
      apply(next)
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${end}px at ${x}px ${y}px)`
          ]
        },
        {
          duration: 680,
          easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
          fill: 'both',
          pseudoElement: '::view-transition-new(root)'
        }
      )
    })
  }

  function init() {
    if (!import.meta.client) return
    const stored = localStorage.getItem('atlas-theme')
    const next: Theme = stored === 'dark' || (stored !== 'light' && cookie.value === 'dark') ? 'dark' : 'light'
    apply(next, stored !== next)
  }

  return { theme, apply, toggleTheme, init }
}
