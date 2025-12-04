import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Mentions légales',
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Mentions légales</h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Éditeur du site</h2>
            <p className="text-gray-600">
              Le site {siteConfig.name} est édité par :
            </p>
            <ul className="text-gray-600">
              <li>Raison sociale : {siteConfig.name}</li>
              <li>Email : {siteConfig.contact.email}</li>
              <li>Téléphone : {siteConfig.contact.phone}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Hébergeur</h2>
            <p className="text-gray-600">
              Le site est hébergé par Vercel Inc.<br />
              340 S Lemon Ave #4133<br />
              Walnut, CA 91789<br />
              États-Unis
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Propriété intellectuelle
            </h2>
            <p className="text-gray-600">
              L'ensemble de ce site relève de la législation française et
              internationale sur le droit d'auteur et la propriété intellectuelle.
              Tous les droits de reproduction sont réservés, y compris pour les
              documents téléchargeables et les représentations iconographiques et
              photographiques.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Protection des données personnelles
            </h2>
            <p className="text-gray-600">
              Les données collectées via le formulaire de contact sont uniquement
              utilisées pour répondre à votre demande. Conformément à la loi
              "Informatique et Libertés" et au RGPD, vous disposez d'un droit
              d'accès, de rectification et de suppression des données vous
              concernant. Pour exercer ce droit, contactez-nous à l'adresse :
              {siteConfig.contact.email}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies</h2>
            <p className="text-gray-600">
              Ce site utilise des cookies techniques nécessaires au bon
              fonctionnement du site. Aucun cookie publicitaire ou de traçage
              n'est utilisé.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
