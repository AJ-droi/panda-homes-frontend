/* eslint-disable */
export interface ButtonProps {
  title?: string;
  borderRadius?: string;
  children?: React.ReactNode;
  height?: any;
  textColor?: string;
}

const WhiteButton: React.FC<ButtonProps> = ({
  title,
  borderRadius = "8px",
  children,
  height = "48px",
  textColor = '#333333'
}) => {
  return (
    <button
      className={`bg-white border-2 hover:cursor-pointer hover:bg-[#785DBA] hover:text-white text-${textColor} border-[#E0DEF7] font-[700] text-[#000929] text-base px-6 w-full py-[12px]`}
      style={{ borderRadius, height, }}
    >
      {children || title}
    </button>
  );
};

//[150px]

export default WhiteButton;
