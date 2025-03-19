export interface ButtonProps {
  title?: string;
  borderRadius?: string;
  children?: React.ReactNode;
  height?: string;
  padding?: string;
}

const GradientButton: React.FC<ButtonProps> = ({
  title,
  borderRadius = "8px",
  children,
  height = "48px",
  padding,
}) => {
  return (
    <button
      className={`hover:cursor-pointer bg-gradient-to-r  from-[#7942FB] to-[#B091F9] hover:border-[#E0DEF7] hover:border-2 hover:text-black font-[700] text-white text-base px-6 w-full py-[12px]`}
      style={{ borderRadius, height, padding }}
    >
      {children || title}
    </button>
  );
};

export default GradientButton;
