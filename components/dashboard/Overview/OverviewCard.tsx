// import { HistoriesPageBulletIcon } from '@/layout/svgIconPaths'
import Pagination from "@/components/PaginationComponent";
import { NotificationType } from "@/constants/enums/notification-event";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

/* eslint-disable */
const OverviewCard = (props: any) => {
  const { data } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Function to determine event type and color
  const getEventTypeColor = (type: string) => {
    // const desc = description.toLowerCase();
    
    if (type=== NotificationType.SERVICE_REQUEST) {
      return 'bg-[#6688FF]'; // Blue for service requests
    } else if (type === NotificationType.RENT_CREATED) {
      return 'bg-[#F55D5D]'; // Red for lease-related
    } else if (type === NotificationType.USER_SIGNED_UP || type === NotificationType.USER_ADDED_TO_PROPERTY) {
      return 'bg-[#EE9239]'; // Orange for completed actions
    } else if (type === NotificationType.PROPERTY_CREATED) {
      return 'bg-[#2CBE82]'; // Green for new additions
    }
    return 'bg-gray-500'; // Default gray
  };

  const handleClick = (item: any) => {
     if (item.type=== NotificationType.SERVICE_REQUEST) {
      return router.push(`/dashboard/service-requests/${item.request_id}`) // Blue for service requests
    } else if (item.type === NotificationType.RENT_CREATED) {
      return 'bg-[#F55D5D]'; // Red for lease-related
    } else if (item.type === NotificationType.USER_SIGNED_UP || item.type === NotificationType.USER_ADDED_TO_PROPERTY) {
      return  router.push(`/dashboard/tenants`)  // Orange for completed actions
    } else if (item.type === NotificationType.PROPERTY_CREATED) {
      return  router.push(`/dashboard/view-property/${item.property_id}`)  // Green for new additions
    }
  }

  // Group items by date
  const groupedItems = React.useMemo(() => {
    if (!data || data.length === 0) return {};
    
    const grouped = data.reduce((acc: any, item: any) => {
      const date = item.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
    
    return grouped;
  }, [data]);

  // Get paginated groups
  const groupedKeys = Object.keys(groupedItems).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // For pagination, we need to flatten and then group again
  const allItems = data || [];
  const currentItems = allItems.slice(indexOfFirstItem, indexOfLastItem);
  
  const currentGroupedItems = React.useMemo(() => {
    return currentItems.reduce((acc: any, item: any) => {
      const date = item.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
  }, [currentItems]);

  const router = useRouter();
  
  return (
    <div className="bg-[#fff] p-4 rounded-lg shadow-md">
      {data?.length < 1 && (
        <h3 className="text-[#000]"> No History for this property</h3>
      )}
      
      <div className="">
        {Object.keys(currentGroupedItems)
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
          .map((date, dateIndex) => (
          <div key={dateIndex} className="mb-6">
            {/* Date Header */}
            <div className="mb-4">
              <h2 className="text-[14px] font-[400] text-[#A5ACB8] font-plus-jarkarta">
                {date}
              </h2>
            </div>
            
            {/* Items for this date */}
            <div className="space-y-3">
              {currentGroupedItems[date].map((item: any, itemIndex: number) => (
                <div
                  key={itemIndex}
                  className="flex items-start gap-4  rounded-lg hover:bg-[#efefef] cursor-pointer transition-colors  h-20 md:w-[60%] shadow-md"
                  onClick={
                    () => handleClick(item)
                   }
                >
                  {/* Color-coded indicator */}
     
                    <div 
                      className={`w-3 h-20 rounded-ss-xl rounded-es-xl ${getEventTypeColor(item.type)}`}
                    />
                 
                  
                  {/* Content */}
                  <div className="flex flex-col flex-1 min-w-0 justify-center h-20">
                    <h3 className="text-[14px] font-[700] leading-[20px] text-[#787774] font-plus-jarkarta hover:underline mb-1">
                      {item.description}
                    </h3>
                    <p className="text-[12px] text-[#787774] font-[400] leading-[16px] font-inter">
                      {item.property_name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={data?.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        itemsPerPageOptions={[10, 25, 50, 100]}
        showNavigation={true}
        showItemsPerPage={true}
        showPageJumper={true}
      />
    </div>
  );
};

export default OverviewCard;