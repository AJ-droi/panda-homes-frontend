"use client"
/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TenantHome() {
    const router = useRouter()
  const serviceCards = [
    {
      title: "New Service Request",
      description: "Report a maintenance issue or request repairs.",
      icon: <ArrowRight className="w-5 h-5 text-[#444D61]" />,
      action: () =>{router.push('/tenant-dashboard/service-requests')}
    },
    {
      title: "View Tenancy",
      description: "See your rent details, lease, and payment history.",
      icon: <ArrowRight className="w-5 h-5 text-[#444D61]" />,
      action: () => {router.push('/tenant-dashboard/tenancy')}
    },
    {
      title: "View Documents",
      description: "Access your lease agreement, notices, and uploads.",
      icon: <ArrowRight className="w-5 h-5 text-[#444D61]" />,
      action: () => {router.push('/tenant-dashboard/notice-agreement')}
    },
    {
      title: "Contact Us",
      description: "Need help? Reach out to Us.",
      icon: <ArrowRight className="w-5 h-5 text-[#444D61]" />,
      action: () => {router.push('#')},
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-light text-gray-900 mb-2">Hello {tenantDetails?.first_name},</h1>
          <p className="text-xl text-gray-600">What would you like to do today?</p>
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