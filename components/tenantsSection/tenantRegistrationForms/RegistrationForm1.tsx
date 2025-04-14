"use client";
import React from "react";
import InputField from "@/components/InputField";
import ColouredButton from "@/components/ColouredButton";
import CalendarDropdown from "@/components/CalendarDropdown";
import { TenantFormData } from "@/app/tenant-signup/page";
import PhoneInputCustom from "@/components/PhoneNumberInput";
import Image from "next/image";

interface Form1Props {
  formData: TenantFormData;
  updateFormData: (data: Partial<TenantFormData>) => void;
  nextStep: () => void;
}

const Form1: React.FC<Form1Props> = ({
  formData,
  updateFormData,
  nextStep,
}) => {
  const handleChange = (field: keyof TenantFormData, value: string) => {
    updateFormData({ [field]: value });
  };

  const handleDateChange = (date: Date | null) => {
    updateFormData({ dateMovedIn: date ? date.toISOString() : "" });
  };

  const handlePhoneNumberChange = (phoneNumber: string) => {
    updateFormData({ phoneNumber });
  };

  return (
    <div className="bg-white min-h-screen rounded-lg py-4 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12" style={{fontFamily: 'Inter'}}>
      <div className="flex justify-end items-end text-[14px] font-[500] text-[#BDBDBD] leading-[100%]">STEP 01/03</div>
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

          <div className="text-black font-[700] mb-3 sm:mb-4 text-[24px] sm:text-[30px] leading-[100%] text-center">
            TENANT&apos;S DATA FORM
          </div>
          <div className="w-full flex justify-center items-center text-center">
            <div className="text-[#8692A6] font-[400] text-[14px] sm:text-[16px] md:text-[18px] leading-[24px] md:leading-[28px]">
              Welcome! Please complete your registration to access your tenant dashboard.
            </div>
          </div>
        </div>
      </section>

      <div className="w-full max-w-6xl flex justify-center">
        <div className="w-full flex gap-4 sm:gap-6 md:gap-[28px] flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex flex-col gap-2 sm:gap-[14px]">
              <h2 className="mb-1 sm:mb-2 font-[500] text-[14px] sm:text-[16px] leading-[100%] text-[#696F79]">
                FULL NAME (SURNAME FIRST)
              </h2>
              <InputField
                value={formData.fullName}
                onChange={(value) => handleChange("fullName", value)}
                placeholder="Enter full name"
              />
            </div>

            <div className="flex flex-col gap-2 sm:gap-[14px]">
              <h2 className="mb-1 sm:mb-2 font-[500] text-[14px] sm:text-[16px] leading-[100%] text-[#696F79]">
                PRESENT HOUSE ADDRESS
              </h2>
              <InputField
                value={formData.presentAddress}
                onChange={(value) => handleChange("presentAddress", value)}
                placeholder="Ajah, Lagos"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex flex-col gap-2 sm:gap-[14px]">
              <h3 className="mb-1 sm:mb-2 font-[500] text-[14px] sm:text-[16px] leading-[100%] text-[#696F79]">
                PHONE NUMBER
              </h3>
              <div className="flex items-center">
                <PhoneInputCustom
                  value={formData.phoneNumber}
                  onChangePhoneNumber={handlePhoneNumberChange}
                  placeholder="09012345678"
                  initialCountryCode="NG"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:gap-[14px]">
              <h3 className="mb-1 sm:mb-2 font-[500] text-[14px] sm:text-[16px] leading-[100%] text-[#696F79]">
                REASON FOR LEAVING YOUR PRESENT ADDRESS
              </h3>
              <InputField
                value={formData.reasonForLeaving}
                onChange={(value) => handleChange("reasonForLeaving", value)}
                placeholder="E.g. Bad road"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex flex-col gap-2 sm:gap-[14px]">
              <h3 className="mb-1 sm:mb-2 font-[500] text-[14px] sm:text-[16px] leading-[100%] text-[#696F79]">
                EMAIL ADDRESS
              </h3>
              <InputField
                value={formData.email}
                onChange={(value) => handleChange("email", value)}
                placeholder="example@gmail.com"
                type="email"
              />
            </div>

            <div className="flex flex-col gap-2 sm:gap-[14px]">
              <h3 className="mb-1 sm:mb-2 font-[500] text-[14px] sm:text-[16px] leading-[100%] text-[#696F79]">
                DATE YOU MOVED TO WHERE YOU PRESENTLY LIVE
              </h3>
              <CalendarDropdown
                selectedDate={
                  formData.dateMovedIn ? new Date(formData.dateMovedIn) : null
                }
                onChange={handleDateChange}
                placeholder="Select date"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex flex-col gap-2 sm:gap-[14px]">
              <h2 className="mb-1 sm:mb-2 font-[500] text-[14px] sm:text-[16px] leading-[100%] text-[#696F79]">
                TYPE OF ACCOMMODATION PRESENTLY OCCUPIED
              </h2>
              <InputField
                value={formData.accommodationType}
                onChange={(value) => handleChange("accommodationType", value)}
                placeholder="E.g. Mini flat"
              />
            </div>
            <div className="flex flex-col gap-2 sm:gap-[14px]">
              <h3 className="mb-1 sm:mb-2 font-[500] text-[14px] sm:text-[16px] leading-[100%] text-[#696F79]">
                NUMBER OF PERSON TO BE ACCOMMODATED NOW
              </h3>
              <InputField
                value={formData.numberOfPersons}
                onChange={(value) => handleChange("numberOfPersons", value)}
                placeholder="1"
                type="number"
              />
            </div>
          </div>
        </div>
      </div>
      
    </div>
      <div className="w-full max-w-6xl flex flex-col mt-2 sm:mt-2 gap-3 sm:gap-[14px]">
        <div className="flex justify-start gap-2 sm:gap-[14px] items-center">
          <input type="checkbox" /> 
          <span className="font-[500] text-[14px] sm:text-[16px] leading-[100%] text-[#696F79]">
            I agree to terms and conditions
          </span>
        </div>
        <div className="w-full max-w-[426px]">
          <ColouredButton
            title="Save & Continue"
            onClick={nextStep}
          />
        </div>
      </div>
    </div>
  );
};

export default Form1;