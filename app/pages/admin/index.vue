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
const projects = ref(data.value!.projects.map(item => ({ ...item, techs: [...item.techs], mobileImageUrl: item.mobileImageUrl || '' })))
const experience = ref(data.value!.experience.map(clone))
const education = ref(data.value!.education.map(clone))
const socials = ref(data.value!.socials.map(clone))

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

function flash(message = t.value.admin.saved) {
  status.value = message
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
  } catch (error) {
    flash('Error')
    console.error(error)
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

function onFile(event: Event, apply: (url: string) => void) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) upload(file, apply)
}

function move<T>(list: Ref<T[]>, index: number, direction: -1 | 1) {
  const next = index + direction
  if (next < 0 || next >= list.value.length) return
  const copy = list.value.slice()
  const [item] = copy.splice(index, 1)
  copy.splice(next, 0, item!)
  list.value = copy
}

function addSkill() {
  skills.value.push({
    id: '',
    index: skills.value.length,
    name: '',
    category: '',
    logoUrl: '',
    descriptionEn: '',
    descriptionFa: '',
    isActive: true
  } as Skill)
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
    year: String(new Date().getFullYear()),
    imageUrl: '',
    mobileImageUrl: '',
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

const tabs = computed(() => [
  { id: 'site' as const, label: t.value.admin.tabs.site },
  { id: 'about' as const, label: t.value.admin.tabs.about },
  { id: 'skills' as const, label: t.value.admin.tabs.skills },
  { id: 'projects' as const, label: t.value.admin.tabs.projects },
  { id: 'experience' as const, label: t.value.admin.tabs.experience },
  { id: 'education' as const, label: t.value.admin.tabs.education },
  { id: 'socials' as const, label: t.value.admin.tabs.socials }
])
</script>

<template>
  <div>
    <div class="head">
      <h1 class="display">{{ t.admin.desk }}</h1>
      <p v-if="status">{{ status }}</p>
    </div>

    <div class="tabs" role="tablist">
      <button
        v-for="item in tabs"
        :key="item.id"
        type="button"
        :class="{ on: tab === item.id }"
        @click="tab = item.id"
      >
        {{ item.label }}
      </button>
    </div>

    <form v-if="tab === 'site'" class="grid" @submit.prevent="save('/api/admin/site', site)">
      <div><label class="field-label">Name EN</label><input v-model="site.nameEn"></div>
      <div><label class="field-label">Name FA</label><input v-model="site.nameFa"></div>
      <div><label class="field-label">Role EN</label><input v-model="site.roleEn"></div>
      <div><label class="field-label">Role FA</label><input v-model="site.roleFa"></div>
      <div class="wide"><label class="field-label">Intro EN</label><textarea v-model="site.introEn" rows="3" /></div>
      <div class="wide"><label class="field-label">Intro FA</label><textarea v-model="site.introFa" rows="3" /></div>
      <div><label class="field-label">Location EN</label><input v-model="site.locationEn"></div>
      <div><label class="field-label">Location FA</label><input v-model="site.locationFa"></div>
      <div><label class="field-label">Email</label><input v-model="site.email"></div>
      <div><label class="field-label">Resume URL</label><input v-model="site.resumeUrl"></div>
      <div><label class="field-label">Availability EN</label><input v-model="site.availabilityEn"></div>
      <div><label class="field-label">Availability FA</label><input v-model="site.availabilityFa"></div>
      <div><label class="field-label">Meta EN</label><input v-model="site.metaEn"></div>
      <div><label class="field-label">Meta FA</label><input v-model="site.metaFa"></div>
      <div class="wide"><label class="field-label">Contact title EN</label><input v-model="site.contactTitleEn"></div>
      <div class="wide"><label class="field-label">Contact title FA</label><input v-model="site.contactTitleFa"></div>
      <div class="wide"><label class="field-label">Contact body EN</label><textarea v-model="site.contactBodyEn" rows="3" /></div>
      <div class="wide"><label class="field-label">Contact body FA</label><textarea v-model="site.contactBodyFa" rows="3" /></div>
      <div class="wide">
        <label class="field-label">Portrait</label>
        <input v-model="site.portraitUrl">
        <img v-if="site.portraitUrl" class="preview" :src="site.portraitUrl" alt="">
        <input type="file" accept="image/*" @change="onFile($event, url => site.portraitUrl = url)">
      </div>
      <button class="site-btn site-btn-primary" type="submit" :disabled="saving">{{ t.admin.save }}</button>
    </form>

    <form v-else-if="tab === 'about'" class="stack" @submit.prevent="save('/api/admin/about', about)">
      <div><label class="field-label">Heading EN</label><input v-model="about.headingEn"></div>
      <div><label class="field-label">Heading FA</label><input v-model="about.headingFa"></div>
      <div><label class="field-label">Body EN</label><textarea v-model="about.bodyEn" rows="4" /></div>
      <div><label class="field-label">Body FA</label><textarea v-model="about.bodyFa" rows="4" /></div>
      <div class="row">
        <h2>Focus</h2>
        <button type="button" class="site-btn site-btn-secondary" @click="addFocus">{{ t.admin.add }}</button>
      </div>
      <div v-for="(item, index) in about.focusAreas" :key="index" class="admin-card">
        <input v-model="item.titleEn" placeholder="Title EN">
        <input v-model="item.titleFa" placeholder="Title FA">
        <textarea v-model="item.bodyEn" rows="2" placeholder="Body EN" />
        <textarea v-model="item.bodyFa" rows="2" placeholder="Body FA" />
        <button type="button" class="site-btn site-btn-ghost" @click="about.focusAreas.splice(index, 1)">{{ t.admin.remove }}</button>
      </div>
      <button class="site-btn site-btn-primary" type="submit" :disabled="saving">{{ t.admin.save }}</button>
    </form>

    <form v-else-if="tab === 'skills'" class="stack" @submit.prevent="save('/api/admin/skills', { skills })">
      <div class="row">
        <p class="hint">Order is the list order. Logos are shown on the site.</p>
        <button type="button" class="site-btn site-btn-secondary" @click="addSkill">{{ t.admin.add }}</button>
      </div>
      <div v-for="(item, index) in skills" :key="item.id || index" class="admin-card">
        <div class="logo-row">
          <img v-if="item.logoUrl" :src="item.logoUrl" alt="">
          <span v-else class="ph">{{ t.admin.logo }}</span>
          <div>
            <label class="field-label">{{ t.admin.logo }}</label>
            <input v-model="item.logoUrl">
            <input type="file" accept="image/*,.svg" @change="onFile($event, url => item.logoUrl = url)">
            <button v-if="item.logoUrl" type="button" class="site-btn site-btn-ghost" @click="item.logoUrl = ''">{{ t.admin.clearLogo }}</button>
          </div>
        </div>
        <div class="split">
          <input v-model="item.name" placeholder="Name">
          <input v-model="item.category" placeholder="Category">
        </div>
        <textarea v-model="item.descriptionEn" rows="2" placeholder="Description EN" />
        <textarea v-model="item.descriptionFa" rows="2" placeholder="Description FA" />
        <label class="check"><input v-model="item.isActive" type="checkbox"> {{ t.admin.active }}</label>
        <div class="row">
          <button type="button" class="site-btn site-btn-secondary" @click="move(skills, index, -1)">{{ t.admin.up }}</button>
          <button type="button" class="site-btn site-btn-secondary" @click="move(skills, index, 1)">{{ t.admin.down }}</button>
          <button type="button" class="site-btn site-btn-ghost" @click="skills.splice(index, 1)">{{ t.admin.remove }}</button>
        </div>
      </div>
      <button class="site-btn site-btn-primary" type="submit" :disabled="saving">{{ t.admin.save }}</button>
    </form>

    <form v-else-if="tab === 'projects'" class="stack" @submit.prevent="save('/api/admin/projects', { projects })">
      <div class="row">
        <span />
        <button type="button" class="site-btn site-btn-secondary" @click="addProject">{{ t.admin.add }}</button>
      </div>
      <div v-for="(item, index) in projects" :key="item.id || index" class="admin-card">
        <div class="split">
          <input v-model="item.titleEn" placeholder="Title EN">
          <input v-model="item.titleFa" placeholder="Title FA">
          <input v-model="item.slug" placeholder="slug">
          <input v-model="item.year" placeholder="Year">
        </div>
        <textarea v-model="item.descriptionEn" rows="3" placeholder="Description EN" />
        <textarea v-model="item.descriptionFa" rows="3" placeholder="Description FA" />
        <div>
          <label class="field-label">{{ t.admin.desktop }}</label>
          <input v-model="item.imageUrl">
          <img v-if="item.imageUrl" class="shot" :src="item.imageUrl" alt="">
          <input type="file" accept="image/*" @change="onFile($event, url => item.imageUrl = url)">
        </div>
        <div>
          <label class="field-label">{{ t.admin.mobile }}</label>
          <input v-model="item.mobileImageUrl">
          <img v-if="item.mobileImageUrl" class="shot phone" :src="item.mobileImageUrl" alt="">
          <input type="file" accept="image/*" @change="onFile($event, url => item.mobileImageUrl = url)">
          <button v-if="item.mobileImageUrl" type="button" class="site-btn site-btn-ghost" @click="item.mobileImageUrl = ''">{{ t.admin.remove }}</button>
        </div>
        <div class="split">
          <input v-model="item.demoUrl" placeholder="Live URL">
          <input v-model="item.githubUrl" placeholder="GitHub URL">
        </div>
        <input :value="item.techs.join(', ')" placeholder="Technologies, comma separated" @change="event => item.techs = (event.target as HTMLInputElement).value.split(',').map(part => part.trim()).filter(Boolean)">
        <label class="check"><input v-model="item.featured" type="checkbox"> {{ t.projects.featured }}</label>
        <div class="row">
          <button type="button" class="site-btn site-btn-secondary" @click="move(projects, index, -1)">{{ t.admin.up }}</button>
          <button type="button" class="site-btn site-btn-secondary" @click="move(projects, index, 1)">{{ t.admin.down }}</button>
          <button type="button" class="site-btn site-btn-ghost" @click="projects.splice(index, 1)">{{ t.admin.remove }}</button>
        </div>
      </div>
      <button class="site-btn site-btn-primary" type="submit" :disabled="saving">{{ t.admin.save }}</button>
    </form>

    <form v-else-if="tab === 'experience'" class="stack" @submit.prevent="save('/api/admin/experience', { experience })">
      <div class="row"><span /><button type="button" class="site-btn site-btn-secondary" @click="addTimeline(experience)">{{ t.admin.add }}</button></div>
      <div v-for="(item, index) in experience" :key="index" class="admin-card">
        <div class="split">
          <input v-model="item.yearStart" placeholder="Start">
          <input v-model="item.yearEnd" placeholder="End">
          <input v-model="item.titleEn" placeholder="Title EN">
          <input v-model="item.titleFa" placeholder="Title FA">
          <input v-model="item.orgEn" placeholder="Org EN">
          <input v-model="item.orgFa" placeholder="Org FA">
          <input v-model="item.locationEn" placeholder="Location EN">
          <input v-model="item.locationFa" placeholder="Location FA">
        </div>
        <textarea v-model="item.bodyEn" rows="3" placeholder="Body EN" />
        <textarea v-model="item.bodyFa" rows="3" placeholder="Body FA" />
        <button type="button" class="site-btn site-btn-ghost" @click="experience.splice(index, 1)">{{ t.admin.remove }}</button>
      </div>
      <button class="site-btn site-btn-primary" type="submit" :disabled="saving">{{ t.admin.save }}</button>
    </form>

    <form v-else-if="tab === 'education'" class="stack" @submit.prevent="save('/api/admin/education', { education })">
      <div class="row"><span /><button type="button" class="site-btn site-btn-secondary" @click="addTimeline(education)">{{ t.admin.add }}</button></div>
      <div v-for="(item, index) in education" :key="index" class="admin-card">
        <div class="split">
          <input v-model="item.yearStart" placeholder="Start">
          <input v-model="item.yearEnd" placeholder="End">
          <input v-model="item.titleEn" placeholder="Title EN">
          <input v-model="item.titleFa" placeholder="Title FA">
          <input v-model="item.orgEn" placeholder="Org EN">
          <input v-model="item.orgFa" placeholder="Org FA">
          <input v-model="item.locationEn" placeholder="Location EN">
          <input v-model="item.locationFa" placeholder="Location FA">
        </div>
        <textarea v-model="item.bodyEn" rows="2" placeholder="Body EN" />
        <textarea v-model="item.bodyFa" rows="2" placeholder="Body FA" />
        <button type="button" class="site-btn site-btn-ghost" @click="education.splice(index, 1)">{{ t.admin.remove }}</button>
      </div>
      <button class="site-btn site-btn-primary" type="submit" :disabled="saving">{{ t.admin.save }}</button>
    </form>

    <form v-else class="stack" @submit.prevent="save('/api/admin/socials', { socials })">
      <div class="row"><span /><button type="button" class="site-btn site-btn-secondary" @click="addSocial">{{ t.admin.add }}</button></div>
      <div v-for="(item, index) in socials" :key="index" class="admin-card">
        <input v-model="item.name" placeholder="Name">
        <input v-model="item.handle" placeholder="Handle">
        <input v-model="item.url" placeholder="URL">
        <button type="button" class="site-btn site-btn-ghost" @click="socials.splice(index, 1)">{{ t.admin.remove }}</button>
      </div>
      <button class="site-btn site-btn-primary" type="submit" :disabled="saving">{{ t.admin.save }}</button>
    </form>
  </div>
</template>

<style scoped>
.head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.4rem;
}

.display {
  font-size: 2.4rem;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.5rem;
}

.tabs button {
  padding: 0.45rem 0.7rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: transparent;
  color: var(--text-2);
  cursor: pointer;
}

.tabs button.on {
  background: var(--text);
  color: var(--bg);
  border-color: var(--text);
}

.grid,
.stack,
.admin-card,
.split {
  display: grid;
  gap: 0.85rem;
}

.stack {
  gap: 1rem;
}

.grid {
  grid-template-columns: 1fr;
}

.wide {
  grid-column: 1 / -1;
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
}

.hint {
  color: var(--text-3);
  font-size: 0.9rem;
}

.logo-row {
  display: grid;
  grid-template-columns: 4.5rem minmax(0, 1fr);
  gap: 0.9rem;
  align-items: start;
}

.logo-row img,
.ph {
  width: 4.5rem;
  height: 4.5rem;
  object-fit: contain;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surface-2);
}

.ph {
  display: grid;
  place-items: center;
  color: var(--text-3);
  font-size: 0.72rem;
}

.preview,
.shot {
  width: min(100%, 280px);
  margin-top: 0.6rem;
  border-radius: 10px;
  border: 1px solid var(--line);
}

.shot.phone {
  width: 140px;
}

.check {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.92rem;
}

h2 {
  font-size: 1.3rem;
}

@media (min-width: 800px) {
  .grid,
  .split {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
