"use client"
/* eslint-disable */
import { useRouter } from "next/navigation";
import React, { useState } from "react";


const PropertyMobileCard = (props: any) => {
  const { properties } = props;
  const router = useRouter();
  // const { name, location, status, tenant_name, lease_end_date } = property
  return (
    <div className="flex flex-col gap-y-4">
      {properties?.map((item: any, index: string) => (
        <div
          className="bg-[#fff] flex flex-col gap-y-2 rounded-md p-4 shadow-md shadow-[#0000001A] "
          key={index}
        >
          <div className="flex justify-between text-[16px]">
            <h3
              className="text-[#000] underline"
              onClick={() => router.push(`/dashboard/view-property/${item.id}`)}
            >
              {item.property}
            </h3>
            <p className="text-[#34A853]"> {item.vacancy}</p>
          </div>
          <div className="text-[#696969] text-[12px]">
            <span>{item.tenant_name}</span>
            <span> • Lease ends in {item.daysLeft} days</span>
          </div>
        </div>
      ))}

      <button className="bg-[#785DBA] text-white text-[12px] font-semibold py-2 px-4 w-[45%] rounded-md" onClick={() => router.push('/dashboard/properties/group')}>
        Group Properties
      </button>


        <button className=" fixed bottom-5 right-10" onClick={() => router.push('/dashboard/add-property')}>
       <img src="/add.svg" width={50} height={50} />
      </button>


 
    </div>
  );
};

export default PropertyMobileCard;
