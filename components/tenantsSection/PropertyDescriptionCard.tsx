"use client";
import React from "react";
import Card from "../Card";

interface PropertyCardProps {
  onClick: () => void;
  adminNumber?: string;
  adminNumberLoading?: boolean;
}
const PropertyDescriptionCard: React.FC<PropertyCardProps> = ({
  onClick,
  adminNumber,
  adminNumberLoading,
}) => {
  return (
    <div className="h-full">
      <Card>
        <div className="p-4 md:p-6 h-full flex flex-col">
          <h2
            className="text-[18px] md:text-xl text-[#785DBA] font-bold mb-3 md:mb-4 leading-[150%]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Description
          </h2>
          <div className="text-black overflow-y-auto max-h-[180px] md:max-h-[200px] font-[400] text-[14px] md:text-[16px] leading-[140%] md:leading-[150%] mb-3 md:mb-4">
            <p className="mb-3 md:mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="mb-3 md:mb-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <p className="">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </div>
          <div className="border-t border-[#E3E3E3] pt-3 md:pt-4">
            <h3
              className="font-[400] text-[14px] md:text-[16px] text-black leading-[100%] mb-2"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              <span className="text-[#785DBA]">
                Landlord/Caretaker Contact:
              </span>{" "}
              {adminNumberLoading
                ? "loading..."
                : adminNumber
                ? adminNumber
                : "No Data"}
            </h3>
            <div>
              <button
                onClick={onClick}
                className="text-xs md:text-sm max-w-[140px] md:max-w-[161px] font-[400] bg-gradient-to-r from-[#7942FB] to-[#B091F9] p-1.5 md:p-2 rounded-[6px] md:rounded-[8px] w-full mt-4 md:mt-6 text-white"
              >
                View Property History
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PropertyDescriptionCard;
