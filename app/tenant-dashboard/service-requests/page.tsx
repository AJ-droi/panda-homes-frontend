
"use client"
import TenantServiceRequestHome from '@/components/tenantsSection/tenantServiceRequest/TenantServiceRequestHome';
import React from 'react';



export default function TenantServiceRequests() {
  
  return (
    <div className="flex flex-col min-h-screen bg-[#fafafe] w-full">
      <TenantServiceRequestHome />
    {/* <ServiceRequestCard request={serviceRequest} /> */}
    </div>
  )
}
