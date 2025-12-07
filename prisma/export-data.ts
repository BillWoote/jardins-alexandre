import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

async function exportData() {
  console.log('📦 Exporting data from local database...')

  try {
    // Export all data
    const users = await prisma.user.findMany()
    const projects = await prisma.project.findMany({
      include: {
        images: true,
      },
    })
    const settings = await prisma.setting.findMany()
    const testimonials = await prisma.testimonial.findMany()

    const data = {
      users,
      projects,
      settings,
      testimonials,
      exportedAt: new Date().toISOString(),
    }

    // Write to file
    const exportPath = path.join(process.cwd(), 'prisma', 'data-export.json')
    fs.writeFileSync(exportPath, JSON.stringify(data, null, 2))

    console.log('✅ Data exported successfully!')
    console.log(`📁 File: ${exportPath}`)
    console.log(`📊 Stats:`)
    console.log(`   - Users: ${users.length}`)
    console.log(`   - Projects: ${projects.length}`)
    console.log(`   - Settings: ${settings.length}`)
    console.log(`   - Testimonials: ${testimonials.length}`)
    
    // Count images
    const totalImages = projects.reduce((sum, p) => sum + p.images.length, 0)
    console.log(`   - Images: ${totalImages}`)

  } catch (error) {
    console.error('❌ Export failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

exportData()
