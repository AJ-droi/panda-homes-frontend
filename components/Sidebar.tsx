/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  SidebarHomeIcon,
  SidebarPropertiesIcon,
  // SidebarTenantsIcon,
  SidebarServiceRequestsIcon,
  SidebarNoticeAndAgreementIcon,
  BreadcrumbIcon,
  HomeActiveIcon,
  PropertyActiveIcon,
  // TenantActiveIcon,
  ServiceRequestsActiveIcon,
  SidebarNoticeAndAgreementActiveIcon,
  LogoutIcon,
  NavbarNotificationBell,
  NavbarSettingsIcon,
} from "@/layout/svgIconPaths";
import { useMatchMediaQuery } from "@/hooks/useViewPort";
import device from "@/constants/breakpoints";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import Image from 'next/image';

const Sidebar = () => {
  const pathname = usePathname();
  const isTabletOrSmaller = useMatchMediaQuery(device.tablet);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user_id");
    Cookies.remove("session");
    localStorage.clear();
    router.push("/login");
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isTabletOrSmaller &&
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        (!dropdownRef.current ||
          !dropdownRef.current.contains(event.target as Node))
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, isTabletOrSmaller]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = (path: string) => {
    router.push(path);
    setDropdownOpen(false);
  };

  function handleSwitchAccount() {
    const subtoken = localStorage.getItem("sub_account_token") as string;

    if(!subtoken){
      toast.error('No Tenant account is linked to this account')
      return;
    }
    // Replace token in cookies or localStorage
    Cookies.set("access_token", subtoken, {
      expires: 7, // days
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Update app state or trigger revalidation
    // setUser(subAccount); // or trigger SWR/NextAuth update
    router.push("/tenant-dashboard");
  }

  const iconData = [
    {
      name: "Overview",
      icon: <SidebarHomeIcon />,
      activeIcon: <HomeActiveIcon />,
      path: "/dashboard",
    },
    {
      name: "Properties",
      icon: <SidebarPropertiesIcon />,
      activeIcon: <PropertyActiveIcon />,
      path: "/dashboard/properties",
    },
    // {
    //   name: "Tenants",
    //   icon: <SidebarTenantsIcon />,
    //   activeIcon: <TenantActiveIcon />,
    //   path: "/dashboard/tenants",
    // },
    {
      name: "Service Requests",
      icon: <SidebarServiceRequestsIcon />,
      activeIcon: <ServiceRequestsActiveIcon />,
      path: "/dashboard/service-requests",
    },
    {
      name: "Notices & Agreements",
      icon: <SidebarNoticeAndAgreementIcon />,
      activeIcon: <SidebarNoticeAndAgreementActiveIcon />,
      path: "/dashboard/notice-agreement",
    },
    {
      name: "Switch To Tenant Account",
      icon: <Image src={'/switch.svg'} alt={""} width={50} height={50} />,
      // activeIcon: <SidebarNoticeAndAgreementActiveIcon />,
      onClick: handleSwitchAccount,
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
  };

  const Breadcrumb = () => {
    return (
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 w-full">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="mr-4">
            <BreadcrumbIcon />
          </button>
          <span className="font-medium text-[#785DBA] text-[16px] font-plus-jakarta">
            Hello Tunji
          </span>
        </div>
        <div
          className="gap-[24px] items-center justify-between flex relative"
          ref={dropdownRef}
        >
          <nav
            className="hover:cursor-pointer"
            onClick={() => router.push("/dashboard/notifications")}
          >
            <NavbarNotificationBell />
          </nav>
          <nav
            className="hover:cursor-pointer"
            onClick={() => router.push("/dashboard/settings")}
          >
            <NavbarSettingsIcon />
          </nav>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="text-sm font-[400] bg-gradient-to-r from-[#7942FB] to-[#B091F9] px-4 py-2 rounded-md flex items-center gap-2 text-white"
            >
              New <ChevronDown size={16} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50 font-[400] text-[#000]">
                <button
                  onClick={() => handleAction("/dashboard/add-tenant")}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                >
                  Add Tenant
                </button>
                <button
                  onClick={() => handleAction("/dashboard/add-property")}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                >
                  Add Property
                </button>
                <button
                  onClick={() => handleAction("/dashboard/notice-agreement")}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                >
                  Send Notice
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {isTabletOrSmaller && <Breadcrumb />}

      {isTabletOrSmaller && isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm shadow-xl bg-opacity-50 z-[1200]" />
      )}

      <div
        ref={sidebarRef}
        className={`
          fixed left-0 top-0 h-full bg-white border-r border-r-[#66666659] z-[1500]
          ${
            isTabletOrSmaller
              ? isOpen
                ? "translate-x-0"
                : "-translate-x-full"
              : "translate-x-0"
          }
          transform transition-transform duration-300 ease-in-out
          ${isTabletOrSmaller ? "w-64" : "w-[179px]"}
          ${isTabletOrSmaller ? "h-[calc(100%-60px)]" : "h-full"}
        `}
      >
        <div className="pt-6 flex flex-col gap-10 items-center h-full">
          {!isTabletOrSmaller && (
            <section className="w-[133px] p-0 h-[38px] hover:cursor-pointer">
              <Image
                src="/landingPage/logo.png"
                alt="Panda Logo"
                width={100}
                height={38}
                style={{ objectFit: "contain" }}
                priority
              />
            </section>
          )}

          <section className="flex flex-col gap-4 w-full">
            {iconData.map((item: any, index) => (
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
                  {pathname === item.path
                    ? item.activeIcon ?? item.icon
                    : item.icon}
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

export default Sidebar;
