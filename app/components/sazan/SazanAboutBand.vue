<script setup lang="ts">
const { t, field } = useLocale()
const { data } = usePortfolio()
const role = computed(() => data.value?.experience[0])
</script>

<template>
  <section id="about" class="py-10 md:py-28">
    <div class="sz-wrap grid gap-5 lg:grid-cols-12 lg:gap-10">
      <Reveal class="lg:col-span-5">
        <SazanSectionLabel :text="t.about.eyebrow" />
        <h2 class="sz-title mt-4">
          {{ data ? field(data.about.headingEn, data.about.headingFa) : '' }}
        </h2>
      </Reveal>
      <Reveal class="lg:col-span-7" :delay="60">
        <p class="text-base leading-relaxed text-muted md:text-lg">
          {{ data ? field(data.about.bodyEn, data.about.bodyFa) : '' }}
        </p>
        <dl v-if="role" class="mt-5 grid gap-3 border-t border-line pt-4 sm:grid-cols-3 md:mt-8 md:gap-4 md:pt-6">
          <div>
            <dt class="text-xs text-subtle">{{ field(role.titleEn, role.titleFa) }}</dt>
            <dd class="mt-1 text-sm font-medium">{{ field(role.orgEn, role.orgFa) }}</dd>
          </div>
          <div>
            <dt class="text-xs text-subtle">{{ t.location }}</dt>
            <dd class="mt-1 text-sm font-medium">{{ data ? field(data.site.locationEn, data.site.locationFa) : '' }}</dd>
          </div>
          <div>
            <dt class="text-xs text-subtle">{{ t.available }}</dt>
            <dd class="mt-1 text-sm font-medium">{{ data ? field(data.site.availabilityEn, data.site.availabilityFa) : '' }}</dd>
          </div>
        </dl>
        <NuxtLink to="/about" class="mt-5 inline-flex items-center gap-2 text-sm font-semibold md:mt-8">
          {{ t.about.more }}
          <SazanArrow />
        </NuxtLink>
      </Reveal>
    </div>
  </section>
</template>
