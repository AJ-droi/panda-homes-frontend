import Pagination from '@/components/PaginationComponent';
import { useState } from 'react';


// Sample data
const leaseData = [
  { id: 1, tenant: "Oakwood Apt, Unit 2B", property: "Lekki, Lagos", expiryDate: "Jan 1st, 2024" },
  { id: 2, tenant: "Maple Residency, Unit 5C", property: "Wuse 2, Abuja", expiryDate: "May 3rd, 2024" },
  { id: 3, tenant: "Greenview House, Flat 3", property: "Ikeja, Lagos", expiryDate: "April 22nd, 2026" },
  { id: 4, tenant: "Lekki Flat A", property: "Ikeja Studio", expiryDate: "June 2nd, 2023" },
  { id: 5, tenant: "Abuja Duplex", property: "Port Harcourt", expiryDate: "June 2nd, 2023" },
  { id: 6, tenant: "Ikeja Studio", property: "Ikoyi", expiryDate: "June 2nd, 2023" },
  { id: 7, tenant: "Ikeja Studio", property: "Ikoyi", expiryDate: "June 2nd, 2023" },
  { id: 8, tenant: "Ikeja Studio", property: "Ikoyi", expiryDate: "June 2nd, 2023" },
  { id: 9, tenant: "Ikeja Studio", property: "Ikoyi", expiryDate: "June 2nd, 2023" },
  { id: 10, tenant: "Ikeja Studio", property: "Ikoyi", expiryDate: "June 2nd, 2023" },
  { id: 11, tenant: "Ikeja Studio", property: "Ikoyi", expiryDate: "June 2nd, 2023" },
  { id: 12, tenant: "Ikeja Studio", property: "Ikoyi", expiryDate: "June 2nd, 2023" },
  { id: 13, tenant: "Ikeja Studio", property: "Ikoyi", expiryDate: "June 2nd, 2023" },
  { id: 14, tenant: "Ikeja Studio", property: "Ikoyi", expiryDate: "June 2nd, 2023" },
];

// Reusable Pagination Component


// Main Component
const LeaseExpirationTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Calculate items to display on current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = leaseData.slice(indexOfFirstItem, indexOfLastItem);
  
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
            {currentItems.map((lease) => (
              <tr key={lease.id} className=" hover:bg-gray-50">
                <td className="py-4 text-sm text-center text-[#6E7079]">{lease.tenant}</td>
                <td className="py-4 text-sm text-center text-[#6E7079]">{lease.property}</td>
                <td className="py-4 text-sm text-center text-[#6E7079]">{lease.expiryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Pagination 
        itemsPerPage={itemsPerPage}
        totalItems={leaseData.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default LeaseExpirationTable;