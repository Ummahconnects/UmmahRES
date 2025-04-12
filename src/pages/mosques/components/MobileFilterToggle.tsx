
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import FilterToggleButton from "./filter/FilterToggleButton";
import MobileFilterContainer from "./filter/MobileFilterContainer";

interface MobileFilterToggleProps {
  isFilterSidebarVisible: boolean;
  toggleFilterSidebar: () => void;
  onFilterChange: (filters: Record<string, any>) => void;
}

const MobileFilterToggle = ({ 
  isFilterSidebarVisible, 
  toggleFilterSidebar, 
  onFilterChange 
}: MobileFilterToggleProps) => {
  const isMobile = useIsMobile();

  // If not on mobile, don't render anything
  if (!isMobile) return null;
  
  return (
    <div className="lg:hidden mb-4">
      <FilterToggleButton onClick={toggleFilterSidebar} />
      <MobileFilterContainer 
        isVisible={isFilterSidebarVisible} 
        onFilterChange={onFilterChange} 
      />
    </div>
  );
};

export default MobileFilterToggle;
