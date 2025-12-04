import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const allSettings = [
  // Général
  { key: 'site_name', value: 'Les Jardins d\'Alexandre', type: 'text' },
  { key: 'site_slogan', value: 'Votre partenaire paysagiste', type: 'text' },
  { key: 'contact_phone', value: '+33 6 12 34 56 78', type: 'text' },
  { key: 'contact_email', value: 'contact@jardinsalexandre.fr', type: 'text' },
  { key: 'facebook_url', value: '', type: 'text' },
  { key: 'instagram_url', value: '', type: 'text' },
  
  // Page d'accueil
  { key: 'homeHeroTitle', value: 'Créons ensemble votre jardin idéal', type: 'text' },
  { key: 'homeHeroSubtitle', value: 'Paysagiste professionnel à votre service', type: 'text' },
  { key: 'homeAboutTitle', value: 'À propos', type: 'text' },
  { key: 'homeAboutContent', value: 'Expert en aménagement paysager depuis plus de 15 ans.', type: 'textarea' },
  
  // Services
  { key: 'servicesPageTitle', value: 'Nos Services', type: 'text' },
  { key: 'servicesPageSubtitle', value: 'Des prestations adaptées à vos besoins', type: 'text' },
  { key: 'serviceElagageTitle', value: 'Élagage', type: 'text' },
  { key: 'serviceElagageDesc', value: 'Taille et entretien de vos arbres', type: 'textarea' },
  { key: 'serviceElagageImage', value: '/accueil-elagage.avif', type: 'image' },
  { key: 'serviceJardinTitle', value: 'Création de jardins', type: 'text' },
  { key: 'serviceJardinDesc', value: 'Conception et réalisation de jardins sur-mesure', type: 'textarea' },
  { key: 'serviceJardinImage', value: '/accueil-jardin.avif', type: 'image' },
  { key: 'serviceTerrasseTitle', value: 'Terrasses', type:'text' },
  { key: 'serviceTerrasseDesc', value: 'Installation de terrasses en bois ou composite', type: 'textarea' },
  { key: 'serviceTerrasseImage', value: '/accueil-terrasse.avif', type: 'image' },
  { key: 'serviceEntretienTitle', value: 'Entretien', type: 'text' },
  { key: 'serviceEntretienDesc', value: 'Entretien régulier de vos espaces verts', type: 'textarea' },
  { key: 'serviceEntretienImage', value: '/accueil-elagage.avif', type: 'image' },
  
  // Page À propos
  { key: 'aboutPageTitle', value: 'À propos', type: 'text' },
  { key: 'aboutPageSubtitle', value: 'Votre paysagiste de confiance', type: 'text' },
  { key: 'aboutHistoryTitle', value: 'Notre Histoire', type: 'text' },
  { key: 'aboutHistoryContent', value: '<p>Depuis plus de 15 ans, nous créons et entretenons vos espaces verts avec passion et professionnalisme.</p>', type: 'richtext' },
  { key: 'aboutHistoryImage', value: '', type: 'image' },
  
  // Valeurs (4 tuiles)
  { key: 'aboutValue1Title', value: 'Expertise', type: 'text' },
  { key: 'aboutValue1Desc', value: 'Plus de 15 ans d\'expérience', type: 'textarea' },
  { key: 'aboutValue1Image', value: '', type: 'image' },
  { key: 'aboutValue2Title', value: 'Qualité', type: 'text' },
  { key: 'aboutValue2Desc', value: 'Des matériaux de première qualité', type: 'textarea' },
  { key: 'aboutValue2Image', value: '', type: 'image' },
  { key: 'aboutValue3Title', value: 'Écoute', type: 'text' },
  { key: 'aboutValue3Desc', value: 'À l\'écoute de vos besoins', type: 'textarea' },
  { key: 'aboutValue3Image', value: '', type: 'image' },
  { key: 'aboutValue4Title', value: 'Engagement', type: 'text' },
  { key: 'aboutValue4Desc', value: 'Respect des délais et du budget', type: 'textarea' },
  { key: 'aboutValue4Image', value: '', type: 'image' },
  
  // Expertise
  { key: 'aboutExpertiseTitle', value: 'Notre Expertise', type: 'text' },
  { key: 'aboutExpertiseContent', value: '<p>Nous maîtrisons tous les aspects de l\'aménagement paysager.</p>', type: 'richtext' },
  
  // Statistiques
  { key: 'statsClients', value: '200+', type: 'text' },
  { key: 'statsClientsLabel', value: 'Clients fidélisés', type: 'text' },
  { key: 'statsProjects', value: '500+', type: 'text' },
  { key: 'statsProjectsLabel', value: 'Chantiers réalisés', type: 'text' },
  { key: 'statsYears', value: '15+', type: 'text' },
  { key: 'statsYearsLabel', value: 'Années d\'expérience', type: 'text' },
];

async function main() {
  console.log('⚙️  Ajout des paramètres manquants...\n');

  let added = 0;
  let existing = 0;

  for (const setting of allSettings) {
    const exists = await prisma.setting.findFirst({
      where: { key: setting.key },
    });

    if (!exists) {
      await prisma.setting.create({ data: setting });
      console.log(`✅ Ajouté: ${setting.key}`);
      added++;
    } else {
      existing++;
    }
  }

  console.log(`\n📊 Résumé:`);
  console.log(`  - ${added} paramètre(s) ajouté(s)`);
  console.log(`  - ${existing} paramètre(s) existant(s)`);
  console.log(`  - Total: ${added + existing} paramètres`);
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
