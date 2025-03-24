/* eslint-disable */
import React from "react";
import { useMatchMediaQuery } from "@/hooks/useViewPort";
import device from "@/constants/breakpoints";

const NoticesHomeNav = () => {
  const isMobile = useMatchMediaQuery(device.mobile);
  const isTablet = useMatchMediaQuery(device.laptop);

  const getLayoutType = () => {
    if (isMobile) return "mobile";
    if (isTablet) return "tablet";
    return "desktop";
  };

  const layoutType = getLayoutType();

  const navItems = [
    {
      text: "Total Notices Sent (This Month):",
      data: "12 Notices",
    },
    {
      text: "Acknowledged Notices:",
      data: "8 Tenants Confirmed",
    },
    {
      text: "Upcoming Lease Expirations:",
      data: "5 Tenants in 30 Days",
    },
  ];

  if (layoutType === "mobile") {
    return (
      <div className="bg-white rounded-2xl shadow-lg shadow-[#0000001A] divide-y divide-[#E3E3E3]">
        {navItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3 p-4">
            <div
              className="text-black text-sm font-[700] leading-[100%]"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              {item.text} <span className="text-[#785DBA]">{item.data}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (layoutType === "tablet") {
    return (
      <div className="grid grid-cols-2 bg-white rounded-2xl shadow-lg shadow-[#0000001A]">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 p-4 ${
              index % 2 === 0 ? "border-r border-[#E3E3E3]" : ""
            } ${index < 2 ? "border-b border-[#E3E3E3]" : ""}`}
          >
            <div
              className="text-black text-sm font-[700] leading-[100%]"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              {item.text} <span className="text-[#785DBA]">{item.data}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white py-6 rounded-2xl shadow-lg shadow-[#0000001A] flex flex-wrap lg:flex-nowrap text-[#785DBA] w-full">
      {navItems.map((item, index) => (
        <div
          key={index}
          className={`flex items-center gap-3 px-4 py-6 flex-1 ${
            index < navItems.length - 1 ? "border-r border-[#E3E3E3]" : ""
          }`}
        >
          <div
            className="text-black text-sm md:text-base font-[700] leading-[100%]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            {item.text} <span className="text-[#785DBA]">{item.data}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoticesHomeNav;
