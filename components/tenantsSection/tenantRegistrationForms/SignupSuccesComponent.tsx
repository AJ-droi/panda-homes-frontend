"use client";
import React, { useState } from "react";
import ColouredButton from "@/components/ColouredButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SuccessBadge } from "@/layout/svgIconPaths";
import Loading from "@/components/Loading";

const SuccessForm = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const redirect = async () => {
    setIsLoading(true);

    try {
      setTimeout(() => {
        router.push("/tenants-section/tenant-dashboard");
      }, 500);
    } catch (error) {
      console.error("Navigation error:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div
      className="bg-white min-h-screen rounded-lg py-4 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12"
      style={{ fontFamily: "Inter" }}
    >
      <div className="w-full flex flex-col items-center py-4 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12">
        <section className="w-full max-w-6xl flex justify-center flex-col items-center">
          <div className="w-full max-w-md flex flex-col justify-center items-center py-4 px-4 sm:px-6 rounded-[10px] mb-4 sm:mb-6">
            <div className="w-[100px] sm:w-[133px] mb-6 sm:mb-10 p-0 h-[28px] sm:h-[38px] hover:cursor-pointer">
              <Image
                src="/landingPage/logo.png"
                alt="Panda Logo"
                width={133}
                height={38}
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>
        </section>

        <section className="w-full max-w-6xl flex justify-center flex-col items-center">
          <SuccessBadge />

          <div
            className="mt-20 font-semibold text-[32px] leading-[100%] text-[#26203B]"
            style={{ fontFamily: "Satoshi" }}
          >
            Account created successfully!
          </div>
          <div
            className="font-[400] mt-6 text-[24px] leading-[100%] text-[#9C9AA5]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Welcome aboard! Start your success journey with Panda!
          </div>
        </section>

        <section className="mt-10 w-full max-w-6xl flex flex-col justify-center items-center gap-3 sm:gap-[14px]">
          <div className="max-w-[210px]">
            <ColouredButton title="Let's Start!" onClick={redirect} />
          </div>
        </section>
      </div>

      {isLoading && <Loading />}
    </div>
  );
};

export default SuccessForm;
