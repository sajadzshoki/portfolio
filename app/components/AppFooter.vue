<script setup lang="ts">
const { t, field } = useLocale()
const { data } = usePortfolio()

const year = new Date().getFullYear()
const name = computed(() => data.value ? presentName(field(data.value.site.nameEn, data.value.site.nameFa)) : '')
const role = computed(() => data.value ? splitRole(field(data.value.site.roleEn, data.value.site.roleFa)).lead : '')

const links = computed(() => [
  { to: '/projects', label: t.value.nav.projects },
  { to: '/about', label: t.value.nav.about },
  { to: '/skills', label: t.value.nav.skills },
  { to: '/experience', label: t.value.nav.experience },
  { to: '/contact', label: t.value.nav.contact }
])
</script>

<template>
  <footer class="site-footer border-t border-[var(--line)] pt-[2.2rem] pb-[2.6rem]">
    <div class="shell-wide grid gap-6 min-[900px]:grid-cols-[1.1fr_1.4fr_1fr] min-[900px]:items-start">
      <div>
        <p class="text-[1.25rem] font-[650] tracking-[-0.04em] [font-family:var(--font-display)]">{{ name }}</p>
        <p class="mt-[0.3rem] text-[0.92rem] text-[var(--text-3)]">{{ role }}</p>
      </div>

      <nav class="flex flex-wrap gap-x-[1.1rem] gap-y-3" :aria-label="t.index">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="text-[0.92rem] text-[var(--text-2)] hover:text-[var(--text)]">{{ link.label }}</NuxtLink>
      </nav>

      <div class="min-[900px]:justify-self-end min-[900px]:text-end">
        <div class="flex flex-wrap gap-x-[1.1rem] gap-y-3 min-[900px]:justify-end">
          <a
            v-for="item in data?.socials || []"
            :key="item.id"
            :href="safeHref(item.url)"
            class="text-[0.92rem] text-[var(--text-2)] hover:text-[var(--text)]"
            target="_blank"
            rel="noreferrer"
          >
            {{ item.name }}
          </a>
        </div>
        <p class="mt-[0.3rem] text-[0.92rem] text-[var(--text-3)]">© {{ year }} {{ name }}. {{ t.footer.rights }}</p>
      </div>
    </div>
  </footer>
</template>
