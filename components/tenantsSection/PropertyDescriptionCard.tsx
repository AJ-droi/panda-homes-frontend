"use client";
/*eslint-disable */
import React from "react";
import Card from "../Card";

const PropertyDescriptionCard = ({onClick, property}:{onClick: React.FC, property:any}) => {
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
          {property?.description || "N/A"}
          </div>
          <div className="border-t border-[#E3E3E3] pt-3 md:pt-4">
            <h3
              className="font-[400] text-[14px] md:text-[16px] text-black leading-[100%] mb-2"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              <span className="text-[#785DBA]">
                Landlord/Caretaker Contact:
              </span>{" "}
              {property?.owner?.phone_number || "N/A"}
            </h3>
            <div>
              <button onClick={onClick} className="text-xs md:text-sm max-w-[140px] md:max-w-[161px] font-[400] bg-gradient-to-r from-[#7942FB] to-[#B091F9] p-1.5 md:p-2 rounded-[6px] md:rounded-[8px] w-full mt-4 md:mt-6 text-white">
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
