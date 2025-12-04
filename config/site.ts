export const siteConfig = {
  name: "Les Jardins d'Alexandre",
  slogan: "Votre partenaire pour des espaces verts d'exception",
  description: "Paysagiste professionnel spécialisé dans l'aménagement de terrasses, la création de jardins et l'élagage d'arbres.",
  url: "https://jardinsalexandre.fr",
  
  colors: {
    primary: '#16a34a',
    secondary: '#b8935d',
    accent: '#22c55e',
  },

  contact: {
    phone: '+33 6 12 34 56 78',
    email: 'contact@jardinsalexandre.fr',
    address: 'Paris et Île-de-France',
  },

  social: {
    facebook: 'https://facebook.com/jardinsalexandre',
    instagram: 'https://instagram.com/jardinsalexandre',
  },

  services: [
    {
      id: 'terrasses',
      name: 'Terrasses Urbaines',
      slug: 'terrasses',
      icon: '🏙️',
      description: 'Aménagement et création de terrasses élégantes en milieu urbain',
    },
    {
      id: 'jardins',
      name: 'Jardins & Aménagements',
      slug: 'jardins',
      icon: '🌳',
      description: 'Conception et réalisation de jardins sur mesure',
    },
    {
      id: 'elagage',
      name: 'Élagage & Entretien',
      slug: 'elagage',
      icon: '🌲',
      description: 'Taille et entretien professionnel de vos arbres',
    },
    {
      id: 'entretien',
      name: 'Entretien',
      slug: 'entretien',
      icon: '🌿',
      description: 'Entretien régulier de vos espaces verts',
    },
  ],

  interventionZones: [
    'Paris',
    'Hauts-de-Seine (92)',
    'Seine-Saint-Denis (93)',
    'Val-de-Marne (94)',
    'Seine-et-Marne (77)',
    'Yvelines (78)',
    'Essonne (91)',
    'Val-d\'Oise (95)',
  ],

  benefits: [
    {
      title: 'Conseil Personnalisé',
      description: 'Un accompagnement sur mesure pour chaque projet',
      icon: '💡',
    },
    {
      title: 'Travaux Soignés',
      description: 'Une attention particulière portée aux finitions',
      icon: '✨',
    },
    {
      title: 'Respect des Délais',
      description: 'Des interventions planifiées et ponctuelles',
      icon: '⏱️',
    },
    {
      title: 'Proximité',
      description: 'Interventions rapides en Île-de-France',
      icon: '📍',
    },
  ],
}
