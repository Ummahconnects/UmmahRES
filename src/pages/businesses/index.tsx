
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { BusinessProps } from "@/components/BusinessCard";

// Import our components
import BusinessPageHeader from "@/components/business/BusinessPageHeader";
import FeaturedBusinesses from "@/components/business/FeaturedBusinesses";
import BusinessesContent from "./BusinessesContent";

// Import mock data - in a real app, this would come from an API
import { mockBusinesses } from "@/data/mockBusinesses";

const BusinessesPage = () => {
  const [searchParams] = useSearchParams();
  const [businesses] = useState<BusinessProps[]>(mockBusinesses);
  const [filteredBusinesses, setFilteredBusinesses] = useState<BusinessProps[]>(mockBusinesses);
  const [featuredBusinesses, setFeaturedBusinesses] = useState<BusinessProps[]>([]);

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

  return (
    <Layout>
      <BusinessPageHeader />

      <FeaturedBusinesses businesses={featuredBusinesses} />

      <BusinessesContent 
        businesses={businesses}
        filteredBusinesses={filteredBusinesses}
        onFilterChange={handleFilterChange}
      />
    </Layout>
  );
};

export default BusinessesPage;
