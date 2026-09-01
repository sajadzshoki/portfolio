import { requireAdmin } from '../../utils/auth'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody<{ education?: Array<Record<string, string>> }>(event)
  await prisma.education.deleteMany()
  if (body.education?.length) {
    await prisma.education.createMany({
      data: body.education.map((item, i) => ({
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
  return prisma.education.findMany({ orderBy: { index: 'asc' } })
})
