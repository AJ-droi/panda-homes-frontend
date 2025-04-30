"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  SidebarHomeIcon,
  SidebarServiceRequestsIcon,
  SidebarNoticeAndAgreementIcon,
  BreadcrumbIcon,
  HomeActiveIcon,
  ServiceRequestsActiveIcon,
  SidebarNoticeAndAgreementActiveIcon,
  LogoutIcon
} from "@/layout/svgIconPaths";
import { useMatchMediaQuery } from "@/hooks/useViewPort";
import device from "@/constants/breakpoints";

const TenantSidebar = () => {
  const pathname = usePathname();
  const isTabletOrSmaller = useMatchMediaQuery(device.tablet);
  const [isOpen, setIsOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  //  const [loadingPath, setLoadingPath] = useState<string | null>(null);
  

  const router = useRouter();

  const iconData = [
    {
      name: "Home",
      icon: <SidebarHomeIcon />,
      activeIcon: <HomeActiveIcon />,
      path: "/tenant-dashboard",
    },
    {
      name: "Service Requests",
      icon: <SidebarServiceRequestsIcon />,
      activeIcon: <ServiceRequestsActiveIcon />,
      path: "/tenant-dashboard/service-requests",
    },
    {
      name: "Notices & Agreements",
      icon: <SidebarNoticeAndAgreementIcon />,
      activeIcon: <SidebarNoticeAndAgreementActiveIcon />,
      path: "/tenant-dashboard/notice-agreement",
    },
    {
      name: "Logout",
      icon: <LogoutIcon />,
      path: "/"
    }
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const redirect = (path: string) => {
    if (pathname === path) {
      return;
    }
    // setIsLoading(true);
    toggleSidebar()
    router.push(path);
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
                    if(item.path === '/'){
                      localStorage.removeItem('tenant')
                    }
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
        </div>
      </div>
      {/* {isLoading && <Loading />} */}
    </div>
  );
};

export default TenantSidebar;
