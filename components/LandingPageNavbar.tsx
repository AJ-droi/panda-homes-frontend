"use client";
/* eslint-disable */
import Link from "next/link";
import ColouredButton from "@/components/ColouredButton";
import WhiteButton from "@/components/WhiteButton";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

//fixed top-0 left-0

const LandingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname()
  return (
    <nav className="w-full bg-white shadow-md p-4 flex flex-wrap justify-between items-center z-50">
      <div className="flex justify-between animate__animated animate__slideInLeft items-center w-full lg:w-auto">
        <div className="w-[133px] h-[38px] hover:cursor-pointer">
          <Image
            src="/landingPage/logo.png"
            alt="Panda Logo"
            width={150}
            height={150}
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
        {/* <button
              className="lg:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button> */}
      </div>
      {pathname == "/" && <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } lg:flex flex-col animate__animated animate__slideInRight  lg:flex-row gap-4 w-full lg:w-auto mt-4 lg:mt-0`}
      >
        <Link href="/login" className="w-full lg:w-auto">
          <ColouredButton title="Client Login" />
        </Link>
        {/* <Link href="/signup" className="w-full lg:w-auto">
          <ColouredButton title="Sign up" />
        </Link> */}
      </div>}
    </nav>
  );
};

export default LandingNavbar;
