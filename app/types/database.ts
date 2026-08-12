export type Role = 'startup' | 'investor';

export type Sector =
  | 'AI'
  | 'SaaS'
  | 'Fintech'
  | 'E-commerce'
  | 'Healthtech'
  | 'Energy'
  | 'Other';

export type AmountRange =
  | '0-50k'
  | '50-100k'
  | '100-250k'
  | '250-500k'
  | '500k-1m'
  | '1m+';

export interface Profile {
  id: string;
  role: Role;
  created_at: string;
}

export interface StartupProfile {
  id: string;
  user_id: string;
  name: string;
  description: string;
  sector: Sector[];
  funding_amount: AmountRange;
  created_at: string;
  updated_at: string;
}

export interface InvestorProfile {
  id: string;
  user_id: string;
  name: string;
  about: string;
  sector_interest: Sector[];
  investment_amount: AmountRange;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Pick<Profile, 'id' | 'role'>;
        Update: Partial<Pick<Profile, 'role'>>;
      };
      startup_profiles: {
        Row: StartupProfile;
        Insert: Omit<StartupProfile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<StartupProfile, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;
      };
      investor_profiles: {
        Row: InvestorProfile;
        Insert: Omit<InvestorProfile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<InvestorProfile, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;
      };
      messages: {
        Row: Message;
        Insert: Omit<Message, 'id' | 'created_at'>;
        Update: never;
      };
    };
  };
}
