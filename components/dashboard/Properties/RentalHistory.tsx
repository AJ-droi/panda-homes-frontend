// RentalHistoryComponent.jsx
/*eslint-disable */
import { useState } from "react";
import { useParams } from "next/navigation";
import { useFetchPropertyRentById } from "@/services/property/query";
import Pagination from "@/components/PaginationComponent";

export default function RentalHistory() {
  // const rentalData = [
  //   {
  //     tenantName: "John Doe",
  //     moveInDate: "Feb 28, 2025",
  //     moveOutDate: "Feb 28, 2028",
  //     initialRent: "₦500,000",
  //     currentRent: "₦1,500,000",
  //     rentIncreases: [
  //       { amount: "₦500,000", date: "4th July,2021" },
  //       { amount: "₦200,000", date: "2nd March,2020" }
  //     ],
  //     leaseRenewed: "Yes"
  //   },
  //   {
  //     tenantName: "Sarah Smith",
  //     moveInDate: "Jan 20, 2022",
  //     moveOutDate: "April 15, 2026",
  //     initialRent: "₦300,000",
  //     currentRent: "₦1,500,000",
  //     rentIncreases: [],
  //     leaseRenewed: "No"
  //   },
  //   ...Array(7).fill({}).map(() => ({
  //     tenantName: "David Brown",
  //     moveInDate: "Dec 28, 2019",
  //     moveOutDate: "Feb 2, 2018",
  //     initialRent: "₦2,500,000",
  //     currentRent: "₦1,500,000",
  //     rentIncreases: [
  //       { amount: "₦500,000", date: "4th July,2021" },
  //       { amount: "₦200,000", date: "2nd March,2020" }
  //     ],
  //     leaseRenewed: "Yes"
  //   }))
  // ];
  const { id } = useParams() as { id: string };
  const { data: rentalData, isLoading } = useFetchPropertyRentById(id);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate items to display on current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rentalData?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-full p-4 bg-white">
      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 whitespace-nowrap">
              <th
                className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Tenant Name
              </th>
              <th    className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}>
                Move-in Date
              </th>
              <th    className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}>Move-out Date</th>
              <th
                className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Initial Rent
              </th>
              <th
                className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Current Rent
              </th>
              <th
                className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Rent Increases
              </th>
              <th
                className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Lease Renewed?
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm whitespace-nowrap">
            {isLoading
              ? Array.from({ length: 7 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="py-4 px-6 text-center">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto" />
                    </td>
                  </tr>
                ))
                :currentItems?.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-gray-400">
                      No rental history available
                    </td>
                  </tr>
                ) : (
                  currentItems?.map((tenant: any, index: string) => (
                  <tr key={index} className="text-gray-700 hover:bg-gray-50">
                    <td className="py-3 px-4">{tenant.tenantName}</td>
                    <td className="py-3 px-4">{tenant.moveInDate}</td>
                    <td className="py-3 px-4">{tenant.moveOutDate}</td>
                    <td className="py-3 px-4">{tenant.initialRent}</td>
                    <td className="py-3 px-4">{tenant.currentRent}</td>
                    <td className="py-3 px-4">
                      {tenant.rentIncreases.length > 0 ? (
                        <ul className="list-disc pl-5">
                          {tenant.rentIncreases.map(
                            (increase: any, idx: string) => (
                              <li key={idx}>
                                {increase.amount} ({increase.date})
                              </li>
                            )
                          )}
                        </ul>
                      ) : (
                        "None"
                      )}
                    </td>
                    <td className="py-3 px-4">{tenant.leaseRenewed}</td>
                  </tr>
                )))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={rentalData?.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Action Buttons */}
      <div className="flex justify-end mt-8 space-x-4">
        <button className="px-6 py-2 border border-[#785DBA] rounded text-[#785DBA] hover:bg-purple-50">
          Edit Property
        </button>
        <button className="px-6 py-2 bg-[#785DBA] rounded text-white hover:bg-purple-700">
          Delete Property
        </button>
      </div>
    </div>
  );
}
