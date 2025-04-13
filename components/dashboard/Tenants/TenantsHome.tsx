/* eslint-disable */
"use client";
import React, { useEffect, useState } from "react";
import Pagination from "../../PaginationComponent";
import SearchBar from "@/components/SearchBar";
import Dropdown2 from "@/components/Dropdown2";
import {
  PropertyTypeIcon,
  OccupantStatusIcon,
  PropertyStatusIcon,
  BuildYearCalendarIcon,
} from "@/layout/svgIconPaths";
import TenantsListTable from "./TenantsListTable";
import LeaseExpirationsTable from "./LeaseExpirationsTable";
import OverdueRentsTable from "./OverdueTenantsTable";

const TenantsHome = () => {
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
    <div className="bg-[#fafafe] px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 w-full overflow-x-hidden">
      <div>
        <section className="flex flex-col justify-center">
          <div className="mt-3 sm:mt-4 w-full flex justify-center">
            <SearchBar placeholder="Search by tenant name, apartment, or phone number" />
          </div>
          <div className="mt-3 sm:mt-4">
            <div className="flex flex-col sm:flex-row lg:flex-nowrap md:flex-wrap sm:flex-wrap  gap-2 w-full justify-center items-center sm:gap-3 md:gap-4 lg:gap-2 p-2 md:p-[6.35px] rounded-[7.62px] shadow-sm sm:shadow-md md:shadow-lg overflow-x-auto">
              <Dropdown2
                colorIcon={true}
                options={["Bungalow", "3-Storey", "Duplex", "Hall"]}
                placeholder="Property Name"
                icon={<PropertyTypeIcon />}
              />

              <Dropdown2
                colorIcon={true}
                options={["Occupied", "Not Occupied"]}
                placeholder="Lease Status"
                icon={<OccupantStatusIcon />}
              />

              <Dropdown2
                colorIcon={true}
                options={["Rental", "Outright Sell", "Landed Property"]}
                placeholder="Rent Status"
                icon={<PropertyStatusIcon />}
              />

              <Dropdown2
                colorIcon={true}
                options={["2024", "2025", "2001", "1992"]}
                placeholder="Move-in Date Range"
                icon={<BuildYearCalendarIcon />}
              />
            </div>
          </div>
        </section>

        <section className="flex flex-col xl:flex-row gap-6 sm:gap-8 md:gap-10 mt-6 sm:mt-8 md:mt-10 lg:mt-12">
          <section className="w-full xl:w-[65%] flex flex-col gap-y-5">
            <section className="max-w-[98%] text-[#6E7079] rounded-2xl overflow-hidden shadow-md bg-white p-[2%] ">
              <div
                   className="text-[#4D4D4D] font-[600] text-[22px] leading-[145%] py-[2%]"
                   style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Tenants List
              </div>
              <div className="mt-3 sm:mt-4 md:mt-5 w-full">
                <TenantsListTable />
              </div>
            </section>

            <section className="max-w-[98%] text-[#6E7079] rounded-2xl overflow-hidden shadow-md bg-white p-[2%] ">
              <div
                className="text-[#4D4D4D] font-[600] text-[22px] leading-[145%] py-[2%]"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Overdue Payments
              </div>
              <div className="mt-3 sm:mt-4 md:mt-5 w-full">
                <OverdueRentsTable />
              </div>
            </section>
          </section>

        </section>
      </div>
    </div>
  );
};

export default TenantsHome;
