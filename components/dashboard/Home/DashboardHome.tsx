"use client";
import React, { useEffect, useState } from "react";
import DashboardHomeNav from "./Homenav";
import PropertyPaymentTable from "./PropertyPaymentTable";
import ServiceRequestTable from "@/components/dashboard/Home/ServiceRequestTable";

const DashboardHome = () => {
  const [useColumnLayout, setUseColumnLayout] = useState(false);

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
    <div className="bg-[#fafafe] p-4 w-full">
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

      <section className="max-w-full text-[#6E7079] rounded-2xl overflow-hidden shadow-md bg-white p-[2%] my-[2%]">
      <div
        className="text-[#4D4D4D] font-[600] text-[22px] leading-[145%] py-[2%]"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        Upcoming Rent Payments
      </div>
        <div
          className={`flex ${
            useColumnLayout ? "flex-col" : "flex-col lg:flex-row"
          }  gap-10 w-full`}
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
          <div className="w-full">
            <PropertyPaymentTable />
          </div>
          {/* <div className="w-auto lg:w-auto">
            <ActionsCard />
          </div> */}
        </div>
      </section>

      <section className="mt-6 flex flex-col gap-[14px] w-full max-w-full text-[#6E7079] rounded-2xl overflow-hidden shadow-lg bg-white p-[2%] my-[2%]">
        <div
          className="text-[#4D4D4D] font-[600] text-[22px] leading-[145%]"
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
          Service Requests
        </div>
        <div className="mt-6 w-full">
          <ServiceRequestTable />
        </div>
      </section>
    </div>
  );
};

export default DashboardHome;
