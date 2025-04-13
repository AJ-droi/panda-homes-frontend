import Pagination from "@/components/PaginationComponent";
import React, { useState } from "react";

const IssuesListTable = () => {
  const propertyData = [
    {
      id: 1,
      property: "Lekki Flat A",
      tenant: "John Doe",
      issue: "Broken Pipe",
      dateReported: "3 Days Ago",
    },
    {
      id: 2,
      property: "Abuja Duplex",
      tenant: "Peter Okon",
      issue: "Power Outage",
      dateReported: "5 Days Ago",
    },
  ];

   const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    // Calculate items to display on current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = propertyData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="max-w-full text-[#6E7079] overflow-hidden ">
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
            {currentItems.map((item, index) => (
              <tr
                key={item.id}
                className={`${
                  index !== propertyData.length - 1 ? " " : ""
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
            ))}
          </tbody>
        </table>
      </div>

       <Pagination 
              itemsPerPage={itemsPerPage}
              totalItems={propertyData.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
    </div>
  );
};

export default IssuesListTable;
