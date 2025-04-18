
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Sparkles, TriangleAlert } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/auth/useAuth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Form validation schema
const signupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSuccess?: (email: string, needsEmailVerification: boolean) => void;
}

const SignupForm = ({ onSuccess }: SignupFormProps) => {
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const [signupError, setSignupError] = useState<string | null>(null);
  const isTrial = searchParams.get('trial') === 'platinum';
  
  // Signup form setup
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle signup form submission
  const onSubmit = async (values: SignupFormValues) => {
    setIsSubmitting(true);
    setSignupError(null);
    
    try {
      const { needsEmailVerification } = await signUp(values.email, values.password);
      
      if (isTrial) {
        toast({
          title: "Free trial activated!",
          description: "Your 3-day Platinum trial has been activated. Enjoy all premium features!",
          variant: "default",
        });
      }
      
      if (onSuccess) {
        onSuccess(values.email, needsEmailVerification);
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      setSignupError(error.message || "An unexpected error occurred during signup");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {isTrial && (
          <div className="bg-amber-50 p-3 rounded-md border border-amber-200 mb-4 flex items-center">
            <Sparkles className="h-4 w-4 text-amber-500 mr-2" />
            <p className="text-sm text-amber-800">
              You're signing up for the <span className="font-bold">3-day Platinum trial</span>
            </p>
          </div>
        )}
        
        {signupError && (
          <Alert variant="destructive">
            <TriangleAlert className="h-4 w-4" />
            <AlertTitle>Signup failed</AlertTitle>
            <AlertDescription>{signupError}</AlertDescription>
          </Alert>
        )}
      
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-muslim-teal hover:bg-muslim-teal/90" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            isTrial ? "Create Account & Start Trial" : "Create Account"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
