<script setup lang="ts">
const props = withDefaults(defineProps<{
  href?: string
  to?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  magnetic?: boolean
  size?: 'md' | 'lg'
  type?: 'button' | 'submit'
  download?: string
  arrow?: boolean
  cursor?: string
}>(), {
  variant: 'secondary',
  magnetic: false,
  size: 'md',
  type: 'button',
  arrow: false
})

const tag = computed(() => props.href ? 'a' : props.to ? resolveComponent('NuxtLink') : 'button')
const external = computed(() => Boolean(props.href && /^https?:/i.test(props.href)))
const classes = computed(() => [
  'site-btn',
  props.variant === 'primary' ? 'site-btn-primary' : props.variant === 'ghost' ? 'site-btn-ghost' : 'site-btn-secondary',
  props.size === 'lg' ? 'min-h-12 px-[1.2rem] text-[1rem]' : ''
])
</script>

<template>
  <component
    :is="tag"
    :href="href"
    :to="to"
    :download="download"
    :type="tag === 'button' ? type : undefined"
    :class="classes"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noreferrer' : undefined"
    :data-cursor="cursor || 'button'"
  >
    <slot />
    <svg v-if="arrow" class="arrow" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </component>
</template>
