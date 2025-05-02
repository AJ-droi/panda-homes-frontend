/*eslint-disable */
import Pagination from "@/components/PaginationComponent";
import { useFetchServiceRequest } from "@/services/service-request/query";
import React, { useState } from "react";

const ServiceRequestTable = () => {
  // const serviceRequestData = [
  //   {
  //     id: 1,
  //     requestid: "#SR001",
  //     tenantname: "John Doe",
  //     issue: "Broken Pipe",
  //     date: "01 Mar",
  //     status: "Pending",
  //     action: "Assign Technician",
  //   },
  //   {
  //     id: 2,
  //     requestid: "#SR002",
  //     tenantname: "Jane Doe",
  //     issue: "Electrical Issues",
  //     date: "28 Feb",
  //     status: "Resolved",
  //     action: "View Report",
  //   },
  //   {
  //     id: 3,
  //     requestid: "#SR003",
  //     tenantname: "Peter Rex",
  //     issue: "Leaking Roof",
  //     date: "02 Mar",
  //     status: "Urgent",
  //     action: "Escalate",
  //   },
  // ];

    const { data:serviceRequest, isLoading } = useFetchServiceRequest();
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 10;
      
      // Calculate items to display on current page
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = serviceRequest?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-full  text-[#6E7079] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-y border-[#E1E2E9]">
              <th  className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}>
                Request ID
              </th>
              <th  className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}>
                Tenant Name
              </th>
              <th  className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}>
                Issue
              </th>
              <th  className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}>
                Date
              </th>
              <th  className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}>
                Status
              </th>
              <th  className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
          {isLoading
              ? (
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
                    <td className="py-4 px-6 text-center">
                      <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto" />
                    </td>
                  </tr>
                ))
              ): currentItems?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-400">
                    No service request available
                  </td>
                </tr>
              ) : (
                currentItems?.map((item:any, index:string) => (
              <tr key={index} className="hover:bg-gray-50 bg-white">
                <td className="py-4 px-6 text-center">
                  {item.requestid}
                </td>
                <td className="py-4 px-6 text-center">
                  {item.tenant}
                </td>
                <td className="py-4 px-6 text-center">
                  {item.issue}
                </td>
                <td className="py-4 px-6 text-center">
                  {item.dateReported}
                </td>
                <td
                  className={`py-4 px-6 text-center ${
                    item.status === "Urgent"
                      ? "text-red-500 font-medium"
                      : item.status === "Pending"
                      ? "text-[#FBBC05] font-medium"
                      : item.status === "Resolved"
                      ? "text-green-500 font-medium"
                      : ""
                  }`}
                >
                  {item.status}
                </td>
                <td className="py-4 px-6 text-center">
                  {/* {getActionButton(item.status)} */}
                  <button className="bg-[#5E636614] text-[#8B8D97] hover:cursor-pointer hover:bg-transparent hover:border-1 hover:border-black hover:text-black px-[16px] py-[10px] rounded-[12px] text-sm">
                    View Details
                  </button>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
       <Pagination 
        itemsPerPage={itemsPerPage}
        totalItems={serviceRequest?.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} totalPages={undefined}            />
    </div>
  );
};

export default ServiceRequestTable;
