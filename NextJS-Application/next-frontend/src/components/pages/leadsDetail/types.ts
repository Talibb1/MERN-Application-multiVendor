export interface LeadData {
  id: number;
  companyName: string;
  status: string;
  industry: string | null;
  source: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  description: string | null;
  contacts: {
    id: number;
    contactName: string;
    title: string | null;
    email: string | null;
    phone: string | null;
    position: string | null;
    contactDetails: string | null;
  }[];
}
