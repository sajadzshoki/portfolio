import { requireAdmin } from '../../utils/auth'
import { prisma } from '../../utils/prisma'
import { joinTechs } from '../../utils/content'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody<{ projects?: Array<Record<string, unknown>> }>(event)
  await prisma.project.deleteMany()
  if (body.projects?.length) {
    await prisma.project.createMany({
      data: body.projects.map((item, i) => ({
        id: typeof item.id === 'string' && item.id ? item.id : undefined,
        index: i,
        slug: String(item.slug || `project-${i + 1}`),
        titleEn: String(item.titleEn || ''),
        titleFa: String(item.titleFa || ''),
        descriptionEn: String(item.descriptionEn || ''),
        descriptionFa: String(item.descriptionFa || ''),
        year: String(item.year || ''),
        imageUrl: String(item.imageUrl || ''),
        demoUrl: item.demoUrl ? String(item.demoUrl) : null,
        githubUrl: item.githubUrl ? String(item.githubUrl) : null,
        layout: String(item.layout || 'image-start'),
        techs: joinTechs((item.techs as string[] | string) || []),
        featured: item.featured !== false
      }))
    })
  }
  return prisma.project.findMany({ orderBy: { index: 'asc' } })
})
