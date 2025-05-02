import Pagination from "@/components/PaginationComponent";
import React, { useState } from "react";

const NoticeTable = () => {
  const noticeData = [
    {
      id: 1,
      property: "Lekki Villa",
      tenant: "John Doe",
      dateSent: "March 1st, 2025",
      status: "Acknowledged",
      noticeType: "Eviction Warning",
    },
    {
      id: 2,
      property: "Abuja Heights",
      tenant: "Jane Smith",
      dateSent: "June 1st, 2025",
      status: "Unacknowledged",
      noticeType: "Rent Increase",
    },
    {
      id: 3,
      property: "Ikeja Studios",
      tenant: "Peter Okon",
      dateSent: "April 1st, 2025",
      status: "Pending",
      noticeType: "Lease Renewal",
    },
    {
      id: 4,
      property: "Ikeja Studios",
      tenant: "Peter Okon",
      dateSent: "April 1st, 2025",
      status: "Pending",
      noticeType: "Lease Renewal",
    },
    {
      id: 5,
      property: "Ikeja Studios",
      tenant: "Peter Okon",
      dateSent: "April 1st, 2025",
      status: "Pending",
      noticeType: "Lease Renewal",
    },
  ];

    const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 10;
      
      // Calculate items to display on current page
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = noticeData.slice(indexOfFirstItem, indexOfLastItem);

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
                Notice Type
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
                Property
              </th>
               <th
               className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Date Sent
              </th>
               <th
               className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Status
              </th>
               <th
               className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr
                key={item.id}
                className={`${
                  index !== noticeData.length - 1 ? "" : ""
                } text-sm`}
              >
                <td className={`py-4 text-center px-6`}>{item.noticeType}</td>
                <td className="py-4 px-6 text-center">{item.tenant}</td>
                <td className="py-4 px-6 text-center">{item.property}</td>
                <td className={`py-4 px-6 text-center`}>{item.dateSent}</td>
                <td className={`py-4 text-center px-6`}>{item.status}</td>
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
        totalItems={noticeData.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} totalPages={undefined}      />
    </div>
  );
};

export default NoticeTable;
