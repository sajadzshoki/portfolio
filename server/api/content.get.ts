import { getPortfolio } from '../utils/content'

export default defineEventHandler(async () => {
  return getPortfolio()
})
