"use client"
import device from '@/constants/breakpoints';
import { useMatchMediaQuery } from '@/hooks/useViewPort';
import React from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import NoticesAgreementHome from '@/components/dashboard/NoticesAgreements/NoticesAgreementHome';


const NoticesAndAgreements = () => {
    const isTabletOrSmaller = useMatchMediaQuery(device.tablet);

    return (
        <div className="flex flex-col min-h-screen">
          <Sidebar />
          <div className={`flex-1 ${isTabletOrSmaller ? 'ml-0' : 'ml-[179px]'} transition-all duration-300`}>
            <Navbar />
            
            <main className="p-4 sm:p-6 md:p-8 bg-[#fafafe] min-h-screen">
                <section className=''>
            <NoticesAgreementHome />
          </section>
            </main>
          </div>
        </div>
      )
}

export default NoticesAndAgreements;