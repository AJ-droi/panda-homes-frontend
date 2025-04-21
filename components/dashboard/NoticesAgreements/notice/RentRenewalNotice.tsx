import React from 'react';

export default function RentRenewalNotice() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4 md:p-8 text-[#000]">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8 w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Rent Renewal</h1>
          <button className="text-indigo-600 hover:text-indigo-800">Preview</button>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-gray-700">27th January 2025</p>
            
            <div className="space-y-1">
              <p className="font-medium">Ms. Stella Ayekomire</p>
              <p>Vier Apartments</p>
              <p>Kenneth Agbakuru Street</p>
              <p>Lekki Phase 1, Lagos State.</p>
            </div>
          </div>
          
          <div>
            <p>Dear Ms Ayekomire,</p>
          </div>
          
          <div>
            <h2 className="font-bold uppercase">Rent Renewal Offer</h2>
          </div>
          
          <div>
            <p className="text-sm md:text-base">
              This is to formally notify you that your tenancy over the one-bedroom apartment situate at Kenneth Agbakuru 
              Street, Lekki Phase I which you currently occupy expires on the 31st of January 2025. Following the expiry of 
              your tenancy, we hereby make you an offer to rent the apartment for another period upon the following terms:
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex flex-col md:flex-row">
              <div className="font-medium md:w-1/4">• Permitted Use:</div>
              <div className="md:w-3/4 text-sm md:text-base">
                Apartment is not permitted for any other use apart from residential use by the 
                Tenant. Any other use, commercial or otherwise is strictly prohibited.
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row">
              <div className="font-medium md:w-1/4">• Rent:</div>
              <div className="md:w-3/4">₦2,800,000</div>
            </div>
            
            <div className="flex flex-col md:flex-row">
              <div className="font-medium md:w-1/4">• Service Charge:</div>
              <div className="md:w-3/4">₦700,000</div>
            </div>
            
            <div className="flex flex-col md:flex-row">
              <div className="font-medium md:w-1/4">• Tenancy Term:</div>
              <div className="md:w-3/4">One Year Fixed</div>
            </div>
            
            <div className="flex flex-col md:flex-row">
              <div className="font-medium md:w-1/4">• Tenancy Expiry Date:</div>
              <div className="md:w-3/4">
                Commencing on the <span className="font-medium">1st of February 2025</span> and 
                Expiring on the <span className="font-medium">31st of January 2026</span>.
              </div>
            </div>
          </div>
          
          <div className="text-sm md:text-base">
            <p>
              Please make <span className="font-bold">ALL</span> payments on or before the due date of 31st of January 2025 into the company&apos;s account 
              provided below:
            </p>
          </div>
          
          <div className="space-y-1">
            <div className="flex">
              <div className="font-medium w-1/3">Account No:</div>
              <div>5401475004</div>
            </div>
            <div className="flex">
              <div className="font-medium w-1/3">Account Bank:</div>
              <div>Providus Bank</div>
            </div>
            <div className="flex">
              <div className="font-medium w-1/3">Account Name:</div>
              <div>Panda Homes Nigeria Limited</div>
            </div>
          </div>
          
          <div className="pt-4">
            <p>Yours faithfully,</p>
            <p className="font-medium mt-6">Olatunji Oginni</p>
            <p>Founder/CEO</p>
          </div>
          
          <div className="border-t pt-8 mt-8 text-center">
            <p>17 Ayinde Akinmade Street Lekki Phase 1, Lagos State</p>
            <a href="http://www.getpanda.ng" className="text-indigo-600 hover:text-indigo-800">www.getpanda.ng</a>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-6">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md">
          Send Notice
        </button>
      </div>
    </div>
  );
}