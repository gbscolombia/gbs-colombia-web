/**
 * Diagnostic v2 — bifurcated path:
 *  - Path A: SUPPLY (belts and accessories — heavy or light line)
 *  - Path B: FABRICATION (full conveyor design)
 *
 * Both paths converge to a contact step + brief generation + email + PDF.
 * v1 fields preserved for backward compatibility.
 */

export type OperationType = 'liviana' | 'pesada';
export type DiagnosticPath = 'supply' | 'fabrication';

export interface Material {
  slug: string;
  operation: OperationType;
}

export const MATERIALS: Material[] = [
  { slug: 'panificacion', operation: 'liviana' },
  { slug: 'carnicos', operation: 'liviana' },
  { slug: 'frutas-vegetales', operation: 'liviana' },
  { slug: 'cajas-paquetes', operation: 'liviana' },
  { slug: 'farmaceutico', operation: 'liviana' },
  { slug: 'mineral-grueso', operation: 'pesada' },
  { slug: 'mineral-fino', operation: 'pesada' },
  { slug: 'clinker-cemento', operation: 'pesada' },
  { slug: 'carbon', operation: 'pesada' },
  { slug: 'arena-grava', operation: 'pesada' }
];

export const CONDITIONS = [
  'temperatura',
  'humedad',
  'fda',
  'abrasion',
  'curvas',
  'pendiente',
  'impacto',
  'quimicos'
] as const;
export type ConditionKey = (typeof CONDITIONS)[number];

export const BAND_WIDTHS = [400, 500, 600, 650, 800, 1000, 1200, 1400, 1600, 1800, 2000];
export type Speed = 'slow' | 'medium' | 'fast' | 'unknown';

/* --------------------- SUPPLY (Heavy & Light) catalogs --------------------- */

export const HEAVY_BELT_TYPES = [
  'abrasion-din-y-z',
  'alta-temperatura',
  'grasas-aceites',
  'alma-acero-st',
  'elevadora-pelicula',
  'elevadora-sin-pelicula',
  'corrugada',
  'nervada-chevron',
  'nervada-multi-v',
  'nervada-espina-pescado',
  'antiflama',
  'cortes-impactos',
  'quimicos'
] as const;
export type HeavyBeltType = (typeof HEAVY_BELT_TYPES)[number];

export const ROLLER_MATERIALS = ['acero', 'plastico'] as const;
export type RollerMaterial = (typeof ROLLER_MATERIALS)[number];

export const ROLLER_TYPES = [
  'carga',
  'retorno',
  'impacto',
  'cama-impacto',
  'artesa-20',
  'artesa-35',
  'artesa-retorno',
  'artesa-auto-alineante',
  'estacion-auto-alineante',
  'anti-colmante',
  'especiales'
] as const;
export type RollerType = (typeof ROLLER_TYPES)[number];

export const CLEANER_TYPES = ['primario', 'secundario', 'dual', 'vpillow'] as const;
export type CleanerType = (typeof CLEANER_TYPES)[number];

export const MECH_SPLICES = ['grapa', 'chapeta', 'super-screw', 'vulcanizado'] as const;
export const LIGHT_SPLICES = ['vulcanizado', 'clipper', 'chapeta', 'cremallera'] as const;

export const LIGHT_BELT_TYPES = [
  'pu',
  'pvc',
  'poliolefina',
  'siliconada',
  'homogenea',
  'malla',
  'teflon',
  'modular',
  'carboxilato-nitrilo',
  'transmision-potencia'
] as const;
export type LightBeltType = (typeof LIGHT_BELT_TYPES)[number];

export const LIGHT_BELT_COLORS = [
  'blanca',
  'verde',
  'azul',
  'negra',
  'transparente',
  'naranja'
] as const;
export const LIGHT_BELT_FINISHES = ['mate', 'brillante'] as const;
export const LIGHT_BELT_PATTERNS = [
  'lisa',
  'corrugada',
  'wafer',
  'grano-arena',
  'acanalada',
  'escalonada'
] as const;

export interface SupplyHeavyDetail {
  beltType?: HeavyBeltType;
  plies?: number;
  widthMm?: number;
  lengthM?: number;
  rollerMaterial?: RollerMaterial;
  rollerTypes?: RollerType[];
  cleanerTypes?: CleanerType[];
  splice?: (typeof MECH_SPLICES)[number];
  motorPowerKw?: number;
  motorVoltage?: 110 | 220 | 440;
  variatorPowerKw?: number;
}

export interface SupplyLightDetail {
  beltType?: LightBeltType;
  thicknessMm?: number;
  color?: (typeof LIGHT_BELT_COLORS)[number];
  finish?: (typeof LIGHT_BELT_FINISHES)[number];
  pattern?: (typeof LIGHT_BELT_PATTERNS)[number];
  highTemp?: boolean;
  splice?: (typeof LIGHT_SPLICES)[number];
  pushers?: { spacingMm?: number; widthMm?: number; sizeMm?: number };
  sideEdge?: { enabled: boolean; heightMm?: number; bothSides?: boolean };
}

export interface SupplyData {
  line: OperationType;
  heavy?: SupplyHeavyDetail;
  light?: SupplyLightDetail;
  freeText?: string;
}

/* --------------------- FABRICATION (full conveyor) --------------------- */

export type ConveyorType = 'horizontal' | 'inclinado' | 'inclinado-z' | 'elevador-vertical';
export type StructureMaterial = 'acero-inoxidable' | 'acero-carbon';

export interface FabricationData {
  line: OperationType;
  materialSlug: string;
  materialOtherText?: string;
  highTemp: boolean;
  highHumidity: boolean;
  needsFiltration: boolean;
  structure: StructureMaterial;
  widthMm: number;
  widthOtherText?: string;
  lengthM: number;
  heightM?: number;
  hasInclination: boolean;
  inclinationStartH?: number;
  inclinationEndH?: number;
  inclinationLengthM?: number;
  conveyorType?: ConveyorType;
  granulometry?: string;
  tph?: number;
  speed: Speed;
  voltage: 110 | 220 | 440;
  accessoriesText?: string;
  automation: 'ninguna' | 'basica' | 'avanzada';
}

/* --------------------- v2 unified form --------------------- */

export interface ContactData {
  name: string;
  company: string;
  whatsapp: string;
  email?: string;
  role?: string;
  consent: boolean;
}

export interface DiagnosticFormDataV2 {
  path: DiagnosticPath;
  supply?: SupplyData;
  fabrication?: FabricationData;
  contact: ContactData;
  locale: 'es' | 'en';
  /** v1-compat field for older flows that still used the 5-step shape */
  legacy?: DiagnosticFormData;
}

/* --------------------- v1 (kept for backward-compat) --------------------- */

export interface DiagnosticFormData {
  operation: OperationType;
  material: string;
  materialOtherText?: string;
  conditions: ConditionKey[];
  widthMm: number;
  widthOtherText?: string;
  lengthMeters: number;
  speed: Speed;
  name: string;
  company: string;
  whatsapp: string;
  email?: string;
  role?: string;
  consent: boolean;
  locale: 'es' | 'en';
}

export interface DiagnosticBrief extends DiagnosticFormData {
  code: string;
  createdAt: string;
  inferredIndustry: string;
}

export interface DiagnosticBriefV2 {
  code: string;
  createdAt: string;
  data: DiagnosticFormDataV2;
  inferredIndustry: string;
  /** CEMA preliminary calculations when applicable */
  cema?: {
    tph: number;
    powerKw: number;
    powerHp: number;
    torqueNm: number;
    Te: number;
    speedMs: number;
    density: number;
  };
}
