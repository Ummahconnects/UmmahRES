
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { MosqueProps } from "@/components/MosqueCard";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { mockMosques } from "./mockMosques";
import MosquesHeader from "./MosquesHeader";
import MosquesContent from "./MosquesContent";

const MosquesPage = () => {
  const [searchParams] = useSearchParams();
  const [mosques, setMosques] = useState<MosqueProps[]>(mockMosques);
  const [filteredMosques, setFilteredMosques] = useState<MosqueProps[]>(mockMosques);

  useEffect(() => {
    const keyword = searchParams.get("keyword");
    const location = searchParams.get("location");
    const category = searchParams.get("category");
    
    let filtered = [...mosques];
    
    if (keyword) {
      filtered = filtered.filter(mosque => 
        mosque.name.toLowerCase().includes(keyword.toLowerCase()) ||
        mosque.type.toLowerCase().includes(keyword.toLowerCase()) ||
        mosque.facilities?.some(facility => 
          facility.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }
    
    if (location) {
      filtered = filtered.filter(mosque => 
        mosque.address.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (category) {
      filtered = filtered.filter(mosque => 
        mosque.type.toLowerCase() === category.toLowerCase()
      );
    }
    
    setFilteredMosques(filtered);
  }, [searchParams, mosques]);

  const handleFilterChange = (filters: Record<string, any>) => {
    let filtered = [...mosques];
    
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(mosque => 
        filters.categories.some((cat: string) => 
          mosque.type.toLowerCase().includes(cat.toLowerCase())
        )
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
    
    setFilteredMosques(filtered);
  };

  return (
    <Layout>
      <MosquesHeader />
      <MosquesContent 
        mosques={mosques} 
        filteredMosques={filteredMosques} 
        onFilterChange={handleFilterChange} 
      />
    </Layout>
  );
};

export default MosquesPage;
