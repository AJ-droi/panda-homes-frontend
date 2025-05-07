/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Pagination from "@/components/PaginationComponent";
import React, { useEffect, useState } from "react";
import { useFetchTenantServiceRequest } from "@/services/tenants/query";
import { formatDate } from "@/utilities/utilities";

const TenantServiceRequestTable = () => {
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

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const {
    data: tenantServiceRequest,
    isLoading: isRequestLoading,
    isFetching: isFetchingRequests,
  } = useFetchTenantServiceRequest(
    tenantDetails?.property_id,
    currentPage,
    itemsPerPage
  );
  const currentItems = tenantServiceRequest?.service_requests;

  return (
    <div className="w-full  text-[#6E7079] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-y border-[#E1E2E9]">
              <th
                className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Request ID
              </th>
              {/* <th  className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}>
                Tenant Name
              </th> */}
              <th
                className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Issue
              </th>
              <th
                className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Date
              </th>
              <th
                className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Status
              </th>
              {/* <th  className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}>
                Action
              </th> */}
            </tr>
          </thead>
          <tbody>
            {isRequestLoading || isFetchingRequests ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="py-4 px-6 text-center">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                  </td>
                </tr>
              ))
            ) : !currentItems || !currentItems.length ? (
              <tr>
                <td colSpan={4} className="py-4 px-6 text-center text-black">
                  No Data Available
                </td>
              </tr>
            ) : (
              currentItems.map((item: any, index: number) => (
                <tr key={item?.id} className="hover:bg-gray-50 bg-white">
                  <td className="py-4 px-6 text-center">{item?.request_id}</td>
                  <td className="py-4 px-6 text-center">{item?.description}</td>
                  <td className="py-4 px-6 text-center">
                    {formatDate(item?.date_reported)}
                  </td>
                  <td
                    className={`py-4 px-6 text-center ${
                      item.status === "urgent"
                        ? "text-red-500 font-medium"
                        : item.status === "pending"
                        ? "text-[#FBBC05] font-medium"
                        : item.status === "resolved"
                        ? "text-green-500 font-medium"
                        : ""
                    }`}
                  >
                    {item.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {tenantServiceRequest?.pagination && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={tenantServiceRequest.pagination.totalRows}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={tenantServiceRequest.pagination.totalPages}
        />
      )}
    </div>
  );
};

export default TenantServiceRequestTable;
