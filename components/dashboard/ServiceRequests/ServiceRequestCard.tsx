"use client"
/* eslint-disable */
import { useRouter } from "next/navigation";
import React, { useState } from "react";


const ServiceRequestCard = (props: any) => {
  const { request } = props;
  const router = useRouter();
  // const { name, location, status, tenant_name, lease_end_date } = property
  return (
    <div className="flex flex-col gap-y-4">
      {request?.map((item: any, index: string) => (
        <div
          className="bg-[#fff] flex flex-col gap-y-2 rounded-md p-4 shadow-md shadow-[#0000001A] text-[#696969] font-plus-jarkarta "
          key={index}
        >
            <p className="text-[#696969] text-[12px]">{item.requestid} </p>
          <div className="flex gap-x-2 text-[14px]">
            <h3
              className="underline"
              onClick={() => router.push(`/dashboard/view-property/${item.id}`)}
            >
              {item.property}
            </h3>
            <span>.{item.tenant}</span>
          </div>
          <div className="flex gap-x-2 text-[#785DBA]">
            <img src="/left-triangle.svg" /> <span>{item.issue}</span>
        </div>
          
          <p className="text-[#696969] text-[12px]"> Reported: {item.dateReported}</p>
          <p className="text-[#696969] text-[12px]">Status: {item.status}</p>
        </div>
      ))}

    
 
    </div>
  );
};

export default ServiceRequestCard;
