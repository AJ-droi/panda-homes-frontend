/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
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
  LogoutIcon,
  PropertyHistoryIcon,
  ActivePropertyHistoryIcon,
} from "@/layout/svgIconPaths";
import { useMatchMediaQuery } from "@/hooks/useViewPort";
import device from "@/constants/breakpoints";
import {
  NavbarActiveNotificationBell,
  NavbarActiveSettingsIcon,
  NavbarNotificationBell,
  NavbarSettingsIcon,
} from "@/layout/svgIconPaths";


const TenantSidebar = () => {
  const pathname = usePathname();
  const isTabletOrSmaller = useMatchMediaQuery(device.tablet);
  const [isOpen, setIsOpen] = useState(false);
  
  const [tenantDetails, setTenantDetails] = useState<any>({})
    
  useEffect(() => {
    const isClient = typeof window !== 'undefined';
    if (isClient) {
      const jsonTenantDetails = localStorage.getItem('tenant')
      if (jsonTenantDetails) {
        try {
          setTenantDetails(JSON.parse(jsonTenantDetails))
        } catch (error) {
          console.error('Failed to parse tenant details', error)
        }
      }
    }
  }, [])

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("tenant");
    router.push("/");
  };

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
      name: "Property History",
      icon: <PropertyHistoryIcon />,
      activeIcon: <ActivePropertyHistoryIcon />,
      path: "/tenant-dashboard/property-history",
    },
    {
      name: "Logout",
      icon: <LogoutIcon />,
      onClick: handleLogout,
    },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const redirect = (path: string) => {
    if (pathname !== path) {
      toggleSidebar();
      router.push(path);
    }
    if (isTabletOrSmaller) {
      toggleSidebar();
    }
    router.push(path);
  };

  const Breadcrumb = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [loadingPath, setLoadingPath] = useState<string | null>(null);
  
    const smallScreenIconData = [
      {
        name: "Settings",
        icon: <NavbarNotificationBell />,
        activeIcon: <NavbarActiveNotificationBell />,
        path: "/tenant-dashboard/notifications",
      },
      {
        name: "Notifications",
        icon: <NavbarSettingsIcon />,
        activeIcon: <NavbarActiveSettingsIcon />,
        path: "/tenant-dashboard/settings",
      },
    ];

    const redirect = async (path: string) => {
      if (pathname === path) return;
  
      setIsLoading(true);
      setLoadingPath(path);
  
      try {
        setTimeout(() => {
          router.push(path);
        }, 500);
      } catch (error) {
        console.error("Navigation error:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        setLoadingPath(null);
      }
    };

    // const activeItem = iconData.find((item) => item.path === pathname);
    return (
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-10 bg-white">
      <div className="flex items-center gap-2">
      <button onClick={toggleSidebar} className="flex items-center">
        <BreadcrumbIcon />
      </button>
      <span className="font-medium text-[#785DBA] text-[16px] font-plus-jakarta">
      Hello {tenantDetails?.first_name ? tenantDetails?.first_name : 'There'}
      </span>
      </div>
      <div className="gap-[24px] items-center justify-between flex">
        {smallScreenIconData.map((item) => (
          <div
            key={item.name}
            className={`hover:cursor-pointer ${
              isLoading && loadingPath === item.path
                ? "opacity-50 pointer-events-none"
                : ""
            }`}
            onClick={() =>
              !isLoading && loadingPath !== item.path && redirect(item.path)
            }
          >
            {pathname === item.path ? item.activeIcon : item.icon}
          </div>
        ))}
      </div>
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
            {iconData.map((item:any, index) => (
              <nav
                key={index}
                className={`flex gap-4 items-center px-4 py-4 hover:bg-gray-100 cursor-pointer ${
                  pathname === item.path ? "border-r-2 border-r-[#785DBA]" : ""
                }`}
                onClick={() => {
                  if (item.onClick) {
                    item.onClick();
                  } else if (item.path) {
                    redirect(item.path);
                  }
                }}
              >
                <div>
                  {pathname === item.path ? item.activeIcon ?? item.icon : item.icon}
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
    </div>
  );
};

export default TenantSidebar;