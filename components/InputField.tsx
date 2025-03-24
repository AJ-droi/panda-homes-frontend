import React from "react";

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    placeholder,
    value,
    onChange,
    type = "text",
    className = ""
  }) => {
    return (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full p-3 border text-sm border-[#262626] h-[49.39px] rounded-lg focus:outline-none focus:border-[#785DBA] text-black transition-colors text-[11.44px] leading-[150%] font-[500] ${className}`}
        style={{ fontFamily: 'Plus Jakarta Sans' }}
      />
    );
  };


export default InputField;