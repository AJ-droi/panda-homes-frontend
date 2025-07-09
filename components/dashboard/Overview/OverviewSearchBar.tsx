/* eslint-disable */
import React, { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react"; // or use Heroicons
import { FilterDropdown } from "./OverviewFilter";

const OverviewSearchBar = ({ searchTerm, onChange, setFilteredTypes }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-4 flex justify-start">
         
      <div className="relative flex w-full max-w-md items-center">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Search..."
          className="w-full py-3 pl-12 pr-12 rounded-full border border-gray-200 bg-white text-gray-600 placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-[#785DBA]"
          value={searchTerm}
          onChange={onChange}
        />

        {/* Filter Button (optional interaction) */}
        <button
          className="absolute inset-y-0 right-0 px-4 bg-gradient-to-r from-[#9B5DE5] to-[#785DBA] rounded-e-full flex items-center justify-center"
             onClick={() => setOpen(!open)}
        >
          <SlidersHorizontal className="w-5 h-5 text-white" />
        </button>
      </div>
  {open && <FilterDropdown onApply={setFilteredTypes} onClose={() => setOpen(false)} />}
  
    </div>
  );
};

export default OverviewSearchBar;
