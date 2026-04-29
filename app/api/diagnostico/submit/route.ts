import { NextResponse } from 'next/server';
import { createBrief } from '@/lib/diagnostic/brief-generator';
import type { DiagnosticFormData } from '@/lib/diagnostic/diagnostic-data';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as DiagnosticFormData;

    if (!data || !data.name || !data.company || !data.whatsapp || !data.operation || !data.material) {
      return NextResponse.json({ error: 'invalid_data' }, { status: 400 });
    }

    const brief = createBrief(data);

    // In a future iteration we would persist this and emit a notification to the GBS team.
    return NextResponse.json({ brief }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
