/* eslint-disable */
import React from "react";

const PropertyPaymentTable = () => {
  const propertyData = [
    {
      id: 1,
      property: "Lekki Flat A",
      amountDue: "₦500,000",
      dueDate: "5 Days Left",
      status: "Pending",
    },
    {
      id: 2,
      property: "Abuja Duplex",
      amountDue: "₦650,000",
      dueDate: "Overdue",
      status: "Late",
    },
    {
      id: 3,
      property: "Abuja Duplex",
      amountDue: "₦650,000",
      dueDate: "Overdue",
      status: "Late",
    },
    {
      id: 4,
      property: "Abuja Duplex",
      amountDue: "₦650,000",
      dueDate: "Overdue",
      status: "Late",
    },
    {
      id: 5,
      property: "Abuja Duplex",
      amountDue: "₦650,000",
      dueDate: "Overdue",
      status: "Late",
    },
    {
      id: 6,
      property: "Ikeja Studio",
      amountDue: "₦400,000",
      dueDate: "2 Days Left",
      status: "Paid",
    },
  ];

  const getActionButton = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <button className="bg-[#2A8252] hover:cursor-pointer hover:bg-transparent hover:border-1 hover:border-black hover:text-black text-white px-[16px] py-[10px] rounded-[12px] text-sm">
            Send Reminder
          </button>
        );
      case "Late":
        return (
          <button className="bg-[#2A8252] hover:cursor-pointer hover:bg-transparent hover:border-1 hover:border-black hover:text-black text-white px-[16px] py-[10px] rounded-[12px] text-sm">
            Issue Notice
          </button>
        );
      case "Paid":
        return (
          <button className="bg-[#2A8252] hover:cursor-pointer hover:bg-transparent hover:border-1 hover:border-black hover:text-black text-white px-[16px] py-[10px] rounded-[12px] text-sm">
            View Receipt
          </button>
        );
      default:
        return (
          <button className="bg-[#2A8252] hover:cursor-pointer hover:bg-transparent hover:border-1 hover:border-black hover:text-black text-white px-[16px] py-[10px] rounded-[12px] text-sm">
            Action
          </button>
        );
    }
  };

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
                Amount Due
              </th>
              <th
                className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-medium"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Due Date
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
            {propertyData.map((item, index) => (
              <tr
                key={item.id}
                className={`${
                  index !== propertyData.length - 1 ? "border-b" : ""
                } border-[#666666] hover:bg-gray-50`}
              >
                <td className="py-4 px-6 text-center">{item.property}</td>
                <td className="py-4 px-6 text-center">{item.amountDue}</td>
                <td
                  className={`py-4 px-6 text-center ${
                    item.dueDate === "Overdue"
                      ? "text-[#EB4335] font-medium"
                      : ""
                  }`}
                >
                  {item.dueDate}
                </td>
                <td
                  className={`py-4 text-center px-6 ${
                    item.status === "Late"
                      ? "text-[#EB4335] font-medium"
                      : item.status === "Paid"
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
