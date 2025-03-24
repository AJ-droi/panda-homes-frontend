/* eslint-disable */
"use client";

import React, { useEffect, useState } from "react";
import PropertiesListTable from "./PropertiesListTable";
import ActionsCard from "../Home/ActionsCard";
import Pagination from "../../PaginationComponent";
import ServiceRequestTable from "@/components/dashboard/Home/ServiceRequestTable";
import SearchBar from "@/components/SearchBar";
import Dropdown from "@/components/Dropdown";
import {
  LocationIcon,
  PropertyTypeIcon,
  OccupantStatusIcon,
  PropertyStatusIcon,
  BuildYearCalendarIcon,
  WhitePlusIcon,
  PropertyFormStar,
} from "@/layout/svgIconPaths";
import RentCollectionSummary from "./RentCollectionSummary";
import IssuesListTable from "./IssuesTable";
import ColouredButton from "@/components/ColouredButton";
import PropertyForm from "./PropertyForm";

const PropertiesHome = () => {
  const [useColumnLayout, setUseColumnLayout] = useState(false);
  const [newPropertyForm, setNewPropertyForm] = useState(false);

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
    <div className="bg-[#fafafe] px-3 sm:px-4 md:px-6 lg:px-10 w-full">
      {!newPropertyForm && (
        <div>
          <section className="flex flex-col justify-center">
            <div className="mt-3 sm:mt-4 w-full flex justify-center">
              <SearchBar
                placeholder="Search for a property"
                buttonTitle="Find Property"
              />
            </div>
            <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-[12.71px] p-2 md:p-[6.35px] mt-2 rounded-[7.62px] shadow-lg sm:shadow-xl md:shadow-2xl">
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

          <section className="mt-6 sm:mt-8 md:mt-12 lg:mt-16 w-full">
            <div
              className="text-[#4D4D4D] font-[600] mt-4 sm:mt-6 md:mt-10 text-[16px] sm:text-[18px] md:text-[22px] leading-[145%]"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Properties List
            </div>
            <div
              className={`flex ${
                useColumnLayout ? "flex-col" : "flex-col lg:flex-row"
              } gap-4 sm:gap-6 w-full flex-wrap`}
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              <div className="mt-4 sm:mt-6 w-full lg:max-w-[780px]">
                <PropertiesListTable />
                <div className="mt-4 sm:mt-6 flex justify-center lg:justify-end">
                  <Pagination
                    totalPages={10}
                    currentPage={4}
                    onPageChange={() => ""}
                  />
                </div>
              </div>
              <div className="w-full flex justify-center lg:justify-start lg:w-auto">
                <RentCollectionSummary />
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-4 sm:gap-6 mt-6 sm:mt-8 md:mt-10">
            <div className="flex flex-col sm:flex-row justify-between items-start w-full">
              <div
                className="text-[#4D4D4D] font-[600] text-[16px] sm:text-[18px] md:text-[22px] leading-[145%]"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Active Maintenance Issues
              </div>
            </div>

            <div className="w-full max-w-[900px]">
              <IssuesListTable />
              <div className="mt-4 sm:mt-6 flex justify-center lg:justify-end">
                <Pagination
                  totalPages={10}
                  currentPage={4}
                  onPageChange={() => ""}
                />
              </div>
            </div>

            <div className="flex justify-center sm:justify-end mt-3 sm:mt-0">
              <div className="w-auto">
                <ColouredButton
                  hoverEffect={false}
                  onClick={() => setNewPropertyForm(true)}
                >
                  <div className="flex gap-[8.72px] justify-center items-center">
                    <div className="flex justify-center items-center">
                      <WhitePlusIcon />
                    </div>
                    <div className="text-sm sm:text-base font-[100]">
                      Add New Property
                    </div>
                  </div>
                </ColouredButton>
              </div>
            </div>
          </section>
        </div>
      )}
      {newPropertyForm && (
        <section className="">
          <div className="mb-4">
            <PropertyFormStar />
          </div>
          <PropertyForm onClose={() => setNewPropertyForm(false)} />
        </section>
      )}
    </div>
  );
};

export default PropertiesHome;
