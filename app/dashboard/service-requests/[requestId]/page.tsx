"use client"
import AdminServiceChat from '@/components/dashboard/ServiceRequests/AdminServiceChat';
import { useParams } from 'next/navigation';
import React from 'react'

const Page = () => {
  const {requestId} = useParams() as {requestId:string}

  return (
    <div className="flex bg-[#fff] text-[#000]">
        <AdminServiceChat requestId={requestId}  />
    </div>
  );
};

export default Page