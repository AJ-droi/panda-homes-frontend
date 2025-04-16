"use client"
import React from 'react';
import TenantNoticeAndAgreement from '@/components/tenantsSection/tenantNoticeAndAgreement/TenantNoticeAgreementHome';


const TenantNotices = () => {

    return (
        <div className="flex flex-col min-h-screen">            
            <main className="p-4 sm:p-6 md:p-8 bg-[#fafafe] min-h-screen">
          <section className=''>
            <TenantNoticeAndAgreement />
          </section>
            </main>
          </div>
      )
}

export default TenantNotices;