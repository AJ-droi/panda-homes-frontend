/* eslint-disable */
import React from "react";

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

  const getActionButton = (status: string) => {
    switch (status) {
      case "Acknowledged":
        return (
          <button className="bg-[#2A8252] hover:cursor-pointer hover:bg-transparent hover:border-1 hover:border-black hover:text-black text-white px-[16px] py-[10px] rounded-[12px] text-sm">
            View Notice
          </button>
        );
      case "Unacknowledged":
        return (
          <button className="bg-[#2A8252] hover:cursor-pointer hover:bg-transparent hover:border-1 hover:border-black hover:text-black text-white px-[16px] py-[10px] rounded-[12px] text-sm">
            Send Reminder
          </button>
        );
      case "Pending":
        return (
          <button className="bg-[#2A8252] hover:cursor-pointer hover:bg-transparent hover:border-1 hover:border-black hover:text-black text-white px-[16px] py-[10px] rounded-[12px] text-sm">
            Resend Notice
          </button>
        );
      default:
        return (
          <button className="bg-[#2A8252] hover:cursor-pointer hover:bg-transparent hover:border-1 hover:border-black hover:text-black text-white px-[16px] py-[10px] rounded-[12px] text-sm">
            Resend Notice
          </button>
        );
    }
  };

  return (
    <div className="text-[#000000] rounded-2xl overflow-hidden shadow-2xl bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th
                className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-medium"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Notice Type
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
                Date Sent
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
            {noticeData.map((item, index) => (
              <tr
                key={item.id}
                className={`${
                  index !== noticeData.length - 1 ? "border-b" : ""
                } border-[#666666] hover:bg-gray-50`}
              >
                <td className={`py-4 text-center px-6`}>{item.status}</td>
                <td className="py-4 px-6 text-center">{item.tenant}</td>
                <td className="py-4 px-6 text-center">{item.property}</td>
                <td className={`py-4 px-6 text-center`}>{item.dateSent}</td>
                <td className={`py-4 text-center px-6`}>{item.status}</td>
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

export default NoticeTable;
