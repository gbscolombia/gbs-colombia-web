export function buildWhatsappUrl(message: string, phoneNumber?: string): string {
  const number = phoneNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573011144826';
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
