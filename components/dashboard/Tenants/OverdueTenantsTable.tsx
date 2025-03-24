/* eslint-disable */
import React from "react";

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

  return (
    <div className="w-full text-[#000000] rounded-2xl overflow-hidden shadow-2xl bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th
                className="text-center text-[16px] md:text-[16px] leading-[145%] py-4 px-6 text-[#785DBA] font-medium"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Tenant
              </th>
              <th
                className="text-center text-[16px] md:text-[16px] leading-[145%] py-4 px-6 text-[#785DBA] font-medium"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Property
              </th>
              <th
                className="text-center text-[16px] md:text-[16px] leading-[145%] py-4 px-6 text-[#785DBA] font-medium"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Amount Owed
              </th>
              <th
                className="text-center text-[16px] md:text-[16px] leading-[145%] py-4 px-6 text-[#785DBA] font-medium"
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
            {overDueRentTable.map((item, index) => (
              <tr
                key={item.id}
                className={`${
                  index !== overDueRentTable.length - 1 ? "border-b" : ""
                } border-[#666666] hover:bg-gray-50`}
              >
                <td className="py-4 px-6 text-[16px] md:text-[16px] text-center">
                  {item.tenantName}
                </td>
                <td className="py-4 px-6 text-[16px] md:text-[16px] text-center">
                  {item.property}
                </td>
                <td
                  className={`py-4 text-[16px] md:text-[16px] text-center px-6`}
                >
                  {item.rentOwed}
                </td>
                <td
                  className={`py-4 px-6 text-[16px] md:text-[16px] text-center`}
                >
                  {item.overdueDuration}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OverdueRentsTable;
