# GBS Colombia · Sitio corporativo

Sitio oficial de **GBS Colombia SAS** — empresa de ingeniería especializada en bandas transportadoras industriales bajo norma CEMA Belt Book 7ma Edición. Miembros del grupo internacional GBS International Group.

Stack: **Next.js 15 App Router**, **TypeScript estricto**, **Tailwind CSS v4**, **next-intl** (ES/EN nativo), **framer-motion**, **@react-pdf/renderer**, **react-hook-form + zod**, **qrcode**, **nanoid**.

## Setup

```bash
npm install
cp .env.local.example .env.local   # editar variables
npm run dev                         # http://localhost:3000
```

### Comandos
- `npm run dev` — servidor desarrollo
- `npm run build` — build producción
- `npm run start` — servidor producción (post-build)
- `npm run lint` — ESLint
- `npm run typecheck` — `tsc --noEmit`

## Variables de entorno

Todas en `.env.local.example`. Las críticas:

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canónica del sitio |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager (GTM-TNQH8B35) |
| `NEXT_PUBLIC_GA4_ID` | GA4 (G-GM8CHQK21Y) — embebido vía GTM |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads (AW-16588636875) — vía GTM |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel (opcional) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número internacional sin signos para `wa.me/` |
| `NEXT_PUBLIC_EMAIL`, `NEXT_PUBLIC_PHONE` | Contacto |
| `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_TIKTOK_URL`, etc. | Redes sociales |

## Arquitectura

```
app/
  [locale]/                  # rutas localizadas (es default, en con prefijo)
    layout.tsx               # html, fonts, NextIntlClientProvider, GTM, JSON-LD
    page.tsx                 # home (10 secciones)
    nosotros|ingenieria|contacto|portal-pse/
    catalogo/                # hub + 4 categorías + [slug]
    industrias/              # hub + [slug]
    casos-de-exito/          # hub + [slug]
    recursos/                # hub + glosario con búsqueda
    diagnostico/             # wizard 5 pasos
    verificar/[code]/        # validador público de códigos GBS-BT-XXXX
    lp/[campaign]/           # landing pages para Google Ads
  api/
    diagnostico/submit/      # POST → genera código y crea brief
    diagnostico/pdf/[code]/  # GET → PDF dinámico con QR + watermark
    verificar/[code]/        # GET → JSON de validación
  sitemap.ts, robots.ts, globals.css
components/
  ui/                        # primitivas (Button, Card, Input, …)
  layout/                    # Header, Footer, LocaleSwitcher, MobileNav, WhatsAppFloat
  sections/                  # 10 secciones del home
  catalog/                   # ProductCard, CategoryPage, ProductDetail compartidos
  diagnostic/                # Wizard + 5 pasos + BriefView + BriefPDFDocument
  glossary/, landing/, seo/, analytics/
content/                     # JSONs bilingües (productos, industrias, casos, glosario, clientes, redes, landings)
lib/
  i18n/                      # routing.ts (defineRouting), request.ts
  content/                   # loaders tipados
  diagnostic/                # diagnostic-data.ts, brief-generator.ts
  utils/                     # cn, whatsapp, reference-code (nanoid GBS-BT-YYYY-XXXXXXXX)
  constants/site.ts
messages/                    # es.json, en.json (todas las strings)
public/                      # logos, imágenes hero, llms.txt, catálogos PDF
```

## Internacionalización

- Locales: `es` (default, sin prefijo) · `en` (prefijo `/en`).
- Pathnames localizados en `lib/i18n/routing.ts` (ej: `/catalogo/bandas-pesadas` ↔ `/en/catalog/heavy-duty`).
- Cambio de idioma vía `<LocaleSwitcher>` en el header.
- Strings: `messages/es.json` y `messages/en.json`. EN redactado **nativo**, no traducción literal.

## Diseño

- Tokens en `app/globals.css` con CSS custom properties (`--brand-navy: #0A2540`, `--brand-blue: #1E7FC4`, `--brand-cyan: #00B8E6`).
- Tipografía fluida con `clamp()` (`text-hero`, `text-display`, `text-{xs..4xl}-fluid`).
- Tailwind v4 con `@theme` block — sin config JS pesada.
- Animaciones: framer-motion puntual (fade-in, slide-up, stagger, counter-up vía IntersectionObserver).

## Diagnóstico técnico

Es la herramienta clave del sitio:

1. Wizard de 5 pasos en `/diagnostico` (operación · material · condiciones · dimensiones · contacto).
2. Submit a `/api/diagnostico/submit` → genera `GBS-BT-YYYY-XXXXXXXX` (nanoid sin caracteres ambiguos) y `DiagnosticBrief`.
3. `BriefView` muestra el código, QR a `/verificar/[code]` y dos CTAs:
   - **Continuar por WhatsApp** (CTA primario) con mensaje técnico pre-armado
   - **Solo descargar PDF** (CTA secundario)
4. PDF generado server-side con `@react-pdf/renderer` con watermark, QR (qrcode), logo, 7 secciones técnicas y verify-URL.
5. `/verificar/[code]` valida formato y muestra estado.

## SEO + AEO

- `app/sitemap.ts` con alternates ES/EN, incluye productos, industrias, casos.
- `app/robots.ts` con disallow `/api/` y `/verificar/`.
- `public/llms.txt` con descripción para LLMs (AEO).
- JSON-LD `Organization` + `LocalBusiness` global en layout. Helpers para `Product`, `Service`, `Article`, `Breadcrumb`, `FAQPage`, `HowTo` en `components/seo/schemas.ts`.
- Headers de seguridad y CSP en `next.config.ts`.
- Hreflang automático vía `alternates.languages` en metadata.

## Analítica

- GTM (`NEXT_PUBLIC_GTM_ID`) carga GA4 + Google Ads con los IDs de Johny.
- `components/analytics/events.ts` define la API `analytics.*` con todos los eventos del spec:
  - `whatsapp_click`, `phone_click`, `email_click`
  - `diagnostic_started`, `diagnostic_step_completed`, `diagnostic_completed`, `diagnostic_converted_whatsapp`, `diagnostic_downloaded_only`
  - `pdf_generated`, `catalog_download`, `product_view`, `glossary_term_view`, `landing_view`
- Cada evento hace `dataLayer.push(...)` y dispara también Meta Pixel cuando aplica.

## Checklist de despliegue

- [ ] Configurar variables de entorno en producción
- [ ] Verificar `NEXT_PUBLIC_SITE_URL` apunta al dominio canónico
- [ ] Confirmar GTM activo con triggers para los 13 eventos
- [ ] Subir catálogos PDF actualizados a `public/files/`
- [ ] Validar `/llms.txt`, `/sitemap.xml`, `/robots.txt` accesibles
- [ ] Probar diagnostico end-to-end (genera PDF + WhatsApp)
- [ ] Validar headers A+ en securityheaders.com

---

© GBS Colombia SAS · Miembros de GBS International Group · Pereira, Colombia.

---

## Changelog v2 (Iteración con modificaciones)

### Hecho
- **Header**: logo a 56–64 px, header a 88 px de alto. Entrada `Asistente IA` en el dropdown de Recursos.
- **Hero**: carrusel de 3 imágenes (`Banda-papa.jpeg`, `logistica.jpeg`, `Port Coal.jpeg`) con auto-rotate 5 s, controles laterales, dots, pausa en hover y overlay azul más claro.
- **ClientsBar**: marquee infinito con triple loop, fade en bordes (`mask-image`) y altura aumentada a 64 px. Pausa en hover.
- **StatsBar**: 3 stats (años, soporte 24/7, cobertura 100 %). Quitado el chip “CEMA”.
- **ValuePillars + EngineeringPhilosophy**: copy humanizado, sin “AISI 304” ni “atornillada por defecto”. Foco en escalabilidad, mantenibilidad y soporte directo.
- **Diagnóstico v2 — bifurcado**:
  - `Step0Decision` Suministro vs Fabricación
  - Rama Suministro: línea pesada / liviana con catálogos completos (bandas, rodillos, limpiadores, empalmes, motor/variador, etc.)
  - Rama Fabricación: parámetros completos (línea, material, estructura, dimensiones, inclinación, TPH, velocidad, voltaje, automatización)
  - Cálculos CEMA en vivo (`lib/diagnostic/formulas-cema.ts`): TPH, potencia (kW/HP) y torque sobre eje motriz bajo CEMA / DIN 22101
  - `BriefPDFDocumentV2` con sección de cálculos CEMA, watermark, QR
  - `BriefViewV2` muestra cálculos + QR + WhatsApp pre-armado
- **Email automático**: `app/api/diagnostico/submit-v2` con Resend (HTML + texto + PDF adjunto + reply-to del cliente). Validación zod + rate-limit por IP (in-memory, 8/hora).
- **Asistente IA** (`/asistente-ia` ↔ `/en/ai-assistant`):
  - System prompt anti-jailbreak con scope técnico estricto y reglas duras (no precios, no marcas, no fuera-de-tema)
  - API `app/api/asistente-ia` con Anthropic SDK, prompt caching ephemeral, modelo configurable (`ANTHROPIC_MODEL`, default `claude-sonnet-4-5`)
  - Chat con react-markdown, historial de 12 mensajes, rate-limit 20/hora por IP
- **Casos de éxito**: 3 historias completas (Puerto, Cárnicos, Golosinas) con storytelling Problema → Solución → Resultado, métricas, testimonio y galería. JSON-LD `Article` + OG image.
- **Seguridad**: CSP extendido para `wa.me`, headers nuevos `Cross-Origin-Opener-Policy: same-origin`, `Cross-Origin-Resource-Policy: same-origin` y `Permissions-Policy` ampliado. Rate-limit + validación zod en todas las APIs públicas. Secretos sólo en `process.env.*` sin prefijo `NEXT_PUBLIC_`.
- **Routing**: alias localizado `/asistente-ia` (es) ↔ `/ai-assistant` (en).
- **i18n**: nuevos namespaces `diagnosticV2`, `assistant`, `caseStory` en ES y EN.

### Pendiente para una segunda pasada (no bloqueantes)
1. **Catálogo y productos**: redescripción detallada de heavy/light/components/services con las opciones extra que listas (PU + variantes, banda ST con 6 tipos resistencia, Super Screw, variadores Emotron, correas A/B/C/D dentadas, malla fibra de carbono, teflón, etc.). Las páginas existen y compilan; el contenido se amplía editando `content/products/*.json` + las páginas de detalle ya soportan `specs` y `applications` libres.
2. **Imágenes catálogo + industrias**: cuando publiques las fotos finales, reemplaza `image` en cada producto y `heroImage` en `industries.json`. Las plantillas ya las cargan con `next/image`.
3. **Imagen GBS Group en `/nosotros`**: actualmente referencia `/images/hero/Container-Warehouse.jpg` (asset existente). Si llega una foto corporativa, reemplaza esa ruta.
4. **Casos — assets**: copiar `gbs-assets/exito/{puerto,carnicos,golosinas}/` a `public/cases/` para que las imágenes referenciadas en `case-studies.json` se sirvan.
5. **AI hint durante el diagnóstico**: la API y el system prompt ya están listos; falta engancharla a cada step con `useEffect` post-respuesta. Se omitió porque cada llamada cuesta tokens y es mejor activarla con un toggle del usuario.
6. **CSP estricta**: actualmente `script-src` permite `'unsafe-inline' 'unsafe-eval'` para Next.js + GTM. Para A+ con nonces, añadir middleware que inyecte un nonce por request.

### Variables de entorno nuevas
```
RESEND_API_KEY=re_xxx                # SOLO server-side
RESEND_FROM="GBS Colombia <noreply@gbscolombia.com>"
RESEND_TO=info@gbscolombia.com
ANTHROPIC_API_KEY=sk-ant-xxx         # SOLO server-side
ANTHROPIC_MODEL=claude-sonnet-4-5
DIAGNOSTIC_RATE_LIMIT_PER_HOUR=8
ASSISTANT_RATE_LIMIT_PER_HOUR=20
```

> Importante: el prompt original sugería `NEXT_PUBLIC_RESEND_API_KEY`. Esto **expondría la clave al navegador** y permitiría a cualquiera enviar correos en nombre de GBS. Las claves se cargan únicamente server-side desde las API routes.

### Comandos de verificación
```bash
npm install            # instala resend, react-markdown y @anthropic-ai/sdk
npm run typecheck
npm run build
```

