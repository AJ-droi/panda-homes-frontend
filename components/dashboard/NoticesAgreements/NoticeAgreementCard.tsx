"use client";
/* eslint-disable */
import { useRouter } from "next/navigation";
import React from "react";

const NoticeAgreementCard = (props: any) => {
  const { notice } = props;
  const router = useRouter();
  // const { name, location, status, tenant_name, lease_end_date } = property
  return (
    <div className="flex flex-col gap-y-4 min-h-screen bg-[#fff]">
      <h3 className="text-[#785DBA]">All Documents</h3>
      {notice?.map((item: any, index: string) => (
        <div
          className="bg-[#fff] flex flex-col gap-y-2 rounded-md p-4 border border-[#CACACA] text-[#696969] font-plus-jarkarta "
          key={index}
        >
          <div className="flex justify-between gap-x-2 text-[14px]">
            <div className="flex items-start gap-x-4">
                <img src="/notice.svg" className="w-[20px] h-[20px]" />
                <div className="flex flex-col gap-x-2 text-[14px]">
                  <h3 className="font-bold text-[#353535]">{item.noticeType}</h3>
                  <h3 className="font-medium text-[#353535]">{item.property}</h3>
                  <h4>{item.tenant}</h4>
                </div> 
            </div>
          
            <h3 className="text-[#34A853]">Read</h3>
          </div>

          <p className="text-[#696969] text-[12px]">{item.dateSent}</p>
        </div>
      ))}
        <button className=" fixed bottom-5 right-10 hover:cursor-pointer" onClick={() => router.push('/dashboard/notice-agreement/send-notice')}>
       <img src="/add.svg" width={50} height={50} />
      </button>
    </div>
  );
};

export default NoticeAgreementCard;
