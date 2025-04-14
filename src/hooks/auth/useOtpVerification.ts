
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useOtpVerification() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [lastAttemptTime, setLastAttemptTime] = useState<Date | null>(null);

  // Helper to check rate limiting
  const checkRateLimit = () => {
    if (attempts >= 5 && lastAttemptTime) {
      const hourAgo = new Date();
      hourAgo.setHours(hourAgo.getHours() - 1);
      
      if (lastAttemptTime > hourAgo) {
        return false; // Rate limited
      }
      
      // Reset counter if an hour has passed
      setAttempts(0);
    }
    return true; // Not rate limited
  };

  const resendOTP = async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Check rate limiting
      if (!checkRateLimit()) {
        throw new Error("Too many attempts. Please try again later.");
      }
      
      // Track attempt
      setAttempts(prev => prev + 1);
      setLastAttemptTime(new Date());
      
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          // Set OTP expiration to 5 minutes (300 seconds)
          emailRedirectTo: window.location.origin + '/auth'
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Verification code resent",
        description: "Please check your email for a new verification code (valid for 5 minutes).",
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
      // Check rate limiting
      if (!checkRateLimit()) {
        throw new Error("Too many attempts. Please try again later.");
      }
      
      // Track attempt
      setAttempts(prev => prev + 1);
      setLastAttemptTime(new Date());
      
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'signup'
      });
      
      if (error) throw error;
      
      // Reset attempts after successful verification
      setAttempts(0);
      
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
    error,
    attempts,
    isRateLimited: !checkRateLimit()
  };
}
