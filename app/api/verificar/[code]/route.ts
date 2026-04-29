import { NextResponse } from 'next/server';
import { isValidReferenceCode } from '@/lib/utils/reference-code';

export const runtime = 'nodejs';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const valid = isValidReferenceCode(code);
  return NextResponse.json({ valid, code });
}
