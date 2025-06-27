"use client";
/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
  useGetTenantProperty,
  useGetTenantRent,
} from "@/services/tenants/query";
import { differenceInDays } from "date-fns";
import BackButton from "@/components/Backbutton";

export default function MyTenancy() {
  const rentAmount = "1,500,000";
  const expiryDate = "October 15th, 2025";

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
  const { data: rentDetails, isLoading: isRentLoading } = useGetTenantRent(
    tenantDetails?.id
  );
  const leaseStart = new Date(rentDetails?.lease_start_date);
  const leaseEnd = new Date(rentDetails?.lease_end_date);
  const today = new Date();

  // Total lease duration
  const totalLeaseDays = differenceInDays(leaseEnd, leaseStart);

  // Days left
  const daysLeft = differenceInDays(leaseEnd, today);

  // Days elapsed
  const daysElapsed = differenceInDays(today, leaseStart);

  // Progress percentage
  const progressPercentage = Math.min(
    100,
    Math.max(0, (daysElapsed / totalLeaseDays) * 100)
  );
  // const { data:propertyHistoryData, isLoading: isPropertyHistoryDataLoading } = useGetPropertyHistory(tenantDetails?.property_id)

  const { data: tenantPropertyData, isLoading: isPropertyDataLoading } =
    useGetTenantProperty(tenantDetails?.property_id);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto py-5">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2 flex">
            <BackButton />
            <span>My Tenancy</span>
          </h1>
          <p className="text-gray-600">
            Everything you need to know about your tenancy.
          </p>
        </div>

        {/* Rent Status Card */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-700">
                Your rent of{" "}
                <span className="text-[#785DBA]font-semibold">
                  ₦{rentDetails?.rental_price}
                </span>{" "}
                is expiring on {new Date(rentDetails?.lease_end_date).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-500">
                {daysLeft} days left
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-[#785DBA] h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Lease Information Card */}
        <div className="grid md:grid-cols-2 gap-x-2 gap-y-2">
          <div className="bg-[#fff] rounded-md">
            <h3 className="text-[#1B2559] border-b-[#66666659] py-3 border-b-1 px-2">
              Property Description
            </h3>
            <p className="text-[#1B2559] font-[400] py-3 px-2 text-[14px]">
              {rentDetails?.property?.description}
            </p>
          </div>
          <div className="bg-[#fff] rounded-md">
            <h3 className="text-[#1B2559] border-b-[#66666659] py-3 border-b-1 px-2">
              Tenancy Term
            </h3>
            <ul className="text-[#1B2559] font-[400] py-3 px-2 text-[14px] space-y-3 ">
              <li>
                Starts:{" "}
                {new Date(rentDetails?.lease_start_date).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
              </li>
              <li>
                Ends:{" "}
                {new Date(rentDetails?.lease_end_date).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
              </li>
            </ul>
          </div>

          <div className="bg-[#fff] rounded-md">
            <h3 className="text-[#1B2559] border-b-[#66666659] py-3 border-b-1 px-2">
              Rent & Deposits
            </h3>
            <ul className="text-[#1B2559] font-[400] py-3 px-2 text-[14px] space-y-3 ">
              <li>
                Rent: ₦
                {Number(rentDetails?.rental_price).toLocaleString("en-NG") || 0}{" "}
              </li>
              <li>
                {" "}
                Security Deposit: ₦
                {Number(rentDetails?.security_deposit).toLocaleString(
                  "en-NG"
                ) || 0}
              </li>
              <li>
                {" "}
                Caution Fee: ₦
                {Number(rentDetails?.service_charge).toLocaleString("en-NG") ||
                  0}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
