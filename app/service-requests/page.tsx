"use client";
import ServiceRequestHome from "@/components/dashboard/ServiceRequests/ServiceRequestHome";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import device from "@/constants/breakpoints";
import { useMatchMediaQuery } from "@/hooks/useViewPort";
import React from "react";

const ServiceRequests = () => {
  const isTabletOrSmaller = useMatchMediaQuery(device.tablet);

  return (
    <div className="flex flex-col min-h-screen">
      <Sidebar />
      <div
        className={`flex-1 ${
          isTabletOrSmaller ? "ml-0" : "ml-[179px]"
        } transition-all duration-300`}
      >
        <Navbar />

        <div className="p-4 sm:p-6 md:p-8 bg-[#fafafe] min-h-screen">
          <ServiceRequestHome />
        </div>
      </div>
    </div>
  );
};

export default ServiceRequests;
