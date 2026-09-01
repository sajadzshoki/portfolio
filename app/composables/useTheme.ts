import type { Theme } from '~~/shared/types'

export function useTheme() {
  const theme = useState<Theme>('theme', () => 'light')

  function apply(next: Theme, persist = true) {
    theme.value = next
    if (!import.meta.client) return
    document.documentElement.classList.toggle('dark', next === 'dark')
    document.documentElement.style.colorScheme = next
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', next === 'dark' ? '#0e0e0c' : '#e8e4da')
    if (persist) localStorage.setItem('atlas-theme', next)
  }

  function toggleTheme() {
    apply(theme.value === 'dark' ? 'light' : 'dark', true)
  }

  function init() {
    if (!import.meta.client) return
    const stored = localStorage.getItem('atlas-theme') as Theme | null
    if (stored === 'light' || stored === 'dark') {
      apply(stored, true)
      return
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    apply(prefersDark ? 'dark' : 'light', false)
  }

  return { theme, apply, toggleTheme, init }
}
