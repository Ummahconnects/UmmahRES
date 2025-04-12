
import { Link } from "react-router-dom";
import { Calendar, Heart, HelpCircle, BarChart3 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface NavLinksProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

const navItems = [
  { path: "/", label: "Home", icon: null },
  { path: "/businesses", label: "Businesses", icon: null },
  { path: "/mosques", label: "Mosques", icon: null },
  { path: "/community-events", label: "Events", icon: Calendar },
  { path: "/charities", label: "Charities", icon: Heart },
  { path: "/about", label: "About", icon: null },
  { path: "/packages", label: "Packages", icon: null },
  { path: "/sales", label: "Sponsorships", icon: null },
  { path: "/affiliates", label: "Affiliates", icon: null },
  { path: "/help", label: "Help", icon: HelpCircle },
];

// Staff-only nav item
const staffNavItem = { path: "/staff-dashboard", label: "Analytics", icon: BarChart3 };

const NavLinks = ({ isMobile = false, onLinkClick }: NavLinksProps) => {
  const { user } = useAuth();
  
  // Check if user is staff (you would replace this with your actual staff check)
  const isStaff = user?.email?.endsWith('@ummahconnects.com') || false;
  
  const allNavItems = isStaff ? [...navItems, staffNavItem] : navItems;
  
  if (isMobile) {
    return (
      <div className="pt-2 pb-3 space-y-1">
        {allNavItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            onClick={onLinkClick}
          >
            {item.label}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
      {allNavItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="border-transparent text-gray-700 hover:text-muslim-teal inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
        >
          {item.icon && <item.icon className="mr-1 h-4 w-4" />} {item.label}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
