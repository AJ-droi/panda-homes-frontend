"use client";
import ServiceRequestHome from "@/components/dashboard/ServiceRequests/ServiceRequestHome";
import { useMatchMediaQuery } from "@/hooks/useViewPort";
import React from "react";

const ServiceRequests = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-[#fafafe] min-h-screen">
      <ServiceRequestHome />
    </div>
  );
};

export default ServiceRequests;
