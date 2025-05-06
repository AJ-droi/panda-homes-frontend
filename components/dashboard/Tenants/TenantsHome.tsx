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
import { UserFilter } from "@/services/interface/filter";

const TenantsHome = () => {
  const [useColumnLayout, setUseColumnLayout] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState("tenant-list");

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

  const [params, setParams] = useState<UserFilter>({
    search: "",
    first_name: "",
    last_name: "",
    email: "",
    creator_id: "",
    phone_number: "",
    role: "",
    start_date: "",
    end_date: "",
    size: 10,
    page: 1,
  });

  const handleSearchChange = (key: keyof typeof params, value: string) => {
    setParams((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // optional: reset page on new search/filter
    }));
  };
  return (
    <div className="bg-[#fafafe] px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 w-full overflow-x-hidden">
      <div>
        <section className="flex flex-col justify-center">
          <div className="mt-3 sm:mt-4 w-full flex justify-center">
            <SearchBar
              placeholder="Search by tenant name, apartment, or phone number"
              onChange={(value) => handleSearchChange("search", value)}
            />
          </div>
          {activeTab === "overdue-payment" && (
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
          )}
        </section>

        <div className="flex flex-wrap my-5">
          <button
            className={`px-6 py-4 font-medium text-sm md:text-base ${
              activeTab === "tenant-list"
                ? "text-[#785DBA] border-b-2 border-[#785DBA]"
                : "text-gray-600 border-b-1 border-gray-200 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("tenant-list")}
          >
            Tenants List
          </button>
          <button
            className={`px-6 py-4 font-medium text-sm md:text-base ${
              activeTab === "overdue-payment"
                ? "text-[#785DBA] border-b-2 border-[#785DBA]"
                : "text-gray-600 border-b-1 border-gray-200 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("overdue-payment")}
          >
            OverDue Payments
          </button>
        </div>

        <section className="w-full xl:w-[65%] flex flex-col gap-y-5">
          {activeTab === "tenant-list" && (
            <section className="max-w-[98%] text-[#6E7079] rounded-2xl overflow-hidden shadow-md bg-white p-[2%] ">
              <div className="mt-3 sm:mt-4 md:mt-5 w-full">
                <TenantsListTable params={params} />
              </div>
            </section>
          )}

          {activeTab === "overdue-payment" && (
            <section className="max-w-[98%] text-[#6E7079] rounded-2xl overflow-hidden shadow-md bg-white p-[2%] ">
              <div className="mt-3 sm:mt-4 md:mt-5 w-full">
                <OverdueRentsTable />
              </div>
            </section>
          )}
        </section>
      </div>
    </div>
  );
};

export default TenantsHome;
