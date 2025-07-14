"use client";
/* eslint-disable */
import React, { useEffect, useState } from "react";
import LeaseExpirationTable from "./LeaseExpirationTable";
import PropertiesListTable from "./PropertiesListTable";
import SearchBar from "@/components/SearchBar";
import IssuesListTable from "./IssuesTable";
import BackButton from "@/components/Backbutton";
import { useFetchPropertyDetails } from "@/services/property/query";
import PropertyMobileCard from "./PropertyMobileCard";
import { useMatchMediaQuery } from "@/hooks/useViewPort";
import device from "@/constants/breakpoints";


const PropertiesHome = () => {
  const [useColumnLayout, setUseColumnLayout] = useState(false);
  const [activeTab, setActiveTab] = useState("property-list");
  const isMobile = useMatchMediaQuery(device.mobile);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setUseColumnLayout(width <= 1280);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const [params, setParams] = useState({
    name: "",
    location: "",
    order:"",
    property_status: "",
    property_type: "",
    build_year: "",
    occupant_status: "",
    search: "",
    page: 1,
    size: 10,
  });

  const handleSearchChange = (key: keyof typeof params, value: string) => {
    setParams((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // optional: reset page on new search/filter
    }));
  };

  const handleColumnSort = (sort_by:string, sort_order:string) => {
     setParams((prev) => ({
      ...prev,
      sort_by,
      sort_order,
      page: 1, // optional: reset page on new search/filter
    }));
  }

  const { data: properties, isLoading } = useFetchPropertyDetails(params);

  return (
    <div className=" px-3 sm:px-4 md:px-6 lg:px-0 w-full">
      <BackButton title="Your Properties" />
      <div>
        <section className="flex flex-row justify-center">
          <div className="mt-3 sm:mt-4 w-full flex justify-start">
            <SearchBar
              placeholder="Search for a property"
              buttonTitle="Find Property"
              onChange={(value) => handleSearchChange("search", value)}
              onSearchClick={(value) => handleSearchChange("search", value)}
            />
          </div>
          {/* <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-[12.71px] p-2 md:p-[6.35px] mt-2 rounded-[7.62px] ">
            <Dropdown
              options={["", "asc", "desc"]}
              placeholder="Filter"
              icon={<LocationIcon />}
              onChange={(value) => handleSearchChange("order", value)}
            />
            <Dropdown
              options={["", "Bungalow", "3-Storey", "Duplex", "Hall"]}
              placeholder="Property Type"
              icon={<PropertyTypeIcon />}
              onChange={(value) => handleSearchChange("property_type", value)}
            />
            <Dropdown
              options={["", "Occupied", "Not Occupied"]}
              placeholder="Occupant Status"
              icon={<OccupantStatusIcon />}
              onChange={(value) => handleSearchChange("occupant_status", value)}
            />
            <Dropdown
              options={["", "vacant", "not_vacant"]}
              placeholder="Property Status"
              icon={<PropertyStatusIcon />}
              onChange={(value) => handleSearchChange("property_status", value)}
            />
            <Dropdown
                options={["", "2024", "2025", "2001", "1992"]}
                placeholder="Build Year"
                icon={<BuildYearCalendarIcon />}
              />
          </div> */}
        </section>

        {/* <div className="flex flex-wrap my-5">
          <button
            className={`px-6 py-2 font-medium text-sm md:text-base ${
              activeTab === "property-list"
                ? "text-[#785DBA] border-b-2 border-[#785DBA]"
                : "text-gray-600 border-b-1 border-gray-200 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("property-list")}
          >
            Property List
          </button>
        </div> */}

        {activeTab === "property-list" && (
          <>
            {isMobile ? (
              <PropertyMobileCard properties={properties} />
            ) : (
              <section className="max-w-[98%] text-[#6E7079] rounded-2xl overflow-hidden shadow-md bg-white p-[1%] my-[2%]">
                <div
                  className={`flex ${
                    useColumnLayout ? "flex-col" : "flex-col lg:flex-row"
                  } gap-10 w-full`}
                  style={{ fontFamily: "Plus Jakarta Sans" }}
                >
                  <div className="mt-4 sm:mt-6 w-full">
                    <PropertiesListTable
                      properties={properties}
                      isLoading={isLoading}
                      handleSearch={handleSearchChange}
                      handleSort={handleColumnSort}
                    />
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        {activeTab === "maintenance-issues" && (
          <section className="max-w-[98%] text-[#0e0e0f] rounded-2xl overflow-hidden shadow-md bg-white p-[2%] my-[2%]">
            <div className="w-full">
              <IssuesListTable />
            </div>
          </section>
        )}

        {activeTab === "lease-expiration" && <LeaseExpirationTable />}
      </div>
    </div>
  );
};

export default PropertiesHome;
