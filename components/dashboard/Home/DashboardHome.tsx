"use client";
import React from 'react'
import DashboardHomeNav from './Homenav'
import PropertyPaymentTable from './PropertyPaymentTable';
import ActionsCard from './ActionsCard';
import Pagination from "../PaginationComponent";
import ServiceRequestTable from '@/components/ColouredTable';

const DashboardHome = () => {

  return (
    <div className='bg-[#fafafe] p-4'>
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

        <section className='bg-[#fafafe]'>
          <div 
            className='text-[#4D4D4D] font-[600] mt-6 text-[22px] leading-[145%]'
            style={{fontFamily: 'Plus Jakarta Sans'}}
          >
            Upcoming Rent Payments
          </div>
            <div 
              className='flex flex-col lg:flex-row gap-10'
              style={{fontFamily: 'Plus Jakarta Sans'}}
            >
              <div className='mt-6 flex-grow'>
                <PropertyPaymentTable />
                <div className='mt-6 flex justify-center lg:justify-end'>
                <Pagination totalPages={10} currentPage={4} onPageChange={()=> ''}/>
                </div>
              </div>
              <div className='mt-6'>
                <ActionsCard />
              </div>
            </div>
        </section>

        <section className='mt-6 flex flex-col gap-[14px]'>
        <div 
            className='text-[#4D4D4D] font-[600] mt-6 text-[22px] leading-[145%]'
            style={{fontFamily: 'Plus Jakarta Sans'}}
          >
            Service Requests
          </div>
          <div className='mt-6 flex-grow'>
          <ServiceRequestTable />
          </div>
        </section>
    </div>
  )
}

export default DashboardHome;