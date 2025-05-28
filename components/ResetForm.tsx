/*eslint-disable */
"use client";
import React, { useState } from "react";
import ColouredButton from "./ColouredButton";
import { useResetPasswordMutation } from "@/services/users/mutation";
import { useRouter, useSearchParams } from "next/navigation";
import { BackToLogin } from "./Backbutton";
import { toast } from "react-toastify";

const ResetForm = () => {
  const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { mutate, isPending } = useResetPasswordMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(password !== confirmPassword){
      toast.error('Re-enter password is not the same as password')
      return;
    }

    mutate(
      {
        token,
        newPassword: password,
      },
      {
        onSuccess: (data) => {
          router.push(`/`);
          localStorage.setItem("user_id", data.user_id);
          localStorage.removeItem('token')
        },
        onError: (error: any) => {
          setError(error.message || "An error occurred during signup.");
        },
      }
    );
  };

  return (
     <div className="w-full bg-white rounded-md h-[70vh]">
          <BackToLogin />
    <div className="h-[100%] px-5 py-5 flex flex-col justify-start">
      <div className="flex flex-col ">
        <h3 className="text-[16px] font-[500] text-[#673AB7]">
          Set a Password
        </h3>
        <p className="text-[#212121]  py-5 text-[12px] w-[80%] ">
         Please set a new password for your account.
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
            className="block font-medium absolute -top-[18%] ml-[5%] bg-[#fff] text-[12px] px-[3%] "
          >
            Create Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 text-black block w-full px-3 py-3 sm:px-3 sm:py-2 border border-[#66666659] h-12 sm:h-[56px] rounded-[12px] shadow-sm bg-gray-50 cursor-default text-sm sm:text-base"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-[17px] right-3 text-sm text-gray-600 focus:outline-none"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="mt-6 relative">
          <label
            htmlFor="confirmPassword"
            className="block font-medium absolute -top-[18%] ml-[5%] bg-[#fff] text-[12px] px-[3%] "
          >
            Re-enter Password
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 text-black block w-full px-3 py-3 sm:px-3 sm:py-2 border border-[#66666659] h-12 sm:h-[56px] rounded-[12px] shadow-sm bg-gray-50 cursor-default text-sm sm:text-base"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-[17px] right-3 text-sm text-gray-600 focus:outline-none"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          className={`bg-[#212121] text-[12px] text-center w-full p-4 rounded-md text-[#fff]`}
        >
          {isPending ? "Processing..." : "Reset Password"}
        </button>
      </form>

      {/* Google login button */}
    </div>
    </div>
  );
};

export default ResetForm;
