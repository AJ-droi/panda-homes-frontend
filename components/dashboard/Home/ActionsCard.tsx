import React from "react";
import Card from "@/components/Card";
import GradientButton from "./GradientButton";
import {
  AddPropertyPlus,
  NewTenantIcon,
  SendRentReminderIcon,
} from "@/layout/svgIconPaths";

const ActionsCard = () => {
  const buttonData = [
    { text: "Add Property", icon: <AddPropertyPlus /> },
    { text: "Register New Tenant", icon: <NewTenantIcon /> },
    { text: "Send Rent Reminder", icon: <SendRentReminderIcon /> },
  ];

  return (
    <div className="w-auto max-w-[700px] max-h-[364px] sm:p-4">
      <Card>
        <section className="flex justify-center bg-white flex-col rounded-2xl p-3 sm:p-4 md:p-6 w-full max-w-md mx-auto">
          {buttonData.map((item, index) => (
            <div
              key={index}
              className={`py-3 sm:py-4 flex justify-center items-center ${
                index !== buttonData.length - 1
                  ? "border-b border-[#E3E3E3]"
                  : ""
              }`}
            >
              <GradientButton borderRadius="12px">
                <div className="flex justify-between items-center w-full px-2 sm:px-3 md:px-4 gap-3 sm:gap-4 md:gap-6">
                  <div className="text-sm sm:text-base md:text-base font-[400] whitespace-nowrap">
                    {item.text}
                  </div>
                  <div className="font-[400] flex-shrink-0">{item.icon}</div>
                </div>
              </GradientButton>
            </div>
          ))}
        </section>
      </Card>
    </div>
  );
};

export default ActionsCard;
