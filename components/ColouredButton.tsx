/* eslint-disable */
export interface ButtonProps {
  title?: string;
  borderRadius?: string;
  children?: React.ReactNode;
  height?: string;
  padding?: string;
}

const ColouredButton: React.FC<ButtonProps> = ({
  title,
  borderRadius = "8px",
  children,
  height = "48px",
  padding,
}) => {
  return (
    <button
      className={`hover:cursor-pointer bg-[#785DBA] hover:border-[#E0DEF7] hover:border-2 hover:bg-white hover:text-black font-[700] text-white text-base px-6 w-full py-[12px]`}
      style={{ borderRadius, height, padding }}
    >
      {children || title}
    </button>
  );
};

export default ColouredButton;
