
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import Layout from "@/components/Layout";
import { BusinessProps } from "@/components/BusinessCard";
import FilterSidebar from "@/components/filters/FilterSidebar";
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

// Import our components
import BusinessPageHeader from "@/components/business/BusinessPageHeader";
import FeaturedBusinesses from "@/components/business/FeaturedBusinesses";
import BusinessListControls from "@/components/business/BusinessListControls";
import BusinessesList from "@/components/business/BusinessesList";
import PremiumPackagesPromo from "@/components/business/PremiumPackagesPromo";
import SocialMediaSection from "@/components/business/SocialMediaSection";

// Import mock data - in a real app, this would come from an API
import { mockBusinesses } from "@/data/mockBusinesses";

const BusinessesPage = () => {
  const [searchParams] = useSearchParams();
  const [businesses] = useState<BusinessProps[]>(mockBusinesses);
  const [filteredBusinesses, setFilteredBusinesses] = useState<BusinessProps[]>(mockBusinesses);
  const [featuredBusinesses, setFeaturedBusinesses] = useState<BusinessProps[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterSidebarVisible, setIsFilterSidebarVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    // Extract featured businesses
    const featured = businesses.filter(business => business.featured);
    setFeaturedBusinesses(featured.slice(0, 9)); // Get first 9 featured businesses
    
    const keyword = searchParams.get("keyword");
    const category = searchParams.get("category");
    
    let filtered = [...businesses];
    
    if (keyword) {
      filtered = filtered.filter(business => 
        business.name.toLowerCase().includes(keyword.toLowerCase()) ||
        business.category.toLowerCase().includes(keyword.toLowerCase()) ||
        business.services?.some(service => 
          service.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }
    
    if (category) {
      filtered = filtered.filter(business => 
        business.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    setFilteredBusinesses(filtered);
  }, [searchParams, businesses]);

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

  const handleFilterChange = (filters: Record<string, any>) => {
    let filtered = [...businesses];
    
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(business => 
        filters.categories.some((cat: string) => 
          business.category.toLowerCase() === cat.toLowerCase()
        )
      );
    }
    
    if (filters.services && filters.services.length > 0) {
      filtered = filtered.filter(business => 
        business.services?.some(service => 
          filters.services.includes(service)
        )
      );
    }
    
    if (filters.ratings && filters.ratings.length > 0) {
      filtered = filtered.filter(business => {
        return filters.ratings.some((rating: string) => {
          const ratingValue = parseInt(rating.split(' ')[0]);
          return business.rating >= ratingValue;
        });
      });
    }
    
    if (filters.isOpen) {
      filtered = filtered.filter(business => business.isOpen);
    }
    
    setFilteredBusinesses(filtered);
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
    <Layout>
      <BusinessPageHeader />

      <FeaturedBusinesses businesses={featuredBusinesses} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Social Media Section - Desktop */}
          <SocialMediaSection variant="desktop" />
          
          <div className="hidden lg:block lg:w-64 shrink-0">
            <div className="sticky top-6">
              <FilterSidebar type="business" onFilterChange={handleFilterChange} />
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
                <FilterSidebar type="business" onFilterChange={handleFilterChange} />
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
            
            {/* Pagination */}
            {filteredBusinesses.length > itemsPerPage && (
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious onClick={() => setCurrentPage(currentPage - 1)} />
                      </PaginationItem>
                    )}
                    
                    {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                      let pageNum = i + 1;
                      
                      // Logic for showing pagination around current page
                      if (totalPages > 5) {
                        if (currentPage > 3) {
                          pageNum = currentPage - 3 + i;
                        }
                        
                        if (currentPage > totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        }
                      }
                      
                      return pageNum <= totalPages ? (
                        <PaginationItem key={pageNum}>
                          <PaginationLink 
                            isActive={currentPage === pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      ) : null;
                    })}
                    
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext onClick={() => setCurrentPage(currentPage + 1)} />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
            
            <PremiumPackagesPromo />

            {/* Social Media Section - Mobile */}
            <div className="lg:hidden">
              <SocialMediaSection variant="mobile" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BusinessesPage;
