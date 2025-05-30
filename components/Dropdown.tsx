import React, { useState } from "react";

interface DropdownProps {
  options: string[];
  icon?: React.ReactNode;
  placeholder?: string;
  selectedOption?: string;
  height?: string;
  onChange?: (value: string) => void; // ✅ Add this
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  icon,
  placeholder = "Select an option",
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option); // ✅ Notify parent
  };

  return (
    <div
      className="relative w-full sm:w-[200px] text-[11.44px] leading-[150%] font-[500] text-[#999999]"
      style={{ fontFamily: "Plus Jakarta Sans" }}
    >
      <button
        onClick={toggleDropdown}
        className="w-full p-3 border hover:cursor-pointer border-[#8B8D97] text-[#999999] rounded-lg flex items-center justify-between focus:outline-none focus:border-[#785DBA] transition-colors"
        style={{ fontFamily: "Urbanist" }}
      >
        <div className="flex items-center">
          {icon && (
            <span className="mr-2 pr-2 border-[#8B8D97] border-r-1 py-1">
              {icon}
            </span>
          )}
          {selectedOption || placeholder}
        </div>
        <svg
          className={`ml-2 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
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
            fill="#fff"
          />
          <path
            d="M15.3613 8.49268L10.5957 13.2583L5.83008 8.49268"
            stroke="#785DBA"
            strokeWidth="0.953125"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className="p-3 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
