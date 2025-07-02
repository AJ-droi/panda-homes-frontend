"use client";
/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
// import {
//   NavbarActiveNotificationBell,
//   NavbarActiveSettingsIcon,
//   NavbarNotificationBell,
//   NavbarSettingsIcon,
// } from "@/layout/svgIconPaths";
import { usePathname, useRouter } from "next/navigation";
import { useMatchMediaQuery } from "@/hooks/useViewPort";
import device from "@/constants/breakpoints";
import Image from "next/image";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { toSentenceCase } from "@/utilities/utilities";

interface TenantNavbarProps {
  isTenantRegister?: boolean;
}

const TenantNavbar: React.FC<TenantNavbarProps> = ({ isTenantRegister }) => {
  const [tenantDetails, setTenantDetails] = useState<any>({});
  const isTabletOrSmaller = useMatchMediaQuery(device.tablet);
  const [parentoken, setParentToken] = useState<any>("");
    const [subtoken, setSubToken] = useState<any>("");

  useEffect(() => {
    const isClient = typeof window !== "undefined";
    if (isClient) {
      const jsonTenantDetails = localStorage.getItem("tenant") as any
      const parentokenDetail = localStorage.getItem("parent_token") as string;
        const subtokenDetail = localStorage.getItem("sub_account_token") as string;
        console.log({subtokenDetail})
      if (jsonTenantDetails || parentokenDetail || subtokenDetail) {
        try {
          setParentToken(parentokenDetail);
          setTenantDetails(JSON.parse(jsonTenantDetails));
           setSubToken(subtokenDetail)
        } catch (error) {
          console.error("Failed to parse tenant details", error);
        }
      }
    }
  }, []);

  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.clear()
    router.push("/");
  };

  function handleSwitchAccount() {
    let access_token = localStorage.getItem("access_token") as string;
    if ((!parentoken || parentoken == "null") && !subtoken) {
      toast.error("No Admin account is linked to this account");
      return;
    }
    // Replace token in cookies or localStorage
    localStorage.setItem("sub_account_token", access_token);
    localStorage.setItem("access_token", parentoken);

    // Update app state or trigger revalidation
    // setUser(subAccount); // or trigger SWR/NextAuth update
    router.push("/dashboard");
  }
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPath, setLoadingPath] = useState<string | null>(null);

  // const iconData = [
  //   {
  //     name: "Settings",
  //     icon: <NavbarNotificationBell />,
  //     activeIcon: <NavbarActiveNotificationBell />,
  //     path: "/tenant-dashboard/notifications",
  //   },
  //   {
  //     name: "Notifications",
  //     icon: <NavbarSettingsIcon />,
  //     activeIcon: <NavbarActiveSettingsIcon />,
  //     path: "/tenant-dashboard/settings",
  //   },
  // ];



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

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null) as any;

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white flex text-[#000]  text-[18px] leading-[145%] font-[400] px-4 sm:px-6 md:px-8 lg:px-20 h-[76px] border-b border-[#66666659] shadow-lg justify-between items-center w-full">
      {/* <div>Hello {tenantDetails?.first_name ? tenantDetails?.first_name : 'There'}</div> */}
      <section className="w-[133px] p-0 h-[38px] hover:cursor-pointer">
        <Image
          src="/landingPage/logo.svg"
          alt="Panda Logo"
          width={100}
          height={38}
          style={{ objectFit: "contain" }}
          priority
        />
      </section>
      <div className="relative" ref={dropdownRef}>
        <div
          className="flex justify-center gap-x-3 cursor-pointer"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <h3>
            {toSentenceCase(tenantDetails?.first_name)}{" "}
            {toSentenceCase(tenantDetails?.last_name)}
          </h3>
          <Image
            src="/nav-dropdown-icon.svg"
            alt="Dropdown Icon"
            width={10}
            height={10}
            style={{ objectFit: "contain" }}
            priority
          />
        </div>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-60 rounded-es-md rounded-ee-md shadow-lg bg-white  ring-opacity-5 z-10 text-[16px]">
            <ul className="py-1 text-gray-700">
              {((parentoken && parentoken !=='null') || subtoken) && (
                <li
                  className="px-4 py-2 hover:bg-[#F0E9FF] cursor-pointer"
                  onClick={() => handleSwitchAccount()}
                >
                  Switch to Admin Account
                </li>
              )}
              <li className="px-4 py-2 hover:bg-[#F0E9FF] cursor-pointer">
                Settings
              </li>
              <li
                className="px-4 py-2 hover:bg-[#F0E9FF] cursor-pointer"
                onClick={() => handleLogout()}
              >
                Log out
              </li>
            </ul>
          </div>
        )}
      </div>
      {/* {isLoading && <Loading />} */}
    </div>
  );
};

export default TenantNavbar;
