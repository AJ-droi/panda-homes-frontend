"use client";
import React from 'react'
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { useMatchMediaQuery } from "@/hooks/useViewPort";
import device from "@/constants/breakpoints";

const Dashboard = () => {
  const isTabletOrSmaller = useMatchMediaQuery(device.tablet);

  return (
    <div className="flex flex-col min-h-screen">
      <Sidebar />
      <div className={`flex-1 ${isTabletOrSmaller ? 'ml-0' : 'ml-[179px]'} transition-all duration-300`}>
        <Navbar />
        
        <div className="p-4 sm:p-6 md:p-8 bg-[#fafafe] min-h-screen">
        </div>
      </div>
    </div>
  )
}

export default Dashboard;