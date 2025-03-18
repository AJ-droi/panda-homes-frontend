"use client";
import React from 'react'
import DashboardHomeNav from './Homenav'

const DashboardHome = () => {
  return (
    <div>
        <div className='text-[#4D4D4D] font-[600] text-[22px] leading-[145%]'
        style={{fontFamily: 'Plus Jakarta Sans'}}
        >
        Dashboard Overview
        </div>

        <div className='mt-6'>
      <DashboardHomeNav />
        </div>
    </div>
  )
}


export default DashboardHome;
