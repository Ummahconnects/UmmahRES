
import React from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterToggleButtonProps {
  onClick: () => void;
  className?: string;
}

const FilterToggleButton = ({ onClick, className }: FilterToggleButtonProps) => {
  return (
    <Button 
      variant="outline" 
      onClick={onClick}
      className={`w-full flex items-center justify-center ${className || ''}`}
    >
      <Filter className="h-4 w-4 mr-2" />
      Filters
    </Button>
  );
};

export default FilterToggleButton;
