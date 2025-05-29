/*eslint-disable */
"use client";
import React, { useState } from "react";
import {  useValidateOtpMutation } from "@/services/users/mutation";
import { useRouter} from "next/navigation";
import { BackToLogin } from "./Backbutton";

const VerifyForm = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const { mutate, isPending } = useValidateOtpMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      {
        otp
      },
      {
        onSuccess: (data) => {
          router.push(`/reset-password?token=${data.token}`);
          localStorage.setItem("token", data.token);
        },
        onError: (error: any) => {
          setError(error.message || "An error occurred during signup.");
        },
      }
    );
  };

  return (
    <div className="w-full bg-white rounded-md h-[70vh] ">
        <BackToLogin />
    <div className=" h-[80%] px-5 py-5 flex flex-col justify-center">
      <div className="flex flex-col ">
        <h3 className="text-[16px] font-[500] text-[#673AB7]">
          Verify Code
        </h3>
        <p className="text-[#212121]  py-5 text-[12px] w-[80%] ">
          An authentication code has been sent to your email.
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form className="space-y-4 text-[#666666]" onSubmit={handleSubmit}>
        <div className="mt-6 relative">
          <label
            htmlFor="password"
           className="block font-medium absolute -top-[10%] ml-[5%] bg-[#fff] text-[12px] px-[3%] "
          >
            Enter code
          </label>
          <input
            id="password"
            type={ "text"}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mt-1 text-black block w-full px-3 py-3 sm:px-3 sm:py-2 border border-[#66666659] h-12 sm:h-[56px] rounded-[12px] shadow-sm bg-gray-50 cursor-default text-sm sm:text-base"
          />
             <p className="text-[#212121]  py-5 text-[12px] w-[80%] ">
          Didn’t receive a code? <span className="text-[#673AB7]">Resend</span>
        </p>
        </div>



        <button
          className={`bg-[#212121] text-[12px] text-center w-full p-4 rounded-md text-[#fff] hover:bg-[#785DBA]`}
        >
          {isPending ? "Processing..." : "Submit"}
        </button>
      </form>

      {/* Google login button */}
    </div>
    </div>
  );
};

export default VerifyForm;
