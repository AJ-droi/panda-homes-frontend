"use client"
import React from 'react'
import RequestCard from './RequestCard'
import { useFetchTenantServiceRequest } from '@/services/tenants/query';
import NoDataAvailable from '../NoDataComponent';

const OngoingRequest = () => {

    const {
          data: tenantServiceRequest,
        } = useFetchTenantServiceRequest(
         'pending'
        );
  return (
     <div className='bg-[#fff] min-h-[100vh] text-[#000] py-[2%] px-[3%] '>
        <h3 className='text-[#170F49] font-bold text-xl py-[2%]'>Ongoing Requests </h3>
        
      {tenantServiceRequest?.length === 0 ? (
        <NoDataAvailable
          title="No Ongoing Request Available"
          subtitle=""
          description=""
          footer=""
        />
      ) : (<RequestCard request={tenantServiceRequest} type={'ongoing'}/>
        
      )}
    </div>
  )
}

export default OngoingRequest