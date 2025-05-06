/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import InputField from "@/components/InputField";
import ColouredButton from "@/components/ColouredButton";
import CalendarDropdown from "@/components/CalendarDropdown";
import { TenantFormData } from "@/app/tenant-signup/page";
import PhoneInputCustom from "@/components/PhoneNumberInput";
// import { toast } from "react-toastify";

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
    <div className="w-full lg:shadow-lg rounded-[10px] lg:border-1">
      <h1
        className="text-[20px] ml-6 font-[700] max-w-[279px] lg:mt-10 flex lg:justify-center leading-[145%] text-[#785DBA] border-b-2 mb-6"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        Profile & Account Settings
      </h1>

      <div className="flex p-6 mt-6 lg:mt-20 min-h-[784px] justify-center">
        <div className="space-y-6 max-w-[890px] w-full flex gap-[20px] flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-[14px]">
              <h2
                className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]"
                style={{ fontFamily: "Inter" }}
              >
                FULL NAME (SURNAME FIRST)
              </h2>
              <InputField
                value={formData.fullName}
                onChange={(value) => handleChange("fullName", value)}
                placeholder="Enter full name"
              />
            </div>

            <div className="flex flex-col gap-[14px]">
              <h2
                className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]"
                style={{ fontFamily: "Inter" }}
              >
                PRESENT HOUSE ADDRESS
              </h2>
              <InputField
                value={formData.presentAddress}
                onChange={(value) => handleChange("presentAddress", value)}
                placeholder="Ajah, Lagos"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-[14px]">
              <h3
                className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]"
                style={{ fontFamily: "Inter" }}
              >
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
            <div className="flex flex-col gap-[14px]">
              <h3
                className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]"
                style={{ fontFamily: "Inter" }}
              >
                REASON FOR LEAVING YOUR PRESENT ADDRESS
              </h3>
              <InputField
                value={formData.reasonForLeaving}
                onChange={(value) => handleChange("reasonForLeaving", value)}
                placeholder="E.g. Bad road"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-[14px]">
              <h3
                className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]"
                style={{ fontFamily: "Inter" }}
              >
                EMAIL ADDRESS
              </h3>
              <InputField
                value={formData.email}
                onChange={(value) => handleChange("email", value)}
                placeholder="example@gmail.com"
                type="email"
              />
            </div>

            <div className="flex flex-col gap-[14px]">
              <h3
                className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]"
                style={{ fontFamily: "Inter" }}
              >
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-[14px]">
              <h2
                className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]"
                style={{ fontFamily: "Inter" }}
              >
                TYPE OF ACCOMMODATION PRESENTLY OCCUPIED
              </h2>
              <InputField
                value={formData.accommodationType}
                onChange={(value) => handleChange("accommodationType", value)}
                placeholder="E.g. Mini flat"
              />
            </div>
            <div className="flex flex-col gap-[14px]">
              <h3
                className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]"
                style={{ fontFamily: "Inter" }}
              >
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

          <div className="flex justify-end">
            <ColouredButton
              title="Next"
              onClick={nextStep}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form1;