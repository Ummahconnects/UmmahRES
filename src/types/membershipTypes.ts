
// Define the basic data structure for memberships
export interface Membership {
  id: string;
  business_id: string;
  plan_type: 'basic' | 'premium' | 'enterprise';
  billing_cycle: 'monthly' | 'annual';
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  start_date: string;
  end_date: string | null;
}

export interface PlanDetail {
  name: string;
  price: string;
  annualPrice: string;
  annualSavings: string;
  color: string;
  features: string[];
}

export interface PlanDetails {
  basic: PlanDetail;
  premium: PlanDetail;
  enterprise: PlanDetail;
}

export const planDetails: PlanDetails = {
  basic: {
    name: "Basic",
    price: "$19.99/month",
    annualPrice: "$199.90/year",
    annualSavings: "Save $40",
    color: "gray-500",
    features: [
      "Basic business profile",
      "Community access",
      "Verified member badge",
      "Basic networking tools"
    ]
  },
  premium: {
    name: "Premium",
    price: "$49.99/month",
    annualPrice: "$499.90/year",
    annualSavings: "Save $100",
    color: "muslim-teal",
    features: [
      "Everything in Basic",
      "Priority listing placement",
      "Advanced networking tools",
      "Monthly business insight reports",
      "Featured in community newsletter"
    ]
  },
  enterprise: {
    name: "Enterprise",
    price: "$99.99/month",
    annualPrice: "$999.90/year",
    annualSavings: "Save $200",
    color: "muslim-blue",
    features: [
      "Everything in Premium",
      "Dedicated account manager",
      "Custom marketing campaigns",
      "Priority support",
      "Quarterly business strategy sessions",
      "Featured in community events"
    ]
  }
};
