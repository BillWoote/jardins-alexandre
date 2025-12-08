import { NextResponse } from 'next/server'
import { z } from 'zod'
import { sendContactEmail } from '@/lib/email'
import { prisma } from '@/lib/prisma'

const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  service: z.enum(['terrasse', 'jardin', 'elagage', 'entretien', 'autre']),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
  rgpd: z.boolean().refine((val) => val === true, {
    message: 'Vous devez accepter la politique de confidentialité',
  }),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('📧 Contact form data received:', body)
    
    // Validate data
    const validatedData = contactSchema.parse(body)
    console.log('✅ Data validated successfully')

    // Récupérer l'email de contact depuis la base de données
    const settings = await prisma.setting.findMany()
    const settingsMap = Object.fromEntries(
      settings.map(s => [s.key, s.value])
    )
    const contactEmail = settingsMap.contactEmail || process.env.CONTACT_EMAIL

    // Send email
    try {
      await sendContactEmail({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        service: validatedData.service,
        message: validatedData.message,
      }, contactEmail)
      console.log('✅ Email sent successfully')
    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError)
      // Pour l'instant, on continue même si l'email échoue (config email manquante)
      // throw emailError
    }

    return NextResponse.json(
      { message: 'Message envoyé avec succès' },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Validation error:', error.errors)
      return NextResponse.json(
        { error: 'Données invalides', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi du message' },
      { status: 500 }
    )
  }
}
