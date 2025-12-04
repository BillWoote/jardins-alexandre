import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || 'changeme123',
    10
  )

  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@jardinsalexandre.fr' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@jardinsalexandre.fr',
      password: hashedPassword,
      name: 'Administrateur',
    },
  })

  console.log('✅ Admin user created:', admin.email)

  // Create sample projects
  const project1 = await prisma.project.create({
    data: {
      title: 'Terrasse moderne à Paris 15ème',
      slug: 'terrasse-moderne-paris-15',
      category: 'terrasse',
      location: 'Paris 15ème',
      description:
        'Aménagement complet d\'une terrasse de 40m² avec deck en bois composite, végétalisation et éclairage intégré.',
      published: true,
      order: 1,
    },
  })

  const project2 = await prisma.project.create({
    data: {
      title: 'Jardin japonais à Versailles',
      slug: 'jardin-japonais-versailles',
      category: 'jardin',
      location: 'Versailles',
      description:
        'Création d\'un jardin zen avec bassin, lanternes et végétaux authentiques.',
      published: true,
      order: 2,
    },
  })

  const project3 = await prisma.project.create({
    data: {
      title: 'Élagage de platanes à Neuilly',
      slug: 'elagage-platanes-neuilly',
      category: 'elagage',
      location: 'Neuilly-sur-Seine',
      description:
        'Taille et mise en sécurité de trois platanes centenaires.',
      published: true,
      order: 3,
    },
  })

  console.log('✅ Sample projects created')

  // Create settings
  const settings = [
    { key: 'site_name', value: 'Les Jardins d\'Alexandre', type: 'text' },
    { key: 'site_slogan', value: 'Votre partenaire pour des espaces verts d\'exception', type: 'text' },
    { key: 'contact_phone', value: '+33 6 12 34 56 78', type: 'text' },
    { key: 'contact_email', value: 'contact@jardinsalexandre.fr', type: 'text' },
    { key: 'facebook_url', value: 'https://facebook.com/jardinsalexandre', type: 'text' },
    { key: 'instagram_url', value: 'https://instagram.com/jardinsalexandre', type: 'text' },
    { key: 'serviceTerrasseImage', value: '/accueil-terrasse.avif', type: 'text' },
    { key: 'serviceJardinImage', value: '/accueil-jardin.avif', type: 'text' },
    { key: 'serviceElagageImage', value: '/accueil-elagage.avif', type: 'text' },
  ]

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    })
  }

  console.log('✅ Settings created')

  // Create sample testimonials
  const testimonials = [
    {
      name: 'Marie L.',
      location: 'Paris 16ème',
      content:
        'Excellent travail sur notre terrasse ! L\'équipe est professionnelle et à l\'écoute. Le résultat dépasse nos attentes.',
      rating: 5,
      published: true,
      order: 1,
    },
    {
      name: 'Pierre D.',
      location: 'Versailles',
      content:
        'Notre jardin a été transformé en véritable oasis. Merci pour votre créativité et votre expertise.',
      rating: 5,
      published: true,
      order: 2,
    },
    {
      name: 'Sophie M.',
      location: 'Neuilly',
      content:
        'Service impeccable pour l\'élagage de nos arbres. Ponctuel, soigné et prix raisonnable.',
      rating: 5,
      published: true,
      order: 3,
    },
  ]

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial,
    })
  }

  console.log('✅ Sample testimonials created')

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
