import type { PortfolioContent } from '~~/shared/types'

export function usePortfolio() {
  return useAsyncData<PortfolioContent>('portfolio', () => $fetch('/api/content'), {
    server: true,
    lazy: false
  })
}
