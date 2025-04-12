
import React from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterSidebar from "@/components/filters/FilterSidebar";

interface FilterSectionProps {
  isFilterSidebarVisible: boolean;
  toggleFilterSidebar: () => void;
  onFilterChange: (filters: Record<string, any>) => void;
}

const FilterSection = ({ 
  isFilterSidebarVisible, 
  toggleFilterSidebar, 
  onFilterChange 
}: FilterSectionProps) => {
  return (
    <>
      <div className="hidden lg:block lg:w-64 shrink-0">
        <div className="sticky top-6">
          <FilterSidebar type="business" onFilterChange={onFilterChange} />
        </div>
      </div>

      <div className="lg:hidden mb-4">
        <Button 
          variant="outline" 
          onClick={toggleFilterSidebar}
          className="w-full flex items-center justify-center"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
        
        {isFilterSidebarVisible && (
          <div className="mt-4">
            <FilterSidebar type="business" onFilterChange={onFilterChange} />
          </div>
        )}
      </div>
    </>
  );
};

export default FilterSection;
