/*eslint-disable */
import BackButton from "@/components/Backbutton";
import Pagination from "@/components/PaginationComponent";
import { useActiveMaintenanceIssues } from "@/services/service-request/query";
import React, { useState } from "react";

const IssuesListTable = () => {
  // const propertyData = [
  //   {
  //     id: 1,
  //     property: "Lekki Flat A",
  //     tenant: "John Doe",
  //     issue: "Broken Pipe",
  //     dateReported: "3 Days Ago",
  //   },
  //   {
  //     id: 2,
  //     property: "Abuja Duplex",
  //     tenant: "Peter Okon",
  //     issue: "Power Outage",
  //     dateReported: "5 Days Ago",
  //   },
  // ];

    const { data: activeMaintenance, isLoading } = useActiveMaintenanceIssues();
   const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    // Calculate items to display on current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = activeMaintenance?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="max-w-full text-[#6E7079] overflow-hidden ">
       <BackButton />
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-y border-[#E1E2E9]">
              <th
                 className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Property
              </th>
              <th
                 className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Tenant
              </th>
              <th
                 className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Issue
              </th>
              <th
                 className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Date Reported
              </th>
              <th
                 className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody
            className="leading-[145%] "
            // style={{ fontFamily: "Plus Jakarta Sans" }}
          >
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
              )
              : currentItems?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-400">
                    No Active Maintenance Issue available
                  </td>
                </tr>
              ) : (
                currentItems?.map((item: any, index:number) => (
              <tr
                key={index}
                className={`${
                  index !== activeMaintenance?.length - 1 ? " " : ""
                } text-sm`}
              >
                <td className="py-4 px-6 text-center">{item.property}</td>
                <td className="py-4 px-6 text-center">{item.tenant}</td>
                <td className={`py-4 px-6 text-center`}>
                  {item.issue}
                </td>
                <td className={`py-4 text-center px-6`}>{item.dateReported}</td>
                <td className="py-4 px-6 text-center">
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
        totalItems={activeMaintenance?.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} totalPages={undefined}            />
    </div>
  );
};

export default IssuesListTable;
