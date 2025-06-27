"use client";
import AuthGuard from "@/components/AuthGuard";
import TenantNavbar from "@/components/tenantsSection/TenantNavBar";
// import device from "@/constants/breakpoints";
// import { useMatchMediaQuery } from "@/hooks/useViewPort";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // const isTabletOrSmaller = useMatchMediaQuery(device.tablet);

  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen">
        {/* <TenantSidebar /> */}
        <div
          className={`flex-1 transition-all duration-300`}
        >
          <TenantNavbar />
          <main style={{ flex: 1 }}>{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Layout;
