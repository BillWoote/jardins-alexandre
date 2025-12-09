import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
})

async function main() {
  const emails = await prisma.setting.findMany({
    where: {
      OR: [
        { key: { contains: 'email' } },
        { key: { contains: 'mail' } }
      ]
    }
  })
  
  console.log('\n📧 Champs email trouvés:')
  emails.forEach(s => console.log(`  - ${s.key}: ${s.value}`))
  console.log(`\nTotal: ${emails.length} entrée(s)`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
