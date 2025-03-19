/* eslint-disable */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { colors } from "@/constants/colors";
import {
  SidebarHomeIcon,
  SidebarPropertiesIcon,
  SidebarTenantsIcon,
  SidebarServiceRequestsIcon,
  SidebarNoticeAndAgreementIcon,
  SidebarReportsAnalyticsIcon,
  BreadcrumbIcon,
  HomeActiveIcon
} from "@/layout/svgIconPaths";
import { useMatchMediaQuery } from "@/hooks/useViewPort";
import device from "@/constants/breakpoints";

const Sidebar = ({ activePage = "Home" }) => {
  const isTabletOrSmaller = useMatchMediaQuery(device.tablet);
  const [isOpen, setIsOpen] = useState(false);

  const iconData = [
    {
      name: "Home",
      icon: <SidebarHomeIcon />,
      activeIcon: <HomeActiveIcon />,
      path: "/",
    },
    {
      name: "Properties",
      icon: <SidebarPropertiesIcon />,
      path: "/properties",
    },
    {
      name: "Tenants",
      icon: <SidebarTenantsIcon />,
      path: "/tenants",
    },
    {
      name: "Service Requests",
      icon: <SidebarServiceRequestsIcon />,
      path: "/service-requests",
    },
    {
      name: "Notices & Agreements",
      icon: <SidebarNoticeAndAgreementIcon />,
      path: "/notices-agreements",
    },
    {
      name: "Reports & Analytics",
      icon: <SidebarReportsAnalyticsIcon />,
      path: "/reports-analytics",
    },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const Breadcrumb = () => (
    <div className="flex items-center p-4 bg-white border-b border-gray-200">
      <button onClick={toggleSidebar} className="mr-4">
       <BreadcrumbIcon />
      </button>
      <span className="font-medium">{activePage}</span>
    </div>
  );

  return (
    <div>
      {isTabletOrSmaller && <Breadcrumb />}

      {isTabletOrSmaller && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`
          fixed left-0 top-0 h-full bg-white border-r border-r-[#66666659] z-40
          ${
            isTabletOrSmaller
              ? isOpen
                ? "translate-x-0"
                : "-translate-x-full"
              : "translate-x-0"
          }
          transform transition-transform duration-300 ease-in-out
          ${isTabletOrSmaller ? "w-64" : "w-[179px]"}
        `}
      >
        <div className="pt-6 flex flex-col gap-10 items-center min-h-screen">
          <section className="w-[133px] p-0 h-[38px] hover:cursor-pointer">
            <Image
              src="/landingPage/logo.png"
              alt="Panda Logo"
              width={133}
              height={38}
              style={{ objectFit: "contain" }}
              priority
            />
          </section>

          <section className="flex flex-col gap-8 w-full">
            {iconData.map((item, index) => (
              <nav
                key={index}
                className={`flex gap-4 items-center px-4 py-4 hover:bg-gray-100 cursor-pointer ${
                  activePage === item.name ? "border-r-2 border-r-[#785DBA]" : ""
                }`}
              >
                <div>{activePage === item.name ? item.activeIcon : item.icon}</div>
                <div className={`text-base ${
                  activePage === item.name ? "text-[#785DBA]" : "text-black"
                }`}>
                  {item.name}
                </div>
              </nav>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;