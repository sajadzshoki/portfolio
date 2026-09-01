import type { Locale } from './types'

export const ui = {
  en: {
    skip: 'Skip to content',
    index: 'Index',
    issue: 'Issue',
    available: 'Available',
    location: 'Location',
    stack: 'Stack',
    nav: {
      about: 'About',
      work: 'Work',
      studio: 'Studio',
      contact: 'Contact'
    },
    present: 'Now',
    menu: 'Menu',
    hero: {
      kicker: 'Hero',
      vol: 'Vol. II',
      ctaPrimary: 'View Projects',
      ctaSecondary: 'Contact Me',
      portrait: 'Portrait',
      based: 'Based in'
    },
    about: {
      kicker: 'What I do',
      title: 'Practice'
    },
    skills: {
      kicker: 'Toolkit',
      title: 'Selected tools'
    },
    projects: {
      kicker: 'Selected work',
      title: 'Projects',
      demo: 'Live',
      code: 'Code',
      view: 'View',
      featured: 'Featured'
    },
    experience: {
      kicker: 'Path',
      title: 'Experience',
      work: 'Work',
      education: 'Education'
    },
    social: {
      kicker: 'Elsewhere',
      title: 'Channels'
    },
    contact: {
      kicker: 'Next',
      title: "Let's build something.",
      body: 'Have a product, a publication, or a problem that needs a precise interface. Write. I read everything.',
      cta: 'Contact Me',
      resume: 'Download Resume',
      email: 'Email'
    },
    footer: {
      rights: 'All rights reserved',
      designed: 'Designed & built by',
      cmd: 'to command'
    },
    cmd: {
      placeholder: 'Go somewhere…',
      empty: 'No matches',
      hint: 'Navigate'
    },
    theme: {
      light: 'Light',
      dark: 'Dark'
    },
    admin: {
      desk: 'Desk',
      login: 'Enter',
      logout: 'Sign out',
      save: 'Save',
      saved: 'Saved',
      add: 'Add',
      remove: 'Remove',
      upload: 'Upload',
      tabs: {
        site: 'Site',
        about: 'About',
        skills: 'Skills',
        projects: 'Projects',
        experience: 'Experience',
        education: 'Education',
        socials: 'Social'
      }
    }
  },
  fa: {
    skip: 'رفتن به محتوا',
    index: 'فهرست',
    issue: 'شماره',
    available: 'وضعیت',
    location: 'مکان',
    stack: 'استک',
    nav: {
      about: 'درباره',
      work: 'کارها',
      studio: 'استودیو',
      contact: 'تماس'
    },
    present: 'اکنون',
    menu: 'منو',
    hero: {
      kicker: 'سرآغاز',
      vol: 'جلد ۲',
      ctaPrimary: 'دیدن پروژه‌ها',
      ctaSecondary: 'تماس با من',
      portrait: 'پرتره',
      based: 'مستقر در'
    },
    about: {
      kicker: 'چه می‌سازم',
      title: 'حوزه کار'
    },
    skills: {
      kicker: 'ابزار',
      title: 'ابزارهای منتخب'
    },
    projects: {
      kicker: 'کارهای منتخب',
      title: 'پروژه‌ها',
      demo: 'نسخه زنده',
      code: 'کد',
      view: 'مشاهده',
      featured: 'برگزیده'
    },
    experience: {
      kicker: 'مسیر',
      title: 'تجربه',
      work: 'کار',
      education: 'تحصیل'
    },
    social: {
      kicker: 'جایی دیگر',
      title: 'کانال‌ها'
    },
    contact: {
      kicker: 'بعدی',
      title: 'چیزی بسازیم.',
      body: 'محصول، نشریه، یا مسئله‌ای دارید که به یک رابط دقیق نیاز دارد. بنویسید. همه‌چیز را می‌خوانم.',
      cta: 'تماس با من',
      resume: 'دانلود رزومه',
      email: 'ایمیل'
    },
    footer: {
      rights: 'تمام حقوق محفوظ است',
      designed: 'طراحی و ساخت',
      cmd: 'برای فرمان'
    },
    cmd: {
      placeholder: 'برو به…',
      empty: 'موردی نیست',
      hint: 'پیمایش'
    },
    theme: {
      light: 'روشن',
      dark: 'تیره'
    },
    admin: {
      desk: 'میز کار',
      login: 'ورود',
      logout: 'خروج',
      save: 'ذخیره',
      saved: 'ذخیره شد',
      add: 'افزودن',
      remove: 'حذف',
      upload: 'بارگذاری',
      tabs: {
        site: 'سایت',
        about: 'درباره',
        skills: 'مهارت‌ها',
        projects: 'پروژه‌ها',
        experience: 'تجربه',
        education: 'تحصیل',
        socials: 'شبکه‌ها'
      }
    }
  }
} as const

export function pick(locale: Locale, en: string, fa: string) {
  return locale === 'fa' ? fa : en
}

export function pad(n: number) {
  return String(n).padStart(2, '0')
}
