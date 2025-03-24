import React from "react";

 export interface ButtonProps {
  title?: string;
  borderRadius?: string;
  children?: React.ReactNode;
  height?: string;
  padding?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

const ColouredButton: React.FC<ButtonProps> = ({
  title,
  borderRadius = "8px",
  children,
  height = "48px",
  padding,
  hoverEffect = true,
  onClick,
}) => {
  return (
    <button
      className={`hover:cursor-pointer bg-[#785DBA] ${
        hoverEffect
          ? "hover:border-[#E0DEF7] hover:border-2 hover:bg-white hover:text-black"
          : ""
      } font-[700] text-white text-base px-6 py-[12px]`}
      onClick={onClick}
      style={{ borderRadius, height, padding }}
    >
      {children || title}
    </button>
  );
};

export default ColouredButton;
