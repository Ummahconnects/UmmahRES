
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import MosquesHeader from "./MosquesHeader";
import MosquesContent from "./MosquesContent";
import { MosqueProps } from "@/components/MosqueCard";
import { useLocation } from "@/contexts/LocationContext";
import { filterByLocation } from "@/utils/locationUtils";
import { useToast } from "@/hooks/use-toast";

// Import mosques data for demo
import { perthMosques } from "@/data/perthMosques";

const MosquesPage = () => {
  const [searchParams] = useSearchParams();
  const { userLocation } = useLocation();
  const { toast } = useToast();
  
  const [mosques] = useState<MosqueProps[]>(perthMosques);
  const [filteredMosques, setFilteredMosques] = useState<MosqueProps[]>(perthMosques);
  const [isLocalFiltered, setIsLocalFiltered] = useState(false);

  useEffect(() => {
    const keyword = searchParams.get("keyword");
    const category = searchParams.get("category");
    const localOnly = searchParams.get("localOnly") === "true";
    
    let filtered = [...mosques];
    
    if (keyword) {
      filtered = filtered.filter((mosque) => 
        mosque.name.toLowerCase().includes(keyword.toLowerCase()) ||
        mosque.type.toLowerCase().includes(keyword.toLowerCase()) ||
        mosque.address.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    
    if (category && category !== "all mosques") {
      filtered = filtered.filter((mosque) => 
        mosque.type.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Apply location filtering if requested
    if (localOnly && userLocation.coordinates) {
      // For demo purposes, let's add mock coordinates based on mosque ID
      const mosquesWithLocation = filtered.map(mosque => ({
        ...mosque,
        // Add mock coordinates for demonstration
        latitude: mosque.id ? parseFloat(`${mosque.id.charCodeAt(0)}.${mosque.id.charCodeAt(1)}`) : undefined,
        longitude: mosque.id ? parseFloat(`${mosque.id.charCodeAt(2)}.${mosque.id.charCodeAt(3)}`) : undefined
      }));
      
      const localFiltered = filterByLocation(
        mosquesWithLocation, 
        userLocation.coordinates, 
        50 // 50km radius
      );
      
      if (localFiltered.length === 0) {
        toast({
          title: "No local mosques found",
          description: `We couldn't find any mosques in ${userLocation.city || 'your area'}. Showing all results instead.`,
        });
        setFilteredMosques(filtered);
        setIsLocalFiltered(false);
      } else {
        setFilteredMosques(localFiltered);
        setIsLocalFiltered(true);
        toast({
          title: "Showing local mosques",
          description: `Showing mosques near ${userLocation.city || 'your location'}`,
        });
      }
    } else {
      setFilteredMosques(filtered);
      setIsLocalFiltered(false);
    }
  }, [searchParams, mosques, userLocation, toast]);
  
  const handleFilterChange = (filters: Record<string, any>) => {
    let filtered = [...mosques];
    
    if (filters.types && filters.types.length > 0) {
      filtered = filtered.filter(mosque => 
        filters.types.includes(mosque.type)
      );
    }
    
    if (filters.facilities && filters.facilities.length > 0) {
      filtered = filtered.filter(mosque => 
        mosque.facilities?.some(facility => 
          filters.facilities.includes(facility)
        )
      );
    }
    
    if (filters.isOpen) {
      filtered = filtered.filter(mosque => mosque.isOpen);
    }
    
    // Maintain local filtering if it was previously applied
    if (isLocalFiltered && userLocation.coordinates) {
      const mosquesWithLocation = filtered.map(mosque => ({
        ...mosque,
        latitude: mosque.id ? parseFloat(`${mosque.id.charCodeAt(0)}.${mosque.id.charCodeAt(1)}`) : undefined,
        longitude: mosque.id ? parseFloat(`${mosque.id.charCodeAt(2)}.${mosque.id.charCodeAt(3)}`) : undefined
      }));
      
      filtered = filterByLocation(
        mosquesWithLocation, 
        userLocation.coordinates, 
        50
      );
    }
    
    setFilteredMosques(filtered);
  };

  return (
    <Layout>
      <MosquesHeader />
      
      <MosquesContent 
        mosques={mosques}
        filteredMosques={filteredMosques}
        onFilterChange={handleFilterChange}
        isLocalFiltered={isLocalFiltered}
      />
    </Layout>
  );
};

export default MosquesPage;
