
"use client"
import ServiceRequestCard from '@/components/dashboard/ServiceRequests/ServiceRequestCard';
import { useFetchServiceRequestByTenant } from '@/services/service-request/query';
import React from 'react';



export default function TenantServiceRequests() {
    const { data: serviceRequest } = useFetchServiceRequestByTenant();

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafe] w-full">
    <ServiceRequestCard request={serviceRequest} />
    </div>
  )
}
