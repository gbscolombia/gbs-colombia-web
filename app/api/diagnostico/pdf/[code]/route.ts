import { renderToStream } from '@react-pdf/renderer';
import QRCode from 'qrcode';
import React from 'react';
import type { ReactElement } from 'react';
import { BriefPDFDocument } from '@/components/diagnostic/BriefPDFDocument';
import { briefVerifyUrl } from '@/lib/diagnostic/brief-generator';
import { isValidReferenceCode } from '@/lib/utils/reference-code';
import { site } from '@/lib/constants/site';
import type { DiagnosticBrief } from '@/lib/diagnostic/diagnostic-data';

export const runtime = 'nodejs';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  if (!isValidReferenceCode(code)) {
    return new Response('Invalid code', { status: 400 });
  }

  const url = new URL(request.url);
  const dataParam = url.searchParams.get('data');
  if (!dataParam) {
    return new Response('Missing brief data', { status: 400 });
  }

  let brief: DiagnosticBrief;
  try {
    brief = JSON.parse(decodeURIComponent(dataParam)) as DiagnosticBrief;
  } catch {
    return new Response('Invalid data', { status: 400 });
  }

  const qrDataUrl = await QRCode.toDataURL(briefVerifyUrl(code), {
    margin: 0,
    width: 144,
    color: { dark: '#0A2540', light: '#FFFFFF' }
  });

  const logoUrl = `${site.url}/images/gbs-logo-white.jpg`;

  // BriefPDFDocument returns a <Document>, but TS infers a generic component type.
  // Cast to the structural element type that renderToStream expects.
  const element = React.createElement(BriefPDFDocument, {
    brief,
    qrDataUrl,
    logoUrl
  }) as unknown as ReactElement;

  const stream = await renderToStream(element as Parameters<typeof renderToStream>[0]);

  // Bridge Node Readable -> Web ReadableStream<Uint8Array>
  const webStream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const iterable = stream as unknown as AsyncIterable<Buffer | string>;
      for await (const chunk of iterable) {
        controller.enqueue(
          typeof chunk === 'string' ? new TextEncoder().encode(chunk) : new Uint8Array(chunk)
        );
      }
      controller.close();
    }
  });

  return new Response(webStream, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="GBS-Brief-${code}.pdf"`
    }
  });
}
