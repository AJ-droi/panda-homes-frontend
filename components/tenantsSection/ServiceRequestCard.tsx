"use client";
import React from "react";
import Card from "../Card";

interface ServiceRequest {
  id: string;
  title: string;
  date: string;
  status: "In Progress" | "Waiting for Response" | "Resolved" | string;
}

const TenantServiceRequestCard = ({onClick}:{onClick: React.FC}) => {
  const serviceRequests: ServiceRequest[] = [
    {
      id: "1",
      title: "Leaky Faucet in Kitchen",
      date: "March 12, 2025",
      status: "In Progress",
    },
    {
      id: "2",
      title: "AC Not Cooling Properly",
      date: "March 10, 2025",
      status: "Waiting for Response",
    },
    {
      id: "3",
      title: "Power Outage in Bedroom",
      date: "March 8, 2025",
      status: "Resolved",
    },
    {
        id: "4",
        title: "AC Not Cooling Properly",
        date: "March 10, 2025",
        status: "Waiting for Response",
      },
      {
        id: "5",
        title: "Power Outage in Bedroom",
        date: "March 8, 2025",
        status: "Resolved",
      },
      {
        id: "6",
        title: "AC Not Cooling Properly",
        date: "March 10, 2025",
        status: "Waiting for Response",
      },
      {
        id: "7",
        title: "Power Outage in Bedroom",
        date: "March 8, 2025",
        status: "Resolved",
      },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "text-[#FBBC05]";
      case "Waiting for Response":
        return "text-[#EB4335]";
      case "Resolved":
        return "text-[#34A853]";
      default:
        return "text-gray-500";
    }
  };

  return (
    <Card>
      <div className="p-4 md:p-6 h-full flex flex-col">
        <h2
          className="text-[16px] md:text-[18px] text-[#785DBA] leading-[150%] font-bold mb-3 md:mb-4"
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
          Service Requests
        </h2>
        <div className="overflow-y-auto mb-3 md:mb-4 max-h-[200px] sm:max-h-[300px]">
          <ul className="space-y-3 md:space-y-4">
            {serviceRequests.map((request) => (
              <li
                key={request.id}
                className="pb-2 border-b border-gray-100 flex flex-col items-start"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                <div className="flex items-center gap-2">
                  <div className="inline-block w-2 h-2 rounded-full bg-[#625DF5] mr-2"></div>
                  <div className="font-medium text-[14px] md:text-[16px] text-[#212121] leading-[26px] md:leading-[30px]">
                    {request.title}
                  </div>
                </div>

                <div>
                  <p className="text-xs md:text-sm text-[#212121] leading-[20px] md:leading-[22px] font-[400]">
                    {request.date} •{" "}
                    <span className={getStatusColor(request.status)}>
                      {request.status}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end mt-4 md:mt-6">
          <button onClick={onClick} className="text-xs md:text-sm max-w-[140px] md:max-w-[161px] font-[400] bg-gradient-to-r from-[#7942FB] to-[#B091F9] p-1.5 md:p-2 rounded-[6px] md:rounded-[8px] w-full text-white">
            Send a new request
          </button>
        </div>
      </div>
    </Card>
  );
};

export default TenantServiceRequestCard;
