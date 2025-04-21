// RentalHistoryComponent.jsx
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

export default function RentalHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Sample data
  const rentalData = [
    {
      tenantName: "John Doe",
      moveInDate: "Feb 28, 2025",
      moveOutDate: "Feb 28, 2028",
      initialRent: "₦500,000",
      currentRent: "₦1,500,000",
      rentIncreases: [
        { amount: "₦500,000", date: "4th July,2021" },
        { amount: "₦200,000", date: "2nd March,2020" }
      ],
      leaseRenewed: "Yes"
    },
    {
      tenantName: "Sarah Smith",
      moveInDate: "Jan 20, 2022",
      moveOutDate: "April 15, 2026",
      initialRent: "₦300,000",
      currentRent: "₦1,500,000",
      rentIncreases: [],
      leaseRenewed: "No"
    },
    // Multiple David Brown entries with identical data
    ...Array(7).fill({}).map(() => ({
      tenantName: "David Brown",
      moveInDate: "Dec 28, 2019",
      moveOutDate: "Feb 2, 2018",
      initialRent: "₦2,500,000",
      currentRent: "₦1,500,000",
      rentIncreases: [
        { amount: "₦500,000", date: "4th July,2021" },
        { amount: "₦200,000", date: "2nd March,2020" }
      ],
      leaseRenewed: "Yes"
    }))
  ];

  const totalPages = 44;
  
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="w-full p-4 bg-white">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="py-3 px-4">Tenant Name</th>
              <th className="py-3 px-4">Move-in Date</th>
              <th className="py-3 px-4">Move-out Date</th>
              <th className="py-3 px-4">Initial Rent</th>
              <th className="py-3 px-4">Current Rent</th>
              <th className="py-3 px-4">Rent Increases</th>
              <th className="py-3 px-4">Lease Renewed?</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {rentalData.map((tenant, index) => (
              <tr key={index} className="text-gray-700 hover:bg-gray-50">
                <td className="py-3 px-4">{tenant.tenantName}</td>
                <td className="py-3 px-4">{tenant.moveInDate}</td>
                <td className="py-3 px-4">{tenant.moveOutDate}</td>
                <td className="py-3 px-4">{tenant.initialRent}</td>
                <td className="py-3 px-4">{tenant.currentRent}</td>
                <td className="py-3 px-4">
                  {tenant.rentIncreases.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {tenant.rentIncreases.map((increase, idx) => (
                        <li key={idx}>{increase.amount}({increase.date})</li>
                      ))}
                    </ul>
                  ) : (
                    "None"
                  )}
                </td>
                <td className="py-3 px-4">{tenant.leaseRenewed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-gray-500">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="relative">
            <select 
              className="appearance-none bg-white border border-gray-300 rounded px-3 py-1 pr-8"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
          <span className="ml-2">Items per page</span>
        </div>
        
        <div className="flex items-center">
          <span className="mr-4">1-10 of 200 items</span>
          <div className="flex items-center">
            <select 
              className="appearance-none bg-white border border-gray-300 rounded px-3 py-1 pr-8 mr-2"
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <span className="mr-2">of 44 pages</span>
            <button 
              onClick={handlePrevPage} 
              disabled={currentPage === 1}
              className="p-1 rounded border border-gray-300 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button 
              onClick={handleNextPage} 
              disabled={currentPage === totalPages}
              className="p-1 rounded border border-gray-300 ml-1 disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

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