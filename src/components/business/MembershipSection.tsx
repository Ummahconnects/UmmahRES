
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldCheck, BarChart3 } from "lucide-react";
import CurrentMembership from "./CurrentMembership";
import { useMembership } from "@/hooks/useMembership";
import CustomerAnalytics from "../analytics/CustomerAnalytics";
import PlanCard from "../membership/PlanCard";
import BillingCycleTabs from "../membership/BillingCycleTabs";
import { planDetails } from "@/types/membershipTypes";

interface MembershipSectionProps {
  businessId: string;
}

const MembershipSection = ({ businessId }: MembershipSectionProps) => {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium' | 'enterprise'>('basic');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const { 
    membership, 
    loading, 
    processingSubscription, 
    updateMembership 
  } = useMembership(businessId);
  
  const handleSubscribe = async () => {
    if (!user || !businessId) return;
    await updateMembership(selectedPlan, billingCycle);
  };
  
  // Check if the user has a premium plan or higher
  const hasPremiumOrHigher = membership && 
    (membership.plan_type === 'premium' || membership.plan_type === 'enterprise');
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShieldCheck className="mr-2 h-5 w-5 text-muslim-teal" />
            Business Membership
          </CardTitle>
          <CardDescription>
            Upgrade your membership to unlock more features and benefits
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="h-8 w-8 animate-spin text-muslim-teal" />
            </div>
          ) : (
            <div className="space-y-6">
              {membership && (
                <CurrentMembership membership={membership} />
              )}
              
              <div>
                <h3 className="font-semibold text-lg mb-4">
                  {membership ? "Change Membership Plan" : "Select a Membership Plan"}
                </h3>
                
                <BillingCycleTabs 
                  value={billingCycle}
                  onChange={setBillingCycle}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <PlanCard 
                    planType="basic"
                    plan={planDetails.basic}
                    billingCycle={billingCycle}
                    onSelect={() => setSelectedPlan('basic')}
                  />
                  
                  <PlanCard 
                    planType="premium"
                    plan={planDetails.premium}
                    billingCycle={billingCycle}
                    onSelect={() => setSelectedPlan('premium')}
                  />
                  
                  <PlanCard 
                    planType="enterprise"
                    plan={planDetails.enterprise}
                    billingCycle={billingCycle}
                    onSelect={() => setSelectedPlan('enterprise')}
                  />
                </div>
                
                <Button 
                  onClick={handleSubscribe} 
                  className="w-full bg-muslim-teal hover:bg-muslim-teal/90"
                  disabled={processingSubscription}
                >
                  {processingSubscription ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `${membership ? 'Update' : 'Activate'} ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Membership`
                  )}
                </Button>
                
                <p className="text-sm text-gray-500 text-center mt-4">
                  By subscribing, you agree to our terms and conditions.
                  Memberships are billed {billingCycle === 'monthly' ? 'monthly' : 'annually'} and can be cancelled anytime.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Show analytics for premium or higher plans */}
      {hasPremiumOrHigher && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-muslim-gold" />
              Advanced Analytics
            </CardTitle>
            <CardDescription>
              Detailed insights and metrics for your business profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CustomerAnalytics businessId={businessId} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MembershipSection;
