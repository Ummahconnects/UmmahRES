
import React from "react";
import FilterSidebar from "@/components/filters/FilterSidebar";

interface MobileFilterContainerProps {
  isVisible: boolean;
  onFilterChange: (filters: Record<string, any>) => void;
}

const MobileFilterContainer = ({ 
  isVisible, 
  onFilterChange 
}: MobileFilterContainerProps) => {
  if (!isVisible) return null;
  
  return (
    <div className="mt-4">
      <FilterSidebar type="mosque" onFilterChange={onFilterChange} />
    </div>
  );
};

export default MobileFilterContainer;
