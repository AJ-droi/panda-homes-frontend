"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  SidebarHomeIcon,
  SidebarPropertiesIcon,
  SidebarTenantsIcon,
  SidebarServiceRequestsIcon,
  SidebarNoticeAndAgreementIcon,
  BreadcrumbIcon,
  HomeActiveIcon,
  PropertyActiveIcon,
  TenantActiveIcon,
  ServiceRequestsActiveIcon,
  SidebarNoticeAndAgreementActiveIcon,
} from "@/layout/svgIconPaths";
import { useMatchMediaQuery } from "@/hooks/useViewPort";
import device from "@/constants/breakpoints";
import Loading from "../Loading";

const TenantSidebar = () => {
  const pathname = usePathname();
  const isTabletOrSmaller = useMatchMediaQuery(device.tablet);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const iconData = [
    {
      name: "Home",
      icon: <SidebarHomeIcon />,
      activeIcon: <HomeActiveIcon />,
      path: "/dashboard",
    },
    {
      name: "Properties",
      icon: <SidebarPropertiesIcon />,
      activeIcon: <PropertyActiveIcon />,
      path: "/properties",
    },
    {
      name: "Tenants",
      icon: <SidebarTenantsIcon />,
      activeIcon: <TenantActiveIcon />,
      path: "/tenants",
    },
    {
      name: "Service Requests",
      icon: <SidebarServiceRequestsIcon />,
      activeIcon: <ServiceRequestsActiveIcon />,
      path: "/service-requests",
    },
    {
      name: "Notices & Agreements",
      icon: <SidebarNoticeAndAgreementIcon />,
      activeIcon: <SidebarNoticeAndAgreementActiveIcon />,
      path: "/notices-agreements",
    },
    {
      name: "Property History",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#000000">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
     activeIcon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#785DBA">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
   </svg>,
      path: "/dashboard/property-history",
    },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const redirect = (path: string) => {
    if (pathname === path) {
      return;
    }
    setIsLoading(true);

    setTimeout(() => {
      router.push(path);
    }, 500);
  };

  const Breadcrumb = () => {
    const activeItem = iconData.find((item) => item.path === pathname);
    return (
      <div className="flex items-center p-4 bg-white border-b border-gray-200 ">
        <button onClick={toggleSidebar} className="mr-4">
          <BreadcrumbIcon />
        </button>
        <span className="font-medium text-black font-plus-jakarta">
          {activeItem?.name || "Home"}
        </span>
      </div>
    );
  };

  return (
    <div>
      {isTabletOrSmaller && <Breadcrumb />}

      {isTabletOrSmaller && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm shadow-xl bg-opacity-50 z-30"
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

          <section className="flex flex-col gap-4 w-full">
            {iconData.map((item, index) => (
              <nav
                key={index}
                className={`flex gap-4 items-center px-4 py-4 hover:bg-gray-100 cursor-pointer ${
                  pathname === item.path ? "border-r-2 border-r-[#785DBA]" : ""
                }`}
                onClick={() => {
                  if (item.path) {
                    redirect(item.path);
                  }
                }}
              >
                <div>
                  {pathname === item.path ? item.activeIcon : item.icon}
                </div>
                <div
                  className={`text-base font-plus-jakarta ${
                    pathname === item.path ? "text-[#785DBA]" : "text-black"
                  }`}
                >
                  {item.name}
                </div>
              </nav>
            ))}
          </section>

          <button
            className="text-sm font-[400] bg-gradient-to-r from-[#7942FB] to-[#B091F9] p-2 rounded-md w-[90%]"
            onClick={() => router.push("/dashboard/add-property")}
          >
            Add New Property
          </button>

          <button
            className="text-sm font-[400] bg-gradient-to-r from-[#7942FB] to-[#B091F9] p-2 rounded-md w-[90%]"
            onClick={() => router.push("/dashboard/add-tenant")}
          >
           Register New Tenant
          </button>
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default TenantSidebar;
