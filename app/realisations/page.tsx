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

  // Fetch slogan from settings
  const settings = await prisma.setting.findMany()
  const settingsMap = Object.fromEntries(
    settings.map(s => [s.key, s.value])
  )
  const realisationsSlogan = settingsMap.realisationsSlogan || "Découvrez notre portfolio de projets d'aménagements extérieurs"

  return <ProjectsClient projects={projects} slogan={realisationsSlogan} />
}
