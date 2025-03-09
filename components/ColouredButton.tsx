export interface ButtonProps {
  title: string;
}

const ColouredButton: React.FC<ButtonProps> = ({ title }) => {
  return (
    <button className="bg-[#785DBA] hover:cursor-pointer hover:border-[#E0DEF7] hover:border-2 hover:bg-white hover:text-black font-[700] text-white text-base h-[48px] px-6 w-[150px] py-[12px] rounded-[8px]">
      {title}
    </button>
  );
};

export default ColouredButton;
