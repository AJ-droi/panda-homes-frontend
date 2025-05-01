/* eslint-disable */
"use client";
import Link from "next/link";
import React, { useState } from "react";
import ColouredButton from "@/components/ColouredButton";
import WhiteButton from "@/components/WhiteButton";
import Image from "next/image";
import { useLoginMutation } from "@/services/users/mutation";
import { useRouter } from "next/navigation";
import { Role } from "@/constants/enums/role";

type AuthFormProps = {
  isLogin: boolean;
};

const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const redirectUser = (user: any) => {
    user.role === Role.ADMIN
      ? router.push("/dashboard")
      : (router.push("/tenant-dashboard"), localStorage.setItem('tenant', JSON.stringify(user)))
  };

  const { mutate, isPending } = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // redirectUser()

    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          console.log('dat', data.user)
          data.user && redirectUser(data.user);
        },
        onError: (error: any) => {
          setError(error.message || "An error occurred during login.");
        },
      }
    );
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          console.log("Login successful", data);
          // redirectUser()
        },
        onError: (error: any) => {
          console.error("Login failed", error);
          setError(error.message || "An error occurred during login.");
        },
      }
    );
  };

  return (
    <div className="mx-auto p-6 bg-white">
      <div className="flex flex-row justify-between items-center">
        <div className="text-[32px] font-[500] text-[#333333]">
          {isLogin ? "Login" : "Create an account"}
        </div>
        <Link
          href={isLogin ? "signup" : "login"}
          className="underline font-[400] text-[#111111]"
        >
          {isLogin ? "Sign up" : "log in instead"}
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form
        className="space-y-4 mt-6 text-[#666666]"
        onSubmit={isLogin ? handleLogin : handleRegister}
      >
        {!isLogin && (
          <>
            <div className="mt-6">
              <label htmlFor="firstName" className="block font-medium">
                First name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="mt-1 text-black block w-full px-3 py-2 border border-[#66666659] h-[56px] rounded-[12px] shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mt-6">
              <label htmlFor="firstName" className="block font-medium">
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="mt-1 text-black block w-full px-3 py-2 border border-[#66666659] h-[56px] rounded-[12px] shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {/* <div>
           <label htmlFor="phoneNumber" className="block font-medium">Phone Number</label>
           <input
             id="phoneNumber"
             type="number"
             value={phoneNumber}
             onChange={(e) => setPhoneNumber(e.target.value)}
             required
             className="mt-1 text-black block w-full px-3 py-2 border border-[#66666659] h-[56px] rounded-[12px] shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
           />
         </div> */}
          </>
        )}

        <div className="mt-6">
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // required
            className="mt-1 text-black block w-full px-3 py-2 border border-[#66666659] h-[56px] rounded-[12px] shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

  
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

        {!isLogin && (
          <div className="flex gap-2 mt-10 items-start justify-items-start">
            <div>
              <input type="checkbox" className="text-black w-[18px] h-[18px]" />
            </div>
            <div className="text-base text-[#333333]">
              By creating an account, you agree to our{" "}
              <span>
                <Link href="#" className="underline">
                  Terms of use
                </Link>
              </span>{" "}
              and{" "}
              <span>
                <Link href="#" className="underline">
                  Privacy Policy
                </Link>
              </span>
            </div>
          </div>
        )}

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
                {isLogin
                  ? isPending
                    ? "Logging in"
                    : "Login"
                  : "Create an account"}
              </div>
            </ColouredButton>
          </div>
        </div>
      </form>

      {/* Google login button */}
      <div className="flex mt-10 gap-2 justify-between items-center">
        <div className="bg-[#66666640] w-1/2 h-0.5"></div>
        <div className="text-[#666666]">OR</div>
        <div className="bg-[#66666640] w-1/2 h-0.5"></div>
      </div>

      <div className="text-center mt-6 sm:mt-8 lg:mt-10">
        <div className="flex justify-center items-center w-full">
          <WhiteButton
            borderRadius="40px"
            height={{ base: "48px", sm: "56px", md: "64px" }}
          >
            {/* className="w-full sm:max-w-md" */}
            <div className="flex gap-2 sm:gap-3 md:gap-[16px] justify-center items-center py-2 px-3 sm:px-4">
              <div>
                <Image
                  src="/google-logo.png"
                  alt="Google Logo"
                  width={20}
                  height={20}
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-[24px] md:h-[24px]"
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
              <div className="font-[400] text-base sm:text-lg md:text-xl lg:text-[24px] whitespace-nowrap">
                Continue with Google
              </div>
            </div>
          </WhiteButton>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
