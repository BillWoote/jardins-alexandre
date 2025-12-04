import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
}

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Politique de confidentialité
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Collecte des données
            </h2>
            <p className="text-gray-600">
              {siteConfig.name} collecte des données personnelles uniquement via
              le formulaire de contact. Les informations collectées sont :
            </p>
            <ul className="text-gray-600">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone (optionnel)</li>
              <li>Le contenu de votre message</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Utilisation des données
            </h2>
            <p className="text-gray-600">
              Les données collectées sont utilisées exclusivement pour :
            </p>
            <ul className="text-gray-600">
              <li>Répondre à votre demande de contact</li>
              <li>Vous fournir un devis ou des informations sur nos services</li>
              <li>Assurer le suivi de votre demande</li>
            </ul>
            <p className="text-gray-600 mt-4">
              Vos données ne sont jamais vendues, louées ou partagées avec des
              tiers à des fins commerciales.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Conservation des données
            </h2>
            <p className="text-gray-600">
              Vos données sont conservées pendant la durée nécessaire au
              traitement de votre demande, puis archivées conformément aux
              obligations légales.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Vos droits
            </h2>
            <p className="text-gray-600">
              Conformément au Règlement Général sur la Protection des Données
              (RGPD), vous disposez des droits suivants :
            </p>
            <ul className="text-gray-600">
              <li>Droit d'accès à vos données personnelles</li>
              <li>Droit de rectification de vos données</li>
              <li>Droit à l'effacement de vos données</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit d'opposition au traitement</li>
              <li>Droit à la portabilité de vos données</li>
            </ul>
            <p className="text-gray-600 mt-4">
              Pour exercer ces droits, contactez-nous à :{' '}
              {siteConfig.contact.email}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Sécurité des données
            </h2>
            <p className="text-gray-600">
              Nous mettons en œuvre toutes les mesures techniques et
              organisationnelles appropriées pour protéger vos données contre
              tout accès non autorisé, modification, divulgation ou destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies</h2>
            <p className="text-gray-600">
              Notre site utilise uniquement des cookies techniques nécessaires
              au bon fonctionnement du site. Aucun cookie de traçage ou
              publicitaire n'est utilisé.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact</h2>
            <p className="text-gray-600">
              Pour toute question concernant cette politique de confidentialité,
              vous pouvez nous contacter :
            </p>
            <ul className="text-gray-600">
              <li>Email : {siteConfig.contact.email}</li>
              <li>Téléphone : {siteConfig.contact.phone}</li>
            </ul>
          </section>

          <p className="text-sm text-gray-500 mt-8">
            Dernière mise à jour : 21 novembre 2025
          </p>
        </div>
      </div>
    </div>
  )
}
