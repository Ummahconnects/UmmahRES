
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, Calendar, HelpCircle, LogIn, LogOut, User, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-muslim-teal font-bold text-xl font-montserrat tracking-wide">
                UMMAH-CONNECTS
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-transparent text-gray-700 hover:text-muslim-teal inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/businesses"
                className="border-transparent text-gray-700 hover:text-muslim-teal inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Businesses
              </Link>
              <Link
                to="/mosques"
                className="border-transparent text-gray-700 hover:text-muslim-teal inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Mosques
              </Link>
              <Link
                to="/community-events"
                className="border-transparent text-gray-700 hover:text-muslim-teal inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                <Calendar className="mr-1 h-4 w-4" /> Events
              </Link>
              <Link
                to="/about"
                className="border-transparent text-gray-700 hover:text-muslim-teal inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                About
              </Link>
              <Link
                to="/packages"
                className="border-transparent text-gray-700 hover:text-muslim-teal inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Packages
              </Link>
              <Link
                to="/sales"
                className="border-transparent text-gray-700 hover:text-muslim-teal inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Sponsorships
              </Link>
              <Link
                to="/affiliates"
                className="border-transparent text-gray-700 hover:text-muslim-teal inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Affiliates
              </Link>
              <Link
                to="/help"
                className="border-transparent text-gray-700 hover:text-muslim-teal inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                <HelpCircle className="mr-1 h-4 w-4" /> Help
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
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
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mr-2"
                  onClick={() => navigate("/auth")}
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Sign In
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="bg-muslim-teal hover:bg-muslim-teal/90"
                  onClick={() => navigate("/auth?tab=signup")}
                >
                  Register
                </Button>
              </>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "sm:hidden transition-all duration-200 ease-in-out",
          isMenuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
        )}
      >
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/businesses"
            className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            onClick={toggleMenu}
          >
            Businesses
          </Link>
          <Link
            to="/mosques"
            className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            onClick={toggleMenu}
          >
            Mosques
          </Link>
          <Link
            to="/community-events"
            className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            onClick={toggleMenu}
          >
            Events
          </Link>
          <Link
            to="/about"
            className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            to="/packages"
            className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            onClick={toggleMenu}
          >
            Packages
          </Link>
          <Link
            to="/sales"
            className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            onClick={toggleMenu}
          >
            Sponsorships
          </Link>
          <Link
            to="/affiliates"
            className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            onClick={toggleMenu}
          >
            Affiliates
          </Link>
          <Link
            to="/help"
            className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            onClick={toggleMenu}
          >
            Help
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {user ? (
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
                <Link
                  to="/business-profile"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left"
                  onClick={toggleMenu}
                >
                  Business Profile
                </Link>
                <Link
                  to="/membership"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left"
                  onClick={toggleMenu}
                >
                  Membership
                </Link>
                <button 
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    handleSignOut();
                    toggleMenu();
                  }}
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <div className="mt-3 space-y-1 px-4">
              <Link
                to="/auth"
                className="block py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left"
                onClick={toggleMenu}
              >
                Sign In
              </Link>
              <Link
                to="/auth?tab=signup"
                className="block py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left"
                onClick={toggleMenu}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
