/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ColouredButton from "./ColouredButton";
import { SearchIcon } from "@/layout/svgIconPaths";

interface SearchBarProps {
  title?: string;
  borderRadius?: string;
  children?: React.ReactNode;
  height?: string;
  padding?: string;
  width?: string;
  onChange?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onChange,
  title,
  borderRadius,
  children,
  height,
  padding,
  width,
}) => {
  return (
    <div className="flex flex-col md:flex-row shadow-2xl border-[0.64px] text-[15.25px] font-[500] border-[#262626] rounded-[8px] focus:outline-none pr-[12.71px] pl-[15.25px] py-[12.71px] w-full max-w-[826.04px] focus:border-[#785DBA] transition-colors text-[#666666] items-center justify-between gap-3">
      <input
        type="text"
        placeholder="Search for a property"
        className="w-full md:w-3/4 p-3"
        onChange={onChange}
      />
      <div className="w-full md:w-auto">
        <div className="w-full md:w-auto min-w-[140px]">
        <ColouredButton hoverEffect={false}>
          <div className="flex items-center gap-[7px] flex-nowrap">
            <SearchIcon />
            <div className="text-base font-[100] whitespace-nowrap">Find Property</div>
          </div>
        </ColouredButton>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
