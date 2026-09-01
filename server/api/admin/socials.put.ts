import { requireAdmin } from '../../utils/auth'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody<{ socials?: Array<Record<string, string>> }>(event)
  await prisma.social.deleteMany()
  if (body.socials?.length) {
    await prisma.social.createMany({
      data: body.socials.map((item, i) => ({
        id: item.id || undefined,
        index: i,
        name: item.name,
        handle: item.handle,
        url: item.url
      }))
    })
  }
  return prisma.social.findMany({ orderBy: { index: 'asc' } })
})
