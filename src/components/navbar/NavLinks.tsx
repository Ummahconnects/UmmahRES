
import { Link } from "react-router-dom";
import { Calendar, HelpCircle } from "lucide-react";

interface NavLinksProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

const navItems = [
  { path: "/", label: "Home", icon: null },
  { path: "/businesses", label: "Businesses", icon: null },
  { path: "/mosques", label: "Mosques", icon: null },
  { path: "/community-events", label: "Events", icon: Calendar },
  { path: "/about", label: "About", icon: null },
  { path: "/packages", label: "Packages", icon: null },
  { path: "/sales", label: "Sponsorships", icon: null },
  { path: "/affiliates", label: "Affiliates", icon: null },
  { path: "/help", label: "Help", icon: HelpCircle },
];

const NavLinks = ({ isMobile = false, onLinkClick }: NavLinksProps) => {
  if (isMobile) {
    return (
      <div className="pt-2 pb-3 space-y-1">
        {navItems.map((item) => (
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
      {navItems.map((item) => (
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
