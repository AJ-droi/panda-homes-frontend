    "use client"
import React from 'react'
import RequestCard from './RequestCard'
import { useFetchTenantServiceRequest } from '@/services/tenants/query';

const PastRequest = () => {


    const {
          data: tenantServiceRequest,
        } = useFetchTenantServiceRequest(
         'resolved'
        );
  return (
     <div className='bg-[#fff] min-h-[100vh] text-[#000] py-[2%] px-[3%] '>
        <h3 className='text-[#170F49] font-bold text-xl py-[2%]'>Past Requests </h3>
        <RequestCard request={tenantServiceRequest} type={'past'} />

  
    </div>
  )
}


export default PastRequest