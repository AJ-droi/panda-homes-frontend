/* eslint-disable */
"use client";
import React, { useEffect, useState } from "react";
import TenantServiceRequestTable from "./TenantServiceRequestTable";
import TenantServiceRequestForm from "../TenantServiceRequestForm";
import ServiceRequestCard from "@/components/dashboard/ServiceRequests/ServiceRequestCard";
import { useFetchTenantServiceRequest } from "@/services/tenants/query";

const TenantServiceRequestHome = () => {
  const [useColumnLayout, setUseColumnLayout] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [newServiceRequest, setNewServiceRequest] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setUseColumnLayout(width <= 1280);
      setIsMobile(width <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);


    const [tenantDetails, setTenantDetails] = useState<any>({});
  
    useEffect(() => {
      const isClient = typeof window !== "undefined";
      if (isClient) {
        const jsonTenantDetails = localStorage.getItem("tenant");
        if (jsonTenantDetails) {
          try {
            setTenantDetails(JSON.parse(jsonTenantDetails));
          } catch (error) {
            console.error("Failed to parse tenant details", error);
          }
        }
      }
    }, []);
  
    const [currentPage, setCurrentPage] = useState(1);
  
    const itemsPerPage = 10;
  
    const {
      data: tenantServiceRequest,
      isLoading: isRequestLoading,
      isFetching: isFetchingRequests,
    } = useFetchTenantServiceRequest(
      ''
    );


  return (
    <div className=" flex flex-col px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12 w-full overflow-x-hidden min-h-screen">
      <div className="w-full max-w-[1920px] mx-auto">
        <section className="flex flex-col gap-4 xs:gap-5 sm:gap-6 md:gap-8 lg:gap-10 mt-4 xs:mt-5 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12">

          <section className="max-w-[98%] text-[#6E7079] overflow-hidden   p-[2%] ">
            <div
              className="text-[#4D4D4D] font-[600] text-[22px] leading-[145%] py-[2%]"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              All Requests
            </div>
            <div className="mt-2 xs:mt-3 sm:mt-4 md:mt-5 w-full">
              {/* <TenantServiceRequestTable /> */}
              <ServiceRequestCard request={tenantServiceRequest} />
            </div>
          </section>
          <div className="flex">
          <button onClick={()=> setNewServiceRequest(true)} className="text-xs md:text-sm max-w-[140px] md:max-w-[161px] font-[400] bg-gradient-to-r from-[#7942FB] to-[#B091F9] p-1.5 md:p-2 rounded-[6px] md:rounded-[8px] w-full text-white">
            Send a new request
          </button>
        </div>
        </section>
      </div>

      {newServiceRequest && (
      <div className="mt-4">
        <TenantServiceRequestForm onClose={()=> {setNewServiceRequest(false); return null}}/>
      </div>
      )}
    </div>
  );
};

export default TenantServiceRequestHome;
