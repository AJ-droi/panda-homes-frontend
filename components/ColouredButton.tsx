export interface ButtonProps {
  title?: string;
  borderRadius?: string;
  children?: React.ReactNode;
  height?: string;
}

const ColouredButton: React.FC<ButtonProps> = ({
  title,
  borderRadius = "8px",
  children,
  height = "48px",
}) => {
  return (
    <button
      className={`bg-[#785DBA] hover:cursor-pointer hover:border-[#E0DEF7] hover:border-2 hover:bg-white hover:text-black font-[700] text-white text-base h-[48px] px-6 w-full py-[12px]`}
      style={{ borderRadius, height }}
    >
      {children || title}
    </button>
  );
};

//[150px]
export default ColouredButton;
