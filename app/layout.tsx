import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { siteConfig } from '@/config/site'
import { prisma } from '@/lib/prisma'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  // Charger la description depuis la base de données
  const settings = await prisma.setting.findMany()
  const settingsMap = Object.fromEntries(settings.map(s => [s.key, s.value]))
  const description = settingsMap.description || siteConfig.description

  return {
    title: {
      default: `${siteConfig.name} - Paysagiste professionnel`,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords: [
      'paysagiste',
      'terrasse',
      'jardin',
      'élagage',
      'aménagement extérieur',
      'Île-de-France',
      'Paris',
    ],
    authors: [{ name: siteConfig.name }],
    icons: {
      icon: '/logo.avif',
      apple: '/logo.avif',
    },
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: siteConfig.url || 'https://jardinsalexandre.fr',
      siteName: siteConfig.name,
      title: siteConfig.name,
      description,
      images: [
        {
          url: '/logo.avif',
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch settings from database
  const settings = await prisma.setting.findMany()
  const settingsMap = Object.fromEntries(
    settings.map(s => [s.key, s.value])
  )

  return (
    <html lang="fr">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer settings={settingsMap} />
        </div>
      </body>
    </html>
  )
}
