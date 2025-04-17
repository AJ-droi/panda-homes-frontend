"use client";
import React, { useEffect, useState } from "react";
import DashboardHomeNav from "./Homenav";
import PropertyPaymentTable from "./PropertyPaymentTable";
import ServiceRequestTable from "@/components/dashboard/Home/ServiceRequestTable";

const DashboardHome = () => {
  const [useColumnLayout, setUseColumnLayout] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming-rent')

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setUseColumnLayout(width <= 1280);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="bg-[#fafafe] p-4 w-full min-h-screen">
      <section>
        <div
          className="text-[#4D4D4D] font-[600] text-[22px] leading-[145%]"
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
          Dashboard Overview
        </div>

        <div className="mt-6">
          <DashboardHomeNav />
        </div>
      </section>

      <div className="flex flex-wrap my-5">
          <button
            className={`px-6 py-4 font-medium text-sm md:text-base ${
              activeTab === 'upcoming-rent' 
                ? 'text-[#785DBA] border-b-2 border-[#785DBA]' 
                : 'text-gray-600 border-b-1 border-gray-200 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('upcoming-rent')}
          >
            Upcoming Rent Payment
          </button>
          <button
            className={`px-6 py-4 font-medium text-sm md:text-base ${
              activeTab === 'service-request' 
                ? 'text-[#785DBA] border-b-2 border-[#785DBA]' 
                : 'text-gray-600 border-b-1 border-gray-200 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('service-request')}
          >
            Service Request
          </button>
        </div>

      {activeTab === "upcoming-rent" && <section className="max-w-full text-[#6E7079] rounded-2xl overflow-hidden shadow-md bg-white p-[2%] my-[2%]">
    
        <div
          className={`flex ${
            useColumnLayout ? "flex-col" : "flex-col lg:flex-row"
          }  gap-10 w-full`}
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
          <div className="w-full">
            <PropertyPaymentTable />
          </div>
        </div>
      </section>}

      {activeTab === "service-request" &&  <section className="mt-6 flex flex-col gap-[14px] w-full max-w-full text-[#6E7079] rounded-2xl overflow-hidden shadow-lg bg-white p-[2%] my-[2%]">
        <div className="mt-6 w-full">
          <ServiceRequestTable />
        </div>
      </section>}
    </div>
  );
};

export default DashboardHome;
