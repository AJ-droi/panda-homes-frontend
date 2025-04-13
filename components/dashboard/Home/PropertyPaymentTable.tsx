import React from "react";

const PropertyPaymentTable = () => {
  const propertyPaymentData = [
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

  return (
    <div className="max-w-full text-[#6E7079] overflow-hidden ">
    
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-y border-[#E1E2E9]">
              <th
                className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Property
              </th>
              <th
                className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Amount Due
              </th>
              <th
                className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Due Date
              </th>
              <th
                className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Status
              </th>
              <th
                className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {propertyPaymentData.map((item, index) => (
              <tr
                key={item.id}
                className={`${
                  index !== propertyPaymentData.length - 1 ? "" : ""
                } text-sm`}
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
                      : "text-[#FBBC05]"
                  }`}
                >
                  {item.status}
                </td>
                <td className="py-4 px-6 text-center">
                  {/* {getActionButton(item.status)} */}
                  <button className="bg-[#5E636614] text-[#8B8D97] hover:cursor-pointer hover:bg-transparent hover:border-1 hover:border-black hover:text-black px-[16px] py-[10px] rounded-[12px] text-sm">
                    View Details
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

export default PropertyPaymentTable;
