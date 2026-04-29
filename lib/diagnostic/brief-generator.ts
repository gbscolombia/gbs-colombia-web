import { generateReferenceCode } from '@/lib/utils/reference-code';
import type {
  DiagnosticBrief,
  DiagnosticBriefV2,
  DiagnosticFormData,
  DiagnosticFormDataV2,
  FabricationData,
  SupplyData
} from './diagnostic-data';
import { calcSummary } from './formulas-cema';
import { site } from '@/lib/constants/site';

const MATERIAL_TO_INDUSTRY: Record<string, string> = {
  panificacion: 'alimentos-bebidas',
  carnicos: 'alimentos-bebidas',
  'frutas-vegetales': 'alimentos-bebidas',
  'cajas-paquetes': 'logistica-empaque',
  farmaceutico: 'farmaceutica',
  'mineral-grueso': 'mineria-agregados',
  'mineral-fino': 'mineria-agregados',
  'clinker-cemento': 'cemento',
  carbon: 'puertos',
  'arena-grava': 'mineria-agregados'
};

export function inferIndustry(data: DiagnosticFormData): string {
  return MATERIAL_TO_INDUSTRY[data.material] ||
    (data.operation === 'pesada' ? 'mineria-agregados' : 'logistica-empaque');
}

export function inferIndustryV2(data: DiagnosticFormDataV2): string {
  if (data.path === 'fabrication' && data.fabrication) {
    return MATERIAL_TO_INDUSTRY[data.fabrication.materialSlug] ||
      (data.fabrication.line === 'pesada' ? 'mineria-agregados' : 'logistica-empaque');
  }
  if (data.path === 'supply' && data.supply) {
    return data.supply.line === 'pesada' ? 'mineria-agregados' : 'logistica-empaque';
  }
  return 'logistica-empaque';
}

export function createBrief(data: DiagnosticFormData): DiagnosticBrief {
  return {
    ...data,
    code: generateReferenceCode(),
    createdAt: new Date().toISOString(),
    inferredIndustry: inferIndustry(data)
  };
}

export function createBriefV2(data: DiagnosticFormDataV2): DiagnosticBriefV2 {
  let cema: DiagnosticBriefV2['cema'];
  if (data.path === 'fabrication' && data.fabrication) {
    const f = data.fabrication;
    const lift =
      f.hasInclination && f.inclinationStartH != null && f.inclinationEndH != null
        ? f.inclinationEndH - f.inclinationStartH
        : 0;
    cema = calcSummary({
      widthMm: f.widthMm || 800,
      lengthM: f.lengthM || 10,
      liftM: lift,
      speed: f.speed,
      materialSlug: f.materialSlug
    });
  }
  return {
    code: generateReferenceCode(),
    createdAt: new Date().toISOString(),
    data,
    inferredIndustry: inferIndustryV2(data),
    cema
  };
}

export function buildWhatsappMessage(brief: DiagnosticBrief): string {
  const es = brief.locale !== 'en';
  if (es) {
    return `Hola GBS, acabo de generar el brief técnico ${brief.code}.

Mi operación es ${brief.operation === 'pesada' ? 'industria pesada' : 'industria liviana'}.
Material: ${brief.materialOtherText || brief.material}.
Ancho banda: ${brief.widthOtherText || `${brief.widthMm} mm`}.
Largo: ${brief.lengthMeters} m.
Velocidad: ${brief.speed}.

Quisiera continuar la conversación con un ingeniero.`;
  }
  return `Hi GBS, I just generated the technical brief ${brief.code}.

My operation is ${brief.operation === 'pesada' ? 'heavy industry' : 'light industry'}.
Material: ${brief.materialOtherText || brief.material}.
Belt width: ${brief.widthOtherText || `${brief.widthMm} mm`}.
Length: ${brief.lengthMeters} m.
Speed: ${brief.speed}.

I'd like to continue the conversation with an engineer.`;
}

export function buildWhatsappMessageV2(brief: DiagnosticBriefV2): string {
  const { data, code, cema } = brief;
  const es = data.locale !== 'en';
  if (data.path === 'fabrication' && data.fabrication) {
    const f = data.fabrication;
    if (es) {
      return `Hola GBS, generé el brief técnico ${code} (FABRICACIÓN).

Línea: ${f.line === 'pesada' ? 'pesada' : 'liviana'}.
Material: ${f.materialOtherText || f.materialSlug}.
Ancho banda: ${f.widthOtherText || `${f.widthMm} mm`}.
Longitud: ${f.lengthM} m.
Estructura: ${f.structure}.
${cema ? `Capacidad estimada: ${cema.tph.toFixed(1)} TPH · Potencia: ${cema.powerKw.toFixed(1)} kW.` : ''}

Quisiera continuar con un ingeniero.`;
    }
    return `Hi GBS, I generated the technical brief ${code} (FABRICATION).

Line: ${f.line === 'pesada' ? 'heavy' : 'light'}.
Material: ${f.materialOtherText || f.materialSlug}.
Belt width: ${f.widthOtherText || `${f.widthMm} mm`}.
Length: ${f.lengthM} m.
Structure: ${f.structure}.
${cema ? `Estimated capacity: ${cema.tph.toFixed(1)} TPH · Power: ${cema.powerKw.toFixed(1)} kW.` : ''}

I'd like to continue with an engineer.`;
  }
  // Supply path
  const s = data.supply;
  if (es) {
    return `Hola GBS, generé el brief técnico ${code} (SUMINISTRO).

Línea: ${s?.line === 'pesada' ? 'pesada' : 'liviana'}.
Producto principal: ${supplyHeadline(s)}.

Quisiera continuar con un ingeniero.`;
  }
  return `Hi GBS, I generated the technical brief ${code} (SUPPLY).

Line: ${s?.line === 'pesada' ? 'heavy' : 'light'}.
Main product: ${supplyHeadline(s)}.

I'd like to continue with an engineer.`;
}

function supplyHeadline(s: SupplyData | undefined): string {
  if (!s) return '—';
  if (s.heavy?.beltType) return `Banda ${s.heavy.beltType}`;
  if (s.light?.beltType) return `Banda ${s.light.beltType}`;
  if (s.heavy?.rollerTypes?.length) return `Rodillos ${s.heavy.rollerTypes.join(', ')}`;
  return s.freeText || (s.line === 'pesada' ? 'Línea pesada' : 'Línea liviana');
}

export function briefVerifyUrl(code: string): string {
  return `${site.url}/verificar/${code}`;
}

/** Plain-text summary used in emails and PDF. */
export function briefSummaryText(brief: DiagnosticBriefV2): string {
  const lines: string[] = [];
  const { data, cema } = brief;
  lines.push(`Ruta: ${data.path === 'fabrication' ? 'Fabricación' : 'Suministro'}`);
  if (data.path === 'fabrication' && data.fabrication) {
    const f = data.fabrication;
    lines.push(`Línea: ${f.line}`);
    lines.push(`Material: ${f.materialOtherText || f.materialSlug}`);
    lines.push(`Estructura: ${f.structure}`);
    lines.push(`Ancho banda: ${f.widthOtherText || `${f.widthMm} mm`}`);
    lines.push(`Largo: ${f.lengthM} m`);
    if (f.hasInclination) lines.push(`Inclinación: ${f.inclinationStartH}m → ${f.inclinationEndH}m sobre ${f.inclinationLengthM}m`);
    lines.push(`Velocidad: ${f.speed}`);
    lines.push(`Voltaje: ${f.voltage}V`);
    lines.push(`Automatización: ${f.automation}`);
    if (cema) {
      lines.push('');
      lines.push('Cálculos preliminares CEMA:');
      lines.push(`- TPH estimada: ${cema.tph.toFixed(1)}`);
      lines.push(`- Potencia: ${cema.powerKw.toFixed(2)} kW (${cema.powerHp.toFixed(1)} HP)`);
      lines.push(`- Torque eje motriz: ${cema.torqueNm.toFixed(0)} Nm`);
    }
  } else if (data.path === 'supply' && data.supply) {
    const s = data.supply;
    lines.push(`Línea: ${s.line}`);
    if (s.heavy) {
      if (s.heavy.beltType) lines.push(`Banda pesada: ${s.heavy.beltType}, lonas: ${s.heavy.plies ?? '-'}, ancho: ${s.heavy.widthMm ?? '-'}mm, largo: ${s.heavy.lengthM ?? '-'}m`);
      if (s.heavy.rollerTypes?.length) lines.push(`Rodillos (${s.heavy.rollerMaterial ?? '-'}): ${s.heavy.rollerTypes.join(', ')}`);
      if (s.heavy.cleanerTypes?.length) lines.push(`Limpiadores: ${s.heavy.cleanerTypes.join(', ')}`);
      if (s.heavy.splice) lines.push(`Empalme: ${s.heavy.splice}`);
    }
    if (s.light) {
      if (s.light.beltType) lines.push(`Banda liviana: ${s.light.beltType}, espesor: ${s.light.thicknessMm ?? '-'}mm, color: ${s.light.color ?? '-'}, patrón: ${s.light.pattern ?? '-'}`);
      if (s.light.splice) lines.push(`Empalme: ${s.light.splice}`);
    }
    if (s.freeText) lines.push(`Notas: ${s.freeText}`);
  }
  lines.push('');
  lines.push(`Cliente: ${data.contact.name} · ${data.contact.company}`);
  lines.push(`WhatsApp: ${data.contact.whatsapp}`);
  if (data.contact.email) lines.push(`Email: ${data.contact.email}`);
  return lines.join('\n');
}
