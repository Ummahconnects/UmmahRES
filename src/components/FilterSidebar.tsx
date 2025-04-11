import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

  const businessCategories = [
    "Restaurants", 
    "Grocery", 
    "Healthcare", 
    "Professional Services", 
    "Education",
    "Retail",
    "Finance",
    "Technology"
  ];

  const businessServices = [
    "Halal Food",
    "Delivery",
    "Online Booking",
    "Catering",
    "Women Only",
    "Family Friendly"
  ];

  const mosqueCategories = [
    "Sunni Mosques",
    "Islamic Centers",
    "Prayer Spaces"
  ];

  const mosqueFacilities = [
    "Wudu Facilities",
    "Women's Section",
    "Parking",
    "Wheelchair Access",
    "Islamic Library",
    "Weekend School",
    "Funeral Services"
  ];

  const ratings = ["5 Stars", "4+ Stars", "3+ Stars"];

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

  return (
    <div className="w-full lg:w-64 bg-white p-4 rounded-lg border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </h3>
        <Button 
          variant="link" 
          size="sm" 
          onClick={clearFilters}
          className="text-muslim-teal font-medium"
        >
          Clear all
        </Button>
      </div>
      
      <Separator className="my-4" />
      
      <Accordion type="multiple" defaultValue={["categories", "services", "ratings"]}>
        <AccordionItem value="categories" className="border-none">
          <AccordionTrigger className="py-2 text-sm font-medium">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 py-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category}`} 
                    checked={filters.categories?.includes(category)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateFilter('categories', category);
                      } else {
                        updateFilter('categories', category);
                      }
                    }}
                  />
                  <Label 
                    htmlFor={`category-${category}`}
                    className="text-sm cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="services" className="border-none">
          <AccordionTrigger className="py-2 text-sm font-medium">{servicesLabel}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 py-2">
              {services.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`service-${service}`} 
                    checked={filters.services?.includes(service)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateFilter('services', service);
                      } else {
                        updateFilter('services', service);
                      }
                    }}
                  />
                  <Label 
                    htmlFor={`service-${service}`}
                    className="text-sm cursor-pointer"
                  >
                    {service}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {type === "business" && (
          <AccordionItem value="ratings" className="border-none">
            <AccordionTrigger className="py-2 text-sm font-medium">Ratings</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 py-2">
                {ratings.map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`rating-${rating}`} 
                      checked={filters.ratings?.includes(rating)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFilter('ratings', rating);
                        } else {
                          updateFilter('ratings', rating);
                        }
                      }}
                    />
                    <Label 
                      htmlFor={`rating-${rating}`}
                      className="text-sm cursor-pointer"
                    >
                      {rating}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
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
