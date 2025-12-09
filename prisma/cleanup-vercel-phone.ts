import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
})

async function main() {
  const deleted = await prisma.setting.deleteMany({
    where: { key: 'phone' }
  })
  console.log(`✅ ${deleted.count} entrée(s) 'phone' supprimée(s)`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
