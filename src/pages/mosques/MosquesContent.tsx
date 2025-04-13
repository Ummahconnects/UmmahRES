
import React, { useState } from "react";
import { MosqueProps } from "@/components/MosqueCard";
import FilterSidebar from "@/components/filters/FilterSidebar";
import MosqueForm from "./MosqueForm";
import MosqueListView from "./components/MosqueListView";
import MosqueToolbar from "./components/MosqueToolbar";
import MobileFilterToggle from "./components/MobileFilterToggle";
import MosqueGrid from "./components/MosqueGrid";
import EmptyMosqueState from "./components/EmptyMosqueState";
import { MapPin } from "lucide-react";
import { useLocation } from "@/contexts/LocationContext";

interface MosquesContentProps {
  mosques: MosqueProps[];
  filteredMosques: MosqueProps[];
  onFilterChange: (filters: Record<string, any>) => void;
  isLocalFiltered?: boolean;
}

const MosquesContent = ({ 
  mosques, 
  filteredMosques, 
  onFilterChange,
  isLocalFiltered = false
}: MosquesContentProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterSidebarVisible, setIsFilterSidebarVisible] = useState(false);
  const [isAddMosqueDialogOpen, setIsAddMosqueDialogOpen] = useState(false);
  const { userLocation } = useLocation();

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
    <div className="relative bg-muslim-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white/80 relative z-10">
        {isLocalFiltered && userLocation.city && (
          <div className="bg-muslim-light/40 p-4 rounded-lg mb-6 flex items-center text-muslim-dark">
            <MapPin className="h-4 w-4 mr-2 text-muslim-teal" />
            <span>
              Showing mosques near{" "}
              <strong>{userLocation.city}{userLocation.state ? `, ${userLocation.state}` : ""}</strong>
            </span>
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="hidden lg:block lg:w-64 shrink-0">
            <div className="sticky top-6">
              <FilterSidebar type="mosque" onFilterChange={onFilterChange} />
            </div>
          </div>

          <MobileFilterToggle
            isFilterSidebarVisible={isFilterSidebarVisible}
            toggleFilterSidebar={toggleFilterSidebar}
            onFilterChange={onFilterChange}
          />

          <div className="flex-1">
            <MosqueToolbar
              totalCount={filteredMosques.length}
              viewMode={viewMode}
              sortBy={sortBy}
              setViewMode={setViewMode}
              handleSortChange={handleSortChange}
              onAddMosqueClick={() => setIsAddMosqueDialogOpen(true)}
            />
            
            {filteredMosques.length === 0 ? (
              <EmptyMosqueState />
            ) : viewMode === "grid" ? (
              <MosqueGrid mosques={filteredMosques} />
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
    </div>
  );
};

export default MosquesContent;
