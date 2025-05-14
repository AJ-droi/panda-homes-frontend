/* eslint-disable */
import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number | any;
}

const Pagination = ({ 
  itemsPerPage, 
  totalItems, 
  currentPage, 
  setCurrentPage, 
  totalPages,
}: PaginationProps) => {
  // const handlePageChange = (page: number) => {
  //   if (page >= 1 && page <= totalPages) {
  //     setCurrentPage(page);
  //   }
  // };

  const pageOptions = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap items-center justify-between w-full mt-4 text-sm text-[#8B8D97] gap-2 sm:gap-0">
      {/* Items per page selector */}
      <div className="flex items-center space-x-1 order-1 sm:order-none">
        <div className="relative">
          <select 
            className="appearance-none bg-[#5E636614] border border-gray-300 rounded px-1 py-1 pr-8 focus:outline-none text-xs sm:text-sm"
            value={itemsPerPage}
          >
            <option>10</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1">
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
          </div>
        </div>
        <span className="text-[#A6A8B1] text-xs sm:text-sm">Items per page</span>
      </div>
      
      {/* Item range display */}
      <div className="text-xs sm:text-sm order-3 sm:order-none w-full sm:w-auto text-center sm:text-left">
        {currentPage * itemsPerPage - itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
      </div>
      
      {/* Page selector */}
      <div className="flex items-center order-2 sm:order-none">
        {/* <select 
          className="appearance-none bg-white border border-gray-300 rounded px-2 sm:px-3 py-1 ml-0 sm:ml-2 focus:outline-none text-xs sm:text-sm"
          value={currentPage}
          onChange={(e) => handlePageChange(Number(e.target.value))}
        >
          {pageOptions.map(page => (
            <option key={page} value={page}>{page}</option>
          ))}
        </select> */}
        <span className="ml-1 sm:ml-2 text-xs sm:text-sm">of {totalPages} pages</span>
      </div>
      
      {/* Navigation buttons */}
      {/* <div className="flex items-center space-x-1 order-4 sm:order-none">
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          className={`p-1 border border-gray-300 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
        </button>
        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          className={`p-1 border border-gray-300 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </button>
      </div> */}
    </div>
  );
};

export default Pagination;