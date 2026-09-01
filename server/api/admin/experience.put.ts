import { requireAdmin } from '../../utils/auth'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody<{ experience?: Array<Record<string, string>> }>(event)
  await prisma.experience.deleteMany()
  if (body.experience?.length) {
    await prisma.experience.createMany({
      data: body.experience.map((item, i) => ({
        id: item.id || undefined,
        index: i,
        yearStart: item.yearStart,
        yearEnd: item.yearEnd,
        titleEn: item.titleEn,
        titleFa: item.titleFa,
        orgEn: item.orgEn,
        orgFa: item.orgFa,
        locationEn: item.locationEn,
        locationFa: item.locationFa,
        bodyEn: item.bodyEn,
        bodyFa: item.bodyFa
      }))
    })
  }
  return prisma.experience.findMany({ orderBy: { index: 'asc' } })
})
