"use client";
import React, { useState } from "react";
import PropertyDescriptionCard from "@/components/tenantsSection/PropertyDescriptionCard";
import TenantServiceRequestCard from "@/components/tenantsSection/ServiceRequestCard";
import RentCountdown from "@/components/tenantsSection/RentExpiryProgressBar";
import PropertyHistoryCard from "@/components/tenantsSection/PropertyHistoryCard";
import TenantServiceRequestForm from "@/components/tenantsSection/TenantServiceRequestForm";
import ColouredButton from "@/components/ColouredButton";

const TenantDashboard = () => {
  const [propertyHistory, setPropertyHistory] = useState(false);
  const [newServiceRequest, setNewServiceRequest] = useState(false);
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
                $1,250,000
              </div>
            </div>
          </section>

          <section className="mt-6 md:mt-10">
            <div
              className="font-[600] text-[#666666] text-[20px] md:text-[24px] leading-[150%]"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Seaside Serenity Villa
            </div>
            <div className="mt-6 md:mt-10 max-w-[823.611328125px]">
              <RentCountdown expirationDate={"2025-12-05T15:30:00.000Z"} />
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
