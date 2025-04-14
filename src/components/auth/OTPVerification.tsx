
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// OTP validation schema
const otpSchema = z.object({
  otp: z.string().min(6, { message: "OTP must be 6 digits" }),
});

type OTPFormValues = z.infer<typeof otpSchema>;

interface OTPVerificationProps {
  email: string;
  onVerificationComplete?: () => void;
  onCancel?: () => void;
}

const OTPVerification = ({ email, onVerificationComplete, onCancel }: OTPVerificationProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [remainingTime, setRemainingTime] = useState(300); // 5 minutes in seconds
  
  // OTP form setup
  const form = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Handle OTP verification
  const onSubmit = async (values: OTPFormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: values.otp,
        type: 'email'
      });
      
      if (error) throw error;
      
      toast({
        title: "Verification successful",
        description: "Your email has been verified successfully.",
      });
      
      if (onVerificationComplete) {
        onVerificationComplete();
      } else {
        navigate("/");
      }
    } catch (error: any) {
      console.error("OTP verification error:", error);
      toast({
        title: "Verification failed",
        description: error.message || "Failed to verify your email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Request a new OTP
  const requestNewOTP = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      
      if (error) throw error;
      
      // Reset timer
      setRemainingTime(300);
      
      toast({
        title: "OTP resent",
        description: "A new verification code has been sent to your email.",
      });
    } catch (error: any) {
      console.error("OTP resend error:", error);
      toast({
        title: "Failed to resend OTP",
        description: error.message || "Failed to send a new verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h3 className="text-2xl font-semibold tracking-tight">Email Verification</h3>
        <p className="text-sm text-muted-foreground">
          We've sent a verification code to <span className="font-medium">{email}</span>.
          <br />Enter the code below to verify your email.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-xs text-center text-muted-foreground">
            Didn't receive the code? 
            <button 
              type="button" 
              onClick={requestNewOTP} 
              className="text-muslim-teal hover:underline ml-1"
              disabled={isSubmitting}
            >
              Resend
            </button>
          </div>

          <div className="flex gap-2">
            <Button 
              type="submit" 
              className="w-full bg-muslim-teal hover:bg-muslim-teal/90" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Email"
              )}
            </Button>
            {onCancel && (
              <Button 
                type="button" 
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OTPVerification;
