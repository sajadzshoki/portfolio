import { requireAdmin } from '../../utils/auth'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)

  const about = await prisma.about.update({
    where: { id: 'about' },
    data: {
      headingEn: body.headingEn,
      headingFa: body.headingFa,
      bodyEn: body.bodyEn,
      bodyFa: body.bodyFa
    }
  })

  if (Array.isArray(body.focusAreas)) {
    await prisma.focusArea.deleteMany()
    if (body.focusAreas.length) {
      await prisma.focusArea.createMany({
        data: body.focusAreas.map((item: Record<string, string>, i: number) => ({
          id: item.id || undefined,
          index: i,
          titleEn: item.titleEn,
          titleFa: item.titleFa,
          bodyEn: item.bodyEn,
          bodyFa: item.bodyFa
        }))
      })
    }
  }

  const focusAreas = await prisma.focusArea.findMany({ orderBy: { index: 'asc' } })
  return { about, focusAreas }
})
