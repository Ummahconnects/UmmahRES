
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Accordion } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

// Import sub-components
import FilterHeader from "./FilterHeader";
import FilterSection from "./FilterSection";

// Import data
import { 
  businessCategories, 
  businessServices, 
  mosqueCategories, 
  mosqueFacilities, 
  ratings 
} from "./data/filterData";

interface FilterSidebarProps {
  type: "business" | "mosque";
  onFilterChange: (filters: Record<string, any>) => void;
}

const FilterSidebar = ({ type, onFilterChange }: FilterSidebarProps) => {
  const [filters, setFilters] = useState<Record<string, any>>({
    categories: [],
    services: [],
    ratings: [],
    facilities: [],
    isOpen: false
  });

  const updateFilter = (section: string, value: string) => {
    setFilters(prev => {
      const updated = { ...prev };
      if (!updated[section]) {
        updated[section] = [];
      }

      if (updated[section].includes(value)) {
        updated[section] = updated[section].filter((item: string) => item !== value);
      } else {
        updated[section] = [...updated[section], value];
      }

      onFilterChange(updated);
      return updated;
    });
  };

  const updateBooleanFilter = (key: string, value: boolean) => {
    setFilters(prev => {
      const updated = { ...prev };
      updated[key] = value;
      onFilterChange(updated);
      return updated;
    });
  };

  const clearFilters = () => {
    const emptyFilters = {
      categories: [],
      services: [],
      ratings: [],
      facilities: [],
      isOpen: false
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const categories = type === "business" ? businessCategories : mosqueCategories;
  const services = type === "business" ? businessServices : mosqueFacilities;
  const servicesLabel = type === "business" ? "Services" : "Facilities";
  const servicesKey = type === "business" ? "services" : "facilities";

  return (
    <div className="w-full lg:w-64 bg-white p-4 rounded-lg border">
      <FilterHeader clearFilters={clearFilters} />
      
      <Accordion type="multiple" defaultValue={["categories", "services", "ratings"]}>
        <FilterSection 
          title="Categories"
          section="categories"
          items={categories}
          selectedItems={filters.categories}
          updateFilter={updateFilter}
        />
        
        <FilterSection 
          title={servicesLabel}
          section={servicesKey}
          items={services}
          selectedItems={filters[servicesKey]}
          updateFilter={updateFilter}
        />
        
        {type === "business" && (
          <FilterSection 
            title="Ratings"
            section="ratings"
            items={ratings}
            selectedItems={filters.ratings}
            updateFilter={updateFilter}
          />
        )}
      </Accordion>
      
      <Separator className="my-4" />
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="is-open" 
          checked={filters.isOpen}
          onCheckedChange={(checked) => {
            updateBooleanFilter('isOpen', checked === true);
          }}
        />
        <Label 
          htmlFor="is-open"
          className="text-sm cursor-pointer"
        >
          Open now
        </Label>
      </div>
    </div>
  );
};

export default FilterSidebar;
