"use client";
import React, { useEffect, useState } from "react";
// import NoticesHomeNav from "@/components/dashboard/NoticesAgreements/NoticesHomeNav";
import NoticeTable from "./NoticeTable";
import BackButton from "@/components/Backbutton";
import NoticeAgreementCard from "./NoticeAgreementCard";
import { useFetchNoticeAgreements } from "@/services/notice-agreement/query";
// import NoticeForm from "./NoticeForm";

const NoticesAgreementHome = () => {
  const [useColumnLayout, setUseColumnLayout] = useState(false);
  // const [activeTab, setActiveTab] = useState("view-na");

  const [isMobile, setIsMobile] = useState(false);
  const { data: noticeData } = useFetchNoticeAgreements();

  //  const { data: serviceRequest, isLoading } = useFetchServiceRequest();

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setUseColumnLayout(width <= 1280);
      setIsMobile(width <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="bg-[#fafafe] p-4 w-full min-h-[100vh]">
      <section>
        <BackButton title="Documents" />
        {/* <div className="py-5">
          <NoticesHomeNav />
        </div> */}
      </section>
      <div className="flex flex-wrap my-5">
        {/* <button
            className={`px-6 py-4 font-medium text-sm md:text-base ${
              activeTab === 'send-new-notice' 
                ? 'text-[#785DBA] border-b-2 border-[#785DBA]' 
                : 'text-gray-600 border-b-1 border-gray-200 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('send-new-notice')}
          >
            Send New Notice
          </button> */}
        {/* <button
            className={`px-6 py-4 font-medium text-sm md:text-base ${
              activeTab === 'view-na' 
                ? 'text-[#785DBA] border-b-2 border-[#785DBA]' 
                : 'text-gray-600 border-b-1 border-gray-200 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('view-na')}
          >
            View Notice Agreement
          </button>
          */}
      </div>
      {/* 
      {activeTab === "send-new-notice" &&<section className="mt-6 flex flex-col gap-[14px] w-full">
        <NoticeForm />
      </section>} */}
      {isMobile ? (
        <NoticeAgreementCard notice={noticeData} />
      ) : (
        <section className="max-w-[98%] text-[#6E7079] rounded-2xl overflow-hidden shadow-md bg-white p-[2%]  ">
          {/* <div
            className="text-[#4D4D4D] font-[600] text-[22px] leading-[145%] py-[2%]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Documents
          </div> */}
          <div
            className={`flex ${
              useColumnLayout ? "flex-col" : "flex-col lg:flex-row"
            }  gap-10 w-full`}
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            <div className="mt-4 sm:mt-6 w-full">
              <NoticeTable noticeData={noticeData} />
            </div>
          </div>
        </section>
      )}
      )
    </div>
  );
};

export default NoticesAgreementHome;
