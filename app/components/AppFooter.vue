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
  <footer class="site-footer">
    <div class="shell-wide foot">
      <div>
        <p class="name">{{ name }}</p>
        <p class="role">{{ role }}</p>
      </div>

      <nav :aria-label="t.index">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}</NuxtLink>
      </nav>

      <div class="end">
        <div class="socials">
          <a
            v-for="item in data?.socials || []"
            :key="item.id"
            :href="safeHref(item.url)"
            target="_blank"
            rel="noreferrer"
          >
            {{ item.name }}
          </a>
        </div>
        <p class="copy">© {{ year }} {{ name }}. {{ t.footer.rights }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--line);
  padding-block: 2.2rem 2.6rem;
}

.foot {
  display: grid;
  gap: 1.5rem;
}

.name {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 650;
  letter-spacing: -0.04em;
}

.role,
.copy {
  margin-top: 0.3rem;
  color: var(--text-3);
  font-size: 0.92rem;
}

nav,
.socials {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.1rem;
}

nav a,
.socials a {
  color: var(--text-2);
  font-size: 0.92rem;
}

nav a:hover,
.socials a:hover {
  color: var(--text);
}

@media (min-width: 900px) {
  .foot {
    grid-template-columns: 1.1fr 1.4fr 1fr;
    align-items: start;
  }

  .end {
    justify-self: end;
    text-align: end;
  }

  .socials {
    justify-content: flex-end;
  }
}
</style>
