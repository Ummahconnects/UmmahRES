
import React, { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BusinessProps } from "@/components/BusinessCard";
import FilterSidebar from "@/components/filters/FilterSidebar";
import BusinessListControls from "@/components/business/BusinessListControls";
import BusinessesList from "@/components/business/BusinessesList";
import BusinessesPagination from "./BusinessesPagination";
import PremiumPackagesPromo from "@/components/business/PremiumPackagesPromo";
import SocialMediaSection from "@/components/business/SocialMediaSection";

interface BusinessesContentProps {
  businesses: BusinessProps[];
  filteredBusinesses: BusinessProps[];
  onFilterChange: (filters: Record<string, any>) => void;
}

const BusinessesContent = ({ 
  businesses, 
  filteredBusinesses, 
  onFilterChange 
}: BusinessesContentProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterSidebarVisible, setIsFilterSidebarVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
    let sorted = [...filteredBusinesses];
    
    switch (value) {
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
    
    setFilteredBusinesses(sorted);
  };

  const toggleFilterSidebar = () => {
    setIsFilterSidebarVisible(!isFilterSidebarVisible);
  };

  const paginatedBusinesses = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredBusinesses.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Social Media Section - Desktop */}
        <SocialMediaSection variant="desktop" />
        
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

        <div className="flex-1">
          <BusinessListControls 
            totalCount={filteredBusinesses.length}
            sortBy={sortBy}
            viewMode={viewMode}
            onSortChange={handleSortChange}
            onViewModeChange={setViewMode}
          />
          
          <BusinessesList 
            businesses={paginatedBusinesses()} 
            viewMode={viewMode} 
          />
          
          <BusinessesPagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            setCurrentPage={setCurrentPage} 
          />
          
          <PremiumPackagesPromo />

          {/* Social Media Section - Mobile */}
          <div className="lg:hidden">
            <SocialMediaSection variant="mobile" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessesContent;
