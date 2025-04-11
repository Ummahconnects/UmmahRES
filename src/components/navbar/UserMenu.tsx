import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, User, Building } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserMenuProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

const UserMenu = ({ isMobile = false, onItemClick }: UserMenuProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    if (onItemClick) onItemClick();
  };
  
  if (isMobile) {
    return user ? (
      <>
        <div className="flex items-center px-4">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-muslim-teal text-white flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
          </div>
          <div className="ml-3">
            <div className="text-base font-medium text-gray-800">{user.email}</div>
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <button
            className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left"
            onClick={() => {
              navigate("/business-profile");
              if (onItemClick) onItemClick();
            }}
          >
            Business Profile
          </button>
          <button
            className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left"
            onClick={() => {
              navigate("/membership");
              if (onItemClick) onItemClick();
            }}
          >
            Membership
          </button>
          <button 
            className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </>
    ) : (
      <div className="mt-3 space-y-1 px-4">
        <button
          className="block py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left"
          onClick={() => {
            navigate("/auth");
            if (onItemClick) onItemClick();
          }}
        >
          Sign In
        </button>
        <button
          className="block py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left"
          onClick={() => {
            navigate("/auth?tab=signup");
            if (onItemClick) onItemClick();
          }}
        >
          Register
        </button>
      </div>
    );
  }

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <div className="h-8 w-8 rounded-full bg-muslim-teal text-white flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/business-profile")}>
          <Building className="mr-2 h-4 w-4" />
          <span>Business Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/membership")}>
          <span>Membership</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <div className="flex items-center space-x-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="border-muslim-teal text-muslim-teal hover:bg-muslim-teal/10"
        onClick={() => navigate("/auth")}
      >
        <LogIn className="mr-2 h-4 w-4" />
        Sign In
      </Button>
      <Button
        variant="default"
        size="sm"
        className="bg-muslim-teal hover:bg-muslim-teal/90 text-white"
        onClick={() => navigate("/auth?tab=signup")}
      >
        Register
      </Button>
    </div>
  );
};

export default UserMenu;
