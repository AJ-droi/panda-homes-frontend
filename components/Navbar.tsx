"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  NavbarNotificationBell,
  NavbarSettingsIcon,
} from "@/layout/svgIconPaths";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="bg-white text-[#785DBA] text-[22px] leading-[145%] font-[700] px-4 sm:px-6 md:px-8 lg:px-20 h-[76px] border-b border-[#66666659] shadow-lg flex justify-between items-center w-full">
      <div>Hello Tunji</div>
      <div className="gap-[24px] items-center justify-between flex relative" ref={dropdownRef}>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
