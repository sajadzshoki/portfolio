<script setup lang="ts">
const { t, field } = useLocale()
const { data } = usePortfolio()

const site = computed(() => data.value?.site)
const title = computed(() => {
  const custom = site.value ? field(site.value.contactTitleEn, site.value.contactTitleFa) : ''
  return custom || t.value.contact.title
})
const body = computed(() => {
  const custom = site.value ? field(site.value.contactBodyEn, site.value.contactBodyFa) : ''
  return custom || t.value.contact.body
})
const email = computed(() => site.value?.email || '')
</script>

<template>
  <section id="contact" class="band contact">
    <div class="shell-wide">
      <p class="eyebrow">{{ t.contact.eyebrow }}</p>
      <h2 class="display title">{{ title }}</h2>
      <p class="lede">{{ body }}</p>

      <div class="row">
        <a v-if="email" class="mail" :href="`mailto:${email}`">{{ email }}</a>
        <div class="actions">
          <SiteButton v-if="email" :href="`mailto:${email}`" variant="primary" arrow>{{ t.contact.cta }}</SiteButton>
          <SiteButton v-if="site?.resumeUrl" :to="site.resumeUrl" variant="secondary">{{ t.contact.resume }}</SiteButton>
        </div>
      </div>

      <div class="socials">
        <a
          v-for="item in data?.socials || []"
          :key="item.id"
          :href="safeHref(item.url)"
          target="_blank"
          rel="noreferrer"
        >
          <span>{{ item.name }}</span>
          <span>{{ item.handle }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.title {
  margin-top: 0.85rem;
  font-size: clamp(2.6rem, 7vw, 5.4rem);
  max-width: 12ch;
}

.lede {
  margin-top: 1rem;
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.8rem;
}

.mail {
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 2vw, 1.6rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  border-bottom: 1px solid var(--line-strong);
}

.mail:hover {
  border-bottom-color: var(--accent);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.socials {
  display: grid;
  margin-top: 2.2rem;
  border-top: 1px solid var(--line);
}

.socials a {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 0.9rem;
  border-bottom: 1px solid var(--line);
  color: var(--text);
}

.socials a span:last-child {
  color: var(--text-3);
  font-family: var(--font-mono);
  font-size: 0.78rem;
}

.socials a:hover span:first-child {
  color: var(--accent-contrast);
}
</style>
