import type { Theme } from '~~/shared/types'

export function useTheme() {
  const theme = useState<Theme>('theme', () => 'dark')

  function apply(next: Theme, persist = true) {
    theme.value = next
    if (!import.meta.client) return
    document.documentElement.classList.toggle('dark', next === 'dark')
    document.documentElement.style.colorScheme = next
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', next === 'dark' ? '#10110f' : '#f3f0e8')
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
    apply('dark', false)
  }

  return { theme, apply, toggleTheme, init }
}
