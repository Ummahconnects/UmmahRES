
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
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
import { Loader2, ShieldCheck, Check, Clock } from "lucide-react";
import { format } from "date-fns";

interface MembershipSectionProps {
  businessId: string;
}

// Define the basic data structure for memberships
interface Membership {
  id: string;
  plan_type: 'basic' | 'premium' | 'enterprise';
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  start_date: string;
  end_date: string | null;
}

const planDetails = {
  basic: {
    name: "Basic",
    price: "$19.99/month",
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

const MembershipSection = ({ businessId }: MembershipSectionProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [membership, setMembership] = useState<Membership | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium' | 'enterprise'>('basic');
  const [processingSubscription, setProcessingSubscription] = useState(false);

  useEffect(() => {
    const fetchMembership = async () => {
      if (!businessId) return;
      
      try {
        setLoading(true);
        
        // Add type assertion to handle Supabase query
        const { data, error } = await supabase
          .from('memberships')
          .select('*')
          .eq('business_id', businessId)
          .order('created_at', { ascending: false })
          .maybeSingle() as { data: Membership | null; error: any };
          
        if (error) throw error;
        
        setMembership(data);
        if (data && data.plan_type) {
          setSelectedPlan(data.plan_type);
        }
      } catch (error: any) {
        console.error('Error fetching membership:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMembership();
  }, [businessId]);
  
  const handleSubscribe = async () => {
    if (!user || !businessId) return;
    
    try {
      setProcessingSubscription(true);
      
      // For now, we'll just create a membership record
      // In a real app, you would integrate with a payment provider like Stripe
      
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1); // 1 month membership
      
      if (membership) {
        // Update existing membership with type assertion
        const { error } = await supabase
          .from('memberships')
          .update({
            plan_type: selectedPlan,
            status: 'active',
            start_date: new Date().toISOString(),
            end_date: endDate.toISOString(),
          })
          .eq('id', membership.id) as { error: any };
          
        if (error) throw error;
      } else {
        // Create new membership with type assertion
        const { error } = await supabase
          .from('memberships')
          .insert({
            business_id: businessId,
            plan_type: selectedPlan,
            status: 'active',
            start_date: new Date().toISOString(),
            end_date: endDate.toISOString(),
          }) as { error: any };
          
        if (error) throw error;
      }
      
      // Fetch updated membership
      const { data, error } = await supabase
        .from('memberships')
        .select('*')
        .eq('business_id', businessId)
        .order('created_at', { ascending: false })
        .maybeSingle() as { data: Membership | null; error: any };
        
      if (error) throw error;
      
      setMembership(data);
      
      toast({
        title: "Membership activated",
        description: `Your ${planDetails[selectedPlan].name} membership has been activated successfully.`,
      });
    } catch (error: any) {
      console.error('Error subscribing:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to activate membership",
        variant: "destructive",
      });
    } finally {
      setProcessingSubscription(false);
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'expired':
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };
  
  return (
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
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">Current Membership</h3>
                    <p className="capitalize text-muslim-teal font-medium">
                      {planDetails[membership.plan_type].name} Plan
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${getStatusColor(membership.status)}`}>
                      {membership.status === 'active' && <span className="flex items-center"><Check className="h-4 w-4 mr-1" /> Active</span>}
                      {membership.status === 'pending' && <span className="flex items-center"><Clock className="h-4 w-4 mr-1" /> Pending</span>}
                      {membership.status === 'expired' && "Expired"}
                      {membership.status === 'cancelled' && "Cancelled"}
                    </div>
                    {membership.end_date && (
                      <p className="text-sm text-gray-500">
                        Expires: {format(new Date(membership.end_date), 'MMM d, yyyy')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <h3 className="font-semibold text-lg mb-4">
                {membership ? "Change Membership Plan" : "Select a Membership Plan"}
              </h3>
              
              <div className="space-y-4">
                <Select value={selectedPlan} onValueChange={(value: any) => setSelectedPlan(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic - $19.99/month</SelectItem>
                    <SelectItem value="premium">Premium - $49.99/month</SelectItem>
                    <SelectItem value="enterprise">Enterprise - $99.99/month</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">{planDetails[selectedPlan].name} Plan Features:</h4>
                  <ul className="space-y-1">
                    {planDetails[selectedPlan].features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 font-semibold">{planDetails[selectedPlan].price}</p>
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
  );
};

export default MembershipSection;
