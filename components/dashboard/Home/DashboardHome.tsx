"use client";
import React from 'react'
import DashboardHomeNav from './Homenav'
import PropertyPaymentTable from './PropertyPaymentTable';

const DashboardHome = () => {
  return (
    <div>
        <section>
        <div className='text-[#4D4D4D] font-[600] text-[22px] leading-[145%]'
        style={{fontFamily: 'Plus Jakarta Sans'}}
        >
        Dashboard Overview
        </div>

        <div className='mt-6'>
      <DashboardHomeNav />
        </div>
        </section>

    <section>
        <div className='text-[#4D4D4D] font-[600] mt-6 text-[22px] leading-[145%]'
        style={{fontFamily: 'Plus Jakarta Sans'}}
        >
        Upcoming Rent Payments
        </div>
        <div className='mt-6 flex items-start justify-items-start'>
            <PropertyPaymentTable />
        </div>
    </section>
    </div>
  )
}


export default DashboardHome;
