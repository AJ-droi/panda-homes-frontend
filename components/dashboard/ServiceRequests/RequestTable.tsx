/* eslint-disable */
import React from "react";
import ServiceRequestTableButton from "./TableDropdownButton";

const PropertyPaymentTable = () => {
  const requestTable = [
    {
      id: 1,
      property: "Lekki Flat A",
      requestId: "#SR002",
      tenant: "Jane Smith",
      issue: "Power Outage",
      dateReported: "Mar 1st 2025",
      status: "Pending",
    },
    {
      id: 2,
      property: "Abuja Duplex",
      requestId: "#SR003",
      tenant: "Peter Okon",
      issue: "Leaking Roof",
      dateReported: "Mar 1st 2025",
      status: "In Progress",
    },
    {
      id: 3,
      property: "Abuja Duplex",
      requestId: "#SR003",
      tenant: "Peter Okon",
      issue: "Leaking Roof",
      dateReported: "Mar 1st 2025",
      status: "Resolved",
    },
    {
      id: 4,
      property: "Abuja Duplex",
      requestId: "#SR003",
      tenant: "Peter Okon",
      issue: "Leaking Roof",
      dateReported: "Mar 1st 2025",
      status: "Resolved",
    },
    {
      id: 5,
      property: "Abuja Duplex",
      requestId: "#SR003",
      tenant: "Peter Okon",
      issue: "Leaking Roof",
      dateReported: "Mar 1st 2025",
      status: "Resolved",
    },
    {
      id: 6,
      property: "Ikeja Studio",
      requestId: "#SR003",
      tenant: "Peter Okon",
      issue: "Leaking Roof",
      dateReported: "Mar 1st 2025",
      status: "Resolved",
    },
    {
      id: 7,
      property: "Ikeja Studio",
      requestId: "#SR003",
      tenant: "Peter Okon",
      issue: "Leaking Roof",
      dateReported: "Mar 1st 2025",
      status: "Resolved",
    },
  ];

  const getActionButton = (status: string) => {
    switch (status) {
      case "Pending":
        return <ServiceRequestTableButton placeholder="Mark as Done" />;
      case "In Progress":
        return <ServiceRequestTableButton placeholder="Undo" />;
      case "Resolved":
        return <ServiceRequestTableButton placeholder="Undo" />;
      default:
        return <ServiceRequestTableButton placeholder="Mark as Done" />;
    }
  };

  return (
    <div className=" text-[#000000] rounded-2xl overflow-hidden shadow-2xl bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th
                className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-medium"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Request ID
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
                Property
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
                Status
              </th>
              <th
                className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-medium"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {requestTable.map((item, index) => (
              <tr
                key={item.id}
                className={`${
                  index !== requestTable.length - 1 ? "border-b" : ""
                } border-[#666666] hover:bg-gray-50`}
              >
                <td className="py-4 px-6 text-center">{item.requestId}</td>
                <td className="py-4 px-6 text-center">{item.tenant}</td>
                <td className="py-4 px-6 text-center">{item.property}</td>
                <td className="py-4 px-6 text-center">{item.issue}</td>
                <td className={`py-4 px-6 text-center`}>{item.dateReported}</td>
                <td
                  className={`py-4 text-center px-6 ${
                    item.status === "Pending"
                      ? "text-[#EB4335] font-medium"
                      : item.status === "In Progress"
                      ? "text-[#FBBC05] font-medium"
                      : item.status === "Resolved"
                      ? "text-[#34A853] font-medium"
                      : ""
                  }`}
                >
                  {item.status}
                </td>
                <td className="py-4 px-6 text-center">
                  {getActionButton(item.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyPaymentTable;
