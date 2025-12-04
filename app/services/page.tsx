import Link from 'next/link'
import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { prisma } from '@/lib/prisma'
import PageHero from '@/components/PageHero'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Nos Services',
  description: 'Découvrez nos services d\'aménagement extérieur : terrasses urbaines, jardins et élagage.',
}

export default async function ServicesPage() {
  // Fetch settings from database
  const settings = await prisma.setting.findMany()
  const settingsMap = Object.fromEntries(
    settings.map(s => [s.key, s.value])
  )
  
  const images = {
    terrasse: settingsMap.serviceTerrasseImage || '/accueil-terrasse.avif',
    jardin: settingsMap.serviceJardinImage || '/accueil-jardin.avif',
    elagage: settingsMap.serviceElagageImage || '/accueil-elagage.avif',
    entretien: settingsMap.serviceEntretienImage || '/accueil-jardin.avif',
  }
  
  const servicesPageTitle = settingsMap.servicesPageTitle || 'Nos Services'
  const servicesPageSubtitle = settingsMap.servicesPageSubtitle || 'Des solutions complètes pour tous vos projets d\'aménagement extérieur'
  
  const serviceTerrasseTitle = settingsMap.serviceTerrasseTitle || 'Terrasses Urbaines'
  const serviceTerrasseContent = settingsMap.serviceTerrasseContent || '<p>Transformez votre terrasse urbaine en un véritable havre de paix.</p>'
  
  const serviceJardinTitle = settingsMap.serviceJardinTitle || 'Jardins & Aménagements'
  const serviceJardinContent = settingsMap.serviceJardinContent || '<p>Créez le jardin de vos rêves avec notre expertise en conception paysagère.</p>'
  
  const serviceElagageTitle = settingsMap.serviceElagageTitle || 'Élagage'
  const serviceElagageContent = settingsMap.serviceElagageContent || '<p>Préservez la santé et la beauté de vos arbres avec nos services d\'élagage professionnel.</p>'
  
  const serviceEntretienTitle = settingsMap.serviceEntretienTitle || 'Entretien'
  const serviceEntretienContent = settingsMap.serviceEntretienContent || '<p>Services d\'entretien régulier de vos espaces verts.</p>'
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <PageHero 
        title={servicesPageTitle} 
        subtitle={servicesPageSubtitle.replace(/<[^>]*>/g, '')}
      />

      {/* Services Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Terrasses */}
        <section id="terrasses" className="mb-24 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {serviceTerrasseTitle}
              </h2>
              <div 
                className="prose prose-lg text-gray-600"
                dangerouslySetInnerHTML={{ __html: serviceTerrasseContent }}
              />
            </div>
            <div className="relative rounded-2xl h-96 overflow-hidden">
              <img 
                src={images.terrasse} 
                alt="Terrasse urbaine aménagée" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Jardins */}
        <section id="jardins" className="mb-24 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative rounded-2xl h-96 overflow-hidden">
              <img 
                src={images.jardin} 
                alt="Jardin aménagé" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {serviceJardinTitle}
              </h2>
              <div 
                className="prose prose-lg text-gray-600"
                dangerouslySetInnerHTML={{ __html: serviceJardinContent }}
              />
            </div>
          </div>
        </section>

        {/* Élagage */}
        <section id="elagage" className="mb-24 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {serviceElagageTitle}
              </h2>
              <div 
                className="prose prose-lg text-gray-600"
                dangerouslySetInnerHTML={{ __html: serviceElagageContent }}
              />
            </div>
            <div className="relative rounded-2xl h-96 overflow-hidden">
              <img 
                src={images.elagage} 
                alt="Élagage professionnel" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Entretien */}
        <section id="entretien" className="mb-24 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative rounded-2xl h-96 overflow-hidden">
              <img 
                src={images.entretien} 
                alt="Entretien des espaces verts" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {serviceEntretienTitle}
              </h2>
              <div 
                className="prose prose-lg text-gray-600"
                dangerouslySetInnerHTML={{ __html: serviceEntretienContent }}
              />
            </div>
          </div>
        </section>

        {/* Zone d'intervention */}
        <section className="bg-gray-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Zone d'Intervention
          </h2>
          <p className="text-xl text-gray-600 text-center mb-8">
            Nous intervenons dans toute l'Île-de-France
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {siteConfig.interventionZones.map((zone) => (
              <div
                key={zone}
                className="bg-white rounded-lg p-4 text-center shadow-sm"
              >
                <p className="font-medium text-gray-900">{zone}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="bg-primary-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Besoin d'un devis pour votre projet ?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Contactez-nous pour discuter de vos besoins
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Demander un devis gratuit
          </Link>
        </div>
      </div>
    </div>
  )
}
