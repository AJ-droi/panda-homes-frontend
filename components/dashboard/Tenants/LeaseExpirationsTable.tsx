import React from "react";

const LeaseExpirationsTable = () => {
  const leaseExpirationData = [
    {
      id: 1,
      property: "Lekki Flat A",
      tenantName: "John Doe",
      expiryDate: "Jan 1, 2024",
    },
    {
      id: 2,
      property: "Abuja Duplex",
      tenantName: "Jane Smith",
      expiryDate: "Feb 15, 2024",
    },
    {
      id: 3,
      property: "Abuja Duplex",
      tenantName: "Peter Okon",
      expiryDate: "Mar 10, 2023",
    },
    {
      id: 4,
      property: "Abuja Duplex",
      tenantName: "Peter Okon",
      expiryDate: "Mar 10, 2023",
    },
    {
      id: 5,
      property: "Abuja Duplex",
      tenantName: "Peter Okon",
      expiryDate: "Mar 10, 2023",
    },
    {
      id: 6,
      property: "Ikeja Studio",
      tenantName: "Peter Okon",
      expiryDate: "Mar 10, 2023",
    },
    {
      id: 7,
      property: "Lekki Flat A",
      tenantName: "Peter Okon",
      expiryDate: "Mar 10, 2023",
    },
    {
      id: 8,
      property: "Abuja Duplex",
      tenantName: "Peter Okon",
      expiryDate: "Mar 10, 2023",
    },
    {
      id: 9,
      property: "Abuja Duplex",
      tenantName: "Peter Okon",
      expiryDate: "Mar 10, 2023",
    },
    {
      id: 10,
      property: "Abuja Duplex",
      tenantName: "Peter Okon",
      expiryDate: "Mar 10, 2023",
    },
    {
      id: 11,
      property: "Abuja Duplex",
      tenantName: "Peter Okon",
      expiryDate: "Mar 10, 2023",
    },
    {
      id: 12,
      property: "Ikeja Studio",
      tenantName: "Peter Okon",
      expiryDate: "Mar 10, 2023",
    },
    {
      id: 13,
      property: "Ikeja Studio",
      tenantName: "Peter Okon",
      expiryDate: "Mar 10, 2023",
    },
    {
      id: 14,
      property: "Abuja Duplex",
      tenantName: "Peter Okon",
      expiryDate: "Mar 10, 2023",
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
                Expiry Date
              </th>
            </tr>
          </thead>
          <tbody
            className="leading-[145%]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            {leaseExpirationData.map((item, index) => (
              <tr
                key={item.id}
                className={`${
                  index !== leaseExpirationData.length - 1 ? "border-b" : ""
                } border-[#666666] hover:bg-gray-50`}
              >
                <td className="py-4 px-6 text-center">{item.property}</td>
                <td className="py-4 px-6 text-center">{item.tenantName}</td>
                <td className={`py-4 px-6 text-center`}>{item.expiryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaseExpirationsTable;
