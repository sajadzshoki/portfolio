<script setup lang="ts">
import type { PortfolioContent, Project, Skill, Social, TimelineItem, FocusArea } from '~~/shared/types'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const { t } = useLocale()
const tab = ref<'site' | 'about' | 'skills' | 'projects' | 'experience' | 'education' | 'socials'>('site')
const { data, refresh } = await useFetch<PortfolioContent>('/api/content')
const status = ref('')
const saving = ref(false)

const site = reactive({ ...data.value!.site })
const about = reactive({
  headingEn: data.value!.about.headingEn,
  headingFa: data.value!.about.headingFa,
  bodyEn: data.value!.about.bodyEn,
  bodyFa: data.value!.about.bodyFa,
  focusAreas: data.value!.focusAreas.map(clone)
})
const skills = ref(data.value!.skills.map(clone))
const projects = ref(data.value!.projects.map(p => ({ ...p, techs: [...p.techs] })))
const experience = ref(data.value!.experience.map(clone))
const education = ref(data.value!.education.map(clone))
const socials = ref(data.value!.socials.map(clone))

function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v))
}

function flash(msg = t.value.admin.saved) {
  status.value = msg
  setTimeout(() => {
    status.value = ''
  }, 1800)
}

async function save(path: string, body: unknown) {
  saving.value = true
  try {
    await $fetch(path, { method: 'PUT', body })
    await refresh()
    flash()
  } catch (e) {
    flash('Error')
    console.error(e)
  } finally {
    saving.value = false
  }
}

async function upload(file: File, apply: (url: string) => void) {
  const form = new FormData()
  form.append('file', file)
  const res = await $fetch<{ url: string }>('/api/admin/upload', { method: 'POST', body: form })
  apply(res.url)
}

function addSkill() {
  skills.value.push({ id: '', index: skills.value.length, name: '', category: '' } as Skill)
}
function addFocus() {
  about.focusAreas.push({ id: '', index: about.focusAreas.length, titleEn: '', titleFa: '', bodyEn: '', bodyFa: '' } as FocusArea)
}
function addProject() {
  projects.value.push({
    id: '',
    index: projects.value.length,
    slug: `project-${projects.value.length + 1}`,
    titleEn: '',
    titleFa: '',
    descriptionEn: '',
    descriptionFa: '',
    year: '2026',
    imageUrl: '',
    demoUrl: '',
    githubUrl: '',
    layout: 'image-start',
    techs: [],
    featured: true
  } as Project)
}
function addTimeline(list: Ref<TimelineItem[]>) {
  list.value.push({
    id: '',
    index: list.value.length,
    yearStart: '',
    yearEnd: '',
    titleEn: '',
    titleFa: '',
    orgEn: '',
    orgFa: '',
    locationEn: '',
    locationFa: '',
    bodyEn: '',
    bodyFa: ''
  })
}
function addSocial() {
  socials.value.push({ id: '', index: socials.value.length, name: '', handle: '', url: '' } as Social)
}

const tabs = [
  { id: 'site', label: 'Site' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'socials', label: 'Social' }
] as const
</script>

<template>
  <div>
    <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="meta text-muted mb-2">CMS / LIGHT</p>
        <h1 class="font-display text-4xl tracking-[-0.04em]">{{ t.admin.desk }}</h1>
      </div>
      <p v-if="status" class="meta text-signal">{{ status }}</p>
    </div>

    <div class="mb-10 flex flex-wrap gap-2 border-b-2 border-ink pb-3">
      <button
        v-for="item in tabs"
        :key="item.id"
        type="button"
        class="border-2 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.12em]"
        :class="tab === item.id ? 'border-ink bg-ink text-paper' : 'border-ink hover:bg-ink hover:text-paper'"
        @click="tab = item.id"
      >
        {{ item.label }}
      </button>
    </div>

    <!-- SITE -->
    <form v-if="tab === 'site'" class="grid gap-5 md:grid-cols-2" @submit.prevent="save('/api/admin/site', site)">
      <div><label class="field-label">Name EN</label><input v-model="site.nameEn"></div>
      <div><label class="field-label">Name FA</label><input v-model="site.nameFa"></div>
      <div><label class="field-label">Role EN</label><input v-model="site.roleEn"></div>
      <div><label class="field-label">Role FA</label><input v-model="site.roleFa"></div>
      <div class="md:col-span-2"><label class="field-label">Intro EN</label><textarea v-model="site.introEn" rows="3" /></div>
      <div class="md:col-span-2"><label class="field-label">Intro FA</label><textarea v-model="site.introFa" rows="3" /></div>
      <div><label class="field-label">Location EN</label><input v-model="site.locationEn"></div>
      <div><label class="field-label">Location FA</label><input v-model="site.locationFa"></div>
      <div><label class="field-label">Email</label><input v-model="site.email"></div>
      <div><label class="field-label">Issue</label><input v-model="site.issue"></div>
      <div><label class="field-label">Availability EN</label><input v-model="site.availabilityEn"></div>
      <div><label class="field-label">Availability FA</label><input v-model="site.availabilityFa"></div>
      <div><label class="field-label">Meta EN</label><input v-model="site.metaEn"></div>
      <div><label class="field-label">Meta FA</label><input v-model="site.metaFa"></div>
      <div>
        <label class="field-label">Portrait URL</label>
        <input v-model="site.portraitUrl">
        <input class="mt-2" type="file" accept="image/*" @change="e => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) upload(f, u => site.portraitUrl = u) }">
      </div>
      <div><label class="field-label">Resume URL</label><input v-model="site.resumeUrl"></div>
      <div class="md:col-span-2">
        <SiteButton variant="primary" type="submit" :magnetic="false">{{ t.admin.save }}</SiteButton>
      </div>
    </form>

    <!-- ABOUT -->
    <form v-else-if="tab === 'about'" class="grid gap-5" @submit.prevent="save('/api/admin/about', about)">
      <div><label class="field-label">Heading EN</label><input v-model="about.headingEn"></div>
      <div><label class="field-label">Heading FA</label><input v-model="about.headingFa"></div>
      <div><label class="field-label">Body EN</label><textarea v-model="about.bodyEn" rows="3" /></div>
      <div><label class="field-label">Body FA</label><textarea v-model="about.bodyFa" rows="3" /></div>
      <div class="flex items-center justify-between">
        <h2 class="font-display text-2xl">Focus</h2>
        <button type="button" class="meta" @click="addFocus">+ {{ t.admin.add }}</button>
      </div>
      <div v-for="(item, i) in about.focusAreas" :key="i" class="grid gap-3 border-2 border-ink p-4 md:grid-cols-2">
        <input v-model="item.titleEn" placeholder="Title EN">
        <input v-model="item.titleFa" placeholder="Title FA">
        <textarea v-model="item.bodyEn" rows="2" placeholder="Body EN" />
        <textarea v-model="item.bodyFa" rows="2" placeholder="Body FA" />
        <button type="button" class="meta text-signal" @click="about.focusAreas.splice(i, 1)">{{ t.admin.remove }}</button>
      </div>
      <SiteButton variant="primary" type="submit" :magnetic="false">{{ t.admin.save }}</SiteButton>
    </form>

    <!-- SKILLS -->
    <form v-else-if="tab === 'skills'" class="grid gap-4" @submit.prevent="save('/api/admin/skills', { skills: skills })">
      <div class="flex justify-end">
        <button type="button" class="meta" @click="addSkill">+ {{ t.admin.add }}</button>
      </div>
      <div v-for="(item, i) in skills" :key="i" class="grid grid-cols-12 gap-3">
        <input v-model="item.name" class="col-span-5" placeholder="Name">
        <input v-model="item.category" class="col-span-5" placeholder="Category">
        <button type="button" class="col-span-2 meta text-signal" @click="skills.splice(i, 1)">{{ t.admin.remove }}</button>
      </div>
      <SiteButton variant="primary" type="submit" :magnetic="false">{{ t.admin.save }}</SiteButton>
    </form>

    <!-- PROJECTS -->
    <form v-else-if="tab === 'projects'" class="grid gap-8" @submit.prevent="save('/api/admin/projects', { projects })">
      <div class="flex justify-end">
        <button type="button" class="meta" @click="addProject">+ {{ t.admin.add }}</button>
      </div>
      <div v-for="(item, i) in projects" :key="i" class="grid gap-3 border-2 border-ink p-5 md:grid-cols-2">
        <input v-model="item.titleEn" placeholder="Title EN">
        <input v-model="item.titleFa" placeholder="Title FA">
        <input v-model="item.slug" placeholder="slug">
        <input v-model="item.year" placeholder="Year">
        <textarea v-model="item.descriptionEn" rows="3" placeholder="Description EN" class="md:col-span-2" />
        <textarea v-model="item.descriptionFa" rows="3" placeholder="Description FA" class="md:col-span-2" />
        <input v-model="item.imageUrl" placeholder="Image URL">
        <input type="file" accept="image/*" @change="e => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) upload(f, u => item.imageUrl = u) }">
        <input v-model="item.demoUrl" placeholder="Demo URL">
        <input v-model="item.githubUrl" placeholder="GitHub URL">
        <select v-model="item.layout">
          <option value="image-start">Image start</option>
          <option value="image-end">Image end</option>
          <option value="overlay">Overlay</option>
          <option value="stacked">Stacked</option>
        </select>
        <input :value="item.techs.join(', ')" placeholder="Techs, comma separated" @change="e => item.techs = (e.target as HTMLInputElement).value.split(',').map(s => s.trim()).filter(Boolean)">
        <label class="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em]">
          <input v-model="item.featured" type="checkbox" class="h-4 w-4 accent-[var(--signal)]">
          Featured
        </label>
        <button type="button" class="meta text-signal" @click="projects.splice(i, 1)">{{ t.admin.remove }}</button>
      </div>
      <SiteButton variant="primary" type="submit" :magnetic="false">{{ t.admin.save }}</SiteButton>
    </form>

    <!-- EXPERIENCE -->
    <form v-else-if="tab === 'experience'" class="grid gap-6" @submit.prevent="save('/api/admin/experience', { experience })">
      <div class="flex justify-end"><button type="button" class="meta" @click="addTimeline(experience)">+ {{ t.admin.add }}</button></div>
      <div v-for="(item, i) in experience" :key="i" class="grid gap-3 border-2 border-ink p-5 md:grid-cols-2">
        <input v-model="item.yearStart" placeholder="Start">
        <input v-model="item.yearEnd" placeholder="End">
        <input v-model="item.titleEn" placeholder="Title EN">
        <input v-model="item.titleFa" placeholder="Title FA">
        <input v-model="item.orgEn" placeholder="Org EN">
        <input v-model="item.orgFa" placeholder="Org FA">
        <input v-model="item.locationEn" placeholder="Location EN">
        <input v-model="item.locationFa" placeholder="Location FA">
        <textarea v-model="item.bodyEn" rows="2" placeholder="Body EN" />
        <textarea v-model="item.bodyFa" rows="2" placeholder="Body FA" />
        <button type="button" class="meta text-signal" @click="experience.splice(i, 1)">{{ t.admin.remove }}</button>
      </div>
      <SiteButton variant="primary" type="submit" :magnetic="false">{{ t.admin.save }}</SiteButton>
    </form>

    <!-- EDUCATION -->
    <form v-else-if="tab === 'education'" class="grid gap-6" @submit.prevent="save('/api/admin/education', { education })">
      <div class="flex justify-end"><button type="button" class="meta" @click="addTimeline(education)">+ {{ t.admin.add }}</button></div>
      <div v-for="(item, i) in education" :key="i" class="grid gap-3 border-2 border-ink p-5 md:grid-cols-2">
        <input v-model="item.yearStart" placeholder="Start">
        <input v-model="item.yearEnd" placeholder="End">
        <input v-model="item.titleEn" placeholder="Title EN">
        <input v-model="item.titleFa" placeholder="Title FA">
        <input v-model="item.orgEn" placeholder="Org EN">
        <input v-model="item.orgFa" placeholder="Org FA">
        <input v-model="item.locationEn" placeholder="Location EN">
        <input v-model="item.locationFa" placeholder="Location FA">
        <textarea v-model="item.bodyEn" rows="2" placeholder="Body EN" />
        <textarea v-model="item.bodyFa" rows="2" placeholder="Body FA" />
        <button type="button" class="meta text-signal" @click="education.splice(i, 1)">{{ t.admin.remove }}</button>
      </div>
      <SiteButton variant="primary" type="submit" :magnetic="false">{{ t.admin.save }}</SiteButton>
    </form>

    <!-- SOCIALS -->
    <form v-else class="grid gap-4" @submit.prevent="save('/api/admin/socials', { socials })">
      <div class="flex justify-end"><button type="button" class="meta" @click="addSocial">+ {{ t.admin.add }}</button></div>
      <div v-for="(item, i) in socials" :key="i" class="grid grid-cols-12 gap-3">
        <input v-model="item.name" class="col-span-3" placeholder="Name">
        <input v-model="item.handle" class="col-span-4" placeholder="Handle">
        <input v-model="item.url" class="col-span-4" placeholder="URL">
        <button type="button" class="col-span-1 meta text-signal" @click="socials.splice(i, 1)">{{ t.admin.remove }}</button>
      </div>
      <SiteButton variant="primary" type="submit" :magnetic="false">{{ t.admin.save }}</SiteButton>
    </form>
  </div>
</template>
