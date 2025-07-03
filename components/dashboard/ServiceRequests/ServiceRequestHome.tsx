/* eslint-disable */
"use client";
import React, { useEffect, useState } from "react";
import Pagination from "../../PaginationComponent";
import { HazardSignIcon } from "@/layout/svgIconPaths";
import ServiceRequestTable from "./RequestTable";
import Card from "@/components/Card";
import ColouredButton from "@/components/ColouredButton";
import WhiteButton from "@/components/WhiteButton";
import BackButton from "@/components/Backbutton";
import ServiceRequestCard from "./ServiceRequestCard";
import { useFetchServiceRequest } from "@/services/service-request/query";

const ServiceRequestHome = () => {
  const [useColumnLayout, setUseColumnLayout] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { data: serviceRequest, isLoading } = useFetchServiceRequest();

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

  return (
    <div className="bg-[#fafafe] flex flex-col px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12 w-full overflow-x-hidden min-h-screen">
   
      <div className="w-full max-w-[1920px] mx-auto">
        <section className="flex flex-col gap-4 xs:gap-5 sm:gap-6 md:gap-8 lg:gap-10 mt-4 xs:mt-5 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-5">
          {isMobile ? (
            <ServiceRequestCard request={serviceRequest} />
          ) : (
            <section className="max-w-[98%] text-[#6E7079] rounded-2xl overflow-hidden shadow-md bg-white p-[2%] ">
              {/* <div
                className="text-[#4D4D4D] font-[600] text-[22px] leading-[145%] py-[2%]"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                All Requests
              </div> */}
              <div className="mt-2 xs:mt-3 sm:mt-4 md:mt-5 w-full">
                <ServiceRequestTable
                  serviceRequest={serviceRequest}
                  isLoading={isLoading}
                />
              </div>
            </section>
          )}
        </section>
      </div>
    </div>
  );
};

export default ServiceRequestHome;
