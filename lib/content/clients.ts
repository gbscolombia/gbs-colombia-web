import data from '@/content/clients/clients.json';

export interface Client {
  id: string;
  name: string;
  logoUrl?: string;
  fallback: string;
  industry: string;
}

export async function getClients(): Promise<Client[]> {
  return (data as { clients: Client[] }).clients;
}
