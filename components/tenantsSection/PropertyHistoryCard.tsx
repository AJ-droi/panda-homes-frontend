/* eslint-disable @typescript-eslint/no-unused-vars */
// pages/history.tsx
import { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Filter, Grid, Search } from 'lucide-react';
import { HistoriesPageBulletIcon } from '@/layout/svgIconPaths';

interface HistoryItem {
  id: number;
  date: string;
  type: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Pending';
}

export default function History() {
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Sample data
  const historyItems: HistoryItem[] = [
    {
      id: 1,
      date: 'March 20, 2025',
      type: 'Lease Signed',
      description: 'You signed rental agreement.',
      status: 'Completed'
    },
    {
      id: 2,
      date: 'April 1, 2025',
      type: 'Rent Payment',
      description: 'Paid N500,000 for April - June rent.',
      status: 'Completed'
    },
    {
      id: 3,
      date: 'April 10, 2025',
      type: 'Service Request',
      description: '"Leaking bathroom pipe" reported.',
      status: 'In Progress'
    },
    {
      id: 4,
      date: 'April 15, 2025',
      type: 'Agreement Update',
      description: 'Downloaded lease agreement document.',
      status: 'Completed'
    },
    {
      id: 5,
      date: 'May 2, 2025',
      type: 'Rent Payment',
      description: 'Paid N500,000 for July - Sept rent.',
      status: 'Pending'
    },
  ];

  // 1107.017578125px
  const groupedItems: { [key: string]: HistoryItem[] } = {};
  historyItems.forEach(item => {
    if (!groupedItems[item.date]) {
      groupedItems[item.date] = [];
    }
    groupedItems[item.date].push(item);
  });

  const totalPages = 44;
  const totalItems = 200;

  return (
    <div className="container overflow-y-scroll max-h-[1107.017578125px] mx-auto p-4 border border-gray-200 rounded-lg bg-white" style={{ fontFamily: 'Plus Jakarta Sans' }}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold leading-[145%] text-[#45464E]">History</h1>
        
        <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 font-[400] text-[14.53px] leading-[100%] text-[#ABAFB1] py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex text-[#53545C] font-[400] leading-[100%] gap-2">
            <button className="flex items-center px-4 py-2 border border-[#53545C] rounded-md bg-white hover:bg-gray-50">
              <Filter className="h-5 w-5 mr-1" />
              <span>Filter</span>
            </button>
            
            <button className="flex items-center px-4 py-2 border border-[#53545C] rounded-md bg-white hover:bg-gray-50">
              <Grid className="h-5 w-5 mr-1" />
              <span>Filter</span>
            </button>
            
            <div className="relative">
              <button className="flex items-center px-4 py-4 border border-[#53545C] rounded-md bg-white hover:bg-gray-50">
                <span>Bulk Action</span>
                <ChevronDown className="h-5 w-5 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* History Timeline */}
      <div>
        {Object.keys(groupedItems).map((date, dateIndex) => (
          <div key={date}>
            {groupedItems[date].map((item, itemIndex) => (
              <div key={item.id} className="border-b-1 mt-10 border-[#37352F29] max-w-[708px] py-2">
                {itemIndex === 0 && (
                  <div className="flex items-start border-l-2 border-[#37352F] p-4">
                    <div className="ml-6">
                      <h3 className="text-[16px] font-[700] leading-[24px] text-gray-700">{date}</h3>
                    </div>
                  </div>
                )}
                
                <div className="flex border-l-2 border-[#37352F] pl-4 pr-6">
                  
                  <div className="ml-6 flex gap-[10px]">
                    <HistoriesPageBulletIcon />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <h4 className="text-base font-medium leading-[8px] text-[#787774]">{item.type}</h4>
                    </div>
                  </div>
                </div>
                <p className="mt-[15px] text-[16px] text-[#A1A09E] font-[400] leading-[24px]">{item.description} ({item.status})</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex border-t-1 border-[#37352F29] py-6 flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2 mb-4 sm:mb-0">
          <span>Items per page</span>
          <div className="relative">
            <select 
              className="appearance-none border rounded-md py-1 pl-3 pr-8 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
          
          <span>1-10 of 200 items</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span>of 44 pages</span>
          <div className="relative">
            <select 
              className="appearance-none border rounded-md py-1 pl-3 pr-8 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
            >
              {[...Array(totalPages)].map((_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <button className="p-1 rounded-md hover:bg-gray-200">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="p-1 rounded-md hover:bg-gray-200">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}