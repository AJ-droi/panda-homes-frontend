import React from "react";

interface InputFieldProps {
  name?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  type?: string;
  className?: string;
  icon?: React.ReactNode;
  multiple?: boolean;
  disabled?: boolean;
  accept?: string;
  error?: string;
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
  accept,
  error
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full relative">
      <input
        name={name}
        type={type}
        value={type === "file" ? undefined : value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full px-[30px] h-[64px] py-[23px] border-1 text-[14px] rounded-[6px] text-[#8692A6] focus:outline-none transition-colors leading-[100%] font-[500] ${
          icon ? "pl-10" : ""
        } ${
          error 
            ? "border-[#D42620] focus:border-[#D42620]" 
            : "border-[#8692A6] focus:border-[#785DBA]"
        } ${className}`}
        style={{ fontFamily: 'Inter' }}
        multiple={multiple}
        accept={accept}
        disabled={disabled}
      />
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {icon}
        </div>
      )}
      {error && (
        <p className="text-[#D42620] text-xs mt-1 font-medium">{error}</p>
      )}
    </div>
  );
};

export default InputField;