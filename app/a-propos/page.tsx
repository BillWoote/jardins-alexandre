import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { prisma } from '@/lib/prisma'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'À propos',
  description: 'Découvrez Les Jardins d\'Alexandre, votre paysagiste professionnel en Île-de-France.',
}

// Désactiver le cache pour que les modifications admin soient visibles immédiatement
export const revalidate = 0

export default async function AboutPage() {
  // Fetch settings from database
  const settings = await prisma.setting.findMany()
  const settingsMap = Object.fromEntries(
    settings.map(s => [s.key, s.value])
  )
  
  // Notre Histoire
  const aboutHistoryImage = settingsMap.aboutHistoryImage || '/accueil-LOGO.avif'
  const aboutHistoryTitle = settingsMap.aboutHistoryTitle || 'Notre Histoire'
  const aboutHistoryContent = settingsMap.aboutHistoryContent || settingsMap.description || ''
  
  // Nos Valeurs
  const value1Image = settingsMap.aboutValue1Image || ''
  const value1Title = settingsMap.aboutValue1Title || 'Créativité & Sur-mesure'
  const value1Desc = settingsMap.aboutValue1Desc || 'Chaque projet est conçu selon vos goûts et vos contraintes pour créer un espace qui vous ressemble.'
  
  const value2Image = settingsMap.aboutValue2Image || ''
  const value2Title = settingsMap.aboutValue2Title || 'Respect de l\'environnement'
  const value2Desc = settingsMap.aboutValue2Desc || 'Nous privilégions des solutions écologiques et des végétaux adaptés au climat local.'
  
  const value3Image = settingsMap.aboutValue3Image || ''
  const value3Title = settingsMap.aboutValue3Title || 'Qualité & Professionnalisme'
  const value3Desc = settingsMap.aboutValue3Desc || 'Un travail soigné, des matériaux de qualité et le respect des délais convenus.'
  
  const value4Image = settingsMap.aboutValue4Image || ''
  const value4Title = settingsMap.aboutValue4Title || 'Accompagnement personnalisé'
  const value4Desc = settingsMap.aboutValue4Desc || 'Nous vous conseillons à chaque étape, de la conception à la réalisation de votre projet.'
  
  // Notre Expertise
  const expertiseTitle = settingsMap.aboutExpertiseTitle || 'Notre Expertise'
  const expertiseContent = settingsMap.aboutExpertiseContent || ''
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <PageHero 
        title="À propos" 
        subtitle="Votre partenaire de confiance pour tous vos projets d'aménagement extérieur"
      />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Main Story */}
        <section className="mb-16">
          <div className="flex justify-center mb-8">
            <Image
              src={aboutHistoryImage}
              alt="Les Jardins d'Alexandre"
              width={500}
              height={500}
              className="drop-shadow-xl"
            />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {aboutHistoryTitle}
          </h2>
          
          <div className="prose prose-lg max-w-none text-center">
            {aboutHistoryContent ? (
              <div 
                className="text-gray-600 text-lg leading-relaxed prose prose-lg max-w-none text-center"
                dangerouslySetInnerHTML={{ __html: aboutHistoryContent }}
              />
            ) : (
              <>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Fondée par Alexandre, passionné de nature et d'aménagements paysagers,
                  <strong> Les Jardins d'Alexandre</strong> est née de la volonté de créer
                  des espaces verts exceptionnels en milieu urbain et périurbain.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Fort de nombreuses années d'expérience dans le domaine du paysage,
                  notre équipe met son savoir-faire au service de vos projets, qu'il
                  s'agisse de l'aménagement d'une terrasse urbaine, de la création d'un
                  jardin complet ou de l'entretien de vos arbres.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Chaque projet est unique et mérite une attention particulière. C'est
                  pourquoi nous prenons le temps d'écouter vos besoins, de comprendre
                  vos envies et de concevoir des solutions sur mesure qui transformeront
                  votre extérieur en véritable oasis de verdure.
                </p>
              </>
            )}
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Nos Valeurs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl overflow-hidden">
              {value1Image && (
                <div className="w-full h-48 relative">
                  <Image
                    src={value1Image}
                    alt={value1Title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value1Title}
                </h3>
                <p className="text-gray-600">
                  {value1Desc}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl overflow-hidden">
              {value2Image && (
                <div className="w-full h-48 relative">
                  <Image
                    src={value2Image}
                    alt={value2Title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value2Title}
                </h3>
                <p className="text-gray-600">
                  {value2Desc}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl overflow-hidden">
              {value3Image && (
                <div className="w-full h-48 relative">
                  <Image
                    src={value3Image}
                    alt={value3Title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value3Title}
                </h3>
                <p className="text-gray-600">
                  {value3Desc}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl overflow-hidden">
              {value4Image && (
                <div className="w-full h-48 relative">
                  <Image
                    src={value4Image}
                    alt={value4Title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value4Title}
                </h3>
                <p className="text-gray-600">
                  {value4Desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise */}
        <section className="mb-16 bg-primary-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            {expertiseTitle}
          </h2>
          {expertiseContent ? (
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: expertiseContent }}
            />
          ) : (
            <div className="prose prose-lg max-w-none">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3 text-xl">✓</span>
                  <span>Conception paysagère et plans d'aménagement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3 text-xl">✓</span>
                  <span>Maîtrise des techniques de plantation et d'arrosage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3 text-xl">✓</span>
                  <span>Connaissance approfondie des végétaux et de leurs besoins</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3 text-xl">✓</span>
                  <span>Certification en élagage et travaux en hauteur</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3 text-xl">✓</span>
                  <span>Assurance responsabilité civile professionnelle</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3 text-xl">✓</span>
                  <span>Respect des normes de sécurité et de l'environnement</span>
                </li>
              </ul>
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Parlons de votre projet
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Nous serions ravis de discuter de vos idées et de vous accompagner
            dans leur réalisation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Nous contacter
            </Link>
            <Link
              href="/realisations"
              className="bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Voir nos réalisations
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
