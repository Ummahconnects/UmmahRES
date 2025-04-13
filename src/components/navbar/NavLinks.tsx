
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavLinkItem {
  text: string;
  href: string;
  variant: "link" | "ghost";
}

interface NavLinksProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

const navItems: NavLinkItem[] = [
  { text: "Home", href: "/", variant: "ghost" },
  { text: "Businesses", href: "/businesses", variant: "ghost" },
  { text: "Mosques", href: "/mosques", variant: "ghost" },
  { text: "Community", href: "/community", variant: "ghost" }, 
  { text: "Dashboard", href: "/dashboard", variant: "ghost" }, 
  { text: "Events", href: "/community-events", variant: "ghost" }
];

const NavLinks = ({ isMobile, onLinkClick }: NavLinksProps = {}) => {
  const isSmallScreen = useIsMobile();

  if (isSmallScreen && !isMobile) {
    return null;
  }

  return (
    <div className={isMobile ? "py-2 px-2 space-y-1" : "hidden sm:ml-6 sm:flex sm:space-x-2"}>
      {navItems.map((item) => (
        <Button 
          key={item.href} 
          asChild 
          variant={item.variant} 
          className="text-gray-600"
          onClick={onLinkClick}
        >
          <Link to={item.href}>{item.text}</Link>
        </Button>
      ))}
    </div>
  );
};

export default NavLinks;
