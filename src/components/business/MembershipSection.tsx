
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Loader2, ShieldCheck, BarChart3 } from "lucide-react";
import CurrentMembership from "./CurrentMembership";
import PlanFeatures from "./PlanFeatures";
import { useMembership } from "@/hooks/useMembership";
import CustomerAnalytics from "../analytics/CustomerAnalytics";

interface MembershipSectionProps {
  businessId: string;
}

const MembershipSection = ({ businessId }: MembershipSectionProps) => {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium' | 'enterprise'>('basic');
  const { 
    membership, 
    loading, 
    processingSubscription, 
    updateMembership 
  } = useMembership(businessId);
  
  const handleSubscribe = async () => {
    if (!user || !businessId) return;
    await updateMembership(selectedPlan);
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
                
                <div className="space-y-4">
                  <Select 
                    value={selectedPlan} 
                    onValueChange={(value: 'basic' | 'premium' | 'enterprise') => setSelectedPlan(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic - $19.99/month</SelectItem>
                      <SelectItem value="premium">Premium - $49.99/month</SelectItem>
                      <SelectItem value="enterprise">Enterprise - $99.99/month</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <PlanFeatures planType={selectedPlan} />
                  
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
                      `${membership ? 'Update' : 'Activate'} Membership`
                    )}
                  </Button>
                  
                  <p className="text-sm text-gray-500 text-center">
                    By subscribing, you agree to our terms and conditions.
                    Memberships are billed monthly and can be cancelled anytime.
                  </p>
                </div>
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
