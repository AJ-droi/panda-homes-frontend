/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Card from "../Card";
import { useFetchTenantServiceRequest } from "@/services/tenants/query";
import { formatDate } from "@/utilities/utilities";

const TenantServiceRequestCard = ({ onClick }: { onClick: React.FC }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "text-[#FBBC05] font-inter";
      case "pending":
        return "text-[#EB4335 font-inter";
      case "Resolved":
        return "text-[#34A853] font-inter";
      default:
        return "text-gray-500 font-inter";
    }
  };

  const [tenantDetails, setTenantDetails] = useState<any>({});

  useEffect(() => {
    const isClient = typeof window !== "undefined";
    if (isClient) {
      const jsonTenantDetails = localStorage.getItem("tenant");
      if (jsonTenantDetails) {
        try {
          setTenantDetails(JSON.parse(jsonTenantDetails));
        } catch (error) {
          console.error("Failed to parse tenant details", error);
        }
      }
    }
  }, []);

  const { data: tenantServiceRequest, isLoading: isRequestLoading } =
    useFetchTenantServiceRequest(tenantDetails?.property_id);

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
            {isRequestLoading ? (
              <div className="text-black">Loading Data...</div>
            ) : !tenantServiceRequest?.service_requests ||
              !tenantServiceRequest?.service_requests?.length ? (
              <div className="text-black">No Data Found</div>
            ) : (
              tenantServiceRequest?.service_requests?.map(
                (request: Record<string, any>) => (
                  <li
                    key={request?.id}
                    className="pb-2 border-b border-gray-100 flex flex-col items-start"
                    style={{ fontFamily: "Plus Jakarta Sans" }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <div className="inline-block w-2 h-2 rounded-full bg-[#625DF5] mr-2" />
                      <div className="font-medium text-[14px] md:text-[16px] text-[#212121] leading-[26px] md:leading-[30px]">
                        {request?.description}
                      </div>
                    </div>

                    <div>
                      <p
                        className="text-xs md:text-sm text-[#212121] leading-[20px] flex items-center justify-center gap-1 md:leading-[22px] font-[400]"
                      >
                        <span className="font-[700] text-[10px]">
                          {formatDate(request?.date_reported)}
                        </span>
                        {" • "}
                        <span className={getStatusColor(request?.status)}>
                          {request?.status === "pending"
                            ? "Waiting for Response"
                            : request?.status}
                        </span>
                      </p>
                    </div>
                  </li>
                )
              )
            )}
          </ul>
        </div>
        <div className="flex justify-start sm:justify-start md:justify-start lg:justify-end mt-4 md:mt-6">
          <button
            onClick={onClick}
            className="text-xs md:text-sm max-w-[140px] md:max-w-[161px] font-[400] bg-gradient-to-r from-[#7942FB] to-[#B091F9] p-1.5 md:p-2 rounded-[6px] md:rounded-[8px] w-full text-white hover:cursor-pointer"
          >
            Send a new request
          </button>
        </div>
      </div>
    </Card>
  );
};

export default TenantServiceRequestCard;
