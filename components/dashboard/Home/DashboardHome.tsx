/* eslint-disable */
"use client";
import React, { useEffect, useState } from 'react'
import DashboardHomeNav from './Homenav'
import PropertyPaymentTable from './PropertyPaymentTable';
import ActionsCard from './ActionsCard';
import Pagination from "../PaginationComponent";
import ServiceRequestTable from '@/components/ServiceRequestTable';

const DashboardHome = () => {

  const [useColumnLayout, setUseColumnLayout] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setUseColumnLayout(width <= 1280);
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className='bg-[#fafafe] p-4 w-full'>
        <section>
          <div 
            className='text-[#4D4D4D] font-[600] text-[22px] leading-[145%]'
            style={{fontFamily: 'Plus Jakarta Sans'}}
          >
            Dashboard Overview
          </div>

          <div className='mt-6'>
            <DashboardHomeNav />
          </div>
        </section>

        <section className='mt-16 w-full'>
          <div 
            className='text-[#4D4D4D] font-[600] mt-10 text-[22px] leading-[145%]'
            style={{fontFamily: 'Plus Jakarta Sans'}}
          >
            Upcoming Rent Payments
          </div>
            <div 
              className={`flex ${useColumnLayout ? 'flex-col' : 'flex-col lg:flex-row'}  gap-10 w-full`}
              style={{fontFamily: 'Plus Jakarta Sans'}}
            >
              <div className='mt-6 w-full max-w-[780px]'>
                <PropertyPaymentTable />
                <div className='mt-6 flex justify-center lg:justify-end'>
                  <Pagination totalPages={10} currentPage={4} onPageChange={()=> ''}/>
                </div>
              </div>
              <div className='w-auto lg:w-auto'>
                <ActionsCard />
              </div>
            </div>
        </section>

        <section className='mt-6 flex flex-col gap-[14px] w-full'>
          <div 
              className='text-[#4D4D4D] font-[600] mt-6 text-[22px] leading-[145%]'
              style={{fontFamily: 'Plus Jakarta Sans'}}
            >
              Service Requests
          </div>
          <div className='mt-6 w-full max-w-[936px]'>
            <ServiceRequestTable />
            <div className='mt-6 flex justify-center lg:justify-end'>
                  <Pagination totalPages={10} currentPage={4} onPageChange={()=> ''}/>
                </div>
          </div>
        </section>
    </div>
  )
}

export default DashboardHome;