"use client";
/*eslint-disable */
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { termsData } from "@/data/termsData";
import BackButton from "./Backbutton";
import Image from "next/image";

const TermsAndConditions = () => {
  const [expandedSections, setExpandedSections] = useState<any>({});

  const toggleSection = (index: any) => {
    setExpandedSections((prev: any) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Image
              src="/landingPage/logo.svg"
              alt="Panda Logo"
              width={80}
              height={38}
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <BackButton />
              <h1 className="text-xl font-semibold text-gray-800">
                Terms of Service
              </h1>
            </div>

            {/* Introduction Text */}
            <div className="mb-8 text-gray-600 text-sm leading-relaxed">
              <p className="mb-4">
                Please read these Terms of Service ("Terms") carefully as they
                contain important information about your legal rights, remedies
                and obligations. By accessing or using this site, you ("User")
                agree to comply with and be bound by these Terms.
              </p>
              <p className="mb-4">
                These Terms set forth the legally binding agreement governing
                your access to and use of the getpanda.co website ("The Site"),
                including any subdomains thereof, and any other websites through
                which Panda Homes Nigeria Limited makes its software and
                applications, and API (collectively, "Application") and all
                associated services (collectively, "Panda Services") available.
                The Site, Application and Panda Services are hereinafter
                collectively referred to as the "Panda Platform".
              </p>
              <p>
                When these Terms mention "Provider", "Panda" "we," "us," or
                "our," it refers to the Panda Homes Nigeria Limited or any of
                its affiliated companies you are contracting with. Your
                contracting entity will generally be determined based on your
                country of residence or establishment. The Provider also
                reserves the right to transfer the benefit of this Agreement and
                any obligations under it at any time, provided that notice of
                such transfer shall be given to you.
              </p>
            </div>

            {/* Definitions Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                1. DEFINITION
              </h2>
              <div className="text-sm text-gray-600 leading-relaxed">
                <p className="mb-4">
                  In these Terms, unless the context otherwise requires, the
                  following expressions have the following meanings:
                </p>
                <div className="space-y-2">
                  <p>
                    "Business Day" means any day on which banks are open for
                    business in Lagos State, Nigeria excluding Saturdays,
                    Sundays and public holidays in Lagos State.
                  </p>
                  <p>
                    "Provider" means Panda Homes Nigeria Limited, or any of our
                    affiliated companies, trading under the name and style of
                    "Panda".
                  </p>
                  <p>
                    "Panda Platform" means the services operated by the Provider
                    via the Site.
                  </p>
                  <p>
                    Users means users of the Panda Platform, including Tenants,
                    Property Managers and Landlords.
                  </p>
                  <p>
                    References to writing shall include electronic notification
                    via approved channels as provided by the Provider for Users
                    on the Panda Platform.
                  </p>
                </div>
              </div>
            </div>

            {/* General Terms Section */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                2. GENERAL TERMS
              </h2>
            </div>

            {/* Accordion Sections */}
            <div className="space-y-1">
              {termsData.map((section, index) => (
                <div
                  key={section.id}
                  className="border-2 border-[#efefef] rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleSection(index)}
                    className="w-full px-4 py-3 bg-white hover:bg-gray-50 flex items-center justify-between text-left transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-500">
                        {section.id}
                      </span>
                      <span className="text-sm font-medium text-gray-800">
                        {section.title}
                      </span>
                    </div>
                    {expandedSections[index] ? (
                      <Minus className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Plus className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  {expandedSections[index] && (
                    <div className="px-4 pb-4 bg-gray-50 border-t border-gray-200">
                      <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                        {section.content}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
