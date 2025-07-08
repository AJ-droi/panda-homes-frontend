"use client";
import React, { useState } from "react";
// import RentalHistory from "./RentalHistory";
// import PaymentRecords from "./PaymentRecords";
// import ServiceRequest from "./ServiceRequest";
// import NoticeAgreement from "./NoticeAgreement";
import PropertyView from "./PropertyView";
// import PropertyHistory from "../PropertyHistory/PropertyHistoryTable";
import PropertyHistoryCard from "./PropertyHistoryCard";
import UploadDocument from "./UploadDocument";
// import BackButton from "@/components/Backbutton";


const PropertyViewHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState("property-overview");

  return (
    <div className="max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <div className="flex whitespace-nowrap">
          <button
            className={`px-6 py-4 font-medium text-sm md:text-base hover:cursor-pointer ${
              activeTab === "property-overview"
                ? "text-[#785DBA] border-b-2 border-[#785DBA]"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("property-overview")}
          >
            Property Overview
          </button>

          <button
            className={`px-6 py-4 font-medium text-sm md:text-base hover:cursor-pointer ${
              activeTab === "property-history"
                ? "text-[#785DBA] border-b-2 border-[#785DBA]"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("property-history")}
          >
            Property History
          </button>

          <button
            className={`px-6 py-4 font-medium text-sm md:text-base hover:cursor-pointer ${
              activeTab === "branding"
                ? "text-[#785DBA] border-b-2 border-[#785DBA]"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("branding")}
          >
            Upload Document
          </button>

        
        </div>
      </div>  


      {/* Main Content */}
      {activeTab === "property-overview" && (
        <PropertyView />
      )}

      {/* {activeTab === "rental-history" && <RentalHistory />} */}

      {activeTab === "property-history" && <PropertyHistoryCard/>}

       {activeTab === "branding" && <UploadDocument />}

      {/* {activeTab === "payment-records" && <PaymentRecords />}

      {activeTab === "service-request" && <ServiceRequest />}

      {activeTab === "notice-agreement" && <NoticeAgreement />} */}


    </div>
  );
};

export default PropertyViewHome;
