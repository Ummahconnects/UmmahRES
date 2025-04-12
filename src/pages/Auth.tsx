
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import AuthCard from "@/components/auth/AuthCard";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const { user, loading } = useAuth();
  const location = useLocation();

  // Handle successful signup by switching to login tab
  const handleSignupSuccess = () => {
    setActiveTab("login");
  };

  // If the user is already logged in, redirect to home
  if (user && !loading) {
    const from = (location.state as any)?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-12">
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
      </div>
    </Layout>
  );
};

export default AuthPage;
