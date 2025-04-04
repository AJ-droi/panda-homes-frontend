"use client"
import React, { useEffect } from "react";
import Image from "next/image";

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Please Wait Panda is Loading..." }) => {

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-white/90 bg-opacity-90 z-[9999] flex flex-col items-center justify-center">
      <div 
        className="absolute inset-0 bg-transparent"
        onClick={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
      />
      
      <div className="relative z-[10000] flex flex-col justify-center items-center text-center">
        <div className="mb-6">
          <Image
            src="/landingPage/logo.png"
            alt="Panda Logo"
            width={160}
            height={80}
            style={{ objectFit: "contain" }}
            priority
          />
        </div>

        <div className="flex flex-col items-center">
          <div className="relative w-20 h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
            <div className="absolute h-full w-full bg-[#785DBA] rounded-full animate-loading" />
          </div>
          <p className="text-[#785DBA] font-[900] mt-4">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;