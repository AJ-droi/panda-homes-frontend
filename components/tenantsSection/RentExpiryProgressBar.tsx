import React from "react";

interface RentCountdownProps {
  expirationDate: string;
  currentDate?: string;
}

const RentCountdown: React.FC<RentCountdownProps> = ({
  expirationDate,
  currentDate = new Date().toISOString(),
}) => {
  const endDate = new Date(expirationDate);
  const startDate = new Date(currentDate);

  const totalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const daysLeft = Math.max(0, totalDays);

  const formattedDate = endDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const progressPercentage = Math.min(
    100,
    Math.max(0, (1 - daysLeft / 365) * 100)
  );

  return (
    <div
      className="bg-white rounded-[8px] md:rounded-[10.3px] flex flex-col gap-[4px] md:gap-[5.15px] shadow-md p-4 md:p-6 w-full"
      style={{ fontFamily: "Plus Jakarta Sans" }}
    >
      <div className="mb-3 md:mb-4 flex flex-col space-y-[8px] md:space-y-[10px]">
        <h3 className="text-[12px] md:text-[13.95px] leading-[100%] text-[#000000] font-[400]">
          Your rent is expiring in
        </h3>
        <p className="text-[12px] md:text-[13.95px] leading-[100%] text-[#000000] font-[400]">
          {formattedDate}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
        <div className="w-full sm:w-[75%] md:w-[85%] border-[#785DBA] border-1 bg-white rounded-full h-2 md:h-2.5">
          <div
            className="bg-[#785DBA] h-1.5 md:h-2 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-end sm:justify-between text-xs md:text-sm text-gray-600">
          <span className="text-[#785DBA]">{daysLeft} days left</span>
        </div>
      </div>
    </div>
  );
};

export default RentCountdown;