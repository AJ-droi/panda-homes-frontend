import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

export default function ServiceRequest() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Sample data
  const serviceRequests = [
    { id: 1, issueType: 'Plumbing', dateReported: 'Feb 28, 2025', status: 'Resolved', resolutionDate: 'March 12, 2025' },
    { id: 2, issueType: 'Electrical', dateReported: 'Jan 20, 2022', status: 'Pending', resolutionDate: 'Nil' },
    { id: 3, issueType: 'Structural', dateReported: 'Dec 28, 2019', status: 'Resolved', resolutionDate: 'Dec 28, 2019' },
    { id: 4, issueType: 'Structural', dateReported: 'Dec 28, 2019', status: 'Resolved', resolutionDate: 'Dec 28, 2019' },
    { id: 5, issueType: 'Structural', dateReported: 'Dec 28, 2019', status: 'Resolved', resolutionDate: 'Dec 28, 2019' },
    { id: 6, issueType: 'Structural', dateReported: 'Dec 28, 2019', status: 'Resolved', resolutionDate: 'Dec 28, 2019' },
    { id: 7, issueType: 'Structural', dateReported: 'Dec 28, 2019', status: 'Resolved', resolutionDate: 'Dec 28, 2019' },
    { id: 8, issueType: 'Structural', dateReported: 'Dec 28, 2019', status: 'Resolved', resolutionDate: 'Dec 28, 2019' },
    { id: 9, issueType: 'Structural', dateReported: 'Dec 28, 2019', status: 'Resolved', resolutionDate: 'Dec 28, 2019' },
  ];

  const totalPages = 44;


  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
   
      {/* Service Requests List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 overflow-hidden">
        <h2 className="text-xl font-medium text-gray-700 mb-6">List of Past & Active Service Requests</h2>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm text-gray-500 font-medium">Issue Type</th>
                <th className="text-left py-3 px-4 text-sm text-gray-500 font-medium">Date Reported</th>
                <th className="text-left py-3 px-4 text-sm text-gray-500 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-sm text-gray-500 font-medium">Resolution Date</th>
              </tr>
            </thead>
            <tbody>
              {serviceRequests.map((request) => (
                <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm text-gray-600">{request.issueType}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{request.dateReported}</td>
                  <td className="py-4 px-4 text-sm">
                    <span className={`${
                      request.status === 'Resolved' ? 'text-green-600' : 'text-red-500'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{request.resolutionDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-gray-600">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="relative mr-4">
              <select 
                className="appearance-none bg-gray-100 border border-gray-200 rounded py-2 pl-3 pr-8 text-sm"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
            <span>Items per page</span>
          </div>

          <div className="flex items-center">
            <span className="mr-4">1-10 of 200 items</span>
            <div className="flex items-center">
              <div className="relative mr-2">
                <select 
                  className="appearance-none bg-gray-100 border border-gray-200 rounded py-2 pl-3 pr-8 text-sm"
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                >
                  {[...Array(totalPages)].map((_, i) => (
                    <option key={i} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
              <span className="mr-2">of {totalPages} pages</span>
              <button className="p-1 rounded border border-gray-200 mr-1">
                <ChevronLeft className="h-4 w-4 text-gray-500" />
              </button>
              <button className="p-1 rounded border border-gray-200">
                <ChevronRight className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-6 space-x-4">
        <button className="px-6 py-3 border border-[#785DBA] text-[#785DBA] rounded-lg font-medium hover:bg-purple-50">
          Edit Property
        </button>
        <button className="px-6 py-3 bg-[#785DBA] text-white rounded-lg font-medium hover:bg-[#785DBA]">
          Delete Property
        </button>
      </div>
    </div>
  );
}