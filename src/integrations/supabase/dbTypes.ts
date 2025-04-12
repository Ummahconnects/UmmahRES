
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
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  start_date: string;
  end_date: string | null;
}
