
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { BusinessProps } from "@/components/BusinessCard";
import { useLocation } from "@/contexts/LocationContext";
import { filterByLocation } from "@/utils/locationUtils";

// Import our components
import BusinessPageHeader from "@/components/business/BusinessPageHeader";
import FeaturedBusinesses from "@/components/business/FeaturedBusinesses";
import BusinessesContent from "./BusinessesContent";

// Import mock data - in a real app, this would come from an API
import { mockBusinesses } from "@/data/mockBusinesses";
import { useToast } from "@/hooks/use-toast";

const BusinessesPage = () => {
  const [searchParams] = useSearchParams();
  const { userLocation } = useLocation();
  const { toast } = useToast();
  
  const [businesses] = useState<BusinessProps[]>(mockBusinesses);
  const [filteredBusinesses, setFilteredBusinesses] = useState<BusinessProps[]>(mockBusinesses);
  const [featuredBusinesses, setFeaturedBusinesses] = useState<BusinessProps[]>([]);
  const [isLocalFiltered, setIsLocalFiltered] = useState(false);

  useEffect(() => {
    // Extract featured businesses
    const featured = businesses.filter(business => business.featured);
    setFeaturedBusinesses(featured.slice(0, 9)); // Get first 9 featured businesses
    
    const keyword = searchParams.get("keyword");
    const category = searchParams.get("category");
    const localOnly = searchParams.get("localOnly") === "true";
    
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
    
    if (category && category !== "all categories") {
      filtered = filtered.filter(business => 
        business.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Apply location filtering if requested
    if (localOnly && userLocation.coordinates) {
      // For demo purposes, let's assume some of the businesses have lat/lng
      // In a real app, all businesses would have proper coordinates
      const businessesWithLocation = filtered.map(business => ({
        ...business,
        // Add mock coordinates based on business ID for demonstration
        latitude: business.id ? parseFloat(`${business.id.charCodeAt(0)}.${business.id.charCodeAt(1)}`) : undefined,
        longitude: business.id ? parseFloat(`${business.id.charCodeAt(2)}.${business.id.charCodeAt(3)}`) : undefined
      }));
      
      const localFiltered = filterByLocation(
        businessesWithLocation, 
        userLocation.coordinates, 
        50 // 50km radius
      );
      
      if (localFiltered.length === 0) {
        toast({
          title: "No local businesses found",
          description: `We couldn't find any businesses in ${userLocation.city || 'your area'}. Showing all results instead.`,
        });
        setFilteredBusinesses(filtered);
        setIsLocalFiltered(false);
      } else {
        setFilteredBusinesses(localFiltered);
        setIsLocalFiltered(true);
        toast({
          title: "Showing local businesses",
          description: `Showing businesses near ${userLocation.city || 'your location'}`,
        });
      }
    } else {
      setFilteredBusinesses(filtered);
      setIsLocalFiltered(false);
    }
  }, [searchParams, businesses, userLocation, toast]);

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
    
    // Maintain local filtering if it was previously applied
    if (isLocalFiltered && userLocation.coordinates) {
      const businessesWithLocation = filtered.map(business => ({
        ...business,
        latitude: business.id ? parseFloat(`${business.id.charCodeAt(0)}.${business.id.charCodeAt(1)}`) : undefined,
        longitude: business.id ? parseFloat(`${business.id.charCodeAt(2)}.${business.id.charCodeAt(3)}`) : undefined
      }));
      
      filtered = filterByLocation(
        businessesWithLocation, 
        userLocation.coordinates, 
        50
      );
    }
    
    setFilteredBusinesses(filtered);
  };

  return (
    <Layout>
      <BusinessPageHeader showLocationIndicator={true} />

      <FeaturedBusinesses businesses={featuredBusinesses} />

      <BusinessesContent 
        businesses={businesses}
        filteredBusinesses={filteredBusinesses}
        onFilterChange={handleFilterChange}
        isLocalFiltered={isLocalFiltered}
      />
    </Layout>
  );
};

export default BusinessesPage;
