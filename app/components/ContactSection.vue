<script setup lang="ts">
const { t, field } = useLocale()
const { data } = usePortfolio()

const mail = computed(() => data.value?.site.email || 'Sajadzshoki80@gmail.com')
const resumeHref = computed(() => data.value?.site.resumeUrl || '/resume')
const resumeDownload = computed(() => {
  const url = resumeHref.value
  return /\.(pdf|docx?)$/i.test(url) ? (url.split('/').pop() || 'resume') : undefined
})
const title = computed(() => {
  const fromCms = data.value
    ? field(data.value.site.contactTitleEn, data.value.site.contactTitleFa)
    : ''
  return fromCms || t.value.contact.title
})
const body = computed(() => {
  const fromCms = data.value
    ? field(data.value.site.contactBodyEn, data.value.site.contactBodyFa)
    : ''
  return fromCms || t.value.contact.body
})

const copied = ref(false)
async function copyEmail() {
  try {
    await navigator.clipboard.writeText(mail.value)
    copied.value = true
    window.setTimeout(() => { copied.value = false }, 1600)
  } catch {
    window.location.href = `mailto:${mail.value}`
  }
}
</script>

<template>
  <section id="contact" class="relative scroll-mt-24 overflow-hidden py-24 md:py-36">
    <div class="pointer-events-none absolute inset-0 blueprint-dots opacity-40" />
    <div class="site-shell relative">
      <Reveal>
        <p class="meta text-muted mb-6">
          <span class="text-signal">07</span>
          <span class="mx-2">//</span>
          <span>{{ t.contact.kicker }}</span>
        </p>
        <h2 class="font-display text-[clamp(2.8rem,9vw,6.5rem)] leading-[0.9] tracking-[-0.05em]">
          <span class="text-reveal"><span>{{ title }}</span></span>
        </h2>
        <p class="mt-8 max-w-xl text-[1.05rem] leading-relaxed text-muted">
          {{ body }}
        </p>
      </Reveal>

      <Reveal class="mt-12 flex flex-wrap items-center gap-3" :delay="80">
        <SiteButton :href="`mailto:${mail}`" variant="primary" size="lg" magnetic>
          {{ t.contact.cta }}
        </SiteButton>
        <SiteButton size="lg" @click="copyEmail">
          {{ copied ? 'OK' : t.contact.email }}
        </SiteButton>
        <SiteButton :href="resumeHref" size="lg" :download="resumeDownload">
          {{ t.contact.resume }}
        </SiteButton>
      </Reveal>

      <p class="mt-10 font-mono text-sm text-muted">
        <span class="text-signal">mailto:</span>
        {{ mail }}
      </p>
    </div>
  </section>
</template>
