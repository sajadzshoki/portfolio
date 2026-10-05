import type { Locale } from './types'

export const ui = {
  en: {
    skip: 'Skip to content',
    index: 'Index',
    issue: 'Build',
    available: 'status',
    location: 'location',
    stack: 'stack',
    nav: {
      about: 'About',
      skills: 'Skills',
      work: 'Work',
      studio: 'Experience',
      contact: 'Contact'
    },
    present: 'Now',
    menu: 'Menu',
    hero: {
      kicker: 'init',
      vol: 'spec',
      ctaPrimary: 'View Work',
      ctaSecondary: 'Contact',
      portrait: 'portrait',
      based: 'based in',
      prompt: 'role',
      path: '~/portfolio'
    },
    about: {
      kicker: 'readme',
      title: 'About'
    },
    skills: {
      kicker: 'toolchain',
      title: 'Skills'
    },
    projects: {
      kicker: 'shipped',
      title: 'Projects',
      demo: 'Live',
      code: 'Source',
      view: 'Open',
      featured: 'featured'
    },
    experience: {
      kicker: 'changelog',
      title: 'Experience',
      work: 'Work',
      education: 'Education'
    },
    social: {
      kicker: 'links',
      title: 'Elsewhere'
    },
    contact: {
      kicker: 'connect',
      title: "Let's build.",
      body: 'Have a product or interface problem that needs precise engineering. Write — I read everything.',
      cta: 'Email Me',
      resume: 'Resume',
      email: 'Copy email'
    },
    footer: {
      rights: 'All rights reserved',
      designed: 'Built by',
      cmd: 'command'
    },
    cmd: {
      placeholder: 'Jump to…',
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
    issue: 'بیلد',
    available: 'وضعیت',
    location: 'مکان',
    stack: 'استک',
    nav: {
      about: 'درباره',
      skills: 'مهارت‌ها',
      work: 'کارها',
      studio: 'تجربه',
      contact: 'تماس'
    },
    present: 'اکنون',
    menu: 'منو',
    hero: {
      kicker: 'شروع',
      vol: 'مشخصات',
      ctaPrimary: 'دیدن کارها',
      ctaSecondary: 'تماس',
      portrait: 'پرتره',
      based: 'مستقر در',
      prompt: 'نقش',
      path: '~/portfolio'
    },
    about: {
      kicker: 'معرفی',
      title: 'درباره'
    },
    skills: {
      kicker: 'ابزار',
      title: 'مهارت‌ها'
    },
    projects: {
      kicker: 'ارسال‌شده',
      title: 'پروژه‌ها',
      demo: 'زنده',
      code: 'سورس',
      view: 'باز کردن',
      featured: 'برگزیده'
    },
    experience: {
      kicker: 'changelog',
      title: 'تجربه',
      work: 'کار',
      education: 'تحصیل'
    },
    social: {
      kicker: 'لینک‌ها',
      title: 'جایی دیگر'
    },
    contact: {
      kicker: 'ارتباط',
      title: 'بسازیم.',
      body: 'محصول یا مسئله‌ای دارید که به مهندسی دقیق رابط نیاز دارد. بنویسید — همه‌چیز را می‌خوانم.',
      cta: 'ایمیل',
      resume: 'رزومه',
      email: 'کپی ایمیل'
    },
    footer: {
      rights: 'تمام حقوق محفوظ است',
      designed: 'ساخت',
      cmd: 'فرمان'
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
