"use client";
import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import device from "@/constants/breakpoints";
import { useMatchMediaQuery } from "@/hooks/useViewPort";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isTabletOrSmaller = useMatchMediaQuery(device.tablet);

  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen">
        <Sidebar />
        <div
          className={`flex-1 ${
            isTabletOrSmaller ? "ml-0" : "ml-[179px]"
          } transition-all duration-300`}
        >
          <Navbar />
          <main style={{ flex: 1 }}>{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Layout;
