
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface FilterHeaderProps {
  clearFilters: () => void;
}

const FilterHeader = ({ clearFilters }: FilterHeaderProps) => {
  return (
    <>
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
    </>
  );
};

export default FilterHeader;
