"use client"
import React from 'react';
import { Download } from 'lucide-react';

export default function MyTenancy() {
  const rentAmount = "1,500,000";
  const expiryDate = "October 15th, 2025";
  const daysLeft = 20;
  
  // Calculate progress percentage (assuming lease started some time ago)
  const progressPercentage = 75; // This would be calculated based on actual dates

  const handleDownloadLease = () => {
    console.log("Downloading lease agreement...");
    // In a real app, this would trigger a file download
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">My Tenancy</h1>
          <p className="text-gray-600">Everything you need to know about your tenancy.</p>
        </div>

        {/* Rent Status Card */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-700">
                Your rent of <span className="text-[#785DBA]font-semibold">₦{rentAmount}</span> is expiring in {expiryDate}
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-500">{daysLeft} days left</span>
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
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Lease Information</h2>
          
          <p className="text-gray-600 mb-6">
            This is a 2-bedroom apartment located within Palm Grove Apartments. It includes a living area, kitchen, bathroom, and access to shared amenities provided within the compound.
          </p>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Permitted Use:</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Apartment is permitted for mixed use. Residential and commercial use (atelier + showroom). However, exterior areas should be maintained in a residential manner save for a logo which is permitted at the entrance of the door. Other use apart from those expressly permitted is strictly prohibited.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Rent:</span>
                  <span className="text-sm text-gray-900">₦{rentAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Security Deposit:</span>
                  <span className="text-sm text-gray-900">₦1,000,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Security Deposit:</span>
                  <span className="text-sm text-gray-900">₦1,000,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Caution:</span>
                  <span className="text-sm text-gray-900">₦1,300,000</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tenancy Term:</span>
                  <span className="text-sm text-gray-900">One Year Fixed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tenancy Period:</span>
                  <span className="text-sm text-gray-900">Commencing 14 days from the date of payment</span>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Terms of Occupancy:</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>(1) Noisy generators are prohibited but you may install an inverter for your apartment.</p>
                  <p>(2) Pets are not permitted within the common areas and must always be kept within your apartment.</p>
                  <p>(3) You are not to cause to be done or permit any act or conduct within the premises that is illegal or may be considered a nuisance.</p>
                  <p>(4) You are not permitted to sublet and/or transfer your tenancy to any other person or entity.</p>
                  <p>(5) Failure to abide by any of the above terms may lead to disconnection from services, termination of your tenancy and/or eviction from the apartment.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={handleDownloadLease}
              className="bg-[#785DBA] hover:[#785DBA] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Lease Agreement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}