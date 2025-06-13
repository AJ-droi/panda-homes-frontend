import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
  showItemsPerPage?: boolean;
  showNavigation?: boolean;
  showPageJumper?: boolean;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({ 
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [5, 10, 20, 50],
  showItemsPerPage = true,
  showNavigation = true,
  showPageJumper = false,
  className = ""
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    if (onItemsPerPageChange) {
      onItemsPerPageChange(newItemsPerPage);
      // Reset to first page when changing items per page
      onPageChange(1);
    }
  };

  // Generate page numbers for display
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > delta + 2) {
        pages.push('...');
      }
      
      // Show pages around current page
      const start = Math.max(2, currentPage - delta);
      const end = Math.min(totalPages - 1, currentPage + delta);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - delta - 1) {
        pages.push('...');
      }
      
      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap items-center justify-between w-full mt-4 text-sm text-gray-600 gap-4 ${className}`}>
      {/* Items per page selector */}
      {showItemsPerPage && onItemsPerPageChange && (
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Show</span>
          <select 
            className="border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          >
            {itemsPerPageOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="text-gray-500">per page</span>
        </div>
      )}
      
      {/* Item range display */}
      <div className="text-gray-600">
        Showing {startItem}-{endItem} of {totalItems} results
      </div>
      
      {/* Page navigation */}
      {showNavigation && totalPages > 1 && (
        <div className="flex items-center space-x-1">
          {/* First page button */}
          <button 
            onClick={() => handlePageChange(1)}
            className={`p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={currentPage === 1}
            title="First page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>
          
          {/* Previous page button */}
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            className={`p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={currentPage === 1}
            title="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          {/* Page numbers */}
          <div className="flex items-center space-x-1">
            {getPageNumbers().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-3 py-2 text-gray-500">...</span>
                ) : (
                  <button
                    onClick={() => handlePageChange(page as number)}
                    className={`px-3 py-2 border rounded transition-colors ${
                      currentPage === page
                        ? 'bg-[#785DBA] text-white border-[#785DBA]'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>
          
          {/* Next page button */}
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            className={`p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={currentPage === totalPages}
            title="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          
          {/* Last page button */}
          <button 
            onClick={() => handlePageChange(totalPages)}
            className={`p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={currentPage === totalPages}
            title="Last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        </div>
      )}
      
      {/* Page jumper */}
      {showPageJumper && totalPages > 1 && (
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Go to page:</span>
          <select 
            className="border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-[#785DBA] focus:border-transparent"
            value={currentPage}
            onChange={(e) => handlePageChange(Number(e.target.value))}
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Pagination;