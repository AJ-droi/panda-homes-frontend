import { HistoriesPageBulletIcon } from '@/layout/svgIconPaths'
import React from 'react'
/* eslint-disable */
const OverviewCard = (props:any) => {
    const { data } = props
  return (
    <div className='bg-[#fff] p-4 rounded-lg shadow-md'>
     {data?.length <1 && <h3 className="text-[#000]"> No History for this property</h3>}
          <div className="">
            {/* {Object.keys(groupedItems).map((date, dateIndex) => ( */}
              <div >
                {data?.map((item:any, itemIndex:number) => (
                  <div
                    key={ itemIndex}
                    className="border-b-1   border-[#37352F29] max-w-[708px] py-2"
                  >
           
                      <div className="flex items-start border-l-2 border-[#DDDEE1] p-4">
                        <div className="ml-6">
                          <h3 className="text-[16px] font-[700] leading-[24px] text-gray-700">
                            {item.date}
                          </h3>
                        </div>
                      </div>
                    
    
                    <div className="flex border-l-2 border-[#DDDEE1] pl-4 pr-6">
                      <div className="ml-6 flex gap-[10px]">
                        <HistoriesPageBulletIcon />
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                          <h4 className="text-base font-medium leading-[8px] text-[#787774]">
                            {item.type}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <p className="mt-[15px] text-[16px] text-[#A1A09E] font-[400] leading-[24px]">
                      {item.description} ({item.status})
                    </p>
                  </div>
                ))}
              </div>
            {/* ))} */}
          </div>
    </div>
  )
}

export default OverviewCard