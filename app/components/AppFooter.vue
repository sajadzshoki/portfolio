<script setup lang="ts">
const { t, field } = useLocale()
const { data } = usePortfolio()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t-2 border-ink">
    <div class="site-shell flex flex-col gap-6 py-8 md:flex-row md:items-end md:justify-between">
      <div>
        <p class="font-display text-xl tracking-[-0.03em]">
          {{ data ? field(data.site.nameEn, data.site.nameFa) : '' }}
          <span class="text-signal">.</span>
        </p>
        <p class="mt-2 text-sm text-muted">
          © {{ year }} — {{ t.footer.rights }}
        </p>
      </div>
      <p class="meta text-muted">
        {{ t.footer.designed }}
        {{ data ? field(data.site.nameEn, data.site.nameFa) : '' }}
        <span class="mx-2">·</span>
        <span class="hidden sm:inline">⌘K {{ t.footer.cmd }}</span>
      </p>
    </div>
  </footer>
</template>
