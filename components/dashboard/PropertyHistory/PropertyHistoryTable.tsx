// pages/property-history.js
/* eslint-disable */
"use client";
import { useState } from "react";
import {
  Search,
  ChevronDown,
} from "lucide-react";
import Pagination from "@/components/PaginationComponent";

export default function PropertyHistory() {
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: "Oakwood Apt, Unit 2B",
      moveInDate: "12 Aug 2022",
      tenantName: "John Doe",
      moveOutDate: "Feb 28, 2025",
      dateCreated: "Jan 10, 2020",
      leaseSignedDate: "March 10, 2023",
    },
    {
      id: 2,
      name: "Maple Residency, Unit 5C",
      moveInDate: "12 Aug 2022",
      tenantName: "Sarah Smith",
      moveOutDate: "Still Occupied",
      dateCreated: "Dec 15, 2019",
      leaseSignedDate: "Jan 1, 2022",
    },
    {
      id: 3,
      name: "Greenview House, Flat 3",
      moveInDate: "12 Aug 2022",
      tenantName: "David Brown",
      moveOutDate: "Sept 10, 2023",
      dateCreated: "May 3, 2018",
      leaseSignedDate: "July 15, 2021",
    },
    {
      id: 4,
      name: "Greenview House, Flat 3",
      moveInDate: "12 Aug 2022",
      tenantName: "David Brown",
      moveOutDate: "Sept 10, 2023",
      dateCreated: "May 3, 2018",
      leaseSignedDate: "July 15, 2021",
    },
    {
      id: 5,
      name: "Greenview House, Flat 3",
      moveInDate: "12 Aug 2022",
      tenantName: "David Brown",
      moveOutDate: "Sept 10, 2023",
      dateCreated: "May 3, 2018",
      leaseSignedDate: "July 15, 2021",
    },
    {
      id: 6,
      name: "Greenview House, Flat 3",
      moveInDate: "12 Aug 2022",
      tenantName: "David Brown",
      moveOutDate: "Sept 10, 2023",
      dateCreated: "May 3, 2018",
      leaseSignedDate: "July 15, 2021",
    },
    {
      id: 7,
      name: "Greenview House, Flat 3",
      moveInDate: "12 Aug 2022",
      tenantName: "David Brown",
      moveOutDate: "Sept 10, 2023",
      dateCreated: "May 3, 2018",
      leaseSignedDate: "July 15, 2021",
    },
    {
      id: 8,
      name: "Greenview House, Flat 3",
      moveInDate: "12 Aug 2022",
      tenantName: "David Brown",
      moveOutDate: "Sept 10, 2023",
      dateCreated: "May 3, 2018",
      leaseSignedDate: "July 15, 2021",
    },
    {
      id: 9,
      name: "Greenview House, Flat 3",
      moveInDate: "12 Aug 2022",
      tenantName: "David Brown",
      moveOutDate: "Sept 10, 2023",
      dateCreated: "May 3, 2018",
      leaseSignedDate: "July 15, 2021",
    },
    {
      id: 10,
      name: "Greenview House, Flat 3",
      moveInDate: "12 Aug 2022",
      tenantName: "David Brown",
      moveOutDate: "Sept 10, 2023",
      dateCreated: "May 3, 2018",
      leaseSignedDate: "July 15, 2021",
    },
    {
      id: 11,
      name: "Greenview House, Flat 3",
      moveInDate: "12 Aug 2022",
      tenantName: "David Brown",
      moveOutDate: "Sept 10, 2023",
      dateCreated: "May 3, 2018",
      leaseSignedDate: "July 15, 2021",
    },
    {
      id: 12,
      name: "Greenview House, Flat 3",
      moveInDate: "12 Aug 2022",
      tenantName: "David Brown",
      moveOutDate: "Sept 10, 2023",
      dateCreated: "May 3, 2018",
      leaseSignedDate: "July 15, 2021",
    },
  ]);

      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 10;
      
      // Calculate items to display on current page
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = properties.slice(indexOfFirstItem, indexOfLastItem);
  


  return (
    <div className="flex min-h-screen bg-gray-50 overflow-x-auto w-full">
      {/* Main Content */}
      <div className="flex-1">
        {/* Page content */}
        <main className="p-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-gray-800">
                Property History
              </h2>

              <div className="flex space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#785DBA]"
                  />
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                </div>

                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
                  <span className="mr-2">Filter</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
                  <span className="mr-2">Filter</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
                  <span className="mr-2">Bulk Action</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-y border-[#E1E2E9]">
                    <th className="w-10 py-3 px-4">
                      <input
                        type="checkbox"
                        className="rounded text-[#785DBA] focus:ring-[#785DBA]"
                      />
                    </th>
                    <th
                      className="text-center text-sm leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                      style={{ fontFamily: "Plus Jakarta Sans" }}
                    >
                      Property Name
                    </th>
                    <th
                      className="text-center text-sm leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                      style={{ fontFamily: "Plus Jakarta Sans" }}
                    >
                      Date Moved In
                    </th>
                    <th
                      className="text-center text-sm leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                      style={{ fontFamily: "Plus Jakarta Sans" }}
                    >
                      Tenant Name
                    </th>
                    <th
                      className="text-center text-sm leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                      style={{ fontFamily: "Plus Jakarta Sans" }}
                    >
                      Date Moved Out
                    </th>
                    <th
                      className="text-center text-sm leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                      style={{ fontFamily: "Plus Jakarta Sans" }}
                    >
                      Date Created
                    </th>
                    <th
                      className="text-center text-sm leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                      style={{ fontFamily: "Plus Jakarta Sans" }}
                    >
                      Action
                    </th>
                    <th
                      className="text-center text-sm leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                      style={{ fontFamily: "Plus Jakarta Sans" }}
                    >
                      Lease Signed Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((property) => (
                    <tr
                      key={property.id}
                      className=" hover:bg-gray-50"
                    >
                      <td className="py-4 px-4">
                        <input
                          type="checkbox"
                          className="rounded text-[#785DBA] focus:ring-[#785DBA]"
                        />
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">
                        {property.name}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">
                        {property.moveInDate}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">
                        {property.tenantName}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">
                        {property.moveOutDate}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">
                        {property.dateCreated}
                      </td>
                      <td className="py-4 px-4">
                        <button className="bg-gray-200 px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-300 flex items-center">
                          View details
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </button>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">
                        {property.leaseSignedDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <Pagination 
        itemsPerPage={itemsPerPage}
        totalItems={properties.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
          </div>
        </main>
      </div>
    </div>
  );
}
