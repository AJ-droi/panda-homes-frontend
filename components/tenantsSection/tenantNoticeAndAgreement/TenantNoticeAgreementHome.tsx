"use client";
import React, { useEffect, useState } from "react";
import TenantNoticeTable from "./TenantNoticeTable";

const TenantNoticeAndAgreement = () => {
  const [useColumnLayout, setUseColumnLayout] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setUseColumnLayout(width <= 1280);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="bg-[#fafafe] p-4 w-full">
      <section className="max-w-[98%] text-[#6E7079] rounded-2xl overflow-hidden shadow-md bg-white p-[2%] ">
            <div
              className="text-[#4D4D4D] font-[600] text-[22px] leading-[145%] py-[2%]"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Notices and Agreements
            </div>
        <div
          className={`flex ${
            useColumnLayout ? "flex-col" : "flex-col lg:flex-row"
          }  gap-10 w-full`}
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
           <div className="mt-4 sm:mt-6 w-full">
            <TenantNoticeTable />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TenantNoticeAndAgreement;
