import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

export default function PaymentRecords() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const paymentData = [
    { id: 1, date: 'Feb 28, 2025', tenant: 'John Doe', amount: '₦500,000', status: 'Paid' },
    { id: 2, date: 'Jan 20, 2022', tenant: 'Sarah Smith', amount: '₦300,000', status: 'Owing' },
    { id: 3, date: 'Dec 28, 2019', tenant: 'David Brown', amount: '₦2,500,000', status: 'Paid' },
    { id: 4, date: 'Dec 28, 2019', tenant: 'David Brown', amount: '₦2,500,000', status: 'Paid' },
    { id: 5, date: 'Dec 28, 2019', tenant: 'David Brown', amount: '₦2,500,000', status: 'Paid' },
    { id: 6, date: 'Dec 28, 2019', tenant: 'David Brown', amount: '₦2,500,000', status: 'Paid' },
    { id: 7, date: 'Dec 28, 2019', tenant: 'David Brown', amount: '₦2,500,000', status: 'Paid' },
    { id: 8, date: 'Dec 28, 2019', tenant: 'David Brown', amount: '₦2,500,000', status: 'Paid' },
    { id: 9, date: 'Dec 28, 2019', tenant: 'David Brown', amount: '₦2,500,000', status: 'Paid' },
  ];

  const totalPages = 44;
  const totalItems = 200;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* Payment Records Table */}
      <div className="mt-8 bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="px-6 py-3">Date Paid</th>
                <th className="px-6 py-3">Tenant Name</th>
                <th className="px-6 py-3">Amount Paid</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paymentData.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500">{payment.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{payment.tenant}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{payment.amount}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={payment.status === 'Paid' ? 'text-green-500' : 'text-red-500'}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 flex flex-wrap items-center justify-between border-t border-gray-200">
          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            <div className="relative">
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="appearance-none bg-gray-100 px-3 py-1 pr-8 rounded text-sm focus:outline-none"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <ChevronDown size={14} />
              </div>
            </div>
            <span className="text-sm text-gray-500">Items per page</span>
          </div>
          
          <div className="text-sm text-gray-500">
            {`${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, totalItems)} of ${totalItems} items`}
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="appearance-none bg-gray-100 px-3 py-1 pr-8 rounded text-sm focus:outline-none"
              >
                {[...Array(totalPages)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <ChevronDown size={14} />
              </div>
            </div>
            <span className="text-sm text-gray-500">of {totalPages} pages</span>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 hover:cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 hover:cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-end space-x-4">
        <button className="px-6 py-2 border border-[#785DBA] text-[#785DBA] rounded-md hover:bg-purple-50 hover:cursor-pointer">
          Edit Property
        </button>
        <button className="px-6 py-2 bg-[#785DBA] text-white rounded-md hover:bg-purple-700 hover:cursor-pointer">
          Delete Property
        </button>
      </div>
    </div>
  );
}