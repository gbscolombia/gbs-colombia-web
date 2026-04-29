'use client';

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

export const analytics = {
  whatsappClick: (location: string, context?: string) => {
    trackEvent('whatsapp_click', {
      event_category: 'contact',
      button_location: location,
      message_context: context
    });
    window.fbq?.('track', 'Contact');
  },

  phoneClick: () => {
    trackEvent('phone_click', { event_category: 'contact' });
    window.fbq?.('track', 'Contact');
  },

  emailClick: () => {
    trackEvent('email_click', { event_category: 'contact' });
  },

  diagnosticStarted: () => {
    trackEvent('diagnostic_started', { event_category: 'engagement' });
    window.fbq?.('track', 'InitiateCheckout');
  },

  diagnosticStepCompleted: (step: number, stepName: string) => {
    trackEvent('diagnostic_step_completed', {
      event_category: 'engagement',
      step_number: step,
      step_name: stepName
    });
  },

  diagnosticCompleted: (referenceCode: string, input: Record<string, unknown>) => {
    trackEvent('diagnostic_completed', {
      event_category: 'conversion',
      reference_code: referenceCode,
      operation: input.operation,
      material: input.material,
      conditions_count: Array.isArray(input.conditions) ? input.conditions.length : 0,
      belt_width: input.width,
      belt_length: input.length
    });
    window.fbq?.('track', 'Lead');
  },

  diagnosticConvertedWhatsapp: (referenceCode: string) => {
    trackEvent('diagnostic_converted_whatsapp', {
      event_category: 'conversion',
      reference_code: referenceCode
    });
    window.fbq?.('track', 'SubmitApplication');
  },

  diagnosticDownloadedOnly: (referenceCode: string) => {
    trackEvent('diagnostic_downloaded_only', {
      event_category: 'engagement',
      reference_code: referenceCode
    });
  },

  pdfGenerated: (referenceCode: string) => {
    trackEvent('pdf_generated', {
      event_category: 'engagement',
      reference_code: referenceCode
    });
  },

  catalogDownload: (catalog: string) => {
    trackEvent('catalog_download', {
      event_category: 'catalog',
      catalog_type: catalog
    });
    window.fbq?.('track', 'ViewContent', { content_type: catalog });
  },

  productView: (slug: string, category: string) => {
    trackEvent('product_view', {
      event_category: 'catalog',
      product_slug: slug,
      product_category: category
    });
  },

  glossaryTermView: (slug: string) => {
    trackEvent('glossary_term_view', {
      event_category: 'resources',
      term_slug: slug
    });
  },

  landingView: (campaign: string) => {
    trackEvent('landing_view', {
      event_category: 'marketing',
      campaign_name: campaign
    });
  },

  assistantOpen: (location: string) => {
    trackEvent('assistant_open', {
      event_category: 'engagement',
      button_location: location
    });
    window.fbq?.('track', 'ViewContent', { content_type: 'ai_assistant' });
  },

  assistantMessage: (turn: number) => {
    trackEvent('assistant_message', {
      event_category: 'engagement',
      turn_number: turn
    });
  }
};
