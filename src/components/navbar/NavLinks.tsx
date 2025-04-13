
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";

interface NavLinkItem {
  text: string;
  href: string;
  variant: "link" | "ghost";
}

const navItems: NavLinkItem[] = [
  { text: "Home", href: "/", variant: "ghost" },
  { text: "Businesses", href: "/businesses", variant: "ghost" },
  { text: "Mosques", href: "/mosques", variant: "ghost" },
  { text: "Community", href: "/community", variant: "ghost" }, // Add new Community link
  { text: "Dashboard", href: "/dashboard", variant: "ghost" }, // Add new Dashboard link
  { text: "Events", href: "/community-events", variant: "ghost" }
];

const NavLinks = () => {
  const isMobile = useMobile();

  if (isMobile) {
    return null;
  }

  return (
    <div className="hidden sm:ml-6 sm:flex sm:space-x-2">
      {navItems.map((item) => (
        <Button key={item.href} asChild variant={item.variant} className="text-gray-600">
          <Link to={item.href}>{item.text}</Link>
        </Button>
      ))}
    </div>
  );
};

export default NavLinks;
