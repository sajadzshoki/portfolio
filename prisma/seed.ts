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
      nameEn: 'Kian Rahimi',
      nameFa: 'کیان رحیمی',
      roleEn: 'Frontend Developer',
      roleFa: 'توسعه‌دهنده فرانت‌اند',
      introEn: 'I build interfaces with the discipline of a typesetter and the nerve of a material. Grid, type, motion, code — nothing extra.',
      introFa: 'رابط می‌سازم با انضباط یک حروف‌چین و جسارت یک ماده. گرید، حروف، حرکت، کد — هیچ چیز اضافه.',
      locationEn: 'Amsterdam',
      locationFa: 'آمستردام',
      email: 'hello@kianrahimi.dev',
      portraitUrl: '/images/portrait.jpg',
      resumeUrl: '/resume',
      availabilityEn: 'Q3–Q4 2026',
      availabilityFa: 'سه‌ماهه ۳ و ۴ ۲۰۲۶',
      metaEn: 'NUXT · VUE · TS',
      metaFa: 'NUXT · VUE · TS',
      issue: 'Nº 04',
      contactTitleEn: "Let's build something.",
      contactTitleFa: 'چیزی بسازیم.',
      contactBodyEn: 'Have a product, a publication, or a problem that needs a precise interface. Write. I read everything.',
      contactBodyFa: 'محصول، نشریه، یا مسئله‌ای دارید که به یک رابط دقیق نیاز دارد. بنویسید. همه‌چیز را می‌خوانم.'
    }
  })

  await prisma.about.create({
    data: {
      headingEn: 'Editorial software. Brutal honesty.',
      headingFa: 'نرم‌افزار سرمقاله‌ای. صداقت بی‌تعارف.',
      bodyEn: 'I work where product, publication and interface meet. Long-form systems. Tight components. Motion that explains hierarchy instead of decorating it.',
      bodyFa: 'جایی کار می‌کنم که محصول، نشر و رابط به هم می‌رسند. سیستم‌های بلندمدت. قطعات دقیق. حرکتی که سلسله‌مراتب را توضیح می‌دهد، نه تزئین.'
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
      { index: 1, name: 'Vue', category: 'UI Runtime' },
      { index: 2, name: 'Nuxt UI', category: 'System' },
      { index: 3, name: 'Tailwind CSS', category: 'Styling' },
      { index: 4, name: 'TypeScript', category: 'Language' },
      { index: 5, name: 'JavaScript', category: 'Language' },
      { index: 6, name: 'Prisma', category: 'Data' },
      { index: 7, name: 'MongoDB', category: 'Data' },
      { index: 8, name: 'AdonisJS', category: 'Backend' },
      { index: 9, name: 'Node.js', category: 'Runtime' },
      { index: 10, name: 'WebSockets', category: 'Realtime' },
      { index: 11, name: 'Capacitor', category: 'Native' }
    ]
  })

  await prisma.project.createMany({
    data: [
      {
        index: 0,
        slug: 'norma',
        titleEn: 'Norma',
        titleFa: 'نورما',
        descriptionEn: 'An editorial CMS for independent magazines. Issue structure, typographic presets, and a print-aware preview — built like a composing room, not a dashboard.',
        descriptionFa: 'یک سیستم مدیریت محتوای سرمقاله‌ای برای مجلات مستقل. ساختار شماره، پیش‌تنظیم‌های حروف، و پیش‌نمایش آگاه از چاپ — مثل اتاق حروف‌چینی، نه داشبورد.',
        year: '2026',
        imageUrl: '/images/projects/norma.jpg',
        demoUrl: 'https://norma.example',
        githubUrl: 'https://github.com/kianrahimi/norma',
        layout: 'image-start',
        featured: true,
        techs: JSON.stringify(['Nuxt', 'Prisma', 'Tailwind CSS', 'TypeScript'])
      },
      {
        index: 1,
        slug: 'pulse',
        titleEn: 'Pulse',
        titleFa: 'پالس',
        descriptionEn: 'A real-time operations board. Monospace telemetry, hard rules, no chrome. Built for rooms that cannot afford decoration.',
        descriptionFa: 'تابلوی عملیات بلادرنگ. تله‌متری مونواسپیس، خطوط سخت، بدون تزئین. برای اتاق‌هایی که تحمل دکوراسیون ندارند.',
        year: '2025',
        imageUrl: '/images/projects/pulse.jpg',
        demoUrl: 'https://pulse.example',
        githubUrl: 'https://github.com/kianrahimi/pulse',
        layout: 'image-end',
        featured: true,
        techs: JSON.stringify(['Vue', 'WebSockets', 'Node.js', 'TypeScript'])
      },
      {
        index: 2,
        slug: 'saffron',
        titleEn: 'Saffron',
        titleFa: 'زعفران',
        descriptionEn: 'A mobile-first marketplace for makers. Large type, few taps, native shell. Commerce treated as a publication, not a catalogue dump.',
        descriptionFa: 'بازار موبایل‌محور برای سازنده‌ها. حروف بزرگ، لمس کم، پوسته بومی. تجارت به‌مثابه نشر، نه انبار کاتالوگ.',
        year: '2025',
        imageUrl: '/images/projects/saffron.jpg',
        demoUrl: 'https://saffron.example',
        githubUrl: null,
        layout: 'overlay',
        featured: true,
        techs: JSON.stringify(['Nuxt', 'Capacitor', 'MongoDB', 'Tailwind CSS'])
      },
      {
        index: 3,
        slug: 'atelier',
        titleEn: 'Atelier',
        titleFa: 'آتلیه',
        descriptionEn: 'SaaS for small design studios: proposals, proofs, and production calendars. A product that behaves like a well-kept desk.',
        descriptionFa: 'نرم‌افزار ابری برای استودیوهای کوچک طراحی: پیشنهاد، نمونه و تقویم تولید. محصولی که مثل یک میز مرتب رفتار می‌کند.',
        year: '2024',
        imageUrl: '/images/projects/atelier.jpg',
        demoUrl: 'https://atelier.example',
        githubUrl: 'https://github.com/kianrahimi/atelier',
        layout: 'stacked',
        featured: false,
        techs: JSON.stringify(['Vue', 'AdonisJS', 'Prisma', 'TypeScript'])
      }
    ]
  })

  await prisma.experience.createMany({
    data: [
      {
        index: 0,
        yearStart: '2024',
        yearEnd: 'Now',
        titleEn: 'Senior Frontend',
        titleFa: 'فرانت‌اند ارشد',
        orgEn: 'Atelier Digital',
        orgFa: 'آتلیه دیجیتال',
        locationEn: 'Amsterdam',
        locationFa: 'آمستردام',
        bodyEn: 'Lead interface architecture for publication-grade SaaS. Design systems, motion language, and the boring reliability underneath.',
        bodyFa: 'معماری رابط برای محصولات در سطح نشر. سیستم طراحی، زبان حرکت، و قابلیت اطمینان بی‌هیاهو در زیر.'
      },
      {
        index: 1,
        yearStart: '2022',
        yearEnd: '2024',
        titleEn: 'Frontend Engineer',
        titleFa: 'مهندس فرانت‌اند',
        orgEn: 'Nexora',
        orgFa: 'نکسورا',
        locationEn: 'Berlin',
        locationFa: 'برلین',
        bodyEn: 'Shipped real-time consoles and the component library that kept them honest across three product lines.',
        bodyFa: 'کنسول‌های بلادرنگ و کتابخانه قطعاتی که سه خط محصول را صادق نگه داشت.'
      },
      {
        index: 2,
        yearStart: '2020',
        yearEnd: '2022',
        titleEn: 'UI Engineer',
        titleFa: 'مهندس رابط کاربری',
        orgEn: 'Independent',
        orgFa: 'مستقل',
        locationEn: 'Tehran / Remote',
        locationFa: 'تهران / ریموت',
        bodyEn: 'Studios, magazines, early SaaS. Learned that most products need less interface and more decision.',
        bodyFa: 'استودیو، مجله، محصولات نوپا. فهمیدم بیشتر محصول‌ها رابط کمتر می‌خواهند و تصمیم بیشتر.'
      }
    ]
  })

  await prisma.education.createMany({
    data: [
      {
        index: 0,
        yearStart: '2016',
        yearEnd: '2020',
        titleEn: 'B.Sc. Computer Engineering',
        titleFa: 'کارشناسی مهندسی کامپیوتر',
        orgEn: 'University of Tehran',
        orgFa: 'دانشگاه تهران',
        locationEn: 'Tehran',
        locationFa: 'تهران',
        bodyEn: 'Systems, compilers, and a quiet obsession with how information is set on a page.',
        bodyFa: 'سیستم، کامپایلر، و وسواس آرام نسبت به نشستن اطلاعات روی صفحه.'
      }
    ]
  })

  await prisma.social.createMany({
    data: [
      { index: 0, name: 'GitHub', handle: 'kianrahimi', url: 'https://github.com/kianrahimi' },
      { index: 1, name: 'LinkedIn', handle: '/in/kianrahimi', url: 'https://linkedin.com/in/kianrahimi' },
      { index: 2, name: 'Telegram', handle: '@kianrahimi', url: 'https://t.me/kianrahimi' },
      { index: 3, name: 'Instagram', handle: '@kian.rahimi', url: 'https://instagram.com/kian.rahimi' },
      { index: 4, name: 'Email', handle: 'hello@kianrahimi.dev', url: 'mailto:hello@kianrahimi.dev' }
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
