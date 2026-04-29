import { nanoid, customAlphabet } from 'nanoid';

const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const generate = customAlphabet(alphabet, 8);

export function generateReferenceCode(): string {
  const year = new Date().getFullYear();
  return `GBS-BT-${year}-${generate()}`;
}

export function isValidReferenceCode(code: string): boolean {
  return /^GBS-BT-\d{4}-[A-Z0-9]{8}$/.test(code);
}

export { nanoid };
