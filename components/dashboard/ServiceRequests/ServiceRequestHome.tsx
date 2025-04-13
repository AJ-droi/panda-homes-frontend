/* eslint-disable */
"use client";
import React, { useEffect, useState } from "react";
import Pagination from "../../PaginationComponent";
import { HazardSignIcon } from "@/layout/svgIconPaths";
import ServiceRequestTable from "./RequestTable";
import Card from "@/components/Card";
import ColouredButton from "@/components/ColouredButton";
import WhiteButton from "@/components/WhiteButton";

const ServiceRequestHome = () => {
  const [useColumnLayout, setUseColumnLayout] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
        <section className="flex flex-col gap-4 xs:gap-5 sm:gap-6 md:gap-8 lg:gap-10 mt-4 xs:mt-5 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12">
          <section className="flex w-full">
            <Card>
              <section className="px-4 xs:px-6 sm:px-10 md:px-14 lg:px-18 xl:px-20 py-4 xs:py-5 sm:py-6 gap-4 xs:gap-5 sm:gap-6 md:gap-8 lg:gap-10 flex flex-col justify-center items-center text-[#000000] w-full">
                <div className="w-12 xs:w-14 sm:w-16 md:w-18 lg:w-20">
                  <HazardSignIcon />
                </div>
                <div
                  className="font-[600] leading-[145%] text-sm xs:text-base sm:text-lg md:text-xl text-center"
                  style={{ fontFamily: "Plus Jakarta Sans" }}
                >
                  3 High-Priority Issues Need Immediate Attention!
                </div>
                {/* <div className="flex flex-col lg:flex-row xs:flex-row items-center justify-center w-full gap-3 xs:gap-4 sm:gap-5">
                  <div className="flex justify-center items-center">
                    <WhiteButton title="Assign Technician Now" />
                  </div>
                  <div className="flex justify-center items-center">
                    <ColouredButton title="View Issues" />
                  </div>
                </div> */}
              </section>
            </Card>
          </section>

          <section className="max-w-[98%] text-[#6E7079] rounded-2xl overflow-hidden shadow-md bg-white p-[2%] ">
            <div
              className="text-[#4D4D4D] font-[600] text-[22px] leading-[145%] py-[2%]"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              All Requests
            </div>
            <div className="mt-2 xs:mt-3 sm:mt-4 md:mt-5 w-full">
              <ServiceRequestTable />
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default ServiceRequestHome;
