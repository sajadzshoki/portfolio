import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const projects = [
  {
    index: 0,
    slug: 'workquest',
    titleEn: 'WorkQuest',
    titleFa: 'ورک‌کوئست',
    descriptionEn: 'Personal project. Multi-tenant SaaS for employee performance: tasks, scored reviews, XP and coins, peer recognition, challenges, and company analytics. Persian-first, with phone OTP and revocable sessions.',
    descriptionFa: 'پروژه شخصی. سامانه چندمستأجری مدیریت عملکرد کارکنان: تسک، امتیازدهی، XP و سکه، قدردانی همکاران، چالش و داشبورد تحلیلی. فارسی‌محور، با ورود OTP.',
    year: '2026',
    imageUrl: '',
    demoUrl: 'https://work-quest.netlify.app',
    githubUrl: 'https://github.com/sajadzshoki/WorkQuest',
    layout: 'image-start',
    featured: true,
    techs: JSON.stringify(['Nuxt', 'Vue', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'])
  },
  {
    index: 1,
    slug: 'invoicer',
    titleEn: 'Nasq',
    titleFa: 'نسق',
    descriptionEn: 'Personal project. Persian accounting for small businesses: invoices, checks, parties, and products, with a local ledger that keeps financial history intact when records change.',
    descriptionFa: 'پروژه شخصی. حسابداری فارسی برای کسب‌وکارهای کوچک: فاکتور، چک، طرف‌حساب و کالا، با دفتر محلی که سابقه مالی را موقع ویرایش حفظ می‌کند.',
    year: '2026',
    imageUrl: '',
    demoUrl: null,
    githubUrl: 'https://github.com/sajadzshoki/Invoicer',
    layout: 'image-end',
    featured: true,
    techs: JSON.stringify(['React', 'TypeScript', 'Vite'])
  },
  {
    index: 2,
    slug: 'sazan',
    titleEn: 'Sazan',
    titleFa: 'سازان',
    descriptionEn: 'Personal project. Bilingual studio site: marketing pages, portfolio, a guided project request, contact, and a protected admin for projects, services, categories, and requests.',
    descriptionFa: 'پروژه شخصی. سایت دوزبانه استودیو: معرفی، نمونه‌کار، درخواست پروژه، تماس، و پنل مدیریت پروژه‌ها، سرویس‌ها و درخواست‌ها.',
    year: '2026',
    imageUrl: '',
    demoUrl: null,
    githubUrl: 'https://github.com/sajadzshoki/sazan',
    layout: 'image-start',
    featured: true,
    techs: JSON.stringify(['Nuxt', 'Vue', 'TypeScript', 'UnoCSS', 'MongoDB'])
  },
  {
    index: 3,
    slug: 'waqtino',
    titleEn: 'Waqtino',
    titleFa: 'وقتینو',
    descriptionEn: 'Personal project. Mobile-first appointment booking. Customers search and book; owners manage services, staff, and appointments. Persian RTL, shaped for an Android build with Capacitor.',
    descriptionFa: 'پروژه شخصی. رزرو نوبت، موبایل‌محور: جستجو و رزرو برای مشتری، و مدیریت سرویس، پرسنل و نوبت برای صاحب کسب‌وکار. آماده ساخت اندروید با Capacitor.',
    year: '2026',
    imageUrl: '',
    demoUrl: 'https://waqtino.netlify.app/',
    githubUrl: 'https://github.com/sajadzshoki/arena-waqtino',
    layout: 'image-end',
    featured: true,
    techs: JSON.stringify(['Nuxt', 'Vue', 'TypeScript', 'Capacitor'])
  },
  {
    index: 4,
    slug: 'trado',
    titleEn: 'Trado',
    titleFa: 'ترادو',
    descriptionEn: 'Personal project. A spot-trading journal, not an exchange. Buys and sells stay in trades you define, with USD and Toman amounts, manual prices, and portfolio performance.',
    descriptionFa: 'پروژه شخصی. دفتر معاملات اسپات، نه صرافی. خرید و فروش داخل معامله‌هایی که خودتان می‌سازید، با دلار و تومان، قیمت دستی و عملکرد پرتفوی.',
    year: '2026',
    imageUrl: '',
    demoUrl: null,
    githubUrl: 'https://github.com/sajadzshoki/Trado',
    layout: 'image-start',
    featured: true,
    techs: JSON.stringify(['Nuxt', 'Vue', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Drizzle'])
  },
  {
    index: 5,
    slug: 'ham-sakhteman',
    titleEn: 'Ham Sakhteman',
    titleFa: 'هم‌ساختمان',
    descriptionEn: 'Personal project. Persian RTL building management: this month’s charge, announcements, units and residents, and service requests you can track.',
    descriptionFa: 'پروژه شخصی. مدیریت ساختمان، فارسی و راست‌به‌چپ: شارژ ماه، اطلاعیه‌ها، واحدها و ساکنان، و ثبت و پیگیری درخواست خدمات.',
    year: '2026',
    imageUrl: '',
    demoUrl: 'https://ham-sakhteman2.netlify.app/',
    githubUrl: 'https://github.com/sajadzshoki/ham-sakhteman',
    layout: 'image-end',
    featured: true,
    techs: JSON.stringify(['Nuxt', 'Vue', 'TypeScript', 'Tailwind CSS'])
  },
  {
    index: 6,
    slug: 'artivo',
    titleEn: 'Artivo',
    titleFa: 'آرتیوو',
    descriptionEn: 'Personal project. Marketplace connecting clients with graphic designers and photographers. Project wizard, central pricing, open jobs, services, photo locations, accounts, and an admin panel.',
    descriptionFa: 'پروژه شخصی. مارکت‌پلیس اتصال کارفرما به طراح و عکاس: ویزارد پروژه، قیمت‌گذاری مرکزی، آگهی، سرویس، لوکیشن عکاسی، حساب کاربری و پنل مدیریت.',
    year: '2026',
    imageUrl: '',
    demoUrl: null,
    githubUrl: 'https://github.com/sajadzshoki/Artivo',
    layout: 'image-start',
    featured: true,
    techs: JSON.stringify(['Nuxt', 'Vue', 'TypeScript'])
  },
  {
    index: 7,
    slug: 'tuneroom',
    titleEn: 'TuneRoom',
    titleFa: 'تیون‌روم',
    descriptionEn: 'Personal project. A shared music room for a small group. People add tracks by upload or link, queue them, and each listener controls their own playback.',
    descriptionFa: 'پروژه شخصی. اتاق موسیقی مشترک برای یک گروه کوچک. هر کس آهنگ آپلود می‌کند یا لینک می‌دهد، صف می‌سازد، و پخش را روی دستگاه خودش کنترل می‌کند.',
    year: '2026',
    imageUrl: '',
    demoUrl: null,
    githubUrl: 'https://github.com/sajadzshoki/TuneRoom',
    layout: 'image-end',
    featured: true,
    techs: JSON.stringify(['Nuxt', 'Vue', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Drizzle'])
  },
  {
    index: 8,
    slug: 'chapkhaneh',
    titleEn: 'Chapkhaneh',
    titleFa: 'چاپخانه',
    descriptionEn: 'Personal project. Website system for a large printing company, demoed as Mobin Bartar. Persian-first and bilingual, with catalog content in PostgreSQL and an admin panel.',
    descriptionFa: 'پروژه شخصی. وب‌سایت شرکت چاپ، با برند نمونه مبین برتر. فارسی‌محور و دوزبانه، محتوا در PostgreSQL و پنل مدیریت.',
    year: '2026',
    imageUrl: '',
    demoUrl: 'https://mobin-bartar.netlify.app/',
    githubUrl: 'https://github.com/sajadzshoki/chapkhaneh',
    layout: 'image-start',
    featured: true,
    techs: JSON.stringify(['Nuxt', 'Vue', 'TypeScript', 'UnoCSS', 'PostgreSQL', 'Drizzle'])
  },
  {
    index: 9,
    slug: 'motomeet',
    titleEn: 'MotoMeet',
    titleFa: 'موتومیت',
    descriptionEn: 'Personal project. Social platform for motorcycle riders: rides, clubs, a garage, chat, notifications, and moderation. Persian RTL, with phone auth and Prisma.',
    descriptionFa: 'پروژه شخصی. شبکه اجتماعی موتورسوارها: تور، کلاب، گاراژ، چت، اعلان و مدیریت گزارش‌ها. فارسی و راست‌به‌چپ، با احراز هویت موبایل و Prisma.',
    year: '2026',
    imageUrl: '',
    demoUrl: null,
    githubUrl: 'https://github.com/sajadzshoki/motomeet-ar',
    layout: 'image-end',
    featured: true,
    techs: JSON.stringify(['Nuxt', 'Vue', 'TypeScript', 'Tailwind CSS', 'Prisma'])
  },
  {
    index: 10,
    slug: 'motofix',
    titleEn: 'MotoFix',
    titleFa: 'موتوفیکس',
    descriptionEn: 'Personal project. Find nearby motorcycle services: repair, tires, oil, parts, and roadside help. Map discovery, business pages, an owner dashboard, and admin review.',
    descriptionFa: 'پروژه شخصی. پیدا کردن خدمات موتورسیکلت در نزدیکی: تعمیر، لاستیک، روغن، قطعه و امداد. نقشه، صفحه کسب‌وکار، داشبورد مالک و بررسی ادمین.',
    year: '2026',
    imageUrl: '',
    demoUrl: null,
    githubUrl: 'https://github.com/sajadzshoki/motofix',
    layout: 'image-start',
    featured: true,
    techs: JSON.stringify(['React', 'TypeScript', 'Vite'])
  },
  {
    index: 11,
    slug: 'dayan',
    titleEn: 'Dayan',
    titleFa: 'دایان',
    descriptionEn: 'Vista. Cloud accounting for expenses, sales, customer ledgers, custom invoices, and a live price list, on phone and web. I built the Nuxt frontend and the Adonis backend.',
    descriptionFa: 'ویستا. حسابداری ابری برای هزینه، فروش، دفتر مشتریان، فاکتور اختصاصی و لیست قیمت آنلاین، روی موبایل و وب. فرانت Nuxt و بک‌اند Adonis را خودم ساختم.',
    year: '2025',
    imageUrl: '',
    demoUrl: 'https://app.dayanapp.com/',
    githubUrl: null,
    layout: 'image-start',
    featured: true,
    techs: JSON.stringify(['Nuxt', 'Vue', 'TypeScript', 'AdonisJS'])
  },
  {
    index: 12,
    slug: 'vitsell',
    titleEn: 'Vitsell',
    titleFa: 'ویتسل',
    descriptionEn: 'Vista. Online store for phones and digital goods: catalog, filters, cart, and content pages. I built the Nuxt storefront and the Adonis backend.',
    descriptionFa: 'ویستا. فروشگاه آنلاین موبایل و کالای دیجیتال: کاتالوگ، فیلتر، سبد خرید و صفحه‌های محتوا. ویترین Nuxt و بک‌اند Adonis را خودم ساختم.',
    year: '2025',
    imageUrl: '',
    demoUrl: 'https://vitsell.ir/',
    githubUrl: null,
    layout: 'image-end',
    featured: true,
    techs: JSON.stringify(['Nuxt', 'Vue', 'TypeScript', 'AdonisJS'])
  },
  {
    index: 13,
    slug: 'qotbnama',
    titleEn: 'Qotbnama',
    titleFa: 'قطب‌نما',
    descriptionEn: 'Vista. Bilingual frontend for country pages and maps. I built the Nuxt interface; Prisma sits on the data layer.',
    descriptionFa: 'ویستا. فرانت دوزبانه برای صفحه‌های کشور و نقشه. رابط Nuxt را ساختم و داده از Prisma می‌آید.',
    year: '2025',
    imageUrl: '',
    demoUrl: 'https://qotbnama.vistatest.top/country',
    githubUrl: null,
    layout: 'image-start',
    featured: true,
    techs: JSON.stringify(['Nuxt', 'Vue', 'TypeScript', 'Prisma'])
  },
  {
    index: 14,
    slug: 'cex',
    titleEn: 'Nova',
    titleFa: 'نوا',
    descriptionEn: 'Vista. Crypto exchange frontend: spot, futures, margin, OTC, and KYC, with markets and account screens. Nuxt on the client, Prisma on the data layer.',
    descriptionFa: 'ویستا. فرانت صرافی ارز دیجیتال: اسپات، فیوچرز، مارجین، OTC و احراز هویت، با بازارها و صفحه‌های حساب. Nuxt در کلاینت و Prisma در لایه داده.',
    year: '2025',
    imageUrl: '',
    demoUrl: 'https://cex.vistatest.top/',
    githubUrl: null,
    layout: 'image-end',
    featured: true,
    techs: JSON.stringify(['Nuxt', 'Vue', 'TypeScript', 'Prisma'])
  },
  {
    index: 15,
    slug: 'sooraya',
    titleEn: 'Sooraya',
    titleFa: 'ثریا',
    descriptionEn: 'Vista. Digital bookstore: books, magazines, podcasts, audiobooks, films, and exams, plus publisher entry and book requests. Nuxt frontend with Prisma.',
    descriptionFa: 'ویستا. کتاب‌فروشی دیجیتال: کتاب، مجله، پادکست، کتاب صوتی، فیلم و آزمون، به‌همراه ورود ناشر و درخواست کتاب. فرانت Nuxt و Prisma.',
    year: '2025',
    imageUrl: '',
    demoUrl: 'https://sooraya.vistatest.top/',
    githubUrl: null,
    layout: 'image-start',
    featured: true,
    techs: JSON.stringify(['Nuxt', 'Vue', 'TypeScript', 'Prisma'])
  },
  {
    index: 16,
    slug: 'dandoonet',
    titleEn: 'Dandoonet',
    titleFa: 'دندونت',
    descriptionEn: 'Vista. Dental network. Patients find clinics on a map, with a dentist mode and OTP sign-in. I built the Nuxt frontend; Prisma is the data layer.',
    descriptionFa: 'ویستا. شبکه دندان‌پزشکی: پیدا کردن مطب روی نقشه، حالت دندان‌پزشک و ورود با OTP. فرانت Nuxt را ساختم و داده با Prisma است.',
    year: '2025',
    imageUrl: '',
    demoUrl: 'https://dandoonet.ir/',
    githubUrl: null,
    layout: 'image-end',
    featured: true,
    techs: JSON.stringify(['Nuxt', 'Vue', 'TypeScript', 'Prisma'])
  },
  {
    index: 17,
    slug: 'abi',
    titleEn: 'Abi',
    titleFa: 'آبی',
    descriptionEn: 'Vista. Restaurant product with separate waiter and kitchen views. Nuxt frontend and Prisma.',
    descriptionFa: 'ویستا. محصول رستوران با نمای جدا برای گارسون و آشپزخانه. فرانت Nuxt و Prisma.',
    year: '2025',
    imageUrl: '',
    demoUrl: 'https://abi.vistatest.top/',
    githubUrl: null,
    layout: 'image-start',
    featured: true,
    techs: JSON.stringify(['Nuxt', 'Vue', 'TypeScript', 'Prisma'])
  }
]

async function replaceProjects() {
  await prisma.$executeRawUnsafe(
    'ALTER TABLE "Project" ADD COLUMN "mobileImageUrl" TEXT NOT NULL DEFAULT \'\''
  ).catch(() => {})
  await prisma.project.deleteMany()
  await prisma.project.createMany({ data: projects })
}

async function main() {
  if (process.argv.includes('--projects-only')) {
    await replaceProjects()
    return
  }

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

  await replaceProjects()

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
