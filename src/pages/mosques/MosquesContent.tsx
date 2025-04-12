import React, { useState } from "react";
import { Filter, List, Grid, MapPin, Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import FilterSidebar from "@/components/filters/FilterSidebar";
import { cn } from "@/lib/utils";
import MosqueCard, { MosqueProps } from "@/components/MosqueCard";
import MosqueForm from "./MosqueForm";

interface MosquesContentProps {
  mosques: MosqueProps[];
  filteredMosques: MosqueProps[];
  onFilterChange: (filters: Record<string, any>) => void;
}

const MosquesContent = ({ 
  mosques, 
  filteredMosques, 
  onFilterChange 
}: MosquesContentProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterSidebarVisible, setIsFilterSidebarVisible] = useState(false);
  const [isAddMosqueDialogOpen, setIsAddMosqueDialogOpen] = useState(false);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    let sorted = [...filteredMosques];
    
    switch (value) {
      case "featured":
        sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
  };

  const toggleFilterSidebar = () => {
    setIsFilterSidebarVisible(!isFilterSidebarVisible);
  };

  return (
    <div 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.95)),
          url("/lovable-uploads/d4232037-f592-44d2-a32d-58dd19c46688.png")
        `,
        backgroundSize: 'cover, 300px 300px',
        backgroundPosition: 'center, top left',
        backgroundBlendMode: 'soft-light, normal',
        backgroundRepeat: 'no-repeat, repeat'
      }}
    >
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="hidden lg:block lg:w-64 shrink-0">
          <div className="sticky top-6">
            <FilterSidebar type="mosque" onFilterChange={onFilterChange} />
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
              <FilterSidebar type="mosque" onFilterChange={onFilterChange} />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm text-gray-500">
                <MapPin className="inline h-4 w-4 mr-1" />
                <span>Showing {filteredMosques.length} mosques</span>
              </div>
              
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Button 
                  onClick={() => setIsAddMosqueDialogOpen(true)}
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
          
          {filteredMosques.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No mosques found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMosques.map((mosque) => (
                <MosqueCard key={mosque.id} {...mosque} />
              ))}
            </div>
          ) : (
            <MosqueListView mosques={filteredMosques} />
          )}
        </div>
      </div>

      <MosqueForm 
        isOpen={isAddMosqueDialogOpen}
        onOpenChange={setIsAddMosqueDialogOpen}
      />
    </div>
  );
};

const MosqueListView = ({ mosques }: { mosques: MosqueProps[] }) => {
  return (
    <div className="space-y-4">
      {mosques.map((mosque) => (
        <div key={mosque.id} className="flex flex-col sm:flex-row bg-white rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
          <div className="sm:w-48 h-48 sm:h-auto overflow-hidden">
            <img
              src={mosque.image}
              alt={mosque.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{mosque.name}</h3>
                <Badge
                  variant="outline"
                  className="mt-1 text-xs"
                >
                  {mosque.type}
                </Badge>
              </div>
              <div className={cn(
                "text-xs font-medium px-2 py-1 rounded",
                mosque.isOpen 
                  ? "bg-green-100 text-green-800" 
                  : "bg-red-100 text-red-800"
              )}>
                {mosque.isOpen ? "Open" : "Closed"}
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-500">
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-1 shrink-0 mt-0.5" />
                <span>{mosque.address}</span>
              </div>
              {mosque.jumuahTime && (
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Jumu'ah: {mosque.jumuahTime}</span>
                </div>
              )}
            </div>
            {mosque.facilities && mosque.facilities.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {mosque.facilities.map((facility) => (
                  <Badge key={facility} variant="secondary" className="text-xs">
                    {facility}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MosquesContent;
