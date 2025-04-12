
import React from "react";
import { Filter, Grid, List, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface MosqueToolbarProps {
  totalCount: number;
  viewMode: "grid" | "list";
  sortBy: string;
  setViewMode: (mode: "grid" | "list") => void;
  handleSortChange: (value: string) => void;
  onAddMosqueClick: () => void;
}

const MosqueToolbar = ({ 
  totalCount, 
  viewMode, 
  sortBy, 
  setViewMode, 
  handleSortChange,
  onAddMosqueClick
}: MosqueToolbarProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-sm text-gray-500">
          <MapPin className="inline h-4 w-4 mr-1" />
          <span>Showing {totalCount} mosques</span>
        </div>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Button 
            onClick={onAddMosqueClick}
            className="bg-muslim-teal text-white hover:bg-muslim-teal/90 flex items-center mr-auto sm:mr-0"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Mosque
          </Button>
          
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex border rounded-md">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setViewMode("grid")}
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
              onClick={() => setViewMode("list")}
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

export default MosqueToolbar;
