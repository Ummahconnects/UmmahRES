
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useOtpVerification() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const resendOTP = async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      
      if (error) throw error;
      
      toast({
        title: "Verification code resent",
        description: "Please check your email for a new verification code.",
      });
      return { success: true };
    } catch (error: any) {
      toast({
        title: "Error resending verification code",
        description: error.message,
        variant: "destructive",
      });
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (email: string, token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'signup'
      });
      
      if (error) throw error;
      
      toast({
        title: "Email verified successfully",
        description: "Your email has been verified. You can now sign in.",
      });
      return { success: true };
    } catch (error: any) {
      toast({
        title: "Error verifying email",
        description: error.message,
        variant: "destructive",
      });
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    resendOTP,
    verifyOTP,
    isLoading,
    error
  };
}
