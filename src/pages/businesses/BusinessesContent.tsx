
import React, { useState } from "react";
import { BusinessProps } from "@/components/BusinessCard";
import FilterSection from "@/components/business/FilterSection";
import BusinessContent from "@/components/business/BusinessContent";
import PromotionalBanners from "@/components/business/PromotionalBanners";
import { MapPin } from "lucide-react";
import { useLocation } from "@/contexts/LocationContext";

interface BusinessesContentProps {
  businesses: BusinessProps[];
  filteredBusinesses: BusinessProps[];
  onFilterChange: (filters: Record<string, any>) => void;
  isLocalFiltered?: boolean;
}

const BusinessesContent = ({ 
  businesses, 
  filteredBusinesses, 
  onFilterChange,
  isLocalFiltered = false
}: BusinessesContentProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterSidebarVisible, setIsFilterSidebarVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const { userLocation } = useLocation();
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const toggleFilterSidebar = () => {
    setIsFilterSidebarVisible(!isFilterSidebarVisible);
  };

  const paginatedBusinesses = () => {
    // Sort businesses based on sortBy value
    let sorted = [...filteredBusinesses];
    
    switch (sortBy) {
      case "featured":
        sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
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
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sorted.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {isLocalFiltered && userLocation.city && (
        <div className="bg-muslim-light/40 p-4 rounded-lg mb-6 flex items-center text-muslim-dark">
          <MapPin className="h-4 w-4 mr-2 text-muslim-teal" />
          <span>
            Showing businesses near{" "}
            <strong>{userLocation.city}{userLocation.state ? `, ${userLocation.state}` : ""}</strong>
          </span>
        </div>
      )}
      
      <PromotionalBanners />
      
      <div className="flex flex-col lg:flex-row gap-6">
        <FilterSection 
          isFilterSidebarVisible={isFilterSidebarVisible}
          toggleFilterSidebar={toggleFilterSidebar}
          onFilterChange={onFilterChange}
        />

        <div className="flex-1">
          <BusinessContent 
            businesses={paginatedBusinesses()}
            totalCount={filteredBusinesses.length}
            sortBy={sortBy}
            viewMode={viewMode}
            currentPage={currentPage}
            totalPages={totalPages}
            onSortChange={handleSortChange}
            onViewModeChange={setViewMode}
            setCurrentPage={setCurrentPage}
          />
          
          <PromotionalBanners />
        </div>
      </div>
    </div>
  );
};

export default BusinessesContent;
