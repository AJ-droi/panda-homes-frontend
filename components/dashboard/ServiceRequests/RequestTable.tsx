/*eslint-disable */
import React, { useState } from "react";
import Pagination from "@/components/PaginationComponent";
import { useFetchServiceRequest } from "@/services/service-request/query";
import { AnyARecord } from "node:dns";
import BackButton from "@/components/Backbutton";

const PropertyPaymentTable = ({serviceRequest, isLoading}:any) => {
 


   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(10);
 
   // Calculate items to display on current page
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = React.useMemo(() => {
     return serviceRequest?.slice(indexOfFirstItem, indexOfLastItem) || [];
   }, [serviceRequest, indexOfFirstItem, indexOfLastItem]);

  return (
    <div className="max-w-full text-[#6E7079] overflow-hidden ">
         <BackButton title='All Requests' />
      <div className="overflow-x-auto py-4">
        <table className="w-full">
          <thead>
          <tr className="border-y border-[#E1E2E9]">
               <th
               className="text-left text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Request ID
              </th>
               <th
               className="text-left text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Tenant
              </th>
               <th
               className="text-left text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Property
              </th>
               <th
               className="text-left text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Issue
              </th>
               <th
               className="text-left text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Date Reported
              </th>
               <th
               className="text-left text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Status
              </th>
               <th
               className="text-left text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="border-b border-[#E1E2E9]">
          {isLoading
              ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="py-4 px-6 text-left">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-left">
                      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-left">
                      <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-left">
                      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-left">
                      <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-left">
                      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-left">
                      <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto" />
                    </td>
                  </tr>
                ))
              )
              : currentItems?.map((item:any, index:any) => (
              <tr
                key={item.id}
                className={`${
                  index !== serviceRequest.length - 1 ? "" : ""
                } text-sm`}
              >
                <td className="py-4 px-6 text-left">{item.requestid}</td>
                <td className="py-4 px-6 text-left">{item.tenant}</td>
                <td className="py-4 px-6 text-left">{item.property}</td>
                <td className="py-4 px-6 text-left">{item.issue}</td>
                <td className={`py-4 px-6 text-left`}>{item.dateReported}</td>
                <td
                  className={`py-4 text-left px-6 ${
                    item.status === "Pending"
                      ? "'' font-medium"
                      : item.status === "In Progress"
                      ? "text-[#FBBC05] font-medium"
                      : item.status === "Resolved"
                      ? "text-[#34A853] font-medium"
                      : ""
                  }`}
                >
                  {item.status}
                </td>
                <td className="py-4 px-6 text-left">
                <button className="bg-[#5E636614] text-[#8B8D97] hover:cursor-pointer hover:bg-transparent hover:border-1 hover:border-black hover:text-black px-[16px] py-[10px] rounded-[12px] text-sm ">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
            <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={serviceRequest?.length}
          currentPage={currentPage}
         onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        itemsPerPageOptions={[10, 25, 50, 100]}
        showNavigation
        showItemsPerPage
        showPageJumper
    
        />
      </div>
    </div>
  );
};

export default PropertyPaymentTable;
