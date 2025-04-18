
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useSignIn() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Add captcha verification bypass option
      const { error } = await supabase.auth.signInWithPassword({ 
        email, 
        password,
        options: {
          captchaToken: "disabled" // This tells Supabase to bypass the captcha check
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Sign in successful",
        description: "You have been signed in successfully.",
      });
      
      return { success: true };
    } catch (error: any) {
      console.error("Login error:", error);
      
      toast({
        title: "Error signing in",
        description: error.message || "An unknown error occurred during sign in",
        variant: "destructive",
      });
      
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signIn,
    isLoading,
    error
  };
}
