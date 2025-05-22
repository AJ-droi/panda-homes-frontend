/*eslint-disable */
import React from "react";

interface InputFieldProps {
  name?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: any) => void;
  type?: string;
  className?: string;
  icon?: React.ReactNode;
  multiple?: boolean;
  disabled?: boolean;
  accept?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name = "",
  placeholder = "",
  value = "",
  onChange,
  type = "text",
  className = "",
  icon,
  multiple = false,
  disabled = false,
  accept
}) => {
  return (
    <div className="w-full relative">
      <input
        name={name}
        type={type}
        value={type === "file" ? undefined : value}
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
        className={`w-full px-[30px] py-[13px] mt-2 border-1 text-[14px] border-[#8692A6] rounded-[6px] focus:outline-none focus:border-[#785DBA] text-[#666666] transition-colors leading-[100%] font-[500] ${
          icon ? "pl-10" : ""
        } ${className}`}
        style={{ fontFamily: 'Inter' }}
        multiple={multiple}
        accept={accept}
        disabled={disabled}
      />
    </div>
  );
};

export default InputField;