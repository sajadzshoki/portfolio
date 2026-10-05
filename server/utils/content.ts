import { prisma } from './prisma'
import type { PortfolioContent } from '../../shared/types'

function splitTechs(value: string) {
  try {
    const parsed = JSON.parse(value)
    if (Array.isArray(parsed)) return parsed.map(String)
  } catch {
    /* stored as csv */
  }
  return value
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
}

export async function getPortfolio(): Promise<PortfolioContent> {
  const [site, about, focusAreas, skills, projects, experience, education, socials] = await Promise.all([
    prisma.site.findUnique({ where: { id: 'site' } }),
    prisma.about.findUnique({ where: { id: 'about' } }),
    prisma.focusArea.findMany({ orderBy: { index: 'asc' } }),
    prisma.skill.findMany({ orderBy: { index: 'asc' } }),
    prisma.project.findMany({ orderBy: { index: 'asc' } }),
    prisma.experience.findMany({ orderBy: { index: 'asc' } }),
    prisma.education.findMany({ orderBy: { index: 'asc' } }),
    prisma.social.findMany({ orderBy: { index: 'asc' } })
  ])

  if (!site || !about) {
    throw createError({ statusCode: 503, statusMessage: 'Portfolio is not seeded yet' })
  }

  return {
    site: {
      nameEn: site.nameEn,
      nameFa: site.nameFa,
      roleEn: site.roleEn,
      roleFa: site.roleFa,
      introEn: site.introEn,
      introFa: site.introFa,
      locationEn: site.locationEn,
      locationFa: site.locationFa,
      email: site.email,
      portraitUrl: site.portraitUrl,
      resumeUrl: site.resumeUrl,
      availabilityEn: site.availabilityEn,
      availabilityFa: site.availabilityFa,
      metaEn: site.metaEn,
      metaFa: site.metaFa,
      issue: site.issue,
      contactTitleEn: site.contactTitleEn,
      contactTitleFa: site.contactTitleFa,
      contactBodyEn: site.contactBodyEn,
      contactBodyFa: site.contactBodyFa
    },
    about: {
      headingEn: about.headingEn,
      headingFa: about.headingFa,
      bodyEn: about.bodyEn,
      bodyFa: about.bodyFa
    },
    focusAreas,
    skills: skills.map(skill => ({
      id: skill.id,
      index: skill.index,
      name: skill.name,
      category: skill.category,
      logoUrl: skill.logoUrl || '',
      descriptionEn: skill.descriptionEn || '',
      descriptionFa: skill.descriptionFa || '',
      isActive: skill.isActive !== false
    })),
    projects: projects.map(p => ({
      ...p,
      mobileImageUrl: p.mobileImageUrl || '',
      techs: splitTechs(p.techs),
      featured: Boolean(p.featured)
    })),
    experience,
    education,
    socials
  }
}

export function joinTechs(techs: string[] | string) {
  if (Array.isArray(techs)) return JSON.stringify(techs)
  return techs
}
