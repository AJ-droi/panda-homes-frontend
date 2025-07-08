import React from 'react';


const PropertyPaymentTable = () => {

  const propertyData = [
    { 
      id: 1, 
      property: "Lekki Flat A", 
      amountDue: "₦500,000", 
      dueDate: "5 Days Left", 
      status: "Pending" 
    },
    { 
      id: 2, 
      property: "Abuja Duplex", 
      amountDue: "₦650,000", 
      dueDate: "Overdue", 
      status: "Late" 
    },
    { 
      id: 3, 
      property: "Abuja Duplex", 
      amountDue: "₦650,000", 
      dueDate: "Overdue", 
      status: "Late" 
    },
    { 
      id: 4, 
      property: "Abuja Duplex", 
      amountDue: "₦650,000", 
      dueDate: "Overdue", 
      status: "Late" 
    },
    { 
      id: 5, 
      property: "Abuja Duplex", 
      amountDue: "₦650,000", 
      dueDate: "Overdue", 
      status: "Late" 
    },
    { 
      id: 6, 
      property: "Ikeja Studio", 
      amountDue: "₦400,000", 
      dueDate: "2 Days Left", 
      status: "Paid" 
    }
  ];

  const getActionButton = (status: string) => {
    switch(status) {
      case "Pending":
        return <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:cursor-pointer">Send Reminder</button>;
      case "Late":
        return <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:cursor-pointer">Issue Notice</button>;
      case "Paid":
        return <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:cursor-pointer">View Receipt</button>;
      default:
        return <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:cursor-pointer">Action</button>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-6 text-[#785DBA] font-medium">Property</th>
              <th className="text-left py-4 px-6 text-[#785DBA] font-medium">Amount Due</th>
              <th className="text-left py-4 px-6 text-[#785DBA] font-medium">Due Date</th>
              <th className="text-left py-4 px-6 text-[#785DBA] font-medium">Status</th>
              <th className="text-left py-4 px-6 text-[#785DBA] font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {propertyData.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6">{item.property}</td>
                <td className="py-4 px-6">{item.amountDue}</td>
                <td className={`py-4 px-6 ${item.dueDate === "Overdue" ? "text-red-500 font-medium" : ""}`}>
                  {item.dueDate}
                </td>
                <td className={`py-4 px-6 ${
                  item.status === "Late" ? "text-red-500 font-medium" : 
                  item.status === "Paid" ? "text-green-500 font-medium" : ""
                }`}>
                  {item.status}
                </td>
                <td className="py-4 px-6">
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