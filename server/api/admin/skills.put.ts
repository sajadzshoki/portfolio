import { requireAdmin } from '../../utils/auth'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody<{ skills?: Array<Record<string, unknown>> }>(event)
  await prisma.skill.deleteMany()
  if (body.skills?.length) {
    await prisma.skill.createMany({
      data: body.skills.map((item, i) => ({
        id: typeof item.id === 'string' && item.id ? item.id : undefined,
        index: i,
        name: String(item.name || ''),
        category: String(item.category || ''),
        logoUrl: String(item.logoUrl || ''),
        descriptionEn: String(item.descriptionEn || ''),
        descriptionFa: String(item.descriptionFa || ''),
        isActive: item.isActive !== false && item.isActive !== 'false'
      }))
    })
  }
  return prisma.skill.findMany({ orderBy: { index: 'asc' } })
})
