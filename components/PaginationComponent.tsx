/* eslint-disable */
import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';

// interface PaginationProps {
//   totalPages: number;
//   currentPage: number;
//   onPageChange: (page: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
//   const renderPageNumbers = () => {
//     const pages = [];
//     const maxPagesToShow = 5;

//     if (totalPages <= maxPagesToShow) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       if (currentPage <= 3) {
//         pages.push(1, 2, "...", totalPages - 1, totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         pages.push(1, 2, "...", totalPages - 1, totalPages);
//       } else {
//         pages.push(1, "...", currentPage, "...", totalPages);
//       }
//     }

//     return pages.map((page, index) =>
//       typeof page === "number" ? (
//         <button
//           key={index}
//           onClick={() => onPageChange(page)}
//           className={`w-10 h-10 hover:cursor-pointer rounded-lg bg-white border ${
//             page === currentPage
//               ? "border-purple-500 text-purple-500 font-bold"
//               : "border-gray-300 text-[#212B36]"
//           }`}
//         >
//           {page}
//         </button>
//       ) : (
//         <span key={index} className="w-10 h-10 border-gray-300 bg-white rounded-lg border flex items-center justify-center text-gray-500">
//           {page}
//         </span>
//       )
//     );
//   };

//   return (
//     <div className="flex items-center gap-2">
//       <button
//         disabled={currentPage === 1}
//         onClick={() => onPageChange(currentPage - 1)}
//         className={`w-10 h-10 rounded-lg border flex items-center justify-center ${
//           currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "border-gray-300 bg-white hover:cursor-pointer text-[#212B36]"
//         }`}
//       >
//         {"<"}
//       </button>

//       {renderPageNumbers()}

//       <button
//         disabled={currentPage === totalPages}
//         onClick={() => onPageChange(currentPage + 1)}
//         className={`w-10 h-10 rounded-lg border flex items-center justify-center ${
//           currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "border-gray-300 bg-white hover:cursor-pointer text-[#212B36]"
//         }`}
//       >
//         {">"}
//       </button>
//     </div>
//   );
// };

const Pagination = ({ itemsPerPage, totalItems, currentPage, setCurrentPage }: any) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const handlePageChange = (page:any) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  return (
    <div className="flex items-center justify-between w-full mt-4 text-sm text-[#8B8D97]">
      <div className="flex items-center space-x-1">
      <div className="relative">
          <select 
            className="appearance-none bg-[#5E636614] border border-gray-300 rounded px-1 py-1 pr-8 focus:outline-none"
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
      {currentPage}-{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
      </div>
      
      <div>
   
        <select 
          className="appearance-none bg-white border border-gray-300 rounded px-3 py-1 ml-2 focus:outline-none"
        >
          <option>1</option>
        </select>
        <span className="ml-2">of {totalPages} pages</span>
      </div>
      
      <div className="flex items-center space-x-1">
  
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          className="p-1 border border-gray-300 rounded hover:bg-gray-100"
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          className="p-1 border border-gray-300 rounded hover:bg-gray-100"
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
