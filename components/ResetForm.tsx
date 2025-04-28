/*eslint-disable */
"use client";
import React, { useState } from "react";
import ColouredButton from "./ColouredButton";
import { useResetPasswordMutation } from "@/services/users/mutation";
import { useRouter, useSearchParams } from "next/navigation";

const ResetForm = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
const token = searchParams.get('token');

  const { mutate, isPending } = useResetPasswordMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      {
        token,
        newPassword: password,
      },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (error: any) => {
          setError(error.message || "An error occurred during signup.");
        },
      }
    );
  };

  return (
    <div className="mx-auto p-6 bg-white">
      <div className="flex flex-row justify-between items-center">
        <div className="text-[32px] font-[500] text-[#333333]">
          Reset Password
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form className="space-y-4 mt-6 text-[#666666]" onSubmit={handleSubmit}>
        <div className="mt-6 relative">
          <label htmlFor="password" className="block font-medium">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 text-black block w-full px-3 py-2 border border-[#66666659] h-[56px] rounded-[12px] shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-[45px] right-3 text-sm text-gray-600 focus:outline-none"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="text-center mt-10">
          <div
            className={`flex lg:flex lg:flex-row gap-4 w-full items-center justify-center lg:w-auto mt-4 lg:mt-0`}
          >
            <ColouredButton
              borderRadius="40px"
              height="64px"
              disabled={isPending}
            >
              <div
                className={`font-[500] text-base sm:text-lg md:text-xl lg:text-[24px] whitespace-nowrap`}
              >
                {isPending ? "Processing..." : "Reset Password"}
              </div>
            </ColouredButton>
          </div>
        </div>
      </form>

      {/* Google login button */}
    </div>
  );
};

export default ResetForm;
