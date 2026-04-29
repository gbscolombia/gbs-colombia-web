/* eslint-disable jsx-a11y/alt-text */
import { Document, Page, Text, View, StyleSheet, Image, Svg, Rect, Path, Circle } from '@react-pdf/renderer';
import type { DiagnosticBriefV2 } from '@/lib/diagnostic/diagnostic-data';

/* ------------------- Brand tokens ------------------- */
const NAVY = '#0A2540';
const NAVY_DARK = '#06182E';
const BLUE = '#1E7FC4';
const CYAN = '#00B8E6';
const TEXT = '#0A2540';
const TEXT_DIM = '#5A6F85';
const BORDER = '#E5EAF0';
const SOFT = '#F4F7FB';

/* ------------------- Styles ------------------- */
const s = StyleSheet.create({
  page: {
    paddingTop: 0,
    paddingBottom: 60,
    paddingHorizontal: 0,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: TEXT,
    backgroundColor: '#FFFFFF',
    position: 'relative'
  },

  /* Hero */
  hero: { backgroundColor: NAVY, paddingTop: 28, paddingBottom: 22, paddingHorizontal: 36 },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18
  },
  logo: { width: 130, height: 38, objectFit: 'contain' },
  pillKicker: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    color: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1.5
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 9,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 6
  },
  heroTitle: { color: '#FFFFFF', fontSize: 26, fontFamily: 'Helvetica-Bold', lineHeight: 1.1 },
  heroCodeRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 18
  },
  heroCodeLabel: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 7.5,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 4
  },
  heroCode: { color: CYAN, fontSize: 18, fontFamily: 'Helvetica-Bold', letterSpacing: 0.5 },
  heroDate: { color: 'rgba(255,255,255,0.7)', fontSize: 9 },

  /* Render banner */
  renderBand: {
    backgroundColor: NAVY_DARK,
    borderTopWidth: 3,
    borderTopColor: CYAN,
    paddingHorizontal: 36,
    paddingVertical: 18
  },
  renderInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  renderTextWrap: { flex: 1, paddingRight: 16 },
  renderTitle: {
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 3
  },
  renderText: { color: 'rgba(255,255,255,0.8)', fontSize: 9, lineHeight: 1.45 },

  /* Body */
  body: { paddingHorizontal: 36, paddingTop: 22 },
  section: { marginBottom: 18 },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: BLUE,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: BORDER
  },
  twoCol: { flexDirection: 'row', gap: 16 },
  col: { flex: 1 },
  row: { flexDirection: 'row', paddingVertical: 4 },
  rowLabel: { width: '42%', color: TEXT_DIM, fontSize: 9 },
  rowValue: { width: '58%', fontFamily: 'Helvetica-Bold', fontSize: 9 },

  /* CEMA cards */
  cemaWrap: { flexDirection: 'row', gap: 10, marginTop: 4 },
  cemaCard: {
    flex: 1,
    backgroundColor: SOFT,
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: BLUE
  },
  cemaCardLabel: { fontSize: 7, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 1 },
  cemaCardValue: { fontSize: 18, fontFamily: 'Helvetica-Bold', color: NAVY, marginTop: 4 },
  cemaCardUnit: { fontSize: 9, color: TEXT_DIM, marginTop: 1 },
  cemaDisclaimer: { fontSize: 8, color: TEXT_DIM, marginTop: 8, fontStyle: 'italic' },

  /* QR / verify block */
  qrBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: SOFT,
    borderRadius: 10,
    padding: 14
  },
  qrText: { fontSize: 8, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 1.2 },
  qrUrl: { fontSize: 10, color: NAVY, marginTop: 4, fontFamily: 'Helvetica-Bold' },

  /* Footer */
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 36,
    right: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 8
  },
  footerLeft: { fontSize: 8, color: TEXT_DIM },
  footerRight: { fontSize: 8, color: NAVY, fontFamily: 'Helvetica-Bold' }
});

/* ------------------- i18n labels ------------------- */
const L = {
  es: {
    pathSupply: 'SUMINISTRO DE BANDAS Y ACCESORIOS',
    pathFab: 'FABRICACIÓN DE TRANSPORTADOR',
    title: 'Brief Técnico GBS',
    subtitle: 'DIAGNÓSTICO DE INGENIERÍA',
    refLabel: 'Referencia',
    issuedOn: 'Emitido el',
    operationSection: 'Operación y material',
    line: 'Línea',
    material: 'Material',
    structure: 'Estructura',
    dimensionsSection: 'Dimensiones del transportador',
    width: 'Ancho de banda',
    length: 'Distancia entre ejes',
    height: 'Altura',
    inclination: 'Inclinación',
    speed: 'Velocidad',
    voltage: 'Voltaje eléctrico',
    automation: 'Automatización',
    granulometry: 'Granulometría',
    accessories: 'Accesorios y notas',
    cemaTitle: 'Cálculos preliminares — CEMA Belt Book 7ma Ed. / DIN 22101',
    tph: 'Capacidad estimada',
    power: 'Potencia motor',
    torque: 'Torque eje motriz',
    disclaimer:
      'Cálculos orientativos. Un ingeniero GBS valida y ajusta bajo norma CEMA Belt Book 7ma Ed.',
    clientSection: 'Datos del solicitante',
    name: 'Nombre',
    company: 'Empresa',
    role: 'Cargo',
    whatsapp: 'WhatsApp',
    email: 'Email',
    supplyDetailSection: 'Detalle del suministro',
    bandPesada: 'Banda pesada',
    bandLiviana: 'Banda liviana',
    plies: 'Lonas',
    rollers: 'Rodillos',
    cleaners: 'Limpiadores',
    splice: 'Empalme',
    motor: 'Motor',
    nextStep: 'PRÓXIMO PASO',
    nextStepText:
      'Un ingeniero GBS analizará este brief y te contactará por WhatsApp en máximo 24 horas hábiles con una propuesta técnica formal.',
    verify: 'Verifica este brief en',
    legal: 'Documento oficial GBS Colombia SAS · Generado automáticamente',
    renderTitle: 'Render representativo del transportador',
    renderSubtitle:
      'Diseño bajo norma CEMA · Estructura modular escalable · Adaptable al material y condiciones de operación',
    yes: 'Sí',
    no: 'No',
    tempLabel: 'Temperatura > 80°C',
    humLabel: 'Humedad alta',
    filterLabel: 'Requiere filtración',
    operationLine: { liviana: 'Industria liviana', pesada: 'Industria pesada' } as Record<string, string>,
    structureLabels: {
      'acero-inoxidable': 'Acero inoxidable AISI 304',
      'acero-carbon': 'Acero al carbón'
    } as Record<string, string>,
    speedLabels: {
      slow: 'Lenta (< 1 m/s)',
      medium: 'Media (1 – 3 m/s)',
      fast: 'Rápida (> 3 m/s)',
      unknown: 'A definir'
    } as Record<string, string>,
    automationLabels: {
      ninguna: 'Sin automatización',
      basica: 'Básica (sensores · alarmas)',
      avanzada: 'Avanzada (PLC · SCADA)'
    } as Record<string, string>,
    materialLabels: {
      panificacion: 'Panificación',
      carnicos: 'Cárnicos',
      'frutas-vegetales': 'Frutas y vegetales',
      'cajas-paquetes': 'Cajas y paquetes',
      farmaceutico: 'Farmacéutico',
      'mineral-grueso': 'Mineral grueso',
      'mineral-fino': 'Mineral fino',
      'clinker-cemento': 'Clínker / cemento',
      carbon: 'Carbón',
      'arena-grava': 'Arena y grava',
      otro: 'Otro material'
    } as Record<string, string>
  },
  en: {
    pathSupply: 'BELTS & ACCESSORIES SUPPLY',
    pathFab: 'CONVEYOR MANUFACTURING',
    title: 'GBS Technical Brief',
    subtitle: 'ENGINEERING DIAGNOSTIC',
    refLabel: 'Reference',
    issuedOn: 'Issued on',
    operationSection: 'Operation & material',
    line: 'Line',
    material: 'Material',
    structure: 'Structure',
    dimensionsSection: 'Conveyor dimensions',
    width: 'Belt width',
    length: 'Center-to-center length',
    height: 'Height',
    inclination: 'Inclination',
    speed: 'Speed',
    voltage: 'Electrical voltage',
    automation: 'Automation',
    granulometry: 'Granulometry',
    accessories: 'Accessories and notes',
    cemaTitle: 'Preliminary calculations — CEMA Belt Book 7th Ed. / DIN 22101',
    tph: 'Estimated capacity',
    power: 'Motor power',
    torque: 'Drive shaft torque',
    disclaimer:
      'Indicative calculations. A GBS engineer validates and tunes under CEMA Belt Book 7th Ed.',
    clientSection: 'Requester information',
    name: 'Name',
    company: 'Company',
    role: 'Role',
    whatsapp: 'WhatsApp',
    email: 'Email',
    supplyDetailSection: 'Supply detail',
    bandPesada: 'Heavy belt',
    bandLiviana: 'Light belt',
    plies: 'Plies',
    rollers: 'Idlers',
    cleaners: 'Cleaners',
    splice: 'Splice',
    motor: 'Motor',
    nextStep: 'NEXT STEP',
    nextStepText:
      'A GBS engineer will review this brief and contact you on WhatsApp within 24 business hours with a formal technical proposal.',
    verify: 'Verify this brief at',
    legal: 'Official GBS Colombia SAS document · Auto-generated',
    renderTitle: 'Representative conveyor render',
    renderSubtitle:
      'CEMA-compliant design · scalable modular structure · adaptable to material and operating conditions',
    yes: 'Yes',
    no: 'No',
    tempLabel: 'Temperature > 80°C',
    humLabel: 'High humidity',
    filterLabel: 'Filtration required',
    operationLine: { liviana: 'Light industry', pesada: 'Heavy industry' } as Record<string, string>,
    structureLabels: {
      'acero-inoxidable': 'AISI 304 stainless steel',
      'acero-carbon': 'Carbon steel'
    } as Record<string, string>,
    speedLabels: {
      slow: 'Slow (< 1 m/s)',
      medium: 'Medium (1 – 3 m/s)',
      fast: 'Fast (> 3 m/s)',
      unknown: 'TBD'
    } as Record<string, string>,
    automationLabels: {
      ninguna: 'No automation',
      basica: 'Basic (sensors · alarms)',
      avanzada: 'Advanced (PLC · SCADA)'
    } as Record<string, string>,
    materialLabels: {
      panificacion: 'Bakery',
      carnicos: 'Meat',
      'frutas-vegetales': 'Fruits and vegetables',
      'cajas-paquetes': 'Boxes and packages',
      farmaceutico: 'Pharmaceutical',
      'mineral-grueso': 'Coarse mineral',
      'mineral-fino': 'Fine mineral',
      'clinker-cemento': 'Clinker / cement',
      carbon: 'Coal',
      'arena-grava': 'Sand and gravel',
      otro: 'Other material'
    } as Record<string, string>
  }
};

/* ------------------- SVG conveyor render -------------------
 * Stylized inclined conveyor — pure vector. No external image needed.
 */
function ConveyorRender() {
  return (
    <Svg width={240} height={80} viewBox="0 0 240 80">
      {/* Ground */}
      <Rect x={0} y={70} width={240} height={2} fill="#0F2B47" />
      {/* Belt frame (top + bottom rails, inclined) */}
      <Path d="M 14 60 L 222 18" stroke={CYAN} strokeWidth={2} />
      <Path d="M 14 54 L 222 12" stroke={CYAN} strokeWidth={2} />
      {/* Drums (head + tail) */}
      <Circle cx={222} cy={15} r={9} fill="#FFFFFF" />
      <Circle cx={222} cy={15} r={3} fill={NAVY} />
      <Circle cx={14} cy={57} r={9} fill="#FFFFFF" />
      <Circle cx={14} cy={57} r={3} fill={NAVY} />
      {/* Support legs */}
      <Path d="M 56 56 L 56 70" stroke="#FFFFFF" strokeWidth={1.5} />
      <Path d="M 116 42 L 116 70" stroke="#FFFFFF" strokeWidth={1.5} />
      <Path d="M 178 26 L 178 70" stroke="#FFFFFF" strokeWidth={1.5} />
      {/* Material on belt (bumps) */}
      <Path d="M 38 53 q 32 -10 64 -18 t 64 -18" stroke={CYAN} strokeWidth={5} strokeLinecap="round" opacity={0.75} />
      {/* Idler rollers (small circles spaced along the rail) */}
      {[40, 80, 120, 160, 200].map((x, i) => (
        <Circle key={i} cx={x} cy={48 - i * 1.6} r={2} fill="#FFFFFF" opacity={0.85} />
      ))}
    </Svg>
  );
}

/* ------------------- Helpers ------------------- */
function fmtNumber(n: number, frac = 1, locale: 'es' | 'en' = 'es'): string {
  if (!Number.isFinite(n)) return '—';
  return n.toLocaleString(locale === 'en' ? 'en-US' : 'es-CO', {
    maximumFractionDigits: frac,
    minimumFractionDigits: frac > 0 && frac <= 2 ? Math.min(frac, 1) : 0
  });
}

/* ------------------- Component ------------------- */
export function BriefPDFDocumentV2({
  brief,
  qrDataUrl,
  logoDataUrl
}: {
  brief: DiagnosticBriefV2;
  qrDataUrl: string;
  /** Base64 data URL of GBS white horizontal logo. Loaded server-side. */
  logoDataUrl: string;
}) {
  const lang = brief.data.locale === 'en' ? 'en' : 'es';
  const t = L[lang];
  const isFab = brief.data.path === 'fabrication';
  const f = brief.data.fabrication;
  const sup = brief.data.supply;
  const c = brief.data.contact;
  const createdAt = new Date(brief.createdAt).toLocaleDateString(
    lang === 'en' ? 'en-US' : 'es-CO',
    { day: '2-digit', month: 'long', year: 'numeric' }
  );

  return (
    <Document
      title={`GBS Brief ${brief.code}`}
      author="GBS Colombia SAS"
      subject={isFab ? t.pathFab : t.pathSupply}
      creator="co.gbsint.com"
    >
      <Page size="A4" style={s.page}>
        {/* ---- HERO ---- */}
        <View style={s.hero}>
          <View style={s.heroTopRow}>
            <Image src={logoDataUrl} style={s.logo} />
            <Text style={s.pillKicker}>{isFab ? t.pathFab : t.pathSupply}</Text>
          </View>
          <Text style={s.heroSubtitle}>{t.subtitle}</Text>
          <Text style={s.heroTitle}>{t.title}</Text>
          <View style={s.heroCodeRow}>
            <View>
              <Text style={s.heroCodeLabel}>{t.refLabel}</Text>
              <Text style={s.heroCode}>{brief.code}</Text>
            </View>
            <Text style={s.heroDate}>
              {t.issuedOn} {createdAt}
            </Text>
          </View>
        </View>

        {/* ---- RENDER BAND (fabrication only) ---- */}
        {isFab && (
          <View style={s.renderBand}>
            <View style={s.renderInner}>
              <View style={s.renderTextWrap}>
                <Text style={s.renderTitle}>{t.renderTitle}</Text>
                <Text style={s.renderText}>{t.renderSubtitle}</Text>
              </View>
              <ConveyorRender />
            </View>
          </View>
        )}

        {/* ---- BODY ---- */}
        <View style={s.body}>
          {isFab && f && (
            <>
              <View style={s.section}>
                <Text style={s.sectionTitle}>{t.operationSection}</Text>
                <View style={s.twoCol}>
                  <View style={s.col}>
                    <Row label={t.line} value={t.operationLine[f.line] ?? f.line} />
                    <Row
                      label={t.material}
                      value={f.materialOtherText || t.materialLabels[f.materialSlug] || f.materialSlug}
                    />
                    <Row label={t.structure} value={t.structureLabels[f.structure] ?? f.structure} />
                  </View>
                  <View style={s.col}>
                    <Row label={t.tempLabel} value={f.highTemp ? t.yes : t.no} />
                    <Row label={t.humLabel} value={f.highHumidity ? t.yes : t.no} />
                    <Row label={t.filterLabel} value={f.needsFiltration ? t.yes : t.no} />
                  </View>
                </View>
              </View>

              <View style={s.section}>
                <Text style={s.sectionTitle}>{t.dimensionsSection}</Text>
                <View style={s.twoCol}>
                  <View style={s.col}>
                    <Row label={t.width} value={f.widthOtherText || `${f.widthMm} mm`} />
                    <Row label={t.length} value={`${f.lengthM} m`} />
                    {f.heightM != null && <Row label={t.height} value={`${f.heightM} m`} />}
                    {f.hasInclination && (
                      <Row
                        label={t.inclination}
                        value={`${f.inclinationStartH}m → ${f.inclinationEndH}m / ${f.inclinationLengthM}m`}
                      />
                    )}
                  </View>
                  <View style={s.col}>
                    <Row label={t.speed} value={t.speedLabels[f.speed] ?? f.speed} />
                    <Row label={t.voltage} value={`${f.voltage} V`} />
                    <Row label={t.automation} value={t.automationLabels[f.automation] ?? f.automation} />
                    {f.granulometry ? <Row label={t.granulometry} value={f.granulometry} /> : null}
                  </View>
                </View>
                {f.accessoriesText ? (
                  <View style={{ marginTop: 6 }}>
                    <Row label={t.accessories} value={f.accessoriesText} />
                  </View>
                ) : null}
              </View>

              {brief.cema && (
                <View style={s.section}>
                  <Text style={s.sectionTitle}>{t.cemaTitle}</Text>
                  <View style={s.cemaWrap}>
                    <CemaCard label={t.tph} value={fmtNumber(brief.cema.tph, 1, lang)} unit="TPH" />
                    <CemaCard label={t.power} value={fmtNumber(brief.cema.powerKw, 2, lang)} unit="kW" />
                    <CemaCard label={t.torque} value={fmtNumber(brief.cema.torqueNm, 0, lang)} unit="Nm" />
                  </View>
                  <Text style={s.cemaDisclaimer}>{t.disclaimer}</Text>
                </View>
              )}
            </>
          )}

          {!isFab && sup && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>{t.supplyDetailSection}</Text>
              <Row label={t.line} value={t.operationLine[sup.line] ?? sup.line} />
              {sup.heavy?.beltType && <Row label={t.bandPesada} value={sup.heavy.beltType} />}
              {sup.heavy?.plies != null && <Row label={t.plies} value={String(sup.heavy.plies)} />}
              {sup.heavy?.widthMm != null && <Row label={t.width} value={`${sup.heavy.widthMm} mm`} />}
              {sup.heavy?.lengthM != null && <Row label={t.length} value={`${sup.heavy.lengthM} m`} />}
              {sup.heavy?.rollerTypes?.length ? (
                <Row
                  label={t.rollers}
                  value={`${sup.heavy.rollerMaterial ?? '-'} · ${sup.heavy.rollerTypes.join(', ')}`}
                />
              ) : null}
              {sup.heavy?.cleanerTypes?.length ? (
                <Row label={t.cleaners} value={sup.heavy.cleanerTypes.join(', ')} />
              ) : null}
              {sup.heavy?.splice && <Row label={t.splice} value={sup.heavy.splice} />}
              {sup.heavy?.motorPowerKw != null && (
                <Row
                  label={t.motor}
                  value={`${sup.heavy.motorPowerKw} kW · ${sup.heavy.motorVoltage ?? '-'} V`}
                />
              )}
              {sup.light?.beltType && <Row label={t.bandLiviana} value={sup.light.beltType} />}
              {sup.light?.thicknessMm != null && (
                <Row label={lang === 'en' ? 'Thickness' : 'Espesor'} value={`${sup.light.thicknessMm} mm`} />
              )}
              {sup.light?.color && <Row label={lang === 'en' ? 'Color' : 'Color'} value={sup.light.color} />}
              {sup.light?.pattern && (
                <Row label={lang === 'en' ? 'Pattern' : 'Patrón'} value={sup.light.pattern} />
              )}
              {sup.light?.splice && <Row label={t.splice} value={sup.light.splice} />}
              {sup.freeText ? <Row label={t.accessories} value={sup.freeText} /> : null}
            </View>
          )}

          {/* Client */}
          <View style={s.section}>
            <Text style={s.sectionTitle}>{t.clientSection}</Text>
            <View style={s.twoCol}>
              <View style={s.col}>
                <Row label={t.name} value={c.name} />
                <Row label={t.company} value={c.company} />
                {c.role ? <Row label={t.role} value={c.role} /> : null}
              </View>
              <View style={s.col}>
                <Row label={t.whatsapp} value={c.whatsapp} />
                {c.email ? <Row label={t.email} value={c.email} /> : null}
              </View>
            </View>
          </View>

          {/* Next step + QR */}
          <View style={s.section}>
            <Text style={s.sectionTitle}>{t.nextStep}</Text>
            <Text style={{ fontSize: 9.5, lineHeight: 1.5 }}>{t.nextStepText}</Text>

            <View style={s.qrBlock}>
              <View>
                <Text style={s.qrText}>{t.verify}</Text>
                <Text style={s.qrUrl}>co.gbsint.com/verificar/{brief.code}</Text>
                <Text style={{ fontSize: 8, color: TEXT_DIM, marginTop: 8 }}>
                  GBS Colombia SAS · Pereira, Risaralda · WhatsApp +57 301 114 4826 · info@gbscolombia.com
                </Text>
              </View>
              <Image src={qrDataUrl} style={{ width: 76, height: 76 }} />
            </View>
          </View>
        </View>

        <View style={s.footer} fixed>
          <Text style={s.footerLeft}>{t.legal}</Text>
          <Text style={s.footerRight}>
            {createdAt} · {brief.code}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={s.row}>
      <Text style={s.rowLabel}>{label}</Text>
      <Text style={s.rowValue}>{value}</Text>
    </View>
  );
}

function CemaCard({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <View style={s.cemaCard}>
      <Text style={s.cemaCardLabel}>{label}</Text>
      <Text style={s.cemaCardValue}>{value}</Text>
      <Text style={s.cemaCardUnit}>{unit}</Text>
    </View>
  );
}
