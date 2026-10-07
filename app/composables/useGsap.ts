export async function loadGsap() {
  const gsap = (await import('gsap')).default
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)
  return { gsap, ScrollTrigger }
}

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function hasFinePointer() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}
