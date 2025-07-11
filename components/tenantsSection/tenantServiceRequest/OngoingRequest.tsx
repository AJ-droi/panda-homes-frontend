"use client"
import React from 'react'
import RequestCard from './RequestCard'
import { useFetchTenantServiceRequest } from '@/services/tenants/query';
import NoDataAvailable from '../NoDataComponent';
import BackButton from '@/components/Backbutton';

const OngoingRequest = () => {

    const {
          data: tenantServiceRequest,
        } = useFetchTenantServiceRequest(
         'pending'
        );
  return (
     <div className='bg-[#fff] min-h-[100vh] text-[#000] py-[2%] px-[3%] '>
      <BackButton title={"Ongoing Requests"} />
        
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