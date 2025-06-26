"use client";
import TenantServiceChat from "@/components/tenantsSection/tenantServiceRequest/TenantServiceChat";
import React from "react";
import { useParams } from "next/navigation";

const Page = () => {
  const {requestId} = useParams() as {requestId:string}

  return (
    <div className="flex bg-[#fff] text-[#000]">
        <TenantServiceChat requestId={requestId} sender="tenant" />
    </div>
  );
};

export default Page;
