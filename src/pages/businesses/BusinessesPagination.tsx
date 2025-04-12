
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

interface BusinessesPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const BusinessesPagination = ({ 
  currentPage, 
  totalPages, 
  setCurrentPage 
}: BusinessesPaginationProps) => {
  if (totalPages <= 1) return null;
  
  return (
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
  );
};

export default BusinessesPagination;
