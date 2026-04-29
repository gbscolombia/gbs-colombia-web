import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://connect.facebook.net https://www.tiktok.com",
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.googletagmanager.com https://www.facebook.com https://graph.facebook.com https://wa.me",
  "img-src 'self' data: blob: https:",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "frame-src 'self' https://www.googletagmanager.com https://www.tiktok.com https://www.linkedin.com https://www.facebook.com https://www.google.com https://maps.google.com",
  "media-src 'self' https:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests"
].join('; ');

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Content-Security-Policy', value: cspDirectives }
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: '/nuestras_soluciones_-_principal/:path*', destination: '/catalogo', permanent: true },
      { source: '/servicios_de_mantenimiento/:path*', destination: '/catalogo/servicios', permanent: true },
      { source: '/acerca_de_nosotros/:path*', destination: '/nosotros', permanent: true },
      { source: '/contacto_2/:path*', destination: '/contacto', permanent: true },
      { source: '/soluci%C3%B3n_-_bandas_de_trabajo_liviano/:path*', destination: '/catalogo/bandas-livianas', permanent: true },
      { source: '/soluci%C3%B3n_-_bandas_de_trabajo_pesado/:path*', destination: '/catalogo/bandas-pesadas', permanent: true },
      { source: '/proyectos_llave_en_mano/:path*', destination: '/casos-de-exito', permanent: true },
      { source: '/suministro_de_bandas/:path*', destination: '/catalogo', permanent: true },
      { source: '/portal_de_pago_pse/:path*', destination: '/portal-pse', permanent: true },
      { source: '/p%C3%A1gina_de_inicio_(home)_3/:path*', destination: '/', permanent: true }
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'logo.clearbit.com' },
      { protocol: 'https', hostname: 'img.logokit.com' }
    ],
    minimumCacheTTL: 60
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion']
  },
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true
};

export default withNextIntl(nextConfig);
