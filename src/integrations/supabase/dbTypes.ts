
// Define database table types that aren't present in the generated types
export interface BusinessProfile {
  id: string;
  user_id: string;
  business_name: string;
  business_description: string;
  category: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
}

export interface ReviewData {
  id: string;
  business_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  users?: {
    email?: string;
  };
}

export interface Membership {
  id: string;
  business_id: string;
  plan_type: 'basic' | 'premium' | 'enterprise';
  billing_cycle: 'monthly' | 'annual';
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  start_date: string;
  end_date: string | null;
}

// Define custom Database type to use with Supabase client
export type CustomDatabase = {
  public: {
    Tables: {
      business_profiles: {
        Row: BusinessProfile;
        Insert: Omit<BusinessProfile, 'id'> & { id?: string };
        Update: Partial<BusinessProfile>;
      };
      reviews: {
        Row: ReviewData;
        Insert: Omit<ReviewData, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<ReviewData>;
      };
      memberships: {
        Row: Membership;
        Insert: Omit<Membership, 'id'> & { id?: string };
        Update: Partial<Membership>;
      };
    };
  };
};
