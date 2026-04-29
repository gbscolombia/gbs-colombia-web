import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { renderToBuffer } from '@react-pdf/renderer';
import QRCode from 'qrcode';
import React from 'react';
import { createBriefV2, briefVerifyUrl, briefSummaryText } from '@/lib/diagnostic/brief-generator';
import type { DiagnosticFormDataV2 } from '@/lib/diagnostic/diagnostic-data';
import { diagnosticV2Schema } from '@/lib/server/validation';
import { rateLimit, getClientIp, sweep } from '@/lib/server/rate-limit';
import { getLogoDataUrl } from '@/lib/server/brand-assets';
import { BriefPDFDocumentV2 } from '@/components/diagnostic/BriefPDFDocumentV2';
import { site } from '@/lib/constants/site';

export const runtime = 'nodejs';

const RATE_LIMIT = Number(process.env.DIAGNOSTIC_RATE_LIMIT_PER_HOUR ?? 8);

export async function POST(request: Request) {
  sweep();
  const ip = getClientIp(request);
  const rl = rateLimit({ key: `diag:${ip}`, limit: RATE_LIMIT, windowSec: 3600 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'rate_limited' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } }
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }
  const parsed = diagnosticV2Schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'invalid_data', issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // zod's inferred type uses widened strings for some literal fields (e.g. beltType);
  // narrow back to the canonical DiagnosticFormDataV2 here — the schema already enforces
  // valid values, so this cast is sound at the boundary.
  const brief = createBriefV2(parsed.data as unknown as DiagnosticFormDataV2);

  // Render PDF + QR
  let pdfBuffer: Buffer | null = null;
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
    pdfBuffer = await renderToBuffer(element);
  } catch (err) {
    console.error('[diagnostic-v2] PDF render failed', err);
  }

  // Send email via Resend
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESEND_TO ?? site.email;
  const from = process.env.RESEND_FROM ?? `GBS Colombia <noreply@${new URL(site.url).host}>`;
  let emailStatus: 'sent' | 'skipped' | 'failed' = 'skipped';

  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const subject = `Brief técnico ${brief.code} · ${parsed.data.contact.company}`;
      const html = renderEmailHtml(brief, briefSummaryText(brief));
      const attachments = pdfBuffer
        ? [{ filename: `GBS-Brief-${brief.code}.pdf`, content: pdfBuffer }]
        : undefined;

      const replyToAddr = parsed.data.contact.email;
      const { error } = await resend.emails.send({
        from,
        to: [to],
        subject,
        html,
        text: briefSummaryText(brief),
        attachments,
        ...(replyToAddr ? { replyTo: replyToAddr } : {})
      });
      emailStatus = error ? 'failed' : 'sent';
      if (error) console.error('[diagnostic-v2] Resend error', error);
    } catch (err) {
      console.error('[diagnostic-v2] Resend exception', err);
      emailStatus = 'failed';
    }
  }

  return NextResponse.json({ brief, emailStatus }, { status: 200 });
}

function renderEmailHtml(
  brief: ReturnType<typeof createBriefV2>,
  summary: string
): string {
  const c = brief.data.contact;
  const verify = briefVerifyUrl(brief.code);
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"/><title>Brief ${brief.code}</title></head>
<body style="margin:0;background:#F4F7FB;font-family:Inter,Arial,sans-serif;color:#0A2540;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 8px 24px rgba(10,37,64,0.08);">
    <div style="background:linear-gradient(135deg,#0A2540,#1E7FC4);color:#fff;padding:24px 28px;">
      <div style="font-size:11px;letter-spacing:0.25em;opacity:.8;">BRIEF TÉCNICO</div>
      <h1 style="margin:8px 0 0;font-size:22px;">${brief.code}</h1>
    </div>
    <div style="padding:24px 28px;">
      <p style="margin:0 0 12px;color:#5A6F85;">Nuevo brief generado desde el diagnóstico online.</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;color:#5A6F85;width:120px;">Cliente</td><td>${escapeHtml(c.name)}</td></tr>
        <tr><td style="padding:6px 0;color:#5A6F85;">Empresa</td><td>${escapeHtml(c.company)}</td></tr>
        <tr><td style="padding:6px 0;color:#5A6F85;">WhatsApp</td><td>${escapeHtml(c.whatsapp)}</td></tr>
        ${c.email ? `<tr><td style="padding:6px 0;color:#5A6F85;">Email</td><td>${escapeHtml(c.email)}</td></tr>` : ''}
        ${c.role ? `<tr><td style="padding:6px 0;color:#5A6F85;">Cargo</td><td>${escapeHtml(c.role)}</td></tr>` : ''}
      </table>

      <h3 style="margin:20px 0 8px;">Resumen</h3>
      <pre style="white-space:pre-wrap;background:#F4F7FB;padding:14px;border-radius:10px;font-family:inherit;font-size:13px;">${escapeHtml(summary)}</pre>

      <p style="margin:20px 0 0;font-size:12px;color:#5A6F85;">Verifica este brief en
        <a href="${verify}" style="color:#1E7FC4;">${verify}</a>
      </p>
    </div>
    <div style="background:#F4F7FB;padding:16px 28px;font-size:11px;color:#5A6F85;">GBS Colombia SAS · Ingeniería en Movimiento</div>
  </div>
</body></html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
