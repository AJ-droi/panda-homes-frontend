 
import React from "react";

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  className?: string;
  icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  onChange,
  type = "text",
  className = "",
  icon
}) => {
  return (
    <div className="w-full relative">
      {/* {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {React.cloneElement(icon as React.ReactElement, {
            className: "w-5 h-5 text-gray-400"
          })}
        </div>
      )} */}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full p-3 border text-sm border-[#262626] h-[49.39px] rounded-lg focus:outline-none focus:border-[#785DBA] text-black transition-colors text-[11.44px] leading-[150%] font-[500] ${
          icon ? "pl-10" : ""
        } ${className}`}
        style={{ fontFamily: 'Plus Jakarta Sans' }}
      />
    </div>
  );
};

export default InputField;