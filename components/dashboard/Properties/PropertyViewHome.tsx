"use client";
import React, { useState } from "react";
import Link from "next/link";
import RentalHistory from "./RentalHistory";
import PaymentRecords from "./PaymentRecords";
import ServiceRequest from "./ServiceRequest";
import NoticeAgreement from "./NoticeAgreement";
import PropertyView from "./PropertyView";

const PropertyViewHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState("property-overview");
  return (
    <div className="max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <div className="flex whitespace-nowrap">
          <button
            className={`px-6 py-4 font-medium text-sm md:text-base ${
              activeTab === "property-overview"
                ? "text-[#785DBA] border-b-2 border-[#785DBA]"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("property-overview")}
          >
            Property Overview
          </button>

          <button
            className={`px-6 py-4 font-medium text-sm md:text-base ${
              activeTab === "rental-history"
                ? "text-[#785DBA] border-b-2 border-[#785DBA]"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("rental-history")}
          >
            Rental History
          </button>

          <Link
            href="#"
            className="px-4 py-4 text-gray-500 hover:text-gray-700"
          >
            Property History
          </Link>

          <button
            className={`px-6 py-4 font-medium text-sm md:text-base ${
              activeTab === "payment-records"
                ? "text-[#785DBA] border-b-2 border-[#785DBA]"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("payment-records")}
          >
            Payment Records
          </button>

          <button
            className={`px-6 py-4 font-medium text-sm md:text-base ${
              activeTab === "service-request"
                ? "text-[#785DBA] border-b-2 border-[#785DBA]"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("service-request")}
          >
            Service Requests
          </button>

          <button
            className={`px-6 py-4 font-medium text-sm md:text-base ${
              activeTab === "notice-agreement"
                ? "text-[#785DBA] border-b-2 border-[#785DBA]"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("notice-agreement")}
          >
              Notices & Agreements
          </button>
        </div>
      </div>

      {/* Main Content */}
      {activeTab === "property-overview" && (
        <PropertyView />
      )}

      {activeTab === "rental-history" && <RentalHistory />}

      {activeTab === "payment-records" && <PaymentRecords />}

      {activeTab === "service-request" && <ServiceRequest />}

      {activeTab === "notice-agreement" && <NoticeAgreement />}
    </div>
  );
};

export default PropertyViewHome;
