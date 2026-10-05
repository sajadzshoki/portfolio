import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/fonts', '@nuxt/image'],
  fonts: {
    families: [
      { name: 'Plus Jakarta Sans', provider: 'google', weights: [400, 500, 600, 700, 800] },
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
      title: 'SAZAN — Digital Product Studio',
        meta: [
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { name: 'description', content: 'SAZAN is a digital product studio. We design and engineer websites, applications, and the systems behind them.' },
          { name: 'theme-color', content: '#f4f7fb' },
          { name: 'color-scheme', content: 'light' },
          { property: 'og:title', content: 'SAZAN — Digital Product Studio' },
          { property: 'og:description', content: 'SAZAN designs and engineers websites, applications, and the systems behind them.' },
          { property: 'og:type', content: 'website' }
        ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'
        }
      ],
      script: [
        {
          innerHTML: `(function(){try{var t=localStorage.getItem('atlas-theme');if(t!=='dark'&&document.cookie.indexOf('atlas-theme=dark')!==-1)t='dark';if(t!=='dark')t='light';document.documentElement.classList.toggle('dark',t==='dark');document.documentElement.style.colorScheme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',t==='dark'?'#0e131b':'#f4f7fb');var l=localStorage.getItem('atlas-locale')||'en';document.documentElement.lang=l;document.documentElement.dir=l==='fa'?'rtl':'ltr'}catch(e){}})()`,
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
    port: 7000
  }
})
