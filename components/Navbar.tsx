/* eslint-disable */
import React from "react";
import { NavbarNotificationBell, NavbarSettingsIcon } from "@/layout/svgIconPaths";

const Navbar = () => {
  return (
    <div className="bg-white text-[#785DBA] text-[22px] leading-[145%] font-[700] px-4 sm:px-6 md:px-8 lg:px-20 h-[76px] border-b border-[#66666659] shadow-lg flex justify-between items-center w-full">
      <div>
        Hello Tunji
      </div>
      <div className="gap-[24px] items-center justify-between flex">
        <nav className="hover:cursor-pointer">
          <NavbarNotificationBell />
        </nav>
        <nav className="hover:cursor-pointer">
          <NavbarSettingsIcon />
        </nav>
      </div>
    </div>
  )
}

export default Navbar;