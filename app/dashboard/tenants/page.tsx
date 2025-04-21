"use client"
import TenantsHome from '@/components/dashboard/Tenants/TenantsHome';
import React from 'react';

const TenantsView = () => {
    return (
          <div className="p-4 sm:p-6 md:p-8 bg-[#fafafe] min-h-screen">
              <TenantsHome />
          </div>
    )
}

export default TenantsView