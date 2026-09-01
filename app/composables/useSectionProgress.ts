export const SECTIONS = [
  { id: 'top', num: '01', labelKey: 'hero' },
  { id: 'about', num: '02', labelKey: 'about' },
  { id: 'skills', num: '03', labelKey: 'skills' },
  { id: 'work', num: '04', labelKey: 'projects' },
  { id: 'studio', num: '05', labelKey: 'experience' },
  { id: 'social', num: '06', labelKey: 'social' },
  { id: 'contact', num: '07', labelKey: 'contact' }
] as const

export type SectionId = typeof SECTIONS[number]['id']

export function useSectionProgress() {
  const current = useState<SectionId>('section-id', () => 'top')
  const booted = useState('section-io-booted', () => false)

  onMounted(() => {
    if (booted.value) return
    booted.value = true

    const nodes = SECTIONS
      .map(s => document.getElementById(s.id))
      .filter((n): n is HTMLElement => Boolean(n))

    if (!nodes.length) return

    const io = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      const id = visible[0]?.target.id as SectionId | undefined
      if (id) current.value = id
    }, {
      rootMargin: '-18% 0px -58% 0px',
      threshold: [0.1, 0.25, 0.5, 0.75]
    })

    nodes.forEach(n => io.observe(n))
    onBeforeUnmount(() => io.disconnect())
  })

  const active = computed(() => SECTIONS.find(s => s.id === current.value) || SECTIONS[0])

  function sectionLabel(t: ReturnType<typeof useLocale>['t']['value']) {
    const map = {
      hero: t.hero.kicker,
      about: t.about.title,
      skills: t.skills.title,
      projects: t.projects.title,
      experience: t.experience.title,
      social: t.social.title,
      contact: t.contact.kicker
    }
    return map[active.value.labelKey]
  }

  return { current, active, sections: SECTIONS, sectionLabel }
}
