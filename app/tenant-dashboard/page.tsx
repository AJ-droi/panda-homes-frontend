"use client"
/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TenantHome() {
    const router = useRouter()
  const serviceCards = [
    {
      title: "Service Request",
      description: "Request for repairs or Track your current service requests and chat with support.",
      icon: <ArrowRight className="w-5 h-5 text-[#444D61]" />,
      action: () =>{router.push('/tenant-dashboard/service-requests')}
    },
    {
      title: "View Tenancy",
      description: "See your lease terms, rent amount, tenancy period, and usage policy.",
      icon: <ArrowRight className="w-5 h-5 text-[#444D61]" />,
      action: () => {router.push('/tenant-dashboard/tenancy')}
    },
     {
      title: "Billing & Payments",
      description: "Track your rent, see past payments, and pay bills.",
      icon: <ArrowRight className="w-5 h-5 text-[#444D61]" />,
      action: () => {router.push('#')}
    },
    {
      title: "Documents",
      description: "Access your tenancy agreement, rent notices, and important files.",
      icon: <ArrowRight className="w-5 h-5 text-[#444D61]" />,
      action: () => {router.push('/tenant-dashboard/notice-agreement')}
    },
    {
      title: "Contact Us",
      description: "Have questions? Reach out to our team directly.",
      icon: <ArrowRight className="w-5 h-5 text-[#444D61]" />,
      action: () => {router.push('/tenant-dashboard/contact-us')},
      fullWidth: true
    }
  ];

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto py-5">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Hello {tenantDetails?.first_name},</h1>
          <p className="text-2xl text-gray-600">What would you like to do today?</p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceCards.map((card, index) => (
            <div
              key={index}
              className={`
                bg-white border-1 border-[#E2E2E2] rounded-lg p-6 cursor-pointer
                hover:bg-blue-50 transition-colors duration-200
                ${card.fullWidth ? 'md:col-span-1' : ''}
                ${index === 3 ? 'md:col-start-1' : ''}
              `}
              onClick={card.action}
            >
              <div className="flex flex-col ">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {card.description}
                  </p>
                </div>
                <div className=" text-gray-400 hover:text-blue-500 transition-colors flex justify-end w-full">
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional spacing for better visual balance */}
        <div className="mt-12"></div>
      </div>
    </div>
  );
}