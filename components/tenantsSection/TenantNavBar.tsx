
"use client";
import React, { useEffect, useState } from "react";
import {
  NavbarActiveNotificationBell,
  NavbarActiveSettingsIcon,
  NavbarNotificationBell,
  NavbarSettingsIcon,
} from "@/layout/svgIconPaths";
import { usePathname, useRouter } from "next/navigation";
import { useMatchMediaQuery } from "@/hooks/useViewPort";
import device from "@/constants/breakpoints";

interface TenantNavbarProps {
  isTenantRegister?: boolean;
}

const TenantNavbar: React.FC<TenantNavbarProps> = ({ isTenantRegister }) => {
  // const [tenantDetails, setTenantDetails] = useState<any>({})
  const isTabletOrSmaller = useMatchMediaQuery(device.tablet);
  
  useEffect(() => {
    const isClient = typeof window !== 'undefined';
    if (isClient) {
      const jsonTenantDetails = localStorage.getItem('tenant')
      if (jsonTenantDetails) {
        try {
          // setTenantDetails(JSON.parse(jsonTenantDetails))
        } catch (error) {
          console.error('Failed to parse tenant details', error)
        }
      }
    }
  }, [])

  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPath, setLoadingPath] = useState<string | null>(null);

  const iconData = [
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

  if (isTabletOrSmaller) {
    return null;
  }

  return (
    <div className="bg-white flex text-[#785DBA] text-[22px] leading-[145%] font-[700] px-4 sm:px-6 md:px-8 lg:px-20 h-[76px] border-b border-[#66666659] shadow-lg justify-end items-center w-full">
      {/* <div>Hello {tenantDetails?.first_name ? tenantDetails?.first_name : 'There'}</div> */}
      {!isTenantRegister && (
        <div className="gap-[24px] items-center justify-between flex">
          {iconData.map((item) => (
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
      )}

      {/* {isLoading && <Loading />} */}
    </div>
  );
};

export default TenantNavbar;