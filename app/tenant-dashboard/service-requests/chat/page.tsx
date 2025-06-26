"use client";
import TenantServiceChat from "@/components/tenantsSection/tenantServiceRequest/TenantServiceChat";
import { generateServiceRequestId } from "@/services/chat/socket";
import React from "react";

const page = () => {
  const requestId = generateServiceRequestId(); // Example request ID, replace with actual logic if needed

  return (
    <div className="flex bg-[#fff] text-[#000]">
        <TenantServiceChat requestId={requestId} sender="tenant" />
    </div>
  );
};

export default page;
