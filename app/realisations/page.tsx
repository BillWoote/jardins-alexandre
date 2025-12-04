import { prisma } from '@/lib/prisma'
import ProjectsClient from '@/components/ProjectsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nos Réalisations',
  description: 'Découvrez notre portfolio de projets d\'aménagements extérieurs : terrasses, jardins et élagage.',
}

export default async function RealisationsPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    include: {
      images: {
        orderBy: { order: 'asc' },
      },
    },
    orderBy: { order: 'asc' },
  })

  return <ProjectsClient projects={projects} />
}
