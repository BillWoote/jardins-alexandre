import ContactForm from '@/components/ContactForm'
import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { prisma } from '@/lib/prisma'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez Les Jardins d\'Alexandre pour votre projet d\'aménagement extérieur.',
}

// Désactiver le cache pour que les modifications admin soient visibles immédiatement
export const revalidate = 0

export default async function ContactPage() {
  const settings = await prisma.setting.findMany()
  const settingsMap = Object.fromEntries(
    settings.map(s => [s.key, s.value])
  )

  const phone = settingsMap.phone || settingsMap.contact_phone || siteConfig.contact.phone
  const email = settingsMap.email || settingsMap.contact_email || siteConfig.contact.email
  const address = settingsMap.address || siteConfig.contact.address
  const serviceArea = settingsMap.serviceArea || siteConfig.contact.address
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <PageHero 
        title="Contactez-nous" 
        subtitle="Parlons de votre projet d'aménagement extérieur"
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Nos coordonnées
            </h2>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Téléphone
                  </h3>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="text-primary-600 hover:text-primary-700 text-lg"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Email
                  </h3>
                  <a
                    href={`mailto:${email}`}
                    className="text-primary-600 hover:text-primary-700 text-lg"
                  >
                    {email}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Zone d'intervention
                  </h3>
                  <p className="text-gray-600">{serviceArea}</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Adresse
                  </h3>
                  <p className="text-gray-600 whitespace-pre-line">{address}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Horaires
                  </h3>
                  <p className="text-gray-600">Lundi - Samedi : 8h - 19h</p>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-8 bg-primary-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                ⏱️ Réponse rapide
              </h3>
              <p className="text-gray-600">
                Nous nous engageons à répondre à votre demande dans les 24 heures
                ouvrées. Pour une urgence, n'hésitez pas à nous appeler directement.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Envoyez-nous un message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Vous préférez nous appeler ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Notre équipe est à votre écoute du lundi au samedi
          </p>
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-lg"
          >
            📞 {phone}
          </a>
        </div>
      </div>
    </div>
  )
}
