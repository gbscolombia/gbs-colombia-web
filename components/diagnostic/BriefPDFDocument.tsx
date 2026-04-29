import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import type { DiagnosticBrief } from '@/lib/diagnostic/diagnostic-data';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#0A2540',
    position: 'relative'
  },
  watermark: {
    position: 'absolute',
    top: '45%',
    left: '10%',
    right: '10%',
    fontSize: 72,
    color: '#1E7FC4',
    opacity: 0.05,
    transform: 'rotate(-30deg)',
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottom: '2 solid #0A2540',
    paddingBottom: 12,
    marginBottom: 20
  },
  logo: { width: 120, height: 40, objectFit: 'contain' },
  title: { fontSize: 22, fontFamily: 'Helvetica-Bold', marginBottom: 4 },
  kicker: { fontSize: 8, letterSpacing: 2, color: '#5A6F85', textTransform: 'uppercase' },
  code: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#1E7FC4',
    marginTop: 6
  },
  section: { marginTop: 18, marginBottom: 6 },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#1E7FC4',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    borderBottom: '1 solid #E5EAF0',
    paddingBottom: 4
  },
  row: { flexDirection: 'row', paddingVertical: 4 },
  rowLabel: { width: '35%', color: '#5A6F85' },
  rowValue: { width: '65%', fontFamily: 'Helvetica-Bold' },
  para: { lineHeight: 1.5, marginBottom: 6 },
  qrBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1 solid #E5EAF0',
    paddingTop: 14,
    marginTop: 28
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 40,
    right: 40,
    fontSize: 8,
    color: '#5A6F85',
    borderTop: '1 solid #E5EAF0',
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

const labels = {
  es: {
    kicker: 'BRIEF TÉCNICO',
    title: 'Diagnóstico de banda transportadora',
    ref: 'Referencia',
    date: 'Fecha',
    operation: 'Operación',
    material: 'Material',
    conditions: 'Condiciones',
    dimensions: 'Dimensiones',
    width: 'Ancho de banda',
    length: 'Largo total',
    speed: 'Velocidad',
    client: 'Cliente',
    name: 'Nombre',
    company: 'Empresa',
    role: 'Cargo',
    whatsapp: 'WhatsApp',
    email: 'Email',
    recommendation: 'Recomendación preliminar',
    recommendationText:
      'Tu brief ha sido registrado con referencia única y trazable. Un ingeniero GBS analizará la combinación de material, condiciones y dimensiones para especificar la banda apropiada bajo norma CEMA Belt Book 7ma Ed. y te contactará en máximo 24 horas hábiles.',
    verify: 'Verifica este brief en:',
    legal: 'Documento oficial de GBS Colombia SAS · Generado automáticamente',
    hd: 'Industria Pesada',
    lg: 'Industria Liviana',
    slow: 'Lenta (< 1 m/s)',
    medium: 'Media (1-3 m/s)',
    fast: 'Rápida (> 3 m/s)',
    unknown: 'No especificada'
  },
  en: {
    kicker: 'TECHNICAL BRIEF',
    title: 'Conveyor belt diagnostic',
    ref: 'Reference',
    date: 'Date',
    operation: 'Operation',
    material: 'Material',
    conditions: 'Conditions',
    dimensions: 'Dimensions',
    width: 'Belt width',
    length: 'Total length',
    speed: 'Speed',
    client: 'Client',
    name: 'Name',
    company: 'Company',
    role: 'Role',
    whatsapp: 'WhatsApp',
    email: 'Email',
    recommendation: 'Preliminary recommendation',
    recommendationText:
      'Your brief has been registered with a unique traceable reference. A GBS engineer will analyze the combination of material, conditions and dimensions to specify the appropriate belt under CEMA Belt Book 7th Ed. and will contact you within 24 business hours.',
    verify: 'Verify this brief at:',
    legal: 'Official GBS Colombia SAS document · Auto-generated',
    hd: 'Heavy Industry',
    lg: 'Light Industry',
    slow: 'Slow (< 1 m/s)',
    medium: 'Medium (1-3 m/s)',
    fast: 'Fast (> 3 m/s)',
    unknown: 'Not specified'
  }
};

export function BriefPDFDocument({
  brief,
  qrDataUrl,
  logoUrl
}: {
  brief: DiagnosticBrief;
  qrDataUrl: string;
  logoUrl: string;
}) {
  const L = labels[brief.locale];
  const createdAt = new Date(brief.createdAt).toLocaleDateString(
    brief.locale === 'en' ? 'en-US' : 'es-CO'
  );
  const speedMap = { slow: L.slow, medium: L.medium, fast: L.fast, unknown: L.unknown };
  const width = brief.widthOtherText ? brief.widthOtherText : `${brief.widthMm} mm`;
  const material = brief.materialOtherText ? brief.materialOtherText : brief.material;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.watermark} fixed>
          GBS COLOMBIA
        </Text>

        <View style={styles.header}>
          <View>
            <Text style={styles.kicker}>{L.kicker}</Text>
            <Text style={styles.title}>{L.title}</Text>
            <Text style={styles.code}>{brief.code}</Text>
          </View>
          <Image src={logoUrl} style={styles.logo} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{L.operation}</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>{L.operation}</Text>
            <Text style={styles.rowValue}>{brief.operation === 'pesada' ? L.hd : L.lg}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>{L.material}</Text>
            <Text style={styles.rowValue}>{material}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{L.conditions}</Text>
          <Text style={styles.para}>
            {brief.conditions.length > 0 ? brief.conditions.join(' · ') : '—'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{L.dimensions}</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>{L.width}</Text>
            <Text style={styles.rowValue}>{width}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>{L.length}</Text>
            <Text style={styles.rowValue}>{brief.lengthMeters} m</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>{L.speed}</Text>
            <Text style={styles.rowValue}>{speedMap[brief.speed]}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{L.client}</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>{L.name}</Text>
            <Text style={styles.rowValue}>{brief.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>{L.company}</Text>
            <Text style={styles.rowValue}>{brief.company}</Text>
          </View>
          {brief.role && (
            <View style={styles.row}>
              <Text style={styles.rowLabel}>{L.role}</Text>
              <Text style={styles.rowValue}>{brief.role}</Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.rowLabel}>{L.whatsapp}</Text>
            <Text style={styles.rowValue}>{brief.whatsapp}</Text>
          </View>
          {brief.email && (
            <View style={styles.row}>
              <Text style={styles.rowLabel}>{L.email}</Text>
              <Text style={styles.rowValue}>{brief.email}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{L.recommendation}</Text>
          <Text style={styles.para}>{L.recommendationText}</Text>
        </View>

        <View style={styles.qrBlock}>
          <View>
            <Text style={styles.kicker}>{L.verify}</Text>
            <Text style={{ fontSize: 10, marginTop: 4 }}>
              co.gbsint.com/verificar/{brief.code}
            </Text>
          </View>
          <Image src={qrDataUrl} style={{ width: 72, height: 72 }} />
        </View>

        <View style={styles.footer} fixed>
          <Text>{L.legal}</Text>
          <Text>
            {createdAt} · {brief.code}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
