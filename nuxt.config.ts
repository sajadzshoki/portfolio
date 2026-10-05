import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/fonts', '@nuxt/image'],
  fonts: {
    families: [
      { name: 'Plus Jakarta Sans', provider: 'google', weights: [500, 600, 700] },
      { name: 'Vazirmatn', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Inter', provider: 'google', weights: [400, 500, 600] },
      { name: 'JetBrains Mono', provider: 'google', weights: [400, 500] }
    ]
  },
  image: {
    quality: 82,
    format: ['webp', 'jpg'],
    screens: { xs: 400, sm: 640, md: 768, lg: 1024, xl: 1440, xxl: 1920 }
  },
  app: {
    head: {
      title: 'SAJAD SHOKRAEI — Frontend Developer',
        meta: [
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { name: 'description', content: 'Frontend Developer | Vue.js, Nuxt & TypeScript — Tehran, Iran.' },
          { name: 'theme-color', content: '#10110f' },
          { name: 'color-scheme', content: 'light dark' },
          { property: 'og:title', content: 'SAJAD SHOKRAEI — Frontend Developer' },
          { property: 'og:description', content: 'Frontend Developer building modern web applications with Vue, Nuxt and TypeScript.' },
          { property: 'og:type', content: 'website' }
        ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@500;600;700&family=Vazirmatn:wght@400;500;600;700&display=swap'
        }
      ],
      script: [
        {
          innerHTML: `(function(){try{var t=localStorage.getItem('atlas-theme');var dark=t!=='light';document.documentElement.classList.toggle('dark',dark);document.documentElement.style.colorScheme=dark?'dark':'light';var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',dark?'#10110f':'#f3f0e8');var l=localStorage.getItem('atlas-locale')||'en';document.documentElement.lang=l;document.documentElement.dir=l==='fa'?'rtl':'ltr'}catch(e){}})()`,
          tagPriority: 'critical'
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  runtimeConfig: {
    adminEmail: process.env.ADMIN_EMAIL || 'admin@atlas.dev',
    adminPassword: process.env.ADMIN_PASSWORD || 'atlas-admin',
    authSecret: process.env.AUTH_SECRET || 'atlas-dev-secret-change-me'
  },
  nitro: {
    experimental: { wasm: false },
    externals: {
      external: ['@prisma/client', '.prisma/client']
    }
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      host: '0.0.0.0',
      allowedHosts: true
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  }
})
