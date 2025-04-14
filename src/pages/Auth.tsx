
import { useState, useEffect } from "react";
import { Navigate, useLocation, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import OTPVerification from "@/components/auth/OTPVerification";
import AuthCard from "@/components/auth/AuthCard";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const { user, loading } = useAuth();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Set initial tab based on URL parameter
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'signup') {
      setActiveTab('signup');
    }
  }, [searchParams]);

  // Handle successful signup by switching to OTP verification
  const handleSignupSuccess = (email: string, needsEmailVerification: boolean) => {
    if (needsEmailVerification) {
      setVerificationEmail(email);
      setShowOTPVerification(true);
    } else {
      setActiveTab("login");
    }
  };

  // Handle OTP verification completion
  const handleVerificationComplete = () => {
    setShowOTPVerification(false);
    setActiveTab("login");
  };

  // Handle cancel OTP verification
  const handleCancelVerification = () => {
    setShowOTPVerification(false);
    setActiveTab("signup");
  };

  // If the user is already logged in, redirect to home
  if (user && !loading) {
    const from = (location.state as any)?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-12">
        {showOTPVerification ? (
          <AuthCard 
            title="Verify Your Email" 
            description="Enter the verification code sent to your email"
          >
            <OTPVerification 
              email={verificationEmail}
              onVerificationComplete={handleVerificationComplete}
              onCancel={handleCancelVerification}
            />
          </AuthCard>
        ) : (
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            {/* Login Tab */}
            <TabsContent value="login">
              <AuthCard 
                title="Login" 
                description="Sign in to access your account"
              >
                <LoginForm />
              </AuthCard>
            </TabsContent>
            
            {/* Sign Up Tab */}
            <TabsContent value="signup">
              <AuthCard 
                title="Create an account" 
                description="Join our community and connect with Muslim-owned businesses"
              >
                <SignupForm onSuccess={handleSignupSuccess} />
              </AuthCard>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Layout>
  );
};

export default AuthPage;
