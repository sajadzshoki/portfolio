<script setup lang="ts">
const model = defineModel<string>({ required: true })

const props = withDefaults(defineProps<{
  label: string
  accept?: string
  size?: 'logo' | 'wide' | 'phone'
}>(), {
  accept: 'image/*',
  size: 'wide'
})

const { t } = useLocale()
const uploading = ref(false)
const failed = ref(false)
const input = ref<HTMLInputElement | null>(null)

const preview = computed(() => /\.(png|jpe?g|gif|webp|svg|avif)(\?|$)/i.test(model.value))

async function onFile(event: Event) {
  const field = event.target as HTMLInputElement
  const file = field.files?.[0]
  field.value = ''
  if (!file) return
  uploading.value = true
  failed.value = false
  try {
    const form = new FormData()
    form.append('file', file)
    const res = await $fetch<{ url: string }>('/api/admin/upload', { method: 'POST', body: form })
    model.value = res.url
  } catch (error) {
    failed.value = true
    console.error(error)
  } finally {
    uploading.value = false
  }
}
</script>

<template>
  <div class="grid gap-2">
    <span class="field-label">{{ props.label }}</span>
    <div class="flex flex-wrap items-center gap-3">
      <img
        v-if="model && preview"
        class="preview border border-[var(--line)] bg-[var(--surface-2)] object-contain"
        :class="props.size"
        :src="model"
        alt=""
      >
      <a v-else-if="model" class="text-[0.84rem] text-[var(--accent-contrast)] underline" :href="model" target="_blank" rel="noopener">{{ t.admin.openFile }}</a>
      <label class="upload site-btn site-btn-secondary cursor-pointer">
        {{ uploading ? t.admin.uploading : t.admin.upload }}
        <input ref="input" class="sr-only" type="file" :accept="props.accept" :disabled="uploading" @change="onFile">
      </label>
      <button v-if="model" type="button" class="site-btn site-btn-ghost" @click="model = ''">{{ t.admin.remove }}</button>
    </div>
    <input v-model="model" type="text" :placeholder="t.admin.url" autocomplete="off">
    <p v-if="failed" class="m-0 text-[0.84rem] text-[var(--accent-contrast)]">{{ t.admin.uploadFailed }}</p>
  </div>
</template>

<style scoped>
.preview.logo {
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 10px;
}

.preview.wide {
  width: min(100%, 220px);
  height: 7.5rem;
  border-radius: 10px;
}

.preview.phone {
  width: 4.5rem;
  height: 8rem;
  border-radius: 10px;
}

.upload {
  position: relative;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
