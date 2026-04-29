/**
 * Cálculos de ingeniería bajo CEMA Belt Book 7ma Ed. + DIN 22101.
 * Resultados ORIENTATIVOS — un ingeniero GBS valida con software CEMA.
 *
 * Refs:
 *  - CEMA: Te = f·L·(2·mb + mm + mr) + (mm·H) + concentrated forces
 *  - Power: P = (Te·v) / 1000   [kW]
 *  - Torque: T = Te · R         [Nm]  con R = radio polea motriz
 */

export interface BulkMaterial {
  slug: string;
  /** Densidad aparente bulk en kg/m³ */
  density: number;
  /** Ángulo de sobrecarga (sobrecarga de pila sobre artesa) en grados */
  surchargeAngle: number;
  /** Coeficiente de fricción interno típico para arrastre */
  internalFriction: number;
}

export const BULK_MATERIALS: Record<string, BulkMaterial> = {
  cemento:           { slug: 'cemento',           density: 1400, surchargeAngle: 15, internalFriction: 0.55 },
  clinker:           { slug: 'clinker',           density: 1500, surchargeAngle: 15, internalFriction: 0.60 },
  'clinker-cemento': { slug: 'clinker-cemento',   density: 1450, surchargeAngle: 15, internalFriction: 0.58 },
  'mineral-fino':    { slug: 'mineral-fino',      density: 1600, surchargeAngle: 18, internalFriction: 0.70 },
  'mineral-grueso':  { slug: 'mineral-grueso',    density: 1800, surchargeAngle: 20, internalFriction: 0.80 },
  carbon:            { slug: 'carbon',            density: 1250, surchargeAngle: 18, internalFriction: 0.65 },
  'arena-grava':     { slug: 'arena-grava',       density: 1600, surchargeAngle: 20, internalFriction: 0.70 },
  agregados:         { slug: 'agregados',         density: 1600, surchargeAngle: 20, internalFriction: 0.75 },
  granos:            { slug: 'granos',            density: 750,  surchargeAngle: 12, internalFriction: 0.45 },
  panificacion:      { slug: 'panificacion',      density: 500,  surchargeAngle: 10, internalFriction: 0.30 },
  carnicos:          { slug: 'carnicos',          density: 700,  surchargeAngle: 5,  internalFriction: 0.30 },
  'frutas-vegetales':{ slug: 'frutas-vegetales',  density: 600,  surchargeAngle: 10, internalFriction: 0.32 },
  'cajas-paquetes':  { slug: 'cajas-paquetes',    density: 400,  surchargeAngle: 0,  internalFriction: 0.35 },
  farmaceutico:      { slug: 'farmaceutico',      density: 500,  surchargeAngle: 5,  internalFriction: 0.30 },
  generico:          { slug: 'generico',          density: 1000, surchargeAngle: 15, internalFriction: 0.50 }
};

export function getMaterial(slug: string | undefined): BulkMaterial {
  if (!slug) return BULK_MATERIALS.generico;
  return BULK_MATERIALS[slug] ?? BULK_MATERIALS.generico;
}

export type SpeedKey = 'slow' | 'medium' | 'fast' | 'unknown';
export const SPEED_VALUES: Record<SpeedKey, number> = {
  slow: 0.8,
  medium: 2.0,
  fast: 3.5,
  unknown: 1.5
};

export interface CapacityInput {
  /** Ancho útil de banda en mm */
  widthMm: number;
  /** Velocidad en m/s */
  velocity: number;
  /** Material a transportar */
  material: BulkMaterial;
  /** Ángulo de artesa, default 35° */
  troughAngleDeg?: number;
}

/**
 * Capacidad teórica CEMA (banda en artesa estándar de 3 rodillos).
 * Aproximación: A_carga = k · b² · tan(surcharge) + b² · 0.07 (área artesa equivalente)
 * Con k coeficiente CEMA-like simplificado para ángulo de artesa 35°.
 */
export function calcCapacityTph(input: CapacityInput): number {
  const b = input.widthMm / 1000; // m
  const v = Math.max(0, input.velocity);
  const surcharge = (input.material.surchargeAngle * Math.PI) / 180;
  const trough = ((input.troughAngleDeg ?? 35) * Math.PI) / 180;

  // Área cargada aprox: parte central plana + dos cuñas laterales + sobrecarga superior
  const usefulWidth = 0.9 * b; // CEMA edge clearance
  const areaTrough = 0.5 * Math.tan(trough) * (usefulWidth ** 2) * 0.25;
  const areaSurcharge = 0.5 * Math.tan(surcharge) * (usefulWidth ** 2);
  const area = areaTrough + areaSurcharge;

  // TPH = A · v · ρ · 3.6
  const tph = area * v * input.material.density * 3.6;
  return Math.max(0, tph);
}

export interface PowerInput extends CapacityInput {
  /** Distancia entre ejes en metros */
  lengthM: number;
  /** Diferencia de altura H (m). Positiva si sube, negativa si baja. */
  liftM?: number;
  /** Coeficiente artificial de fricción CEMA (default 0.022) */
  cemaF?: number;
  /** Masa por metro de partes móviles (banda + rodillos) kg/m. Default según ancho. */
  movingMassPerM?: number;
}

/**
 * Tensión efectiva Te (CEMA): Te = L·f·g·(2·mb + mm + mr) + g·mm·H
 *  - L = longitud entre ejes (m)
 *  - f = coef fricción artificial (~0.022)
 *  - mb = masa banda por metro (kg/m)
 *  - mm = masa material por metro (kg/m)
 *  - mr = masa rodillos por metro (kg/m)
 *  - H = lift (m)
 */
export function calcEffectiveTension(input: PowerInput): {
  Te: number; mm: number; mb: number; mr: number;
} {
  const tph = calcCapacityTph(input);
  const v = Math.max(0.1, input.velocity);
  const mm = (tph * 1000) / 3600 / v; // kg/m sobre la banda
  // masas estimadas según ancho
  const widthM = input.widthMm / 1000;
  const mb = input.movingMassPerM ?? Math.max(15, 18 * widthM); // banda kg/m
  const mr = Math.max(10, 14 * widthM); // rodillos kg/m
  const f = input.cemaF ?? 0.022;
  const g = 9.81;
  const L = Math.max(1, input.lengthM);
  const H = input.liftM ?? 0;

  const Te = L * f * g * (2 * mb + mm + mr) + g * mm * H;
  return { Te: Math.max(0, Te), mm, mb, mr };
}

/**
 * Potencia motor CEMA: P[kW] = Te·v / 1000 / η. Se aplica η=0.92 (motor+reductor).
 */
export function calcMotorPowerKw(input: PowerInput, efficiency = 0.92): {
  Te: number; powerKw: number; powerHp: number;
} {
  const { Te } = calcEffectiveTension(input);
  const v = Math.max(0.1, input.velocity);
  const powerKw = (Te * v) / 1000 / efficiency;
  const powerHp = powerKw * 1.341;
  return { Te, powerKw, powerHp };
}

/**
 * Torque en eje motriz: T = Te · R, con R = radio efectivo de polea motriz.
 * Default R = 0.25 m (polea 500mm) si no se especifica.
 */
export function calcDriveTorque(input: PowerInput, pulleyRadiusM = 0.25): {
  Te: number; torqueNm: number;
} {
  const { Te } = calcEffectiveTension(input);
  const torqueNm = Te * pulleyRadiusM;
  return { Te, torqueNm };
}

export interface CemaSummary {
  tph: number;
  powerKw: number;
  powerHp: number;
  torqueNm: number;
  Te: number;
  speedMs: number;
  density: number;
}

export function calcSummary(opts: {
  widthMm: number;
  lengthM: number;
  liftM?: number;
  speed: SpeedKey;
  materialSlug?: string;
  pulleyRadiusM?: number;
}): CemaSummary {
  const material = getMaterial(opts.materialSlug);
  const velocity = SPEED_VALUES[opts.speed];
  const tph = calcCapacityTph({ widthMm: opts.widthMm, velocity, material });
  const power = calcMotorPowerKw({
    widthMm: opts.widthMm,
    velocity,
    material,
    lengthM: opts.lengthM,
    liftM: opts.liftM
  });
  const torque = calcDriveTorque(
    { widthMm: opts.widthMm, velocity, material, lengthM: opts.lengthM, liftM: opts.liftM },
    opts.pulleyRadiusM
  );
  return {
    tph,
    powerKw: power.powerKw,
    powerHp: power.powerHp,
    torqueNm: torque.torqueNm,
    Te: torque.Te,
    speedMs: velocity,
    density: material.density
  };
}

/** Redondea a 1 decimal y agrega unidad. */
export function fmt(value: number, unit: string, digits = 1): string {
  if (!Number.isFinite(value)) return `— ${unit}`;
  return `${value.toLocaleString('es-CO', { maximumFractionDigits: digits })} ${unit}`;
}
