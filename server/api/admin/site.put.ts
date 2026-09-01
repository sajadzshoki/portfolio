import { requireAdmin } from '../../utils/auth'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)
  const site = await prisma.site.update({
    where: { id: 'site' },
    data: {
      nameEn: body.nameEn,
      nameFa: body.nameFa,
      roleEn: body.roleEn,
      roleFa: body.roleFa,
      introEn: body.introEn,
      introFa: body.introFa,
      locationEn: body.locationEn,
      locationFa: body.locationFa,
      email: body.email,
      portraitUrl: body.portraitUrl,
      resumeUrl: body.resumeUrl,
      availabilityEn: body.availabilityEn,
      availabilityFa: body.availabilityFa,
      metaEn: body.metaEn,
      metaFa: body.metaFa,
      issue: body.issue,
      contactTitleEn: body.contactTitleEn,
      contactTitleFa: body.contactTitleFa,
      contactBodyEn: body.contactBodyEn,
      contactBodyFa: body.contactBodyFa
    }
  })
  return site
})
