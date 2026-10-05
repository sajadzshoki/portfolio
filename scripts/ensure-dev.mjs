import { copyFileSync, existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
process.chdir(root)

if (!existsSync('.env') && existsSync('.env.example')) {
  copyFileSync('.env.example', '.env')
}

function run(command, args, { allowFail = false } = {}) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: true,
    cwd: root,
    env: process.env
  })
  if (result.status !== 0 && !allowFail) {
    process.exit(result.status ?? 1)
  }
  return result.status ?? 1
}

async function prismaReady() {
  try {
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()
    await prisma.$connect()
    await prisma.$disconnect()
    return true
  } catch {
    return false
  }
}

const ready = await prismaReady()
if (!ready) {
  const code = run('npx', ['prisma', 'generate'], { allowFail: true })
  if (code !== 0 && !(await prismaReady())) {
    console.error(
      'Prisma generate failed (often EPERM on Windows when another Node/Nuxt process still holds the query engine). Stop other `npm run dev` / node processes for this project and retry.'
    )
    process.exit(code || 1)
  }
}

run('npx', ['prisma', 'db', 'push', '--skip-generate'])

const { PrismaClient } = await import('@prisma/client')
const prisma = new PrismaClient()
try {
  const admins = await prisma.admin.count()
  if (admins === 0) {
    run('npx', ['tsx', 'prisma/seed.ts'])
  }
} finally {
  await prisma.$disconnect()
}
