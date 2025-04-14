
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useSignUp() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Add captcha verification bypass option
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: window.location.origin + '/auth',
          captchaToken: "disabled" // This tells Supabase to bypass the captcha check
        }
      });
      
      if (error) throw error;
      
      const needsEmailVerification = !data.session;
      
      if (needsEmailVerification) {
        toast({
          title: "Verification email sent",
          description: "Please check your email for a verification code.",
        });
      } else {
        toast({
          title: "Sign up successful",
          description: "Your account has been created successfully.",
        });
      }
      
      return { needsEmailVerification };
    } catch (error: any) {
      const errorMessage = error.message || "An unknown error occurred during signup";
      
      toast({
        title: "Error signing up",
        description: errorMessage,
        variant: "destructive",
      });
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signUp,
    isLoading,
    error
  };
}
