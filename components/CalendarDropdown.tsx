import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CalendarDropdownProps {
  selectedDate?: Date | null;
  placeholder?: string;
  icon?: React.ReactNode;
  colorIcon?: boolean;
  onChange?: (date: Date | null) => void;
  disablePastDates?: boolean;
  error?: string;
}

const CalendarDropdown: React.FC<CalendarDropdownProps> = ({
  selectedDate = null,
  placeholder = "Select a date",
  icon,
  colorIcon = false,
  onChange,
  disablePastDates = false,
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date: Date | null) => {
    if (onChange) {
      onChange(date);
    }
    setIsOpen(false);
  };

  const toggleCalendar = () => setIsOpen(!isOpen);

  return (
    <div className="relative w-full text-[11.44px] leading-[150%] font-[500] text-[#999999]" style={{fontFamily: 'Plus Jakarta Sans'}}>
      <button
        type="button"
        onClick={toggleCalendar}
        className={`w-full px-[30px] py-[12px] border-1 h-[56px] hover:cursor-pointer border-[#8692A6] text-[#999999] rounded-[6px] flex items-center justify-between focus:outline-none ${
          error 
            ? "border-[#D42620] focus:border-[#D42620]" 
            : "border-[#8692A6] focus:border-[#785DBA]"
        } transition-colors`}
        style={{fontFamily: 'Inter'}}
      >
        <div className="flex items-center text-sm">
          {icon && (
            <span className="mr-2 pr-2 border-[#8692A6] border-r-1 py-1">{icon}</span>
          )}
          {selectedDate ? selectedDate.toLocaleDateString() : placeholder}
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
        <div className="absolute z-10 mt-2">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
            minDate={disablePastDates ? new Date() : undefined}
            calendarClassName="bg-white border border-gray-300 rounded-lg shadow-lg"
          />
        </div>
      )}
      {error && (
        <p className="text-[#D42620] text-xs mt-1 font-medium">{error}</p>
      )}
    </div>
  );
};

export default CalendarDropdown;