import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

export interface ContactEmailData {
  name: string
  email: string
  phone?: string
  service: string
  message: string
}

export async function sendContactEmail(data: ContactEmailData) {
  const { name, email, phone, service, message } = data

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #16a34a;">Nouvelle demande de contact - Les Jardins d'Alexandre</h2>
      
      <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Informations du contact</h3>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${phone ? `<p><strong>Téléphone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
        <p><strong>Service demandé:</strong> ${service}</p>
      </div>

      <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h3 style="margin-top: 0;">Message</h3>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>

      <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
        Ce message a été envoyé depuis le formulaire de contact du site Les Jardins d'Alexandre.
      </p>
    </div>
  `

  const textContent = `
Nouvelle demande de contact - Les Jardins d'Alexandre

Informations du contact:
Nom: ${name}
Email: ${email}
${phone ? `Téléphone: ${phone}` : ''}
Service demandé: ${service}

Message:
${message}

---
Ce message a été envoyé depuis le formulaire de contact du site Les Jardins d'Alexandre.
  `

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.CONTACT_EMAIL,
    replyTo: email,
    subject: `Nouvelle demande de contact - ${service}`,
    text: textContent,
    html: htmlContent,
  })
}
