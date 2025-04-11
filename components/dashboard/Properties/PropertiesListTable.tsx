import React from "react";

const PropertiesListTable = () => {
  const propertyData = [
    {
      id: 1,
      property: "Lekki Flat A",
      location: "Lekki, Lagos",
      vacancy: "Vacant",
      rentOwed: "Nil",
    },
    {
      id: 2,
      property: "Abuja Duplex",
      location: "Wuse2, Abuja",
      vacancy: "Not Vacant",
      rentOwed: "₦1,200,000",
    },
    {
      id: 3,
      property: "Abuja Duplex",
      location: "Ikeja, Lagos",
      vacancy: "Not Vacant",
      rentOwed: "₦2,000,000",
    },
    {
      id: 4,
      property: "Abuja Duplex",
      location: "Ikeja, Lagos",
      vacancy: "Not Vacant",
      rentOwed: "₦500,000",
    },
    {
      id: 5,
      property: "Abuja Duplex",
      location: "Ikeja, Lagos",
      vacancy: "Not Vacant",
      rentOwed: "₦500,000",
    },
    {
      id: 6,
      property: "Ikeja Studio",
      location: "Ikeja, Lagos",
      vacancy: "Vacant",
      rentOwed: "Nil",
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
                Location
              </th>
              <th
               className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Vacancy
              </th>
              <th
               className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Rent Owed
              </th>
              <th
               className="text-center text-[18px] leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
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
                  index !== propertyData.length - 1 ? " " : ""
                } text-sm`}
              >
                <td className="py-4 px-6 text-center">{item.property}</td>
                <td className="py-4 px-6 text-center">{item.location}</td>
                <td
                  className={`py-4 px-6 text-center ${
                    item.vacancy === "Not Vacant"
                      ? "text-[#EB4335]"
                      : "text-[#34A853]"
                  }`}
                >
                  {item.vacancy}
                </td>
                <td
                  className={`py-4 text-center px-6 ${
                    item.rentOwed === "Nil" ? "text-black" : "text-[#EB4335]"
                  }`}
                >
                  {item.rentOwed}
                </td>
                <td className="py-4 px-6 text-center">
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

export default PropertiesListTable;
