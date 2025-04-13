"use client";
import React, { useState } from "react";
import Card from "../Card";

interface HistoryItem {
  id: string;
  date: string;
  title: string;
  description: string;
  status: "Completed" | "In Progress" | "Pending";
}

const PropertyHistoryCard = () => {
  // Sample data
  const allHistoryItems: HistoryItem[] = [
    {
      id: "1",
      date: "March 20, 2025",
      title: "Lease Signed",
      description: "You signed rental agreement.",
      status: "Completed",
    },
    {
      id: "2",
      date: "April 1, 2025",
      title: "Rent Payment",
      description: "Paid ₦500,000 for April - June rent.",
      status: "Completed",
    },
    {
      id: "3",
      date: "April 10, 2025",
      title: "Service Request",
      description: '"Leaking bathroom pipe" reported.',
      status: "In Progress",
    },
    {
      id: "4",
      date: "April 15, 2025",
      title: "Agreement Update",
      description: "Downloaded lease agreement document.",
      status: "Completed",
    },
    {
      id: "5",
      date: "May 2, 2025",
      title: "Rent Payment",
      description: "Paid ₦500,000 for July - Sept rent.",
      status: "Pending",
    },
  ];

  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Filter logic
  const filteredItems = allHistoryItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  // Toggle item selection
  const toggleItemSelection = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-[#34A853]";
      case "In Progress":
        return "bg-[#FBBC05]";
      case "Pending":
        return "bg-[#EB4335]";
      default:
        return "bg-gray-500";
    }
  };

  // Bulk actions
  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on selected items:`, selectedItems);
    // Add your bulk action logic here
    setSelectedItems([]);
    setShowBulkActions(false);
  };

  return (
    <Card>
      <div className="p-4 md:p-6 h-full flex flex-col">
        {/* Header with search and filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2
            className="text-xl text-[#785DBA] font-bold leading-[150%]"
            style={{ fontFamily: "Urbanist" }}
          >
            History
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:w-48">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#785DBA]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Status Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#785DBA]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
            </select>

            {/* Bulk Actions (shown when items are selected) */}
            {selectedItems.length > 0 && (
              <div className="relative">
                <button
                  className="px-4 py-2 bg-[#785DBA] text-white rounded-lg hover:bg-[#6747C7] transition-colors"
                  onClick={() => setShowBulkActions(!showBulkActions)}
                >
                  Bulk Actions ({selectedItems.length})
                </button>

                {showBulkActions && (
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleBulkAction("export")}
                      >
                        Export Selected
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleBulkAction("delete")}
                      >
                        Delete Selected
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* History Timeline */}
        <div className="overflow-y-auto max-h-[400px] pr-2">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No history items found
            </div>
          ) : (
            <div className="space-y-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="relative pl-6 pb-6 border-l-2 border-[#E3E3E3] last:border-l-0 last:pb-0"
                >
                  {/* Checkbox for bulk selection */}
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleItemSelection(item.id)}
                    className="absolute left-[-13px] top-0 h-4 w-4 rounded border-gray-300 text-[#785DBA] focus:ring-[#785DBA]"
                  />

                  {/* Timeline dot */}
                  <div
                    className={`absolute w-3 h-3 rounded-full ${getStatusColor(
                      item.status
                    )} -left-[7px] top-6`}
                  ></div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 ml-4">
                    <h3 className="text-sm font-semibold text-gray-700 min-w-[120px]">
                      {item.date}
                    </h3>
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-[#4D4D4D] mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-1">
                        {item.description}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                          item.status
                        )} text-white`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PropertyHistoryCard;
