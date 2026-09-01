import { requireAdmin } from '../../utils/auth'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody<{ skills?: Array<Record<string, string>> }>(event)
  await prisma.skill.deleteMany()
  if (body.skills?.length) {
    await prisma.skill.createMany({
      data: body.skills.map((item, i) => ({
        id: item.id || undefined,
        index: i,
        name: item.name,
        category: item.category
      }))
    })
  }
  return prisma.skill.findMany({ orderBy: { index: 'asc' } })
})
