/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import ColouredButton from "./ColouredButton";
import { SearchIcon } from "@/layout/svgIconPaths";

interface SearchBarProps {
  buttonTitle?: string;
  borderRadius?: string;
  children?: React.ReactNode;
  height?: string;
  padding?: string;
  width?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSearchClick?: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onChange,
  onSearchClick,
  buttonTitle = "Search",
  placeholder = "Search",
  borderRadius,
  children,
  height,
  padding,
  width,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onChange?.(value); // call parent onChange immediately
  };

  const handleButtonClick = () => {
    onSearchClick?.(inputValue); // use latest input value when button clicked
  };

  return (
    <div className="flex flex-col md:flex-row shadow-md  text-[15.25px] font-[500] border-[#262626] bg-[#fff] rounded-[8px] focus:outline-none pr-[12.71px] pl-[15.25px] w-full max-w-[100%] mb-[5%] md:max-w-[60%] focus:border-[#785DBA] transition-colors text-[#666666] items-center justify-between gap-3">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full md:w-3/4 p-3"
        value={inputValue}
        onChange={handleInputChange}
      />
      {/* <div className="w-full md:w-auto">
        <div className="w-full md:w-auto min-w-[140px]">
          <ColouredButton hoverEffect={false} onClick={handleButtonClick}>
            <div className="flex items-center gap-[7px] flex-nowrap">
              <SearchIcon />
              <p className="text-base font-[400] whitespace-nowrap text-[#fff]">
                {buttonTitle}
              </p>
            </div>
          </ColouredButton>
        </div>
      </div> */}
    </div>
  );
};

export default SearchBar;
