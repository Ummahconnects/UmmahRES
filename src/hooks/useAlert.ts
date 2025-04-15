
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useAlert() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendAlert = async (subject: string, message: string) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.functions.invoke("send-alert", {
        body: { subject, message }
      });
      
      if (error) throw error;
      
      toast({
        title: "Alert sent",
        description: "Your alert has been sent successfully.",
      });
      
      return { success: true };
    } catch (error: any) {
      console.error("Alert sending error:", error);
      
      toast({
        title: "Error sending alert",
        description: error.message || "An unknown error occurred while sending the alert",
        variant: "destructive",
      });
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendAlert,
    isLoading
  };
}
