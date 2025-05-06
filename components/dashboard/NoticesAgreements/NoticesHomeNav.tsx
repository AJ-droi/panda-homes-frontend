/*eslint-disable */
import React from "react";
import { useMatchMediaQuery } from "@/hooks/useViewPort";
import device from "@/constants/breakpoints";
import { useNoticeAnalytics } from "@/services/notice-agreement/query";

const NoticesHomeNav = () => {
  const isMobile = useMatchMediaQuery(device.mobile);
  const isTablet = useMatchMediaQuery(device.laptop);

  const getLayoutType = () => {
    if (isMobile) return "mobile";
    if (isTablet) return "tablet";
    return "desktop";
  };

  const layoutType = getLayoutType();

  const {data}= useNoticeAnalytics()

  console.log({data})

  const navItems = [
    {
      text: "Total Notices Sent:",
      data: (data as any)?.totalNotices || 0,
    },
    {
      text: "Acknowledged Notices:",
      data: (data as any)?.acknowledgedNotices || 0,
    },
    {
      text: "Unacknowledged Notices:",
      data:(data as any)?.unacknowledgedNotices || 0,
    },
  ];

  if (layoutType === "mobile") {
    return (
      <div className="bg-white rounded-2xl shadow-md shadow-[#C2C2C229] divide-y divide-[#E3E3E3]">
        {navItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3 p-4">
            <div
              className="text-black text-sm font-[500] leading-[100%]"
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
      <div className="grid grid-cols-2 bg-white rounded-2xl shadow-md shadow-[#C2C2C229]">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 p-4 ${
              index % 2 === 0 ? "border-r border-[#E3E3E3]" : ""
            } ${index < 2 ? "border-b border-[#E3E3E3]" : ""}`}
          >
            <div
              className="text-black text-sm font-[500] leading-[100%]"
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
    <div className="bg-white py-6 rounded-2xl shadow-md shadow-[#C2C2C229] flex flex-wrap lg:flex-nowrap text-[#785DBA] w-full">
      {navItems.map((item, index) => (
        <div
          key={index}
          className={`flex items-center gap-3 px-4 py-6 flex-1 ${
            index < navItems.length - 1 ? "border-r border-[#E3E3E3]" : ""
          }`}
        >
          <div
            className="text-black text-sm md:text-base font-[500] leading-[100%]"
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
