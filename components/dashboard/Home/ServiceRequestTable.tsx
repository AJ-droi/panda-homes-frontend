/* eslint-disable */
import React from "react";

const ServiceRequestTable = () => {
  const serviceRequestData = [
    {
      id: 1,
      requestid: "#SR001",
      tenantname: "John Doe",
      issue: "Broken Pipe",
      date: "01 Mar",
      status: "Pending",
      action: "Assign Technician",
    },
    {
      id: 2,
      requestid: "#SR002",
      tenantname: "Jane Doe",
      issue: "Electrical Issues",
      date: "28 Feb",
      status: "Resolved",
      action: "View Report",
    },
    {
      id: 3,
      requestid: "#SR003",
      tenantname: "Peter Rex",
      issue: "Leaking Roof",
      date: "02 Mar",
      status: "Urgent",
      action: "Escalate",
    },
  ];

  const getActionButton = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <button className="bg-[#2A8252] hover:cursor-pointer hover:bg-transparent hover:border-1 hover:border-black hover:text-black text-white px-[16px] py-[10px] rounded-[12px] text-sm">
            Assign Technician
          </button>
        );
      case "Resolved":
        return (
          <button className="bg-[#2A8252] hover:cursor-pointer hover:bg-transparent hover:border-1 hover:border-black hover:text-black text-white px-[16px] py-[10px] rounded-[12px] text-sm">
            View Report
          </button>
        );
      case "Urgent":
        return (
          <button className="bg-[#2A8252] hover:cursor-pointer hover:bg-transparent hover:border-1 hover:border-black hover:text-black text-white px-[16px] py-[10px] rounded-[12px] text-sm">
            Escalate
          </button>
        );
      default:
        return (
          <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm">
            Action
          </button>
        );
    }
  };

  return (
  <div className="">
    <div className="max-w-4xl text-[#000000] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="">
              <th className="text-center rounded-tl-[20px] py-4 px-6 text-white font-medium bg-[#785DBA]">
                Request ID
              </th>
              <th className="text-center py-4 px-6 text-white font-medium bg-[#785DBA] border border-white">
                Tenant Name
              </th>
              <th className="text-center py-4 px-6 text-white font-medium bg-[#785DBA] border border-white">
                Issue
              </th>
              <th className="text-center py-4 px-6 text-white font-medium bg-[#785DBA] border border-white">
                Date
              </th>
              <th className="text-center py-4 px-6 text-white font-medium bg-[#785DBA] border border-white">
                Status
              </th>
              <th className="text-center rounded-tr-[20px] py-4 px-6 text-white font-medium bg-[#785DBA]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {serviceRequestData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 bg-white">
                <td className="py-4 px-6 text-center border border-[#666666]">
                  {item.requestid}
                </td>
                <td className="py-4 px-6 text-center border border-[#666666]">
                  {item.tenantname}
                </td>
                <td className="py-4 px-6 text-center border border-[#666666]">
                  {item.issue}
                </td>
                <td className="py-4 px-6 text-center border border-[#666666]">
                  {item.date}
                </td>
                <td
                  className={`py-4 px-6 text-center border border-[#666666] ${
                    item.status === "Urgent"
                      ? "text-red-500 font-medium"
                      : item.status === "Pending"
                      ? "text-[#FBBC05] font-medium"
                      : item.status === "Resolved"
                      ? "text-green-500 font-medium"
                      : ""
                  }`}
                >
                  {item.status}
                </td>
                <td className="py-4 px-6 text-center border border-[#666666]">
                  {getActionButton(item.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default ServiceRequestTable;
