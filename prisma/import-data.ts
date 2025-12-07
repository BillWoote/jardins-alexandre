import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

async function importData() {
  console.log('📥 Importing data to production database...')

  try {
    // Read export file
    const exportPath = path.join(process.cwd(), 'prisma', 'data-export.json')
    const fileContent = fs.readFileSync(exportPath, 'utf-8')
    const data = JSON.parse(fileContent)

    console.log('📊 Data to import:')
    console.log(`   - Users: ${data.users.length}`)
    console.log(`   - Projects: ${data.projects.length}`)
    console.log(`   - Settings: ${data.settings.length}`)
    console.log(`   - Testimonials: ${data.testimonials.length}`)

    // Clear existing data (except admin user)
    console.log('\n🗑️  Clearing existing data...')
    await prisma.image.deleteMany()
    await prisma.project.deleteMany()
    await prisma.testimonial.deleteMany()
    await prisma.setting.deleteMany()

    // Import Settings
    console.log('\n⚙️  Importing settings...')
    for (const setting of data.settings) {
      await prisma.setting.upsert({
        where: { key: setting.key },
        update: { value: setting.value },
        create: {
          key: setting.key,
          value: setting.value,
        },
      })
    }
    console.log(`   ✅ ${data.settings.length} settings imported`)

    // Import Projects with Images
    console.log('\n🏗️  Importing projects...')
    for (const project of data.projects) {
      const { images, ...projectData } = project
      
      const createdProject = await prisma.project.create({
        data: {
          ...projectData,
          images: {
            create: images.map((img: any) => ({
              url: img.url,
              alt: img.alt,
              order: img.order,
            })),
          },
        },
      })
      console.log(`   ✅ Project: ${createdProject.title} (${images.length} images)`)
    }

    // Import Testimonials
    console.log('\n💬 Importing testimonials...')
    for (const testimonial of data.testimonials) {
      await prisma.testimonial.create({
        data: testimonial,
      })
    }
    console.log(`   ✅ ${data.testimonials.length} testimonials imported`)

    console.log('\n🎉 Import completed successfully!')
    console.log('⚠️  Note: Images files are NOT transferred - only database records.')
    console.log('   You will need to re-upload images via the admin panel.')

  } catch (error) {
    console.error('❌ Import failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

importData()
