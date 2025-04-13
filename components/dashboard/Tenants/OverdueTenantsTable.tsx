import Pagination from "@/components/PaginationComponent";
import React, { useState } from "react";

const OverdueRentsTable = () => {
  const overDueRentTable = [
    {
      id: 1,
      property: "Lekki Flat A",
      tenantName: "Lekki, Lagos",
      overdueDuration: "2 Months",
      rentOwed: "₦800,000",
    },
    {
      id: 2,
      property: "Abuja Duplex",
      tenantName: "Wuse2, Abuja",
      overdueDuration: "5 Months",
      rentOwed: "₦1,200,000",
    },
    {
      id: 3,
      property: "Abuja Duplex",
      tenantName: "Ikeja, Lagos",
      overdueDuration: "5 Months",
      rentOwed: "₦2,000,000",
    },
    {
      id: 4,
      property: "Abuja Duplex",
      tenantName: "Ikeja, Lagos",
      overdueDuration: "5 Months",
      rentOwed: "₦500,000",
    },
    {
      id: 5,
      property: "Abuja Duplex",
      tenantName: "Ikeja, Lagos",
      overdueDuration: "5 Months",
      rentOwed: "₦500,000",
    },
    {
      id: 6,
      property: "Ikeja Studio",
      tenantName: "Ikeja, Lagos",
      overdueDuration: "5 Months",
      rentOwed: "₦500,000",
    },
  ];

      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 10;
      
      // Calculate items to display on current page
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = overDueRentTable.slice(indexOfFirstItem, indexOfLastItem);

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
                Tenant
              </th>
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
                Amount Owed
              </th>
              <th
                className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Overdue Duration
              </th>
            </tr>
          </thead>
          <tbody
            className="leading-[145%]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            {currentItems.map((item, index) => (
              <tr
                key={item.id}
                className={`${
                  index !== overDueRentTable.length - 1 ? "" : ""
                } text-sm`}
              >
                <td className="py-4 px-6 text-center">
                  {item.tenantName}
                </td>
                <td className="py-4 px-6 text-center">
                  {item.property}
                </td>
                <td
                  className={`py-4  px-6 text-center`}
                >
                  {item.rentOwed}
                </td>
                <td
                  className={`py-4 px-6 text-center`}
                >
                  {item.overdueDuration}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination 
        itemsPerPage={itemsPerPage}
        totalItems={overDueRentTable.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default OverdueRentsTable;
