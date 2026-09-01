# ATLAS — Personal Developer Portfolio

A bilingual (EN/FA) editorial portfolio. Swiss grid, neo-brutalist edges, Nuxt 4.

## Stack

Nuxt 4 · Vue 3 · TypeScript · Tailwind CSS 4 · Prisma · SQLite

## Run

```bash
npm install
npx prisma generate
npm run db:setup
npm run dev -- --host 0.0.0.0
```

## Admin

- URL: `/admin`
- Email: `admin@atlas.dev`
- Password: `atlas-admin`

Change these in `.env` before deploying, then re-run `npm run db:setup`.

The desk edits about, skills, projects, experience, education, socials, portrait and resume.

## Identity

Sample identity is **Kian Rahimi / کیان رحیمی**. Replace name, portrait, projects and links from `/admin`.

## Notes

- Theme and language persist in `localStorage`
- `⌘K` / `Ctrl+K` opens the command palette
- Resume lives at `/resume` (print to PDF)
- `prefers-reduced-motion` is respected
