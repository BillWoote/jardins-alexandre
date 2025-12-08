import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/config/site'
import { prisma } from '@/lib/prisma'
import PageHero from '@/components/PageHero'

export const revalidate = 0 // Disable caching for this page
export const dynamic = 'force-dynamic' // Force dynamic rendering

export default async function HomePage() {
  // Fetch settings from database
  const settings = await prisma.setting.findMany({
    orderBy: { id: 'desc' }
  })
  const settingsMap = Object.fromEntries(
    settings.map(s => [s.key, s.value])
  )
  
  const slogan = settingsMap.siteSlogan || settingsMap.site_slogan || siteConfig.slogan
  const phone = settingsMap.phone || settingsMap.contact_phone || siteConfig.contact.phone
  
  // Get service images for home page
  const serviceImages = {
    terrasse: settingsMap.homeTerrasseImage || '/accueil-terrasse.avif',
    jardin: settingsMap.homeJardinImage || '/accueil-jardin.avif',
    elagage: settingsMap.homeElagageImage || '/accueil-elagage.avif',
    entretien: settingsMap.homeEntretienImage || '/accueil-elagage.avif',
  }
  
  // Get service titles and descriptions
  const serviceTitles = {
    terrasses: settingsMap.homeTerrasseTitle || 'Terrasses Urbaines',
    jardins: settingsMap.homeJardinTitle || 'Jardins & Aménagements',
    elagage: settingsMap.homeElagageTitle || 'Élagage & Entretien',
    entretien: settingsMap.homeEntretienTitle || 'Entretien',
  }
  
  const serviceDescriptions = {
    terrasses: settingsMap.homeTerrasseDesc || 'Aménagement et création de terrasses élégantes en milieu urbain',
    jardins: settingsMap.homeJardinDesc || 'Conception et réalisation de jardins sur mesure',
    elagage: settingsMap.homeElagageDesc || 'Taille et entretien professionnel de vos arbres',
    entretien: settingsMap.homeEntretienDesc || 'Entretien régulier de vos espaces verts',
  }
  
  console.log('Service images:', serviceImages)
  
  // Fetch featured projects
  const featuredProjects = await prisma.project.findMany({
    where: { published: true },
    include: { images: { orderBy: { order: 'asc' }, take: 1 } },
    orderBy: { createdAt: 'desc' },
    take: 6,
  })

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] lg:h-[500px] flex items-center justify-center bg-gradient-to-br from-primary-900 to-primary-700">
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Image on full background */}
        <div className="absolute inset-0 z-0 hidden lg:block overflow-hidden">
          <Image
            src="/acceuil-fonds.webp"
            alt="Jardinage"
            fill
            className="object-cover opacity-10 mix-blend-soft-light"
          />
        </div>
        
        {/* Container with flexbox for logo + text on laptop */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-center lg:justify-between gap-8">
            {/* Logo à gauche - responsive size */}
            <div className="flex-shrink-0 hidden lg:block">
              <div className="relative w-[250px] h-[193px] xl:w-[350px] xl:h-[270px] 2xl:w-[450px] 2xl:h-[347px]">
                <Image
                  src="/logo-final.avif"
                  alt="Les Jardins d'Alexandre"
                  fill
                  className="drop-shadow-2xl object-contain"
                />
              </div>
            </div>
            
            {/* Text content on the right */}
            <div className="text-center lg:text-left text-white flex-1 lg:max-w-2xl xl:max-w-3xl">
              <h1 className="text-5xl md:text-6xl lg:text-4xl xl:text-6xl font-bold mb-6">
                {siteConfig.name}
              </h1>
              <p className="text-2xl md:text-3xl lg:text-2xl xl:text-3xl mb-8 font-light">
                {slogan}
              </p>
              <p className="text-lg md:text-xl mb-10 text-gray-100">
                Paysagiste pour terrasses, jardins et élagage en Île-de-France
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/realisations"
                  className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
                >
                  Voir nos réalisations
                </Link>
                <Link
                  href="/contact"
                  className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-lg border-2 border-white"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos services
            </h2>
            <div 
              className="text-xl text-gray-600 max-w-2xl mx-auto prose prose-lg"
              dangerouslySetInnerHTML={{ 
                __html: settingsMap.homeServicesSubtitle || 'Des services professionnels pour tous vos projets d\'aménagement extérieur' 
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {siteConfig.services.map((service, index) => {
              // Map service to the correct image
              const imageMap: { [key: string]: string } = {
                'terrasses': serviceImages.terrasse,
                'jardins': serviceImages.jardin,
                'elagage': serviceImages.elagage,
                'entretien': serviceImages.entretien,
              }
              const serviceImage = imageMap[service.slug] || serviceImages.terrasse
              const serviceTitle = serviceTitles[service.slug as keyof typeof serviceTitles] || service.name
              const serviceDesc = serviceDescriptions[service.slug as keyof typeof serviceDescriptions] || service.description

              return (
                <Link
                  key={service.id}
                  href={`/services#${service.slug}`}
                  className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
                    <img
                      src={serviceImage}
                      alt={serviceTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors text-center min-h-[64px] flex items-center justify-center">
                      {serviceTitle}
                    </h3>
                    <div 
                      className="text-gray-600 prose prose-sm max-w-none text-center"
                      dangerouslySetInnerHTML={{ __html: serviceDesc }}
                    />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Quelques réalisations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez nos derniers projets et laissez-vous inspirer
            </p>
          </div>

          {featuredProjects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/realisations/${project.slug}`}
                    className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="relative h-64 bg-gray-200">
                      {project.images[0] && (
                        <Image
                          src={project.images[0].url}
                          alt={project.images[0].alt || project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-3">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm">📍 {project.location}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link
                  href="/realisations"
                  className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Voir toutes nos réalisations
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-600">
              <p>Aucune réalisation pour le moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div className="p-6">
              <div className="text-5xl md:text-6xl font-bold mb-2">200+</div>
              <div className="text-xl md:text-2xl text-primary-100">Clients fidélisés</div>
            </div>
            <div className="p-6">
              <div className="text-5xl md:text-6xl font-bold mb-2">500+</div>
              <div className="text-xl md:text-2xl text-primary-100">Chantiers réalisés</div>
            </div>
            <div className="p-6">
              <div className="text-5xl md:text-6xl font-bold mb-2">15+</div>
              <div className="text-xl md:text-2xl text-primary-100">Années d'expérience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Un service professionnel et personnalisé pour chaque projet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {siteConfig.benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Un projet d'aménagement extérieur ?
          </h2>
          <p className="text-xl mb-10 text-primary-100">
            Contactez-nous pour un devis gratuit et personnalisé
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              Demander un devis
            </Link>
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-800 transition-colors text-lg border-2 border-white"
            >
              {phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
