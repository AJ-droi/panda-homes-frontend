"use client";
/*eslint-disable */
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { termsData } from "@/data/termsData";
import BackButton from "./Backbutton";
import Image from "next/image";

const PrivacyPolicy = () => {
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
                Privacy Policy
              </h1>
            </div>

            {/* Introduction Text */}
            <div className="mb-8 text-gray-600 text-sm leading-relaxed">
 

              <p className="mb-4">
                    This privacy policy has been compiled to better serve those who are concerned with how their 'Personal Data' is being used on the Site. “Personal Data” means any information relating to an identified or identifiable natural person; It can be anything from a name, address, a photo, an email address, bank details, posts on social networking websites, medical information, and other unique identifiers.

              </p>
              <p className="mb-4">
               We believe you should always know what data we collect from you, how we use it, and that you should have meaningful control over both. We want to empower you to make the best decisions about the information that you share with us. That is the basic purpose of this Privacy Policy.
We encourage you to review the Privacy Policy whenever you interact with us to stay informed about our information practices and the ways you can help protect your privacy.
              </p>
             
            </div>

        

            {/* Accordion Sections */}
            {/* <div className="space-y-1">
              {termsData.map((section, index) => (
                <div
                  key={section.id}
                  className="border-2 border-[#efefef] rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleSection(index)}
                    className="w-full px-4 py-3 bg-white hover:bg-gray-50 flex items-center justify-between text-left transition-colors hover:cursor-pointer"
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

