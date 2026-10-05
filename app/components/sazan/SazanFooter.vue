<script setup lang="ts">
import { safeHref, isExternal } from '~/utils/studio'

const { t, field } = useLocale()
const { data } = usePortfolio()
const year = new Date().getFullYear()

const links = computed(() => [
  { to: '/', label: t.value.nav.home },
  { to: '/work', label: t.value.nav.work },
  { to: '/services', label: t.value.nav.services },
  { to: '/about', label: t.value.nav.about },
  { to: '/contact', label: t.value.nav.contact },
  { to: '/resume', label: t.value.contact.resume }
])
</script>

<template>
  <footer class="sz-footer border-t border-line">
    <div class="sz-wrap grid grid-cols-2 gap-x-5 gap-y-7 py-8 md:grid-cols-12 md:gap-12 md:py-20">
      <div class="col-span-2 md:col-span-5">
        <p class="flex items-center gap-2 font-display text-xl font-semibold tracking-[-0.04em]">
          <span class="text-primary"><SazanMark /></span>
          SAZAN
        </p>
        <p class="mt-4 max-w-sm text-sm leading-relaxed text-muted">
          {{ t.footer.position }}
        </p>
        <a
          v-if="data?.site.email"
          class="mt-5 inline-block text-sm font-medium underline decoration-primary/70 underline-offset-4"
          :href="`mailto:${data.site.email}`"
        >
          {{ data.site.email }}
        </a>
      </div>

      <div class="md:col-span-2">
        <p class="sz-kicker mb-4">{{ t.footer.navigate }}</p>
        <ul class="space-y-2 text-sm">
          <li v-for="link in links" :key="link.to">
            <NuxtLink :to="link.to" class="hover:text-primary">{{ link.label }}</NuxtLink>
          </li>
        </ul>
      </div>

      <div class="md:col-span-3">
        <p class="sz-kicker mb-4">{{ t.footer.services }}</p>
        <ul class="space-y-2 text-sm">
          <li v-for="area in data?.focusAreas || []" :key="area.id">
            <NuxtLink :to="`/services#${area.id}`" class="hover:text-primary">
              {{ field(area.titleEn, area.titleFa) }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="md:col-span-2">
        <p class="sz-kicker mb-4">{{ t.footer.elsewhere }}</p>
        <ul class="space-y-2 text-sm">
          <li v-for="social in data?.socials || []" :key="social.id">
            <a
              :href="safeHref(social.url)"
              class="hover:text-primary"
              :target="isExternal(social.url) ? '_blank' : undefined"
              :rel="isExternal(social.url) ? 'noopener noreferrer' : undefined"
            >
              {{ social.name }}
            </a>
          </li>
        </ul>
        <div class="mt-5">
          <p class="mb-2 text-xs text-subtle">{{ t.footer.lang }}</p>
          <LanguageSwitcher />
        </div>
      </div>
    </div>

    <div class="border-t border-line">
      <div class="sz-wrap flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-subtle">
        <p>© {{ year }} SAZAN — {{ t.footer.rights }}</p>
        <p v-if="data">
          {{ t.footer.by }}
          {{ field(data.site.nameEn, data.site.nameFa) }}
        </p>
      </div>
    </div>
  </footer>
</template>
