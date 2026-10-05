<script setup lang="ts">
import { isExternal, safeHref } from '~/utils/studio'

const { data } = usePortfolio()
const { t, field } = useLocale()

useSeoMeta({
  title: () => `${t.value.nav.start} — SAZAN`,
  description: () => t.value.contact.lede,
  ogTitle: () => `${t.value.nav.start} — SAZAN`,
  ogDescription: () => t.value.contact.lede
})

const form = reactive({
  name: '',
  email: '',
  type: '',
  message: ''
})
const errors = reactive({ name: '', email: '', message: '' })

const mail = computed(() => data.value?.site.email || '')
const resumeHref = computed(() => data.value?.site.resumeUrl || '/resume')
const resumeDownload = computed(() => {
  const url = resumeHref.value
  return /\.(pdf|docx?)$/i.test(url) ? (url.split('/').pop() || 'resume') : undefined
})

function validate() {
  errors.name = form.name.trim().length < 2 ? t.value.contact.errName : ''
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) ? '' : t.value.contact.errEmail
  errors.message = form.message.trim().length < 12 ? t.value.contact.errMessage : ''
  return !errors.name && !errors.email && !errors.message
}

function submit() {
  if (!validate() || !mail.value) return
  const subject = encodeURIComponent(`SAZAN — ${form.type || form.name}`)
  const body = encodeURIComponent(
    [form.message.trim(), '', form.name.trim(), form.email.trim(), form.type].filter(Boolean).join('\n')
  )
  window.location.href = `mailto:${mail.value}?subject=${subject}&body=${body}`
}
</script>

<template>
  <div class="sz-wrap py-8 md:py-16">
    <div class="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
      <div>
        <SazanSectionLabel :text="t.contact.eyebrow" />
        <h1 class="sz-title mt-4">{{ t.contact.title }}</h1>
        <p class="sz-lede mt-4">{{ t.contact.lede }}</p>
        <div v-if="data" class="mt-8 space-y-2 text-sm">
          <p class="text-subtle">{{ t.contact.direct }}</p>
          <a class="font-medium underline decoration-primary/70 underline-offset-4" :href="`mailto:${data.site.email}`">
            {{ data.site.email }}
          </a>
          <p class="text-muted">{{ field(data.site.locationEn, data.site.locationFa) }}</p>
          <p class="text-muted">{{ field(data.site.availabilityEn, data.site.availabilityFa) }}</p>
        </div>
        <ul class="mt-6 space-y-1 text-sm">
          <li v-for="social in data?.socials || []" :key="social.id">
            <a
              :href="safeHref(social.url)"
              class="hover:text-primary"
              :target="isExternal(social.url) ? '_blank' : undefined"
              rel="noopener noreferrer"
            >
              {{ social.name }}
            </a>
          </li>
        </ul>
        <SiteButton class="mt-8" :href="resumeHref" :download="resumeDownload">
          {{ t.contact.resume }}
        </SiteButton>
      </div>

      <form class="rounded-[var(--sz-radius)] border border-line bg-surface p-4 md:p-7" @submit.prevent="submit">
        <div>
          <label class="sz-label" for="name">{{ t.contact.name }}</label>
          <input id="name" v-model="form.name" name="name" autocomplete="name" :aria-invalid="Boolean(errors.name)">
          <p v-if="errors.name" class="mt-1 text-sm text-primary">{{ errors.name }}</p>
        </div>
        <div class="mt-4">
          <label class="sz-label" for="email">{{ t.contact.email }}</label>
          <input id="email" v-model="form.email" name="email" type="email" autocomplete="email" :aria-invalid="Boolean(errors.email)">
          <p v-if="errors.email" class="mt-1 text-sm text-primary">{{ errors.email }}</p>
        </div>
        <div class="mt-4">
          <label class="sz-label" for="type">{{ t.contact.type }}</label>
          <select id="type" v-model="form.type">
            <option value="">{{ t.contact.typePlaceholder }}</option>
            <option v-for="area in data?.focusAreas || []" :key="area.id" :value="field(area.titleEn, area.titleFa)">
              {{ field(area.titleEn, area.titleFa) }}
            </option>
          </select>
        </div>
        <div class="mt-4">
          <label class="sz-label" for="message">{{ t.contact.message }}</label>
          <textarea id="message" v-model="form.message" name="message" :aria-invalid="Boolean(errors.message)" />
          <p v-if="errors.message" class="mt-1 text-sm text-primary">{{ errors.message }}</p>
        </div>
        <div class="mt-6 flex flex-wrap items-center gap-4">
          <SiteButton variant="primary" type="submit">
            {{ t.contact.send }}
            <SazanArrow />
          </SiteButton>
          <p class="text-xs text-subtle">{{ t.contact.hint }}</p>
        </div>
      </form>
    </div>
  </div>
</template>
