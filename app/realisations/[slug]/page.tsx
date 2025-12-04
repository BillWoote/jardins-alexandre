import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import Lightbox from '@/components/Lightbox'

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await prisma.project.findUnique({
    where: { slug },
  })

  if (!project) {
    return {
      title: 'Projet non trouvé',
    }
  }

  return {
    title: project.title,
    description: project.description || `Découvrez notre projet ${project.title} à ${project.location}`,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      images: {
        orderBy: { order: 'asc' },
      },
    },
  })

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary-600">
              Accueil
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/realisations"
              className="text-gray-500 hover:text-primary-600"
            >
              Réalisations
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{project.title}</span>
          </nav>
        </div>
      </div>

      {/* Project Header */}
      <div className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-medium">
              {project.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-primary-100">📍 {project.location}</p>
        </div>
      </div>

      {/* Project Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Description */}
        {project.description && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              À propos de ce projet
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {project.description}
            </p>
          </div>
        )}

        {/* Images Gallery */}
        {project.images.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Galerie photos
            </h2>
            <Lightbox images={project.images} />
          </div>
        )}

        {/* CTA */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Un projet similaire en tête ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contactez-nous pour discuter de votre projet et obtenir un devis
            personnalisé
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Demander un devis
            </Link>
            <Link
              href="/realisations"
              className="bg-gray-200 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Voir toutes les réalisations
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
