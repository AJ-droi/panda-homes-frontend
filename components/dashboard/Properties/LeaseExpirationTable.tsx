/*eslint-disable */
import Pagination from '@/components/PaginationComponent';
import { useFetchDueRents } from '@/services/rents/query';
import { useState } from 'react';


// Sample data
// const leaseData = [
//   { id: 1, tenant: "Oakwood Apt, Unit 2B", property: "Lekki, Lagos", expiryDate: "Jan 1st, 2024" },
//   { id: 2, tenant: "Maple Residency, Unit 5C", property: "Wuse 2, Abuja", expiryDate: "May 3rd, 2024" },
//   { id: 3, tenant: "Greenview House, Flat 3", property: "Ikeja, Lagos", expiryDate: "April 22nd, 2026" },
//   { id: 4, tenant: "Lekki Flat A", property: "Ikeja Studio", expiryDate: "June 2nd, 2023" },
//   { id: 5, tenant: "Abuja Duplex", property: "Port Harcourt", expiryDate: "June 2nd, 2023" },
//   { id: 6, tenant: "Ikeja Studio", property: "Ikoyi", expiryDate: "June 2nd, 2023" },
//   { id: 7, tenant: "Ikeja Studio", property: "Ikoyi", expiryDate: "June 2nd, 2023" },
//   { id: 8, tenant: "Ikeja Studio", property: "Ikoyi", expiryDate: "June 2nd, 2023" },
//   { id: 9, tenant: "Ikeja Studio", property: "Ikoyi", expiryDate: "June 2nd, 2023" },
//   { id: 10, tenant: "Ikeja Studio", property: "Ikoyi", expiryDate: "June 2nd, 2023" },
//   { id: 11, tenant: "Ikeja Studio", property: "Ikoyi", expiryDate: "June 2nd, 2023" },
//   { id: 12, tenant: "Ikeja Studio", property: "Ikoyi", expiryDate: "June 2nd, 2023" },
//   { id: 13, tenant: "Ikeja Studio", property: "Ikoyi", expiryDate: "June 2nd, 2023" },
//   { id: 14, tenant: "Ikeja Studio", property: "Ikoyi", expiryDate: "June 2nd, 2023" },
// ];

// Reusable Pagination Component


// Main Component
const LeaseExpirationTable = () => {

    const { data: upcomingRentPayment, isLoading } = useFetchDueRents();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Calculate items to display on current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = upcomingRentPayment?.slice(indexOfFirstItem, indexOfLastItem);
  
  return (
    <div className="bg-white rounded-lg shadow p-6 ">

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-y border-[#E1E2E9]">
              <th  className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}>Tenant Name</th>
              <th  className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}>Property</th>
              <th  className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
          {isLoading
              ? (
                Array.from({ length: 5 }).map((_, index) => (
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
              )
              : currentItems?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-400">
                    No Upcoming Lease Expiration
                  </td>
                </tr>
              ) : (
                currentItems?.map((lease:any, index:string) => (
              <tr key={index} className=" hover:bg-gray-50">
                <td className="py-4 text-sm text-center text-[#6E7079]">{lease.tenant}</td>
                <td className="py-4 text-sm text-center text-[#6E7079]">{lease.property}</td>
                <td className="py-4 text-sm text-center text-[#6E7079]">{lease.expiryDate}</td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
      
      <Pagination 
        itemsPerPage={itemsPerPage}
        totalItems={upcomingRentPayment?.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default LeaseExpirationTable;