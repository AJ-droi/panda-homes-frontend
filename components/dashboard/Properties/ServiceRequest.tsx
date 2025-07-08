/*eslint-disable */
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useFetchServiceRequestById } from '@/services/property/query';
import Pagination from '@/components/PaginationComponent';

export default function ServiceRequest() {

  // Sample data
  // const serviceRequests = [
  //   { id: 1, issueType: 'Plumbing', dateReported: 'Feb 28, 2025', status: 'Resolved', resolutionDate: 'March 12, 2025' },
  //   { id: 2, issueType: 'Electrical', dateReported: 'Jan 20, 2022', status: 'Pending', resolutionDate: 'Nil' },
  //   { id: 3, issueType: 'Structural', dateReported: 'Dec 28, 2019', status: 'Resolved', resolutionDate: 'Dec 28, 2019' },
  //   { id: 4, issueType: 'Structural', dateReported: 'Dec 28, 2019', status: 'Resolved', resolutionDate: 'Dec 28, 2019' },
  //   { id: 5, issueType: 'Structural', dateReported: 'Dec 28, 2019', status: 'Resolved', resolutionDate: 'Dec 28, 2019' },
  //   { id: 6, issueType: 'Structural', dateReported: 'Dec 28, 2019', status: 'Resolved', resolutionDate: 'Dec 28, 2019' },
  //   { id: 7, issueType: 'Structural', dateReported: 'Dec 28, 2019', status: 'Resolved', resolutionDate: 'Dec 28, 2019' },
  //   { id: 8, issueType: 'Structural', dateReported: 'Dec 28, 2019', status: 'Resolved', resolutionDate: 'Dec 28, 2019' },
  //   { id: 9, issueType: 'Structural', dateReported: 'Dec 28, 2019', status: 'Resolved', resolutionDate: 'Dec 28, 2019' },
  // ];

    const { id } = useParams() as { id: string };
    const { data: serviceRequests, isLoading } = useFetchServiceRequestById(id);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
  
    // Calculate items to display on current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = serviceRequests?.slice(indexOfFirstItem, indexOfLastItem);


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
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
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
                      No service request available
                    </td>
                  </tr>
                ) : (
                  currentItems?.map((request:any, index:string) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
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
              )))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={serviceRequests?.length}
          currentPage={currentPage}
         onPageChange={setCurrentPage}      />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-6 space-x-4">
        <button className="px-6 py-3 border border-[#785DBA] text-[#785DBA] rounded-lg font-medium hover:bg-purple-50 hover:cursor-pointer">
          Edit Property
        </button>
        <button className="px-6 py-3 bg-[#785DBA] text-white rounded-lg font-medium hover:bg-[#785DBA] hover:cursor-pointer">
          Delete Property
        </button>
      </div>
    </div>
  );
}