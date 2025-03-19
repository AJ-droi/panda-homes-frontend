/* eslint-disable */
import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, "...", totalPages - 1, totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 2, "...", totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }

    return pages.map((page, index) =>
      typeof page === "number" ? (
        <button
          key={index}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 hover:cursor-pointer rounded-lg bg-white border ${
            page === currentPage
              ? "border-purple-500 text-purple-500 font-bold"
              : "border-gray-300 text-[#212B36]"
          }`}
        >
          {page}
        </button>
      ) : (
        <span key={index} className="w-10 h-10 border-gray-300 bg-white rounded-lg border flex items-center justify-center text-gray-500">
          {page}
        </span>
      )
    );
  };

  return (
    <div className="flex items-center gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`w-10 h-10 rounded-lg border flex items-center justify-center ${
          currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "border-gray-300 bg-white hover:cursor-pointer text-[#212B36]"
        }`}
      >
        {"<"}
      </button>

      {renderPageNumbers()}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`w-10 h-10 rounded-lg border flex items-center justify-center ${
          currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "border-gray-300 bg-white hover:cursor-pointer text-[#212B36]"
        }`}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
