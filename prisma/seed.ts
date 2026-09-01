import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@atlas.dev'
  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'atlas-admin', 10)

  await prisma.session.deleteMany()
  await prisma.admin.deleteMany()
  await prisma.focusArea.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.project.deleteMany()
  await prisma.experience.deleteMany()
  await prisma.education.deleteMany()
  await prisma.social.deleteMany()
  await prisma.about.deleteMany()
  await prisma.site.deleteMany()

  await prisma.admin.create({
    data: { email, password }
  })

  await prisma.site.create({
    data: {
      nameEn: 'SAJAD SHOKRAEI',
      nameFa: 'سجاد شکرایی',
      roleEn: 'Frontend Developer | Vue.js, Nuxt & TypeScript',
      roleFa: 'توسعه‌دهنده فرانت‌اند | Vue.js, Nuxt و TypeScript',
      introEn: 'Frontend Developer with nearly 2 years of professional experience building modern web applications with Vue.js, Nuxt and TypeScript.',
      introFa: 'توسعه‌دهنده فرانت‌اند با نزدیک به ۲ سال تجربه حرفه‌ای در ساخت برنامه‌های وب مدرن با Vue.js، Nuxt و TypeScript.',
      locationEn: 'Tehran, Iran',
      locationFa: 'تهران، ایران',
      email: 'Sajadzshoki80@gmail.com',
      portraitUrl: '/images/portrait.jpg',
      resumeUrl: '/resume',
      availabilityEn: 'Available',
      availabilityFa: 'در دسترس',
      metaEn: 'Vue · Nuxt · TypeScript · Prisma',
      metaFa: 'Vue · Nuxt · TypeScript · Prisma',
      issue: 'Nº 01',
      contactTitleEn: "Let's collaborate.",
      contactTitleFa: 'همکاری کنیم.',
      contactBodyEn: 'Email me to discuss opportunities, freelance work, or collaborations.',
      contactBodyFa: 'برای فرصت‌ها، پروژه‌های فریلنس یا همکاری‌ها ایمیل بفرستید.'
    }
  })

  await prisma.about.create({
    data: {
      headingEn: 'Frontend Developer focused on scalable, maintainable interfaces',
      headingFa: 'توسعه‌دهنده فرانت‌اند، متمرکز بر رابط‌های مقیاس‌پذیر و قابل نگهداری',
      bodyEn: 'Experienced in frontend architecture, reusable component design, responsive UI development, API integration, and database modeling. I take projects from planning to production while maintaining code quality and performance.',
      bodyFa: 'تجربه در معماری فرانت‌اند، طراحی کامپوننت‌های قابل استفاده مجدد، توسعه رابط پاسخگو، یکپارچه‌سازی API و مدل‌سازی دیتابیس. پروژه‌ها را از برنامه‌ریزی تا تولید هدایت می‌کنم.'
    }
  })

  await prisma.focusArea.createMany({
    data: [
      { index: 0, titleEn: 'Web Applications', titleFa: 'برنامه‌های وب', bodyEn: 'Dense, durable product surfaces with a typesetter’s restraint.', bodyFa: 'سطوح محصول فشرده و ماندگار، با خویشتن‌داری یک حروف‌چین.' },
      { index: 1, titleEn: 'SaaS Products', titleFa: 'محصولات SaaS', bodyEn: 'Multi-state systems that stay legible as they grow.', bodyFa: 'سیستم‌های چندحالته که با رشد، خوانا می‌مانند.' },
      { index: 2, titleEn: 'Mobile-first Interfaces', titleFa: 'رابط‌های موبایل‌محور', bodyEn: 'Thumbs, constraints, and the luxury of one clear action.', bodyFa: 'انگشت شست، محدودیت، و تجمل یک عمل روشن.' },
      { index: 3, titleEn: 'Real-time Applications', titleFa: 'برنامه‌های بلادرنگ', bodyEn: 'Live data without visual noise. Signal over spectacle.', bodyFa: 'داده زنده بدون شلوغی بصری. سیگنال به‌جای نمایش.' },
      { index: 4, titleEn: 'UI Engineering', titleFa: 'مهندسی رابط', bodyEn: 'Design systems as infrastructure — tokens, rhythm, code.', bodyFa: 'سیستم طراحی به‌مثابه زیرساخت — توکن، ریتم، کد.' }
    ]
  })

  await prisma.skill.createMany({
    data: [
      { index: 0, name: 'Nuxt', category: 'Framework' },
      { index: 1, name: 'Vue', category: 'UI' },
      { index: 2, name: 'TypeScript', category: 'Language' },
      { index: 3, name: 'JavaScript', category: 'Language' },
      { index: 4, name: 'HTML5', category: 'Markup' },
      { index: 5, name: 'CSS3', category: 'Styling' },
      { index: 6, name: 'UnoCSS', category: 'Styling' },
      { index: 7, name: 'Tailwind CSS', category: 'Styling' },
      { index: 8, name: 'Prisma', category: 'Data' },
      { index: 9, name: 'REST APIs', category: 'Data' },
      { index: 10, name: 'WebSockets', category: 'Realtime' },
      { index: 11, name: 'Redis', category: 'Data' },
      { index: 12, name: 'JWT', category: 'Auth' },
      { index: 13, name: 'OTP', category: 'Auth' },
      { index: 14, name: 'Capacitor', category: 'Mobile' },
      { index: 15, name: 'Docker', category: 'DevOps' },
      { index: 16, name: 'React', category: 'UI' },
      { index: 17, name: 'AdonisJS', category: 'Backend' }
    ]
  })

  await prisma.project.createMany({
    data: [
      {
        index: 0,
        slug: 'dayan',
        titleEn: 'Dayan',
        titleFa: 'Dayan',
        descriptionEn: 'Financial management platform built with Nuxt, Vue and Prisma. Reusable components, responsive RTL interfaces, and structured financial entities.',
        descriptionFa: 'پلتفرم مدیریت مالی ساخته‌شده با Nuxt، Vue و Prisma. کامپوننت‌های قابل استفاده مجدد، رابط‌های پاسخگو و ساختار داده مالی.',
        year: '2024',
        imageUrl: '/images/projects/dayan.jpg',
        demoUrl: null,
        githubUrl: null,
        layout: 'image-start',
        featured: true,
        techs: JSON.stringify(['Nuxt', 'Vue', 'TypeScript', 'Prisma', 'UnoCSS'])
      }
    ]
  })

  await prisma.experience.createMany({
    data: [
      {
        index: 0,
        yearStart: '2024-11',
        yearEnd: 'Present',
        titleEn: 'Frontend Developer',
        titleFa: 'توسعه‌دهنده فرانت‌اند',
        orgEn: 'VistaApp',
        orgFa: 'VistaApp',
        locationEn: 'Tehran, Iran',
        locationFa: 'تهران، ایران',
        bodyEn: 'Developed and contributed to ~20 production web applications using Vue.js, Nuxt and TypeScript. Designed scalable frontend architectures, responsive RTL interfaces, and implemented authentication flows and real-time features.',
        bodyFa: 'توسعه و مشارکت در حدود ۲۰ برنامه وب تولیدی با Vue.js، Nuxt و TypeScript. طراحی معماری مقیاس‌پذیر فرانت‌اند، رابط‌های RTL پاسخگو و اجرای جریان‌های احراز هویت و ویژگی‌های بلادرنگ.'
      }
    ]
  })

  await prisma.education.createMany({
    data: [
      {
        index: 0,
        yearStart: '2020',
        yearEnd: '2026',
        titleEn: "Bachelor of Computer Engineering",
        titleFa: 'کارشناسی مهندسی کامپیوتر',
        orgEn: 'Islamic Azad University, Tehran South Branch',
        orgFa: 'دانشگاه آزاد اسلامی واحد تهران جنوب',
        locationEn: 'Tehran, Iran',
        locationFa: 'تهران، ایران',
        bodyEn: '',
        bodyFa: ''
      }
    ]
  })

  await prisma.social.createMany({
    data: [
      { index: 0, name: 'GitHub', handle: 'sajadshoki', url: 'https://github.com/sajadshoki' },
      { index: 1, name: 'LinkedIn', handle: 'sajadshokraei', url: 'https://linkedin.com/in/sajadshokraei' },
      { index: 2, name: 'Email', handle: 'Sajadzshoki80@gmail.com', url: 'mailto:Sajadzshoki80@gmail.com' }
    ]
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
