import { ENV } from '../config/env';

type WebhookEvent = 
  | 'new_application' 
  | 'status_changed' 
  | 'new_document' 
  | 'payment_completed' 
  | 'contact_enquiry';

export const triggerN8NWebhook = async (
  event: WebhookEvent,
  payload: Record<string, any>
): Promise<boolean> => {
  let webhookUrl = '';

  switch (event) {
    case 'new_application':
      webhookUrl = ENV.N8N_WEBHOOK_NEW_APPLICATION;
      break;
    case 'status_changed':
      webhookUrl = ENV.N8N_WEBHOOK_STATUS_CHANGED;
      break;
    case 'new_document':
      webhookUrl = ENV.N8N_WEBHOOK_NEW_DOCUMENT;
      break;
    case 'payment_completed':
      webhookUrl = ENV.N8N_WEBHOOK_PAYMENT_COMPLETED;
      break;
    case 'contact_enquiry':
      webhookUrl = ENV.N8N_WEBHOOK_CONTACT_ENQUIRY;
      break;
  }

  if (!webhookUrl) {
    // If webhook is not configured, log silently for developer reference
    return false;
  }

  try {
    const sanitizedPayload = {
      event,
      timestamp: new Date().toISOString(),
      source: 'ASAW Consultancy Services Platform',
      data: payload,
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'ASAW-Consultancy-Backend/1.0',
      },
      body: JSON.stringify(sanitizedPayload),
    });

    return response.ok;
  } catch (error: any) {
    // Graceful failure handling without sensitive exposure
    console.warn(`[n8n Automation] Webhook trigger for "${event}" failed:`, error.message || 'Network error');
    return false;
  }
};
