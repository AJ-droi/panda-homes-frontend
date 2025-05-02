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
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const pageOptions = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between w-full mt-4 text-sm text-[#8B8D97]">
      <div className="flex items-center space-x-1">
        <div className="relative">
          <select 
            className="appearance-none bg-[#5E636614] border border-gray-300 rounded px-1 py-1 pr-8 focus:outline-none"
            value={itemsPerPage}
            
          >
            <option>10</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1">
            <ChevronRight className="h-4 w-4 text-gray-500" />
          </div>
        </div>
        <span className="text-[#A6A8B1]">Items per page</span>
      </div>
      
      <div>
        {currentPage * itemsPerPage - itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
      </div>
      
      <div className="flex items-center">
        <select 
          className="appearance-none bg-white border border-gray-300 rounded px-3 py-1 ml-2 focus:outline-none"
          value={currentPage}
          onChange={(e) => handlePageChange(Number(e.target.value))}
        >
          {pageOptions.map(page => (
            <option key={page} value={page}>{page}</option>
          ))}
        </select>
        <span className="ml-2">of {totalPages} pages</span>
      </div>
      
      <div className="flex items-center space-x-1">
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          className={`p-1 border border-gray-300 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          className={`p-1 border border-gray-300 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
