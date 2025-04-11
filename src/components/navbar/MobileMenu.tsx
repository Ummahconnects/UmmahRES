
import { cn } from "@/lib/utils";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";

interface MobileMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenu = ({ isOpen, toggleMenu }: MobileMenuProps) => {
  return (
    <div
      className={cn(
        "sm:hidden transition-all duration-200 ease-in-out",
        isOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
      )}
    >
      <NavLinks isMobile onLinkClick={toggleMenu} />
      
      <div className="pt-4 pb-3 border-t border-gray-200">
        <UserMenu isMobile onItemClick={toggleMenu} />
      </div>
    </div>
  );
};

export default MobileMenu;
