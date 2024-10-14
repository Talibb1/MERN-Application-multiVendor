export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id?: string;
  token: string;
  roles?: string[];
  isAuth?: boolean;
  isVerified?: boolean;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  picture?: string;
  organizationId: number;
}

export interface UserResponse {
  response: string;
  token: string;
  email: string;
  user: User;
}

export interface ProfileResponse {
  user: User;
}

export interface Organization {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrganizationInput {
  name: string;
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
  error?: string;
  user: {
    token: string;
    email: string;
    isVerified: boolean;
    roles?: string[];
    isAuth?: boolean;
    name: string;
    organizationId: number;
  };
}

export interface Lead {
  id: number;
  companyName: string;
  industry: string | null;
  status: string;
  source: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  description: string | null;
  userId: number;
  createdAt: string;
  updatedAt: string;
  contacts: Contact[];
}

export interface Contact {
  id: number;
  contactName: string;
  title: string | null;
  email: string | null;
  phone: string | null;
  position: string | null;
  contactDetails: string | null;
  leadId: number;
  createdAt: string;
  updatedAt: string;
  leads: Lead[];
}

export interface CreateLeadInput {
  companyName: string;
  contactName: string;
}
export interface CreateNotes {
  notes: string;
  leadId: number;
}

export interface CreateContactInput {
  contactName: string;
  title?: string; 
  email?: string; 
  phone?: string; 
  position?: string; 
  contactDetails?: string; 
  leadId: number;
}


export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export interface CreateTeamMemberInput {
  email: string;           
  role: string;            
  organizationId: number;  
}

export interface UpdateTeamMemberInput {
  email?: string;      
  role?: string;           
  organizationId?: number; 
}


export interface UpdateNotes {
  content?: string;
}