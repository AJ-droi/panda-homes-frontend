"use client";
/* eslint-disable */
import React, { useEffect, useState } from "react";
import PropertiesListTable from "./PropertiesListTable";
import SearchBar from "@/components/SearchBar";
import Dropdown from "@/components/Dropdown";
import {
  LocationIcon,
  PropertyTypeIcon,
  OccupantStatusIcon,
  PropertyStatusIcon,
  BuildYearCalendarIcon,

} from "@/layout/svgIconPaths";
import IssuesListTable from "./IssuesTable";
import LeaseExpirationTable from "./LeaseExpirationTable";


const PropertiesHome = () => {
  const [useColumnLayout, setUseColumnLayout] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setUseColumnLayout(width <= 1280);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className=" px-3 sm:px-4 md:px-6 lg:px-0 w-full">
        <div>
          <section className="flex flex-col justify-center">
            <div className="mt-3 sm:mt-4 w-full flex justify-center">
              <SearchBar
                placeholder="Search for a property"
                buttonTitle="Find Property"
              />
            </div>
            <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-[12.71px] p-2 md:p-[6.35px] mt-2 rounded-[7.62px] shadow-md">
              <Dropdown
                options={["Lagos", "Abia", "Benue", "Benin"]}
                placeholder="Location"
                icon={<LocationIcon />}
              />
              <Dropdown
                options={["Bungalow", "3-Storey", "Duplex", "Hall"]}
                placeholder="Property Type"
                icon={<PropertyTypeIcon />}
              />
              <Dropdown
                options={["Occupied", "Not Occupied"]}
                placeholder="Occupant Status"
                icon={<OccupantStatusIcon />}
              />
              <Dropdown
                options={["Rental", "Outright Sell", "Landed Property"]}
                placeholder="Property Status"
                icon={<PropertyStatusIcon />}
              />
              <Dropdown
                options={["2024", "2025", "2001", "1992"]}
                placeholder="Build Year"
                icon={<BuildYearCalendarIcon />}
              />
            </div>
          </section>

        <section className="flex items-start py-5">
          <div className="w-[65%]">
    
          <section className="max-w-[98%] text-[#6E7079] rounded-2xl overflow-hidden shadow-md bg-white p-[2%] ">
            <div
              className="text-[#4D4D4D] font-[600] text-[22px] leading-[145%] py-[2%]"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Properties List
            </div>
            <div
              className={`flex ${
                useColumnLayout ? "flex-col" : "flex-col lg:flex-row"
              } gap-10 w-full`}
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              <div className="mt-4 sm:mt-6 w-full lg:max-w-[780px]">
                <PropertiesListTable />
              </div>
              {/* <div className="w-full flex justify-center lg:justify-start lg:w-auto">
                <RentCollectionSummary />
              </div> */}
            </div>
          </section>

          <section className="max-w-[98%] text-[#6E7079] rounded-2xl overflow-hidden shadow-md bg-white p-[2%] my-[2%]">

              <div
                className="text-[#4D4D4D] font-[600] text-[22px] leading-[145%] py-[2%]"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Active Maintenance Issues
              </div>
  

            <div className="w-full max-w-[900px]">
              <IssuesListTable />
            </div>
          </section>
          </div>
          <LeaseExpirationTable />
          </section>
        </div>
    </div>
  );
};

export default PropertiesHome;
