"use client";
import TenantServiceRequestHome from "@/components/tenantsSection/tenantServiceRequest/TenantServiceRequestHome";
import React from "react";

const TenantServiceRequests = () => {

  return (
    <div className="flex flex-col min-h-screen">
        <div className="p-4 sm:p-6 md:p-8 bg-[#fafafe] min-h-screen">
          <TenantServiceRequestHome />
        </div>
      </div>
  );
};

export default TenantServiceRequests;
