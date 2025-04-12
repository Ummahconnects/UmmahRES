
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Membership } from "@/integrations/supabase/dbTypes";

export function useMembership(businessId: string) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [processingSubscription, setProcessingSubscription] = useState(false);
  const [membership, setMembership] = useState<Membership | null>(null);

  useEffect(() => {
    if (!businessId) return;
    
    fetchMembership();
  }, [businessId]);

  const fetchMembership = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('memberships')
        .select('*')
        .eq('business_id', businessId)
        .order('created_at', { ascending: false })
        .maybeSingle();
        
      if (error) throw error;
      
      setMembership(data);
    } catch (error: any) {
      console.error('Error fetching membership:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateMembership = async (planType: 'basic' | 'premium' | 'enterprise', billingCycle: 'monthly' | 'annual' = 'monthly') => {
    try {
      setProcessingSubscription(true);
      
      // For a real app, you would integrate with a payment provider like Stripe
      const endDate = new Date();
      
      // Set the end date based on billing cycle
      if (billingCycle === 'monthly') {
        endDate.setMonth(endDate.getMonth() + 1); // 1 month membership
      } else {
        endDate.setFullYear(endDate.getFullYear() + 1); // 12 month membership
      }
      
      if (membership) {
        // Update existing membership
        const { error } = await supabase
          .from('memberships')
          .update({
            plan_type: planType,
            billing_cycle: billingCycle,
            status: 'active',
            start_date: new Date().toISOString(),
            end_date: endDate.toISOString(),
          })
          .eq('id', membership.id);
          
        if (error) throw error;
      } else {
        // Create new membership
        const { error } = await supabase
          .from('memberships')
          .insert({
            business_id: businessId,
            plan_type: planType,
            billing_cycle: billingCycle,
            status: 'active',
            start_date: new Date().toISOString(),
            end_date: endDate.toISOString(),
          });
          
        if (error) throw error;
      }
      
      // Fetch updated membership
      await fetchMembership();
      
      toast({
        title: "Membership activated",
        description: `Your ${planType.charAt(0).toUpperCase() + planType.slice(1)} ${billingCycle} membership has been activated successfully.`,
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

  return { 
    membership, 
    loading, 
    processingSubscription, 
    updateMembership 
  };
}
