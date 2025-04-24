import React from "react";
import {
  DashboardNavProperties,
  DashboardNavComplaints,
  DashboardNavTenantRenting,
  DashboardNavTenantDue,
} from "@/layout/svgIconPaths";
import { useMatchMediaQuery } from "@/hooks/useViewPort";
import device from "@/constants/breakpoints";
import { useAdminDashboardAnalytics } from "@/services/property/query";


const DashboardHomeNav = () => {
  const isMobile = useMatchMediaQuery(device.mobile);
  const isTablet = useMatchMediaQuery(device.laptop);

  const getLayoutType = () => {
    if (isMobile) return "mobile";
    if (isTablet) return "tablet";
    return "desktop";
  };

  const layoutType = getLayoutType();
  const {data} = useAdminDashboardAnalytics()

 const {total_properties, total_tenants, unresolved_requests, due_tenants} = data || {}

  const navItems = [
    {
      icon: <DashboardNavProperties />,
      text: `${total_properties || 0} Properties Managed`,
    },
    {
      icon: <DashboardNavTenantRenting />,
      text: `${total_tenants || 0} Tenants Currently Renting`,
    },
    {
      icon: <DashboardNavTenantDue />,
      text: `${due_tenants || 0} Tenants with Rent Due in 7 Days `,
    },
    {
      icon: <DashboardNavComplaints />,
      text: `${unresolved_requests || 0} Unresolved Complaints`,
    },
  ];

  if (layoutType === "mobile") {
    return (
      <div className="bg-white rounded-2xl shadow-lg shadow-[#0000001A] divide-y divide-[#E3E3E3]">
        {navItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3 p-4">
            <div className="text-[#785DBA]">{item.icon}</div>
            <div className="text-black text-sm font-normal leading-tight">
              {item.text}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (layoutType === "tablet") {
    return (
      <div className="grid grid-cols-2 bg-white rounded-2xl shadow-md shadow-[#CFD3D45C]">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 p-4 ${
              index % 2 === 0 ? "border-r border-[#E3E3E3]" : ""
            } ${index < 2 ? "border-b border-[#E3E3E3]" : ""}`}
          >
            <div className="text-[#785DBA]">{item.icon}</div>
            <div className="text-[#545454] text-sm font-normal leading-tight">
              {item.text}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white py-6 rounded-2xl shadow-md shadow-[#CFD3D45C] flex flex-wrap lg:flex-nowrap text-[#785DBA] w-full">
      {navItems.map((item, index) => (
        <div
          key={index}
          className={`flex items-center gap-3 px-4 py-6 flex-1 ${
            index < navItems.length - 1 ? "border-r border-[#E3E3E3]" : ""
          }`}
        >
          <div>{item.icon}</div>
          <div className="text-[#545454] text-sm md:text-sm font-normal leading-tight">
            {item.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardHomeNav;
