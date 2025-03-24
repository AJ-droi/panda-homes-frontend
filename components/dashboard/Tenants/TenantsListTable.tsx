import React from "react";

const TenantsListTable = () => {
  const tenantsList = [
    {
      id: 1,
      property: "Lekki Villa",
      tenantName: "John Doe",
      moveInDay: "Jan 1, 2024",
      rentStatus: "Paid",
    },
    {
      id: 2,
      property: "Abuja Heights",
      tenantName: "Jane Smith",
      moveInDay: "Feb 15, 2024",
      rentStatus: "Overdue",
    },
    {
      id: 3,
      property: "Ikeja Studio",
      tenantName: "Peter Okon",
      moveInDay: "Mar 10, 2023",
      rentStatus: "Overdue",
    },
  ];

  return (
    <div className="w-full text-[#000000] rounded-2xl overflow-hidden shadow-2xl bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th
                className="text-center text-[16px] md:text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-medium"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Tenant Name
              </th>
              <th
                className="text-center text-[16px] md:text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-medium"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Property
              </th>
              <th
                className="text-center text-[16px] md:text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-medium"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Move-in Date
              </th>
              <th
                className="text-center text-[16px] md:text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-medium"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Rent Status
              </th>
            </tr>
          </thead>
          <tbody
            className="leading-[145%]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            {tenantsList.map((item, index) => (
              <tr
                key={item.id}
                className={`${
                  index !== tenantsList.length - 1 ? "border-b" : ""
                } border-[#666666] hover:bg-gray-50`}
              >
                <td className="py-4 px-6 text-center">{item.tenantName}</td>
                <td className="py-4 px-6 text-center">{item.property}</td>
                <td className={`py-4 px-6 text-center`}>{item.moveInDay}</td>
                <td
                  className={`py-4 text-center px-6 ${
                    item.rentStatus === "Overdue"
                      ? "text-[#EB4335]"
                      : "text-black"
                  }`}
                >
                  {item.rentStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TenantsListTable;
