/* eslint-disable */
import React from "react";

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

  return (
    <div className="max-w-4xl text-[#000000] rounded-2xl overflow-hidden shadow-2xl bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th
                className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-medium"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Property
              </th>
              <th
                className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-medium"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Tenant
              </th>
              <th
                className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-medium"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Issue
              </th>
              <th
                className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-medium"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Date Reported
              </th>
              <th
                className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-medium"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody
            className="leading-[145%]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            {propertyData.map((item, index) => (
              <tr
                key={item.id}
                className={`${
                  index !== propertyData.length - 1 ? "border-b" : ""
                } border-[#666666] hover:bg-gray-50`}
              >
                <td className="py-4 px-6 text-center">{item.property}</td>
                <td className="py-4 px-6 text-center">{item.tenant}</td>
                <td className={`py-4 px-6 text-center text-black`}>
                  {item.issue}
                </td>
                <td className={`py-4 text-center px-6`}>{item.dateReported}</td>
                <td className="py-4 px-6 text-center">
                  <button className="bg-[#2A8252] hover:cursor-pointer hover:bg-transparent hover:border-1 hover:border-black hover:text-black text-white px-[16px] py-[10px] rounded-[12px] text-sm">
                    Resolve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssuesListTable;
