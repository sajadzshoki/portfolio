export type Locale = 'en' | 'fa'
export type Theme = 'light' | 'dark'
export type ProjectLayout = 'image-start' | 'image-end' | 'overlay' | 'stacked'

export interface SiteContent {
  nameEn: string
  nameFa: string
  roleEn: string
  roleFa: string
  introEn: string
  introFa: string
  locationEn: string
  locationFa: string
  email: string
  portraitUrl: string
  resumeUrl: string
  availabilityEn: string
  availabilityFa: string
  metaEn: string
  metaFa: string
  issue: string
  contactTitleEn: string
  contactTitleFa: string
  contactBodyEn: string
  contactBodyFa: string
}

export interface AboutContent {
  headingEn: string
  headingFa: string
  bodyEn: string
  bodyFa: string
}

export interface FocusArea {
  id: string
  index: number
  titleEn: string
  titleFa: string
  bodyEn: string
  bodyFa: string
}

export interface Skill {
  id: string
  index: number
  name: string
  category: string
}

export interface Project {
  id: string
  index: number
  slug: string
  titleEn: string
  titleFa: string
  descriptionEn: string
  descriptionFa: string
  year: string
  imageUrl: string
  demoUrl: string | null
  githubUrl: string | null
  layout: ProjectLayout | string
  techs: string[]
  featured: boolean
}

export interface TimelineItem {
  id: string
  index: number
  yearStart: string
  yearEnd: string
  titleEn: string
  titleFa: string
  orgEn: string
  orgFa: string
  locationEn: string
  locationFa: string
  bodyEn: string
  bodyFa: string
}

export interface Social {
  id: string
  index: number
  name: string
  handle: string
  url: string
}

export interface PortfolioContent {
  site: SiteContent
  about: AboutContent
  focusAreas: FocusArea[]
  skills: Skill[]
  projects: Project[]
  experience: TimelineItem[]
  education: TimelineItem[]
  socials: Social[]
}
