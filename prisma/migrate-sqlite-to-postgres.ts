import { PrismaClient as PrismaClientSQLite } from '@prisma/client';
import { PrismaClient as PrismaClientPostgres } from '@prisma/client';

// SQLite connection
const sqlite = new PrismaClientSQLite({
  datasources: {
    db: {
      url: 'file:./dev.db',
    },
  },
});

// PostgreSQL connection
const postgres = new PrismaClientPostgres({
  datasources: {
    db: {
      url: process.env.DATABASE_URL!,
    },
  },
});

async function main() {
  console.log('🔄 Migration SQLite → PostgreSQL...\n');

  try {
    // 1. Nettoyer PostgreSQL
    console.log('🧹 Nettoyage PostgreSQL...');
    await postgres.image.deleteMany();
    await postgres.project.deleteMany();
    await postgres.testimonial.deleteMany();
    await postgres.setting.deleteMany();
    await postgres.user.deleteMany();
    console.log('✅ PostgreSQL nettoyé\n');

    // 2. Migrer les utilisateurs
    console.log('👤 Migration des utilisateurs...');
    const users = await sqlite.user.findMany();
    for (const user of users) {
      await postgres.user.create({
        data: {
          id: user.id,
          email: user.email,
          password: user.password,
          name: user.name,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    }
    console.log(`✅ ${users.length} utilisateur(s) migré(s)\n`);

    // 3. Migrer les paramètres
    console.log('⚙️  Migration des paramètres...');
    const settings = await sqlite.setting.findMany();
    for (const setting of settings) {
      await postgres.setting.create({
        data: {
          id: setting.id,
          key: setting.key,
          value: setting.value,
          type: setting.type,
        },
      });
    }
    console.log(`✅ ${settings.length} paramètre(s) migré(s)\n`);

    // 4. Migrer les projets et leurs images
    console.log('📁 Migration des projets...');
    const projects = await sqlite.project.findMany({
      include: {
        images: true,
      },
    });
    
    for (const project of projects) {
      await postgres.project.create({
        data: {
          id: project.id,
          title: project.title,
          slug: project.slug,
          category: project.category,
          location: project.location,
          description: project.description,
          order: project.order,
          published: project.published,
          createdAt: project.createdAt,
          updatedAt: project.updatedAt,
        },
      });

      // Migrer les images du projet
      for (const image of project.images) {
        await postgres.image.create({
          data: {
            id: image.id,
            url: image.url,
            alt: image.alt,
            order: image.order,
            projectId: image.projectId,
            createdAt: image.createdAt,
          },
        });
      }
    }
    console.log(`✅ ${projects.length} projet(s) migré(s)\n`);

    // 5. Migrer les témoignages
    console.log('💬 Migration des témoignages...');
    const testimonials = await sqlite.testimonial.findMany();
    for (const testimonial of testimonials) {
      await postgres.testimonial.create({
        data: {
          id: testimonial.id,
          name: testimonial.name,
          content: testimonial.content,
          rating: testimonial.rating,
          location: testimonial.location,
          order: testimonial.order,
          published: testimonial.published,
          createdAt: testimonial.createdAt,
        },
      });
    }
    console.log(`✅ ${testimonials.length} témoignage(s) migré(s)\n`);

    console.log('🎉 Migration terminée avec succès!');
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
    throw error;
  } finally {
    await sqlite.$disconnect();
    await postgres.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
