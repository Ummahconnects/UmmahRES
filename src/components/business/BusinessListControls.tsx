
import { Grid, List, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";

interface BusinessListControlsProps {
  totalCount: number;
  sortBy: string;
  viewMode: "grid" | "list";
  onSortChange: (value: string) => void;
  onViewModeChange: (mode: "grid" | "list") => void;
}

const BusinessListControls = ({
  totalCount,
  sortBy,
  viewMode,
  onSortChange,
  onViewModeChange
}: BusinessListControlsProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-sm text-gray-500">
          <MapPin className="inline h-4 w-4 mr-1" />
          <span>Showing {totalCount} businesses</span>
        </div>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex border rounded-md">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onViewModeChange("grid")}
              className={cn(
                "px-2",
                viewMode === "grid" && "bg-gray-100"
              )}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-8" />
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onViewModeChange("list")}
              className={cn(
                "px-2",
                viewMode === "list" && "bg-gray-100"
              )}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessListControls;
