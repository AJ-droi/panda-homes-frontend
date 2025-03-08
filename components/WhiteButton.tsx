export interface ButtonProps {
    title: string;
  }
  
  const WhiteButton: React.FC<ButtonProps> = ({ title }) => {
    return (
      <button className="bg-white border-2 hover:cursor-pointer hover:bg-[#785DBA] hover:text-white border-[#E0DEF7] font-[700] text-[#000929] text-base px-6 w-[150px] py-[12px] h-[48px] rounded-[8px]">
        {title}
      </button>
    );
  };
  
  export default WhiteButton;
  