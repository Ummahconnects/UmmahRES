
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth";

interface AuthRequiredProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const AuthRequired = ({ children, redirectTo = "/auth" }: AuthRequiredProps) => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in</h1>
          <p className="mb-4">You need to be signed in to access this page</p>
          <Button onClick={() => navigate(redirectTo)}>
            Sign In / Register
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthRequired;
