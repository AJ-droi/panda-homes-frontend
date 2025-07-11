/*eslint-disable */
"use client";
import React, { useState } from "react";
import { useForgotPasswordMutation} from "@/services/users/mutation";
import { useRouter} from "next/navigation";
import { BackToLogin } from "./Backbutton";

const ForgotForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();


  const { mutate, isPending } = useForgotPasswordMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      {
       email
      },
      {
        onSuccess: (data) => {
          router.push(`/verify-otp`);
          localStorage.setItem("token", data.token);
        },
        onError: (error: any) => {
          setError(error.message || "An error occurred during signup.");
        },
      }
    );
  };

  return (
    <div className="w-full bg-white rounded-ss-3xl rounded-se-3xl md:rounded-md h-[70vh] md:h-[60vh]">
      <BackToLogin />
      <div className="rounded-md  px-5  flex flex-col justify-start my-5">
        <div className="flex flex-col ">
          <h3 className="text-[16px] font-[500] text-[#673AB7]">
            Forgot your password?
          </h3>
          <p className="text-[#696F79]  py-5 text-[12px]  ">
            Don’t worry, happens to all of us. Enter your email below to recover
            your password
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form className="space-y-14 text-[#666666]" onSubmit={handleSubmit}>
          <div className="mt-6 relative">
            <label
              htmlFor="email"
              className="block font-medium absolute -top-[18%] ml-[5%] bg-[#fff] text-[12px] px-[3%] "
            >
              Your Email
            </label>
            <input
              id="email"
              type={"text"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 text-black block w-full px-3 py-3 sm:px-3 sm:py-2 border border-[#66666659] h-12 sm:h-[56px] rounded-[12px] shadow-sm bg-gray-50 cursor-default text-sm sm:text-base"
            />
         
          </div>

          <button className={`bg-[#212121] text-[12px] text-center w-full p-4 rounded-md text-[#fff] hover:bg-[#785DBA] hover:cursor-pointer`}>
            {isPending ? "Processing..." : "Submit"}
          </button>
        </form>

        {/* Google login button */}
      </div>
    </div>
  );
};

export default ForgotForm;
