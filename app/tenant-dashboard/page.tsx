/* eslint-disable */
"use client";
import React, { useEffect, useState } from "react";
import PropertyDescriptionCard from "@/components/tenantsSection/PropertyDescriptionCard";
import TenantServiceRequestCard from "@/components/tenantsSection/ServiceRequestCard";
import RentCountdown from "@/components/tenantsSection/RentExpiryProgressBar";
import PropertyHistoryCard from "@/components/tenantsSection/PropertyHistoryCard";
import TenantServiceRequestForm from "@/components/tenantsSection/TenantServiceRequestForm";
import ColouredButton from "@/components/ColouredButton";
import { useGetTenantRent, useGetTenantProperty } from "@/services/tenants/query";

const TenantDashboard = () => {
  const [propertyHistory, setPropertyHistory] = useState(false);
  const [newServiceRequest, setNewServiceRequest] = useState(false);
  const [tenantDetails, setTenantDetails] = useState<any>({})
  
  useEffect(() => {
    const isClient = typeof window !== 'undefined';
    if (isClient) {
      const jsonTenantDetails = localStorage.getItem('tenant')
      if (jsonTenantDetails) {
        try {
          setTenantDetails(JSON.parse(jsonTenantDetails))
        } catch (error) {
          console.error('Failed to parse tenant details', error)
        }
      }
    }
  }, [])
  const { data:rentDetails, isLoading: isRentLoading } = useGetTenantRent(tenantDetails?.id)

  // const { data:propertyHistoryData, isLoading: isPropertyHistoryDataLoading } = useGetPropertyHistory(tenantDetails?.property_id)

  const { data:tenantPropertyData, isLoading: isPropertyDataLoading } = useGetTenantProperty(tenantDetails?.property_id)

  return (
    <div className="flex px-4 sm:px-8 md:px-16 py-6 md:py-10 bg-[#fafafe] flex-col min-h-screen">
      {!propertyHistory && !newServiceRequest && (
        <div>
          <section className="flex flex-col items-end w-full">
            <div
              className="w-full md:w-auto"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              <div className="font-[500] text-[16px] md:text-[18px] text-[#999999] leading-[150%]">
                Your Rent Price
              </div>
              <div className="text-[#785DBA] font-[600] text-[20px] md:text-[24px] leading-[150%]">
                ${isPropertyDataLoading ? 'loading...' : !tenantPropertyData?.rental_price ? 'No data available' : tenantPropertyData?.rental_price}
              </div>
            </div>
          </section>

          <section className="mt-6 md:mt-10">
            <div
              className="font-[600] text-[#666666] text-[20px] md:text-[24px] leading-[150%]"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              {isPropertyDataLoading ? 'loading apartment details...' : !tenantPropertyData?.name ? 'No data available' : tenantPropertyData?.name}
            </div>
            <div className="mt-6 md:mt-10 max-w-[823.611328125px]">
              { isRentLoading ? <p className="text-[16px] md:text-[13.95px] leading-[100%] text-[#000000] font-[400]">Fetching rent details...</p> : !rentDetails?.lease_end_date ? <p className="text-[16px] md:text-[13.95px] leading-[100%] text-[#000000] font-[400]">No data found</p> : <RentCountdown expirationDate={rentDetails?.lease_end_date} /> }
            </div>
          </section>

          <section className="mt-6 md:mt-10">
            <div>
              <div
                className="font-[600] text-[18px] md:text-[22px] leading-[145%] text-[#4D4D4D]"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                My apartment
              </div>
            </div>
            <div className="grid grid-cols-1 mt-4 md:mt-6 lg:grid-cols-2 gap-4 md:gap-6 w-full">
              <PropertyDescriptionCard
                onClick={() => {
                  setNewServiceRequest(false);
                  setPropertyHistory(true);
                  return null;
                }}
              />
              <TenantServiceRequestCard
                onClick={() => {
                  setPropertyHistory(false);
                  setNewServiceRequest(true);
                  return null;
                }}
              />
            </div>
          </section>
        </div>
      )}

      {propertyHistory && (
        <div className="mt-4">
          <div className="w-auto mb-10 sm:w-auto flex justify-end">
            <div className="max-w-[110px]">
              <ColouredButton onClick={() => setPropertyHistory(false)}>
                Cancel
              </ColouredButton>
            </div>
          </div>
          <PropertyHistoryCard />
        </div>
      )}

      {newServiceRequest && (
        <div className="mt-4">
          <TenantServiceRequestForm
            onClose={() => {
              setNewServiceRequest(false);
              return null;
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TenantDashboard;
