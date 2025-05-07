import React from "react";
import {
  useGetTenantProperty,
} from "@/services/tenants/query";
import { formatNumberWithCommas } from "@/utilities/utilities";

interface RentCountdownProps {
  expirationDate: string;
  currentDate?: string;
  property_id:string;
}

const RentCountdown: React.FC<RentCountdownProps> = ({
  expirationDate,
  currentDate = new Date().toISOString(),
  property_id
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

  )
      const { data: tenantPropertyData, isLoading: isPropertyDataLoading } =
        useGetTenantProperty(property_id);

  return (
<div 
  className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 w-full"
  style={{ fontFamily: "Plus Jakarta Sans" }}
>
  <div className="flex flex-row justify-between items-start mb-3 sm:mb-4">
    <div className="flex flex-col mb-2 gap-1 sm:mb-0">
      <p className="text-[#999999] leading-[100%] text-xs sm:text-[11.91px] md:text-sm font-medium">
        Your Rent Price
      </p>
      <p className="text-[#785DBA] leading-[150%] text-sm sm:text-[15.88px] md:text-xl font-semibold">
        ${isPropertyDataLoading
          ? "loading..."
          : !tenantPropertyData?.rental_price
          ? "No data available"
          : formatNumberWithCommas(tenantPropertyData?.rental_price)
        }
      </p>
    </div>
    <div className="text-right flex">
      <p className="text-[9px] sm:text-[4px] md:text-[12px] lg:text-[16px]  leading-[100%] text-black font-normal">
        Your rent is expiring on {formattedDate}
      </p>
    </div>
  </div>

  <div className="relative w-full flex justify-between items-center gap-2 sm:gap-3">
    <div className="w-full max-w-[70%] sm:max-w-[75%] md:max-w-[75%] lg:max-w-[85%] bg-[white] border flex items-center border-[#785DBA] rounded-full h-1.5 sm:h-2">
      <div
        className="bg-[#785DBA] h-[4px] sm:h-[6px] rounded-full"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
    <div className="flex justify-end items-center">
      <span className="text-[#785DBA] font-[400] text-xs sm:text-sm">{daysLeft} days left</span>
    </div>
  </div>
</div>
  );
};

export default RentCountdown;