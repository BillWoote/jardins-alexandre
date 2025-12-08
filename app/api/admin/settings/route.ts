import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Get all settings
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const settings = await prisma.setting.findMany()
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// PUT - Update settings
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const body = await request.json()

    // Map frontend field names to database keys
    const keyMapping: Record<string, string> = {
      email: 'contact_email',
      phone: 'contact_phone',
      siteName: 'site_name',
      siteSlogan: 'site_slogan',
    }

    // Update or create each setting
    const updates = Object.entries(body).map(([key, value]) => {
      const dbKey = keyMapping[key] || key
      return prisma.setting.upsert({
        where: { key: dbKey },
        update: { value: value as string },
        create: { key: dbKey, value: value as string },
      })
    })

    await Promise.all(updates)

    const settings = await prisma.setting.findMany()
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
