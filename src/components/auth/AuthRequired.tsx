
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface AuthRequiredProps {
  children: React.ReactNode;
}

const AuthRequired = ({ children }: AuthRequiredProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in</h1>
        <p className="mb-4">You need to be signed in to access this page</p>
        <Button onClick={() => navigate("/auth")}>
          Sign In / Register
        </Button>
      </div>
    </div>
  );
};

export default AuthRequired;
