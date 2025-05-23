"use client";
import AuthGuard from "@/components/AuthGuard";
import PropertyFormModal from "@/components/dashboard/Properties/PropertyFormModal";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import device from "@/constants/breakpoints";
import { useMatchMediaQuery } from "@/hooks/useViewPort";
import React, { useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isTabletOrSmaller = useMatchMediaQuery(device.tablet);
 const [isOpen, setIsOpen] = useState(false)


  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen">
        <Sidebar />
        <div
          className={`flex-1 ${
            isTabletOrSmaller ? "ml-0" : "ml-[179px]"
          } transition-all duration-300`}
        >
          <Navbar onPropertyClick={() => setIsOpen(true)}/>
           <PropertyFormModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
          <main style={{ flex: 1 }}>{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Layout;
