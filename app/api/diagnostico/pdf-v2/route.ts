import { renderToBuffer } from '@react-pdf/renderer';
import QRCode from 'qrcode';
import React from 'react';
import { BriefPDFDocumentV2 } from '@/components/diagnostic/BriefPDFDocumentV2';
import { briefVerifyUrl } from '@/lib/diagnostic/brief-generator';
import { isValidReferenceCode } from '@/lib/utils/reference-code';
import { rateLimit, getClientIp, sweep } from '@/lib/server/rate-limit';
import { getLogoDataUrl } from '@/lib/server/brand-assets';
import type { DiagnosticBriefV2 } from '@/lib/diagnostic/diagnostic-data';

export const runtime = 'nodejs';

/**
 * POST /api/diagnostico/pdf-v2
 * Body: { brief: DiagnosticBriefV2 }
 * Returns: application/pdf stream named GBS-Brief-<code>.pdf
 *
 * The brief object is provided by the client right after a successful submit-v2,
 * so we don't need to persist anything. We re-validate the reference code shape
 * and rate-limit by IP to prevent abuse.
 */
export async function POST(request: Request) {
  sweep();
  const ip = getClientIp(request);
  const rl = rateLimit({ key: `pdf:${ip}`, limit: 30, windowSec: 3600 });
  if (!rl.ok) {
    return new Response('rate_limited', {
      status: 429,
      headers: { 'Retry-After': String(rl.retryAfterSec) }
    });
  }

  let body: { brief?: DiagnosticBriefV2 };
  try {
    body = (await request.json()) as { brief?: DiagnosticBriefV2 };
  } catch {
    return new Response('invalid_json', { status: 400 });
  }
  const brief = body.brief;
  if (!brief || typeof brief !== 'object' || !brief.code) {
    return new Response('missing_brief', { status: 400 });
  }
  if (!isValidReferenceCode(brief.code)) {
    return new Response('invalid_code', { status: 400 });
  }

  let pdf: Buffer;
  try {
    const qrDataUrl = await QRCode.toDataURL(briefVerifyUrl(brief.code), {
      margin: 0,
      width: 144,
      color: { dark: '#0A2540', light: '#FFFFFF' }
    });
    const logoDataUrl = await getLogoDataUrl();
    const element = React.createElement(BriefPDFDocumentV2, {
      brief,
      qrDataUrl,
      logoDataUrl
    }) as unknown as Parameters<typeof renderToBuffer>[0];
    pdf = await renderToBuffer(element);
  } catch (err) {
    console.error('[pdf-v2] render failed', err);
    return new Response('render_failed', { status: 500 });
  }

  return new Response(new Uint8Array(pdf), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="GBS-Brief-${brief.code}.pdf"`,
      'Cache-Control': 'no-store'
    }
  });
}
