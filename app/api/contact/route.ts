import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactFormSchema } from '@/lib/server/validation';
import { rateLimit, getClientIp, sweep } from '@/lib/server/rate-limit';
import { site } from '@/lib/constants/site';

export const runtime = 'nodejs';

const RATE_LIMIT = Number(process.env.CONTACT_RATE_LIMIT_PER_HOUR ?? 10);

export async function POST(request: Request) {
  sweep();
  const ip = getClientIp(request);
  const rl = rateLimit({ key: `contact:${ip}`, limit: RATE_LIMIT, windowSec: 3600 });
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
  const parsed = contactFormSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_data' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No silent failure: tell the client we couldn't deliver so it shows the fallback note.
    return NextResponse.json({ error: 'mailer_unavailable' }, { status: 503 });
  }

  const { name, company, email, message } = parsed.data;
  const to = process.env.RESEND_TO ?? site.email;
  const from = process.env.RESEND_FROM ?? `GBS Colombia <noreply@${new URL(site.url).host}>`;
  const subject = `Contacto web · ${company} (${name})`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject,
      text: `Nuevo mensaje desde el formulario de contacto.\n\nNombre: ${name}\nEmpresa: ${company}\nEmail: ${email}\n\nMensaje:\n${message}`,
      html: htmlEmail({ name, company, email, message })
    });
    if (error) {
      console.error('[contact] Resend error', error);
      return NextResponse.json({ error: 'mailer_failed' }, { status: 502 });
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('[contact] exception', err);
    return NextResponse.json({ error: 'mailer_failed' }, { status: 502 });
  }
}

function htmlEmail(d: { name: string; company: string; email: string; message: string }): string {
  return `<!doctype html>
<html lang="es"><body style="margin:0;background:#F4F7FB;font-family:Inter,Arial,sans-serif;color:#0A2540;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 8px 24px rgba(10,37,64,0.08);">
    <div style="background:linear-gradient(135deg,#0A2540,#1E7FC4);color:#fff;padding:24px 28px;">
      <div style="font-size:11px;letter-spacing:0.25em;opacity:.8;">CONTACTO WEB</div>
      <h1 style="margin:8px 0 0;font-size:22px;">Nuevo mensaje recibido</h1>
    </div>
    <div style="padding:24px 28px;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;color:#5A6F85;width:120px;">Nombre</td><td>${escapeHtml(d.name)}</td></tr>
        <tr><td style="padding:6px 0;color:#5A6F85;">Empresa</td><td>${escapeHtml(d.company)}</td></tr>
        <tr><td style="padding:6px 0;color:#5A6F85;">Email</td><td><a href="mailto:${escapeHtml(d.email)}" style="color:#1E7FC4;">${escapeHtml(d.email)}</a></td></tr>
      </table>
      <h3 style="margin:20px 0 8px;">Mensaje</h3>
      <div style="white-space:pre-wrap;background:#F4F7FB;padding:14px;border-radius:10px;font-size:13px;">${escapeHtml(d.message)}</div>
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
