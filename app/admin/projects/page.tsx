import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function AdminProjectsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      images: {
        take: 1,
        orderBy: { order: 'asc' },
      },
      _count: {
        select: { images: true },
      },
    },
  })

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <Link
                href="/admin"
                className="text-primary-600 hover:text-primary-700 text-sm mb-2 inline-block"
              >
                ← Retour au tableau de bord
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Projets</h1>
              <p className="text-gray-600">Gérer tous les projets</p>
            </div>
            <Link
              href="/admin/projects/new"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              + Nouveau projet
            </Link>
          </div>
        </div>
      </header>

      {/* Projects List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {projects.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun projet
            </h3>
            <p className="text-gray-600 mb-6">
              Commencez par créer votre premier projet
            </p>
            <Link
              href="/admin/projects/new"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Créer un projet
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Project Image */}
                <div className="h-48 bg-gray-200 relative">
                  {project.images[0] ? (
                    <img
                      src={project.images[0].url}
                      alt={project.images[0].alt || project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span className="text-6xl">🖼️</span>
                    </div>
                  )}
                  {!project.published && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                      Brouillon
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      🏷️ {project.category}
                    </span>
                    <span className="flex items-center gap-1">
                      📸 {project._count.images}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="flex-1 bg-primary-600 text-white text-center px-4 py-2 rounded hover:bg-primary-700 transition-colors text-sm font-medium"
                    >
                      Modifier
                    </Link>
                    <Link
                      href={`/realisations/${project.slug}`}
                      target="_blank"
                      className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm"
                    >
                      👁️
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
