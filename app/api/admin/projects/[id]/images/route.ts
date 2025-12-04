import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// POST - Add image to project
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { url, alt } = body

    if (!url) {
      return NextResponse.json({ error: 'URL requise' }, { status: 400 })
    }

    // Get the highest order number for this project
    const lastImage = await prisma.image.findFirst({
      where: { projectId: id },
      orderBy: { order: 'desc' },
    })

    const image = await prisma.image.create({
      data: {
        url,
        alt: alt || null,
        order: (lastImage?.order || 0) + 1,
        projectId: id,
      },
    })

    return NextResponse.json(image, { status: 201 })
  } catch (error) {
    console.error('Error adding image:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
