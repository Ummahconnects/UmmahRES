
import React from "react";
import { BusinessProps } from "@/components/BusinessCard";
import BusinessListControls from "@/components/business/BusinessListControls";
import BusinessesList from "@/components/business/BusinessesList";
import BusinessesPagination from "@/pages/businesses/BusinessesPagination";

interface BusinessContentProps {
  businesses: BusinessProps[];
  totalCount: number;
  sortBy: string;
  viewMode: "grid" | "list";
  currentPage: number;
  totalPages: number;
  onSortChange: (value: string) => void;
  onViewModeChange: (mode: "grid" | "list") => void;
  setCurrentPage: (page: number) => void;
}

const BusinessContent = ({
  businesses,
  totalCount,
  sortBy,
  viewMode,
  currentPage,
  totalPages,
  onSortChange,
  onViewModeChange,
  setCurrentPage
}: BusinessContentProps) => {
  return (
    <>
      <BusinessListControls 
        totalCount={totalCount}
        sortBy={sortBy}
        viewMode={viewMode}
        onSortChange={onSortChange}
        onViewModeChange={onViewModeChange}
      />
      
      <BusinessesList 
        businesses={businesses} 
        viewMode={viewMode} 
      />
      
      <BusinessesPagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        setCurrentPage={setCurrentPage} 
      />
    </>
  );
};

export default BusinessContent;
