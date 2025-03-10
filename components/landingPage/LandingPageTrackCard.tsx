"use client";
import React from "react";
import Link from "next/link";
import ColouredButton from "@/components/ColouredButton";

const LandingPageTrackCard = () => {
  return (
    <div className="bg-[#FFFFFF] flex flex-col sm:flex-row text-center sm:text-left text-[18px] md:text-[20px] lg:text-[24px] font-[700] text-[#785DBA] justify-between px-4 sm:px-6 md:px-10 w-full max-w-[850px] rounded-[8px] border h-[104px] shadow-sm">
      <section className="flex justify-center items-center py-4 sm:py-0 w-full sm:w-[33%]">
        <div>Track Rents</div>
      </section>

      <section className="py-4 sm:py-0 w-full sm:w-[33%] flex justify-center items-center border-t sm:border-t-0 sm:border-l sm:border-r border-gray-200">
        <div>Manage Tenants</div>
      </section>

      <section className="py-4 sm:py-0 w-full sm:w-[33%] justify-center items-center flex border-t sm:border-t-0 border-gray-200">
        <Link href="/signup" className="w-full sm:w-auto flex justify-center">
          <ColouredButton title="Sign up" />
        </Link>
      </section>
    </div>
  );
};

export default LandingPageTrackCard;
