import React, { useState } from "react";

interface DropdownProps {
  placeholder?: string;
}

const ServiceRequestTableButton: React.FC<DropdownProps> = ({
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="flex justify-center text-[11.44px] leading-[150%] font-[500] text-[#FFF]" style={{fontFamily: 'Plus Jakarta Sans'}}>
      <button
        onClick={toggleDropdown}
        className="w-auto p-3 border hover:bg-white hover:text-[#2A8252] bg-[#2A8252] hover:cursor-pointer border-[#262626] text-[#FFF] rounded-2xl flex items-center justify-between focus:outline-none focus:border-[#785DBA] transition-colors"
        style={{fontFamily: 'Plus Jakarta Sans'}}
      >
        <div className="flex items-center text-sm">
          {selectedOption || placeholder}
        </div>
        <svg
          className={`ml-2 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
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
            fill={""}
          />
          <path
            d="M15.3613 8.49268L10.5957 13.2583L5.83008 8.49268"
            stroke={"#FFF"}
            stroke-width="0.953125"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default ServiceRequestTableButton;