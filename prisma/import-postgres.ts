import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  console.log('📥 Import des données dans PostgreSQL...\n');

  const jsonPath = 'prisma/data-export.json';
  if (!fs.existsSync(jsonPath)) {
    throw new Error(`Fichier ${jsonPath} introuvable!`);
  }

  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  // 1. Nettoyer PostgreSQL
  console.log('🧹 Nettoyage PostgreSQL...');
  await prisma.image.deleteMany();
  await prisma.project.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.setting.deleteMany();
  await prisma.user.deleteMany();
  console.log('✅ Nettoyé\n');

  // 2. Importer les utilisateurs
  console.log('👤 Import des utilisateurs...');
  for (const user of data.users) {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      },
    });
  }
  console.log(`✅ ${data.users.length} utilisateur(s) importé(s)\n`);

  // 3. Importer les paramètres
  console.log('⚙️  Import des paramètres...');
  for (const setting of data.settings) {
    await prisma.setting.create({
      data: {
        id: setting.id,
        key: setting.key,
        value: setting.value,
        type: setting.type,
      },
    });
  }
  console.log(`✅ ${data.settings.length} paramètre(s) importé(s)\n`);

  // 4. Importer les projets et leurs images
  console.log('📁 Import des projets...');
  let totalImages = 0;
  for (const project of data.projects) {
    await prisma.project.create({
      data: {
        id: project.id,
        title: project.title,
        slug: project.slug,
        category: project.category,
        location: project.location,
        description: project.description,
        order: project.order,
        published: project.published,
        createdAt: new Date(project.createdAt),
        updatedAt: new Date(project.updatedAt),
      },
    });

    // Importer les images
    for (const image of project.images) {
      await prisma.image.create({
        data: {
          id: image.id,
          url: image.url,
          alt: image.alt,
          order: image.order,
          projectId: image.projectId,
          createdAt: new Date(image.createdAt),
        },
      });
      totalImages++;
    }
  }
  console.log(`✅ ${data.projects.length} projet(s) importé(s) (${totalImages} images)\n`);

  // 5. Importer les témoignages
  console.log('💬 Import des témoignages...');
  for (const testimonial of data.testimonials) {
    await prisma.testimonial.create({
      data: {
        id: testimonial.id,
        name: testimonial.name,
        content: testimonial.content,
        rating: testimonial.rating,
        location: testimonial.location,
        order: testimonial.order,
        published: testimonial.published,
        createdAt: new Date(testimonial.createdAt),
      },
    });
  }
  console.log(`✅ ${data.testimonials.length} témoignage(s) importé(s)\n`);

  console.log('🎉 Import terminé avec succès!');
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
