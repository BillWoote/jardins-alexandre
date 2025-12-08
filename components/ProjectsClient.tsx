'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import PageHero from '@/components/PageHero'

interface Project {
  id: string
  title: string
  slug: string
  category: string
  location: string
  description: string | null
  images: Array<{
    id: string
    url: string
    alt: string | null
  }>
}

interface ProjectsPageProps {
  projects: Project[]
  slogan?: string
}

export default function ProjectsClient({ projects, slogan = "Découvrez notre portfolio de projets d'aménagements extérieurs" }: ProjectsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('tous')

  const categories = [
    { id: 'tous', name: 'Tous' },
    { id: 'terrasse', name: 'Terrasses' },
    { id: 'jardin', name: 'Jardins' },
    { id: 'elagage', name: 'Élagage' },
  ]

  const filteredProjects =
    selectedCategory === 'tous'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <PageHero 
        title="Nos Réalisations" 
        subtitle={slogan}
      />

      {/* Filters */}
      <div className="bg-white border-b sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/realisations/${project.slug}`}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
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
                  <div className="absolute top-4 right-4">
                    <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-primary-700 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    📍 {project.location}
                  </p>
                  {project.description && (
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {project.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">
              Aucune réalisation dans cette catégorie pour le moment.
            </p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="bg-primary-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Envie de concrétiser votre projet ?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Contactez-nous pour un devis gratuit et personnalisé
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Demander un devis
          </Link>
        </div>
      </div>
    </div>
  )
}
