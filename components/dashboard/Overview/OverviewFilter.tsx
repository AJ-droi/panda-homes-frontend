/* eslint-disable */
import { useState, useRef, useEffect } from "react";
import { NotificationType } from "@/constants/enums/notification-event";

const filterMap = {
  Tenant: [NotificationType.USER_ADDED_TO_PROPERTY, NotificationType.USER_SIGNED_UP],
  Property: [NotificationType.PROPERTY_CREATED],
  "Service Request": [NotificationType.SERVICE_REQUEST],
  "Upcoming rent": [NotificationType.RENT_CREATED],
} as any

export const FilterDropdown = ({ onApply, onClose }: { onApply: (types: NotificationType[]) => void , onClose:any}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const dropdownRef = useRef(null) as any;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleCheckboxChange = (label: string) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const applyFilters = () => {
    const types = selected.flatMap((label) => filterMap[label]);
    onApply(types);
    onClose()
  };

  const resetFilters = () => {
    setSelected([]);
    onApply([]);
    onClose()
  };

  return (
    <div className="relative" ref={dropdownRef}>
  
        <div className="absolute right-0 md:-right-100 top-0 z-50 w-64 bg-white border border-gray-200 rounded-xl shadow-lg p-4">
          <h4 className="text-sm font-medium text-gray-500 mb-3">Filter</h4>
          {Object.keys(filterMap).map((label) => (
            <label key={label} className="flex items-center mb-3 space-x-3">
              <input
                type="checkbox"
                checked={selected.includes(label)}
                onChange={() => handleCheckboxChange(label)}
                className="h-5 w-5 border-gray-300 text-purple-600 focus:ring-purple-500 rounded"
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}

          <div className="mt-4 flex justify-between">
            <button
              className="flex-1 bg-[#785DBA] text-white py-2 rounded-md font-medium mr-2"
              onClick={applyFilters}
            >
              Apply
            </button>
            <button
              className="flex-1 border border-[#785DBA] text-[#785DBA] py-2 rounded-md font-medium"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>
        </div>
      
    </div>
  );
};
