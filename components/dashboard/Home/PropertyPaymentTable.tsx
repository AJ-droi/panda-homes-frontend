/*eslint-disable */
import Pagination from "@/components/PaginationComponent";
import { useFetchDueRents, useFetchOverDueRents } from "@/services/rents/query";
import React, { useState } from "react";

const PropertyPaymentTable = () => {
  const { data: upcomingRentPayment, isLoading } = useFetchOverDueRents();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Calculate items to display on current page
  // Calculate items to display on current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = React.useMemo(() => {
    return upcomingRentPayment?.slice(indexOfFirstItem, indexOfLastItem) || [];
  }, [upcomingRentPayment, indexOfFirstItem, indexOfLastItem]);

  return (
    <div className="max-w-full text-[#6E7079] overflow-hidden ">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-y border-[#E1E2E9]">
              <th
                className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Property
              </th>
              <th
                className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Amount Due
              </th>
              <th
                className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Due Date
              </th>
              <th
                className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Status
              </th>
              <th
                className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
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
            ) : currentItems?.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-400">
                  No upcoming rent available
                </td>
              </tr>
            ) : (
              currentItems?.map((item: any, index: string) => (
                <tr key={index} className="text-sm">
                  <td className="py-4 px-6 text-center">{item.property}</td>
                  <td className="py-4 px-6 text-center">{item.amountDue}</td>
                  <td
                    className={`py-4 px-6 text-center ${
                      item.dueDate === "Overdue" ? " font-medium" : ""
                    }`}
                  >
                    {item.dueDate}
                  </td>
                  <td
                    className={`py-4 text-center px-6 ${
                      item.status === "Late"
                        ? "'' font-medium"
                        : item.status === "Paid"
                        ? "text-[#34A853] font-medium"
                        : "text-[#FBBC05]"
                    }`}
                  >
                    {item.status}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="bg-[#5E636614] text-[#8B8D97] hover:cursor-pointer hover:bg-transparent hover:border-1 hover:border-black hover:text-black px-[16px] py-[10px] rounded-[12px] text-sm">
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {!isLoading && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={upcomingRentPayment?.length}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          itemsPerPageOptions={[10, 25, 50, 100]}
          showNavigation={true}
          showItemsPerPage={true}
          showPageJumper={true}
        />
      )}
    </div>
  );
};

export default PropertyPaymentTable;
