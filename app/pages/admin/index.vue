<script setup lang="ts">
import type { FocusArea, PortfolioContent, Project, Skill, Social, TimelineItem } from '~~/shared/types'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const { t } = useLocale()
const tab = ref<'site' | 'about' | 'skills' | 'projects' | 'experience' | 'education' | 'socials'>('site')
const { data, refresh } = await useFetch<PortfolioContent>('/api/content')
const status = ref('')
const failed = ref(false)
const saving = ref(false)
const query = ref('')
const open = ref<Record<string, boolean>>({})
const dragFrom = ref(-1)
const dragOver = ref(-1)

const site = reactive({ ...data.value!.site })
const about = reactive({
  headingEn: data.value!.about.headingEn,
  headingFa: data.value!.about.headingFa,
  bodyEn: data.value!.about.bodyEn,
  bodyFa: data.value!.about.bodyFa,
  focusAreas: data.value!.focusAreas.map(clone)
})
const skills = ref(data.value!.skills.map(clone))
const projects = ref(data.value!.projects.map(item => ({ ...item, techs: [...item.techs], mobileImageUrl: item.mobileImageUrl || '' })))
const experience = ref(data.value!.experience.map(clone))
const education = ref(data.value!.education.map(clone))
const socials = ref(data.value!.socials.map(clone))

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

function nid() {
  return crypto.randomUUID()
}

function flash(message: string, ok = true) {
  failed.value = !ok
  status.value = message
  window.setTimeout(() => {
    status.value = ''
    failed.value = false
  }, 2200)
}

async function save(path: string, body: unknown) {
  saving.value = true
  try {
    await $fetch(path, { method: 'PUT', body })
    await refresh()
    flash(t.value.admin.saved)
  } catch (error) {
    flash(t.value.admin.error, false)
    console.error(error)
  } finally {
    saving.value = false
  }
}

function reorder(list: unknown[], from: number, to: number) {
  const next = Math.max(0, Math.min(list.length - 1, to))
  if (from === next || from < 0 || from >= list.length) return
  const [item] = list.splice(from, 1)
  list.splice(next, 0, item)
}

function setOrder(list: unknown[], index: number, position: number) {
  if (!Number.isFinite(position)) return
  reorder(list, index, position - 1)
}

function visibleIndexes<T>(list: T[], text: (item: T) => string) {
  const q = query.value.trim().toLowerCase()
  const indexes: number[] = []
  list.forEach((item, index) => {
    if (!q || text(item).toLowerCase().includes(q)) indexes.push(index)
  })
  return indexes
}

function isOpen(id: string) {
  return open.value[id] === true
}

function toggle(id: string) {
  open.value = { ...open.value, [id]: !open.value[id] }
}

function reveal(id: string) {
  open.value = { ...open.value, [id]: true }
}

function pointerDown(index: number) {
  dragFrom.value = index
  dragOver.value = index
}

function pointerMove(event: PointerEvent) {
  if (dragFrom.value < 0) return
  const row = (document.elementFromPoint(event.clientX, event.clientY) as HTMLElement | null)?.closest('[data-sort-index]')
  if (!row) return
  const next = Number(row.getAttribute('data-sort-index'))
  if (Number.isFinite(next)) dragOver.value = next
}

function pointerUp(list: unknown[]) {
  if (dragFrom.value >= 0 && dragOver.value >= 0) reorder(list, dragFrom.value, dragOver.value)
  dragFrom.value = -1
  dragOver.value = -1
}

function setTechs(item: Project, value: string) {
  item.techs = value.split(',').map(part => part.trim()).filter(Boolean)
}

function addFocus() {
  const item = { id: nid(), index: about.focusAreas.length, titleEn: '', titleFa: '', bodyEn: '', bodyFa: '' } as FocusArea
  about.focusAreas.push(item)
  reveal(item.id)
}

function addSkill() {
  const item = {
    id: nid(),
    index: skills.value.length,
    name: '',
    category: '',
    logoUrl: '',
    descriptionEn: '',
    descriptionFa: '',
    isActive: true
  } as Skill
  skills.value.push(item)
  reveal(item.id)
}

function addProject() {
  const item = {
    id: nid(),
    index: projects.value.length,
    slug: `project-${projects.value.length + 1}`,
    titleEn: '',
    titleFa: '',
    descriptionEn: '',
    descriptionFa: '',
    year: String(new Date().getFullYear()),
    imageUrl: '',
    mobileImageUrl: '',
    demoUrl: '',
    githubUrl: '',
    layout: 'image-start',
    techs: [],
    featured: true
  } as Project
  projects.value.push(item)
  reveal(item.id)
}

function addTimeline(list: TimelineItem[]) {
  const item: TimelineItem = {
    id: nid(),
    index: list.length,
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
  }
  list.push(item)
  reveal(item.id)
}

function addSocial() {
  const item = { id: nid(), index: socials.value.length, name: '', handle: '', url: '' } as Social
  socials.value.push(item)
  reveal(item.id)
}

const tabs = computed(() => [
  { id: 'site' as const, label: t.value.admin.tabs.site, count: 0 },
  { id: 'about' as const, label: t.value.admin.tabs.about, count: about.focusAreas.length },
  { id: 'skills' as const, label: t.value.admin.tabs.skills, count: skills.value.length },
  { id: 'projects' as const, label: t.value.admin.tabs.projects, count: projects.value.length },
  { id: 'experience' as const, label: t.value.admin.tabs.experience, count: experience.value.length },
  { id: 'education' as const, label: t.value.admin.tabs.education, count: education.value.length },
  { id: 'socials' as const, label: t.value.admin.tabs.socials, count: socials.value.length }
])

const focusIndexes = computed(() => visibleIndexes(about.focusAreas, item => `${item.titleEn} ${item.titleFa}`))
const skillIndexes = computed(() => visibleIndexes(skills.value, item => `${item.name} ${item.category}`))
const projectIndexes = computed(() => visibleIndexes(projects.value, item => `${item.titleEn} ${item.titleFa} ${item.slug} ${item.year} ${item.techs.join(' ')}`))
const experienceIndexes = computed(() => visibleIndexes(experience.value, item => `${item.titleEn} ${item.titleFa} ${item.orgEn} ${item.orgFa} ${item.yearStart}`))
const educationIndexes = computed(() => visibleIndexes(education.value, item => `${item.titleEn} ${item.titleFa} ${item.orgEn} ${item.orgFa} ${item.yearStart}`))
const socialIndexes = computed(() => visibleIndexes(socials.value, item => `${item.name} ${item.handle} ${item.url}`))

watch(tab, () => {
  query.value = ''
  dragFrom.value = -1
  dragOver.value = -1
})
</script>

<template>
  <div class="admin-desk">
    <div class="mb-3 flex items-end justify-between gap-4">
      <h1 class="display text-[1.8rem]">{{ t.admin.desk }}</h1>
    </div>

    <div class="admin-tabs mb-4 flex gap-[0.35rem] overflow-x-auto" role="tablist">
      <button
        v-for="item in tabs"
        :key="item.id"
        type="button"
        class="tab"
        :class="{ on: tab === item.id }"
        @click="tab = item.id"
      >
        {{ item.label }}
        <span v-if="item.count">{{ item.count }}</span>
      </button>
    </div>

    <form v-if="tab === 'site'" class="grid grid-cols-1 gap-3 min-[800px]:grid-cols-2" autocomplete="off" @submit.prevent="save('/api/admin/site', site)">
      <div><label class="field-label">Name EN</label><input v-model="site.nameEn"></div>
      <div><label class="field-label">Name FA</label><input v-model="site.nameFa"></div>
      <div><label class="field-label">Role EN</label><input v-model="site.roleEn"></div>
      <div><label class="field-label">Role FA</label><input v-model="site.roleFa"></div>
      <div class="col-span-full"><label class="field-label">Intro EN</label><textarea v-model="site.introEn" rows="2" /></div>
      <div class="col-span-full"><label class="field-label">Intro FA</label><textarea v-model="site.introFa" rows="2" /></div>
      <div><label class="field-label">Location EN</label><input v-model="site.locationEn"></div>
      <div><label class="field-label">Location FA</label><input v-model="site.locationFa"></div>
      <div><label class="field-label">Email</label><input v-model="site.email" type="email"></div>
      <div><label class="field-label">Availability EN</label><input v-model="site.availabilityEn"></div>
      <div><label class="field-label">Availability FA</label><input v-model="site.availabilityFa"></div>
      <div><label class="field-label">Meta EN</label><input v-model="site.metaEn"></div>
      <div><label class="field-label">Meta FA</label><input v-model="site.metaFa"></div>
      <div class="col-span-full"><label class="field-label">Contact title EN</label><input v-model="site.contactTitleEn"></div>
      <div class="col-span-full"><label class="field-label">Contact title FA</label><input v-model="site.contactTitleFa"></div>
      <div class="col-span-full"><label class="field-label">Contact body EN</label><textarea v-model="site.contactBodyEn" rows="2" /></div>
      <div class="col-span-full"><label class="field-label">Contact body FA</label><textarea v-model="site.contactBodyFa" rows="2" /></div>
      <div class="col-span-full grid gap-3 min-[800px]:grid-cols-2">
        <AdminImageField v-model="site.portraitUrl" label="Portrait" />
        <AdminImageField v-model="site.resumeUrl" label="Resume" accept=".pdf,application/pdf,image/*" />
      </div>
      <AdminSaveBar :status="status" :failed="failed" :saving="saving" />
    </form>

    <form v-else-if="tab === 'about'" class="grid gap-3" autocomplete="off" @submit.prevent="save('/api/admin/about', about)">
      <div><label class="field-label">Heading EN</label><input v-model="about.headingEn"></div>
      <div><label class="field-label">Heading FA</label><input v-model="about.headingFa"></div>
      <div><label class="field-label">Body EN</label><textarea v-model="about.bodyEn" rows="3" /></div>
      <div><label class="field-label">Body FA</label><textarea v-model="about.bodyFa" rows="3" /></div>
      <input v-model="query" type="search" :placeholder="t.admin.search" autocomplete="off">
      <p v-if="query && !focusIndexes.length" class="m-0 text-[0.9rem] text-[var(--text-3)]">{{ t.admin.emptySearch }}</p>
      <AdminItem
        v-for="index in focusIndexes"
        :key="about.focusAreas[index].id"
        :data-sort-index="index"
        :title="about.focusAreas[index].titleEn || about.focusAreas[index].titleFa"
        :index="index"
        :total="about.focusAreas.length"
        :open="isOpen(about.focusAreas[index].id)"
        :dragging="dragFrom === index"
        :over="dragOver === index && dragFrom !== index"
        @toggle="toggle(about.focusAreas[index].id)"
        @remove="about.focusAreas.splice(index, 1)"
        @reorder="setOrder(about.focusAreas, index, $event)"
        @pointerdown="pointerDown(index)"
        @pointermove="pointerMove"
        @pointerup="pointerUp(about.focusAreas)"
      >
        <input v-model="about.focusAreas[index].titleEn" placeholder="Title EN">
        <input v-model="about.focusAreas[index].titleFa" placeholder="Title FA">
        <textarea v-model="about.focusAreas[index].bodyEn" rows="2" placeholder="Body EN" />
        <textarea v-model="about.focusAreas[index].bodyFa" rows="2" placeholder="Body FA" />
      </AdminItem>
      <AdminSaveBar :status="status" :failed="failed" :saving="saving" add @add="addFocus" />
    </form>

    <form v-else-if="tab === 'skills'" class="grid gap-3" autocomplete="off" @submit.prevent="save('/api/admin/skills', { skills })">
      <input v-model="query" type="search" :placeholder="t.admin.search" autocomplete="off">
      <p v-if="query && !skillIndexes.length" class="m-0 text-[0.9rem] text-[var(--text-3)]">{{ t.admin.emptySearch }}</p>
      <AdminItem
        v-for="index in skillIndexes"
        :key="skills[index].id"
        :data-sort-index="index"
        :title="skills[index].name"
        :meta="skills[index].category"
        :index="index"
        :total="skills.length"
        :open="isOpen(skills[index].id)"
        :dragging="dragFrom === index"
        :over="dragOver === index && dragFrom !== index"
        @toggle="toggle(skills[index].id)"
        @remove="skills.splice(index, 1)"
        @reorder="setOrder(skills, index, $event)"
        @pointerdown="pointerDown(index)"
        @pointermove="pointerMove"
        @pointerup="pointerUp(skills)"
      >
        <AdminImageField v-model="skills[index].logoUrl" :label="t.admin.logo" size="logo" accept="image/*,.svg" />
        <div class="grid grid-cols-1 gap-3 min-[800px]:grid-cols-2">
          <input v-model="skills[index].name" placeholder="Name">
          <input v-model="skills[index].category" placeholder="Category">
        </div>
        <textarea v-model="skills[index].descriptionEn" rows="2" placeholder="Description EN" />
        <textarea v-model="skills[index].descriptionFa" rows="2" placeholder="Description FA" />
        <label class="flex items-center gap-2 text-[0.9rem]"><input v-model="skills[index].isActive" type="checkbox"> {{ t.admin.active }}</label>
      </AdminItem>
      <AdminSaveBar :status="status" :failed="failed" :saving="saving" add @add="addSkill" />
    </form>

    <form v-else-if="tab === 'projects'" class="grid gap-3" autocomplete="off" @submit.prevent="save('/api/admin/projects', { projects })">
      <input v-model="query" type="search" :placeholder="t.admin.search" autocomplete="off">
      <p v-if="query && !projectIndexes.length" class="m-0 text-[0.9rem] text-[var(--text-3)]">{{ t.admin.emptySearch }}</p>
      <AdminItem
        v-for="index in projectIndexes"
        :key="projects[index].id"
        :data-sort-index="index"
        :title="projects[index].titleFa || projects[index].titleEn"
        :meta="projects[index].year"
        :index="index"
        :total="projects.length"
        :open="isOpen(projects[index].id)"
        :dragging="dragFrom === index"
        :over="dragOver === index && dragFrom !== index"
        @toggle="toggle(projects[index].id)"
        @remove="projects.splice(index, 1)"
        @reorder="setOrder(projects, index, $event)"
        @pointerdown="pointerDown(index)"
        @pointermove="pointerMove"
        @pointerup="pointerUp(projects)"
      >
        <div class="grid grid-cols-1 gap-3 min-[800px]:grid-cols-2">
          <input v-model="projects[index].titleEn" placeholder="Title EN">
          <input v-model="projects[index].titleFa" placeholder="Title FA">
          <input v-model="projects[index].slug" placeholder="slug">
          <input v-model="projects[index].year" placeholder="Year">
        </div>
        <textarea v-model="projects[index].descriptionEn" rows="2" placeholder="Description EN" />
        <textarea v-model="projects[index].descriptionFa" rows="2" placeholder="Description FA" />
        <div class="grid gap-3 min-[800px]:grid-cols-2">
          <AdminImageField v-model="projects[index].imageUrl" :label="t.admin.desktop" />
          <AdminImageField v-model="projects[index].mobileImageUrl" :label="t.admin.mobile" size="phone" />
        </div>
        <div class="grid grid-cols-1 gap-3 min-[800px]:grid-cols-2">
          <input v-model="projects[index].demoUrl" placeholder="Live URL">
          <input v-model="projects[index].githubUrl" placeholder="GitHub URL">
        </div>
        <input :value="projects[index].techs.join(', ')" placeholder="Technologies, comma separated" @input="setTechs(projects[index], ($event.target as HTMLInputElement).value)">
        <label class="flex items-center gap-2 text-[0.9rem]"><input v-model="projects[index].featured" type="checkbox"> {{ t.projects.featured }}</label>
      </AdminItem>
      <AdminSaveBar :status="status" :failed="failed" :saving="saving" add @add="addProject" />
    </form>

    <form v-else-if="tab === 'experience'" class="grid gap-3" autocomplete="off" @submit.prevent="save('/api/admin/experience', { experience })">
      <input v-model="query" type="search" :placeholder="t.admin.search" autocomplete="off">
      <p v-if="query && !experienceIndexes.length" class="m-0 text-[0.9rem] text-[var(--text-3)]">{{ t.admin.emptySearch }}</p>
      <AdminItem
        v-for="index in experienceIndexes"
        :key="experience[index].id"
        :data-sort-index="index"
        :title="experience[index].titleFa || experience[index].titleEn"
        :meta="experience[index].yearStart"
        :index="index"
        :total="experience.length"
        :open="isOpen(experience[index].id)"
        :dragging="dragFrom === index"
        :over="dragOver === index && dragFrom !== index"
        @toggle="toggle(experience[index].id)"
        @remove="experience.splice(index, 1)"
        @reorder="setOrder(experience, index, $event)"
        @pointerdown="pointerDown(index)"
        @pointermove="pointerMove"
        @pointerup="pointerUp(experience)"
      >
        <div class="grid grid-cols-1 gap-3 min-[800px]:grid-cols-2">
          <input v-model="experience[index].yearStart" placeholder="Start">
          <input v-model="experience[index].yearEnd" placeholder="End">
          <input v-model="experience[index].titleEn" placeholder="Title EN">
          <input v-model="experience[index].titleFa" placeholder="Title FA">
          <input v-model="experience[index].orgEn" placeholder="Org EN">
          <input v-model="experience[index].orgFa" placeholder="Org FA">
          <input v-model="experience[index].locationEn" placeholder="Location EN">
          <input v-model="experience[index].locationFa" placeholder="Location FA">
        </div>
        <textarea v-model="experience[index].bodyEn" rows="2" placeholder="Body EN" />
        <textarea v-model="experience[index].bodyFa" rows="2" placeholder="Body FA" />
      </AdminItem>
      <AdminSaveBar :status="status" :failed="failed" :saving="saving" add @add="addTimeline(experience)" />
    </form>

    <form v-else-if="tab === 'education'" class="grid gap-3" autocomplete="off" @submit.prevent="save('/api/admin/education', { education })">
      <input v-model="query" type="search" :placeholder="t.admin.search" autocomplete="off">
      <p v-if="query && !educationIndexes.length" class="m-0 text-[0.9rem] text-[var(--text-3)]">{{ t.admin.emptySearch }}</p>
      <AdminItem
        v-for="index in educationIndexes"
        :key="education[index].id"
        :data-sort-index="index"
        :title="education[index].titleFa || education[index].titleEn"
        :meta="education[index].yearStart"
        :index="index"
        :total="education.length"
        :open="isOpen(education[index].id)"
        :dragging="dragFrom === index"
        :over="dragOver === index && dragFrom !== index"
        @toggle="toggle(education[index].id)"
        @remove="education.splice(index, 1)"
        @reorder="setOrder(education, index, $event)"
        @pointerdown="pointerDown(index)"
        @pointermove="pointerMove"
        @pointerup="pointerUp(education)"
      >
        <div class="grid grid-cols-1 gap-3 min-[800px]:grid-cols-2">
          <input v-model="education[index].yearStart" placeholder="Start">
          <input v-model="education[index].yearEnd" placeholder="End">
          <input v-model="education[index].titleEn" placeholder="Title EN">
          <input v-model="education[index].titleFa" placeholder="Title FA">
          <input v-model="education[index].orgEn" placeholder="Org EN">
          <input v-model="education[index].orgFa" placeholder="Org FA">
          <input v-model="education[index].locationEn" placeholder="Location EN">
          <input v-model="education[index].locationFa" placeholder="Location FA">
        </div>
        <textarea v-model="education[index].bodyEn" rows="2" placeholder="Body EN" />
        <textarea v-model="education[index].bodyFa" rows="2" placeholder="Body FA" />
      </AdminItem>
      <AdminSaveBar :status="status" :failed="failed" :saving="saving" add @add="addTimeline(education)" />
    </form>

    <form v-else class="grid gap-3" autocomplete="off" @submit.prevent="save('/api/admin/socials', { socials })">
      <input v-model="query" type="search" :placeholder="t.admin.search" autocomplete="off">
      <p v-if="query && !socialIndexes.length" class="m-0 text-[0.9rem] text-[var(--text-3)]">{{ t.admin.emptySearch }}</p>
      <AdminItem
        v-for="index in socialIndexes"
        :key="socials[index].id"
        :data-sort-index="index"
        :title="socials[index].name"
        :meta="socials[index].handle"
        :index="index"
        :total="socials.length"
        :open="isOpen(socials[index].id)"
        :dragging="dragFrom === index"
        :over="dragOver === index && dragFrom !== index"
        @toggle="toggle(socials[index].id)"
        @remove="socials.splice(index, 1)"
        @reorder="setOrder(socials, index, $event)"
        @pointerdown="pointerDown(index)"
        @pointermove="pointerMove"
        @pointerup="pointerUp(socials)"
      >
        <input v-model="socials[index].name" placeholder="Name">
        <input v-model="socials[index].handle" placeholder="Handle">
        <input v-model="socials[index].url" placeholder="URL">
      </AdminItem>
      <AdminSaveBar :status="status" :failed="failed" :saving="saving" add @add="addSocial" />
    </form>
  </div>
</template>

<style scoped>
.admin-tabs {
  position: sticky;
  top: 3.4rem;
  z-index: 30;
  background: var(--bg);
  padding-block: 0.45rem;
}

.tab {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 0.35rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: transparent;
  padding: 0.28rem 0.7rem;
  color: var(--text-2);
  font-size: 0.84rem;
  cursor: pointer;
}

.tab.on {
  border-color: var(--text);
  background: var(--text);
  color: var(--bg);
}

.tab span {
  font-variant-numeric: tabular-nums;
  opacity: 0.7;
}
</style>
