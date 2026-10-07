export const HOME_SECTIONS = [
  { id: 'projects', num: '01', labelKey: 'projects' },
  { id: 'skills', num: '02', labelKey: 'skills' },
  { id: 'craft', num: '03', labelKey: 'craft' },
  { id: 'about', num: '04', labelKey: 'about' },
  { id: 'experience', num: '05', labelKey: 'experience' },
  { id: 'contact', num: '06', labelKey: 'contact' }
] as const

export type SectionId = typeof HOME_SECTIONS[number]['id']

export function useSectionProgress() {
  const route = useRoute()
  const current = useState<SectionId | ''>('section-id', () => '')
  const available = useState('section-index-on', () => false)
  let frame = 0

  function sync() {
    const nodes = HOME_SECTIONS
      .map(section => document.getElementById(section.id))
      .filter((node): node is HTMLElement => Boolean(node))

    available.value = nodes.length >= 4
    if (!available.value) {
      current.value = ''
      return
    }

    const mark = window.innerHeight * 0.42
    let found: SectionId | '' = ''
    for (const section of HOME_SECTIONS) {
      const node = document.getElementById(section.id)
      if (!node) continue
      const rect = node.getBoundingClientRect()
      if (rect.top <= mark && rect.bottom >= mark) {
        found = section.id
        break
      }
    }
    if (found !== current.value) current.value = found
  }

  function onScroll() {
    if (frame) return
    frame = window.requestAnimationFrame(() => {
      frame = 0
      sync()
    })
  }

  onMounted(() => {
    sync()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
  })

  watch(() => route.path, async () => {
    await nextTick()
    sync()
  })

  onBeforeUnmount(() => {
    if (frame) cancelAnimationFrame(frame)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  })

  const active = computed(() => HOME_SECTIONS.find(section => section.id === current.value) || null)
  const activeIndex = computed(() => {
    const index = HOME_SECTIONS.findIndex(section => section.id === current.value)
    return index < 0 ? 0 : index
  })

  function sectionLabel(copy: {
    projects: { kicker: string }
    skills: { kicker: string }
    about: { kicker: string }
    experience: { kicker: string }
    contact: { kicker: string }
    craft: { kicker: string }
  }) {
    if (!active.value) return ''
    const map = {
      projects: copy.projects.kicker,
      skills: copy.skills.kicker,
      craft: copy.craft.kicker,
      about: copy.about.kicker,
      experience: copy.experience.kicker,
      contact: copy.contact.kicker
    }
    return map[active.value.labelKey]
  }

  return { current, active, activeIndex, available, sections: HOME_SECTIONS, sectionLabel }
}
