// lib/email-graph.ts
// Envoi d'emails via Microsoft Graph API (Office 365/Microsoft 365)

import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

/**
 * Envoie un email via Microsoft Graph API
 * Nécessite une App Registration Azure avec permission Mail.Send
 */
export async function sendEmailViaGraph(options: EmailOptions): Promise<void> {
  const { to, subject, html, from } = options;

  // Vérification des variables d'environnement
  const tenantId = process.env.GRAPH_TENANT_ID;
  const clientId = process.env.GRAPH_CLIENT_ID;
  const clientSecret = process.env.GRAPH_CLIENT_SECRET;
  const senderEmail = from || process.env.EMAIL_FROM;

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error('Configuration Graph API manquante : GRAPH_TENANT_ID, GRAPH_CLIENT_ID, GRAPH_CLIENT_SECRET');
  }

  if (!senderEmail) {
    throw new Error('EMAIL_FROM doit être défini');
  }

  try {
    // Authentification avec Client Credentials Flow
    const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

    // Initialisation du client Graph
    const client = Client.initWithMiddleware({
      authProvider: {
        getAccessToken: async () => {
          const token = await credential.getToken('https://graph.microsoft.com/.default');
          return token?.token || '';
        },
      },
    });

    // Construction du message
    const message = {
      message: {
        subject,
        body: {
          contentType: 'HTML',
          content: html,
        },
        toRecipients: [
          {
            emailAddress: {
              address: to,
            },
          },
        ],
      },
      saveToSentItems: true,
    };

    // Envoi via Graph API
    // https://graph.microsoft.com/v1.0/users/{email}/sendMail
    await client.api(`/users/${senderEmail}/sendMail`).post(message);

    console.log('✅ Email envoyé via Graph API avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi via Graph API:', error);
    throw error;
  }
}
