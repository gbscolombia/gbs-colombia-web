import fs from 'node:fs/promises';
import path from 'node:path';

let cachedLogoDataUrl: string | null = null;

/**
 * Reads the GBS white horizontal logo from `public/images/gbs-logo-white.jpg`
 * and returns a base64 data URL. Memoised in-process so we don't hit the
 * filesystem for every PDF render.
 */
export async function getLogoDataUrl(): Promise<string> {
  if (cachedLogoDataUrl) return cachedLogoDataUrl;

  // Try a few candidate paths so the helper survives different working dirs
  // (Next.js runtime, scripts, tests).
  const candidates = [
    path.join(process.cwd(), 'public', 'images', 'gbs-logo-white.jpg'),
    path.join(process.cwd(), 'public', 'images', 'gbs-logo.png'),
    path.join(process.cwd(), 'public', 'logos', 'gbs-logo.png')
  ];

  for (const p of candidates) {
    try {
      const buf = await fs.readFile(p);
      const ext = path.extname(p).toLowerCase();
      const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
      cachedLogoDataUrl = `data:${mime};base64,${buf.toString('base64')}`;
      return cachedLogoDataUrl;
    } catch {
      // try next candidate
    }
  }

  // Last-resort transparent 1×1 PNG so the PDF never breaks.
  cachedLogoDataUrl =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII=';
  return cachedLogoDataUrl;
}
