// components/NoticeAgreement.jsx
/*eslint-disable */
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function NoticeAgreement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Sample data
  const notices = [
    { id: 1, date: 'Feb 28, 2025', type: 'Quick Notice', issuedTo: 'John Doe' },
    { id: 2, date: 'Jan 20, 2022', type: 'Eviction Notice', issuedTo: 'Jane Smith' },
    { id: 3, date: 'Jan 20, 2022', type: 'Lease Agreement', issuedTo: 'Jane Smith' },
    { id: 4, date: 'Jan 20, 2022', type: 'Eviction Notice', issuedTo: 'Jane Smith' },
    { id: 5, date: 'Jan 20, 2022', type: 'Eviction Notice', issuedTo: 'Jane Smith' },
    { id: 6, date: 'Jan 20, 2022', type: 'Eviction Notice', issuedTo: 'Jane Smith' },
    { id: 7, date: 'Jan 20, 2022', type: 'Eviction Notice', issuedTo: 'Jane Smith' },
    { id: 8, date: 'Jan 20, 2022', type: 'Eviction Notice', issuedTo: 'Jane Smith' },
    { id: 9, date: 'Jan 20, 2022', type: 'Eviction Notice', issuedTo: 'Jane Smith' },
  ];

  const totalPages = 44;

  const handleItemsPerPageChange = (e:any) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handlePageChange = (page:any) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow mt-6 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Notices and agreements Issued</h2>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-[#785DBA] uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-[#785DBA] uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-[#785DBA] uppercase tracking-wider">
                  Issued To
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-[#785DBA] uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {notices.map((notice) => (
                <tr key={notice.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {notice.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {notice.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {notice.issuedTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-4 rounded-md text-sm"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-gray-500">
          <div className="flex items-center mb-4 sm:mb-0">
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border rounded-md mr-2 px-2 py-1"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span>Items per page</span>
            <span className="ml-4">1-10 of 200 items</span>
          </div>
          
          <div className="flex items-center">
            <select
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              className="border rounded-md mr-2 px-2 py-1"
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <option key={page} value={page}>
                  {page}
                </option>
              ))}
            </select>
            <span className="mr-2">of {totalPages} pages</span>
            <div className="flex">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1 rounded-md hover:bg-gray-200 disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1 rounded-md hover:bg-gray-200 disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-end space-x-4">
        <button className="px-5 py-2 border border-[#785DBA] text-[#785DBA] rounded-md hover:bg-purple-50">
          Edit Property
        </button>
        <button className="px-5 py-2 bg-[#785DBA] text-white rounded-md hover:bg-purple-600">
          Delete Property
        </button>
      </div>
    </div>
  );
}