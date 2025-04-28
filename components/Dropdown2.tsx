/*eslint-disable */
import React, { useState, useEffect } from "react";

interface DropdownProps {
  name?: string;
  options: string[];
  icon?: React.ReactNode;
  placeholder?: string;
  selectedOption?: string;
  onChange?: (e: { target: { name?: string; value: string } }) => any;
  colorIcon?: boolean;
  width?: string;
}

const Dropdown2: React.FC<DropdownProps> = ({
  name,
  options,
  icon,
  placeholder = "Select an option",
  selectedOption,
  onChange,
  colorIcon = false,
  width = "full",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelected, setInternalSelected] = useState<string | null>(
    selectedOption || null
  );

  useEffect(() => {
    if (selectedOption !== undefined) {
      setInternalSelected(selectedOption);
    }
  }, [selectedOption]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: any) => {
    if (typeof option === "string") {
      setInternalSelected(option);
      setIsOpen(false);
      onChange?.({ target: { name, value: option } });
    } else {
      setInternalSelected(option.label);
      setIsOpen(false);
      onChange?.({ target: { name, value: option.value } });
    }
  };

  return (
    <div
      className={`relative text-[11.44px] leading-[150%] font-[500] text-[#666666]`}
      style={{
        width: width === "full" ? "100%" : width,
        fontFamily: "Plus Jakarta Sans",
      }}
    >
      <button
        onClick={toggleDropdown}
        className="w-full px-[30px] py-[19px] border-1 h-[64px] hover:cursor-pointer border-[#8692A6] rounded-[6px] flex items-center justify-between focus:outline-none focus:border-[#785DBA] transition-colors"
        type="button"
      >
        <div className="flex items-center text-sm">
          {icon && (
            <span className="mr-2 pr-2 border-[#262626] border-r-1 py-1">
              {icon}
            </span>
          )}
          {internalSelected || placeholder}
        </div>
        <svg
          className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
          width="21"
          height="22"
          viewBox="0 0 21 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.429199"
            y="0.708984"
            width="20.3333"
            height="20.3333"
            rx="10.1667"
            fill={colorIcon ? "#785DBA" : ""}
          />
          <path
            d="M15.3613 8.49268L10.5957 13.2583L5.83008 8.49268"
            stroke={colorIcon ? "#FFF" : "#785DBA"}
            strokeWidth="0.953125"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute text-sm z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
          {options.map((option: any, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`p-3 hover:bg-gray-100 cursor-pointer ${
                internalSelected ===
                (typeof option === "string" ? option : option.label)
                  ? "bg-gray-100 font-semibold"
                  : ""
              }`}
            >
              {typeof option === "string" ? option : option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown2;
