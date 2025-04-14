
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, AlertTriangle } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/auth/useAuth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  const { verifyOTP, resendOTP, isRateLimited, attempts } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [remainingTime, setRemainingTime] = useState(300); // 5 minutes in seconds
  
  // OTP form setup
  const form = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Countdown timer
  useEffect(() => {
    if (remainingTime <= 0) return;
    
    const timer = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [remainingTime]);

  // Format remaining time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  // Handle OTP verification
  const onSubmit = async (values: OTPFormValues) => {
    setIsSubmitting(true);
    try {
      await verifyOTP(email, values.otp);
      
      if (onVerificationComplete) {
        onVerificationComplete();
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Request a new OTP
  const requestNewOTP = async () => {
    if (isRateLimited) {
      toast({
        title: "Rate limited",
        description: `Too many attempts (${attempts}/5). Please try again later.`,
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      await resendOTP(email);
      
      // Reset timer
      setRemainingTime(300);
    } catch (error) {
      console.error("OTP resend error:", error);
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
        {remainingTime > 0 ? (
          <p className="text-sm text-muted-foreground">
            Code expires in: <span className="font-medium">{formatTime(remainingTime)}</span>
          </p>
        ) : (
          <Alert variant="destructive" className="mt-2">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Code expired</AlertTitle>
            <AlertDescription>
              Your verification code has expired. Please request a new one.
            </AlertDescription>
          </Alert>
        )}
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
              disabled={isSubmitting || isRateLimited}
            >
              Resend
            </button>
          </div>

          <div className="flex gap-2">
            <Button 
              type="submit" 
              className="w-full bg-muslim-teal hover:bg-muslim-teal/90" 
              disabled={isSubmitting || remainingTime <= 0}
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
