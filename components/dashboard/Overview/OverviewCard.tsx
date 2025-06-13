// import { HistoriesPageBulletIcon } from '@/layout/svgIconPaths'
import Pagination from "@/components/PaginationComponent";
import React, { useState } from "react";
/* eslint-disable */
const OverviewCard = (props: any) => {
  const { data } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Calculate items to display on current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = React.useMemo(() => {
    return data?.slice(indexOfFirstItem, indexOfLastItem) || [];
  }, [data, indexOfFirstItem, indexOfLastItem]);
  return (
    <div className="bg-[#fff] p-4 rounded-lg shadow-md">
      {data?.length < 1 && (
        <h3 className="text-[#000]"> No History for this property</h3>
      )}
      <div className="">
        {/* {Object.keys(groupedItems).map((date, dateIndex) => ( */}
        <div>
          {currentItems?.map((item: any, itemIndex: number) => (
            <div
              key={itemIndex}
              className="border-b-1  pt-2  border-[#37352F29] max-w-[708px] font-plus-jarkarta"
            >
              <div className="flex items-start border-l-2 border-[#DDDEE1] pl-4 pr-6">
                <div className="">
                  <h3 className="text-[14px] font-[700] leading-[24px] text-[#1A1F36] font-plus-jarkarta">
                    {item.property_name}
                  </h3>
                </div>
              </div>

              <div className="flex border-l-2 border-[#DDDEE1] pl-4 pr-6">
                <div className="flex gap-[10px]">
                  {/* <HistoriesPageBulletIcon /> */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between ">
                    <h4 className="text-[12px]  text-[#1A1F36] font-inter">
                      {item.description}
                    </h4>
                  </div>
                </div>
              </div>
              <p className=" text-[12px] text-[#A5ACB8] font-[400] leading-[24px]">
                {item.date}
              </p>
            </div>
          ))}
        </div>
        {/* ))} */}
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
