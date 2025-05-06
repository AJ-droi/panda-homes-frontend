/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import InputField from "@/components/InputField";
import ColouredButton from "@/components/ColouredButton";
import { TenantFormData } from "@/app/tenant-signup/page";
import NationalityInput from "@/components/NatonalityInput";

interface Form2Props {
  formData: TenantFormData;
  updateFormData: (data: Partial<TenantFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const Form2: React.FC<Form2Props> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const handleChange = (field: keyof TenantFormData, value: string) => {
    updateFormData({ [field]: value });
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
        <div className="space-y-6 w-full max-w-[890px] flex gap-[20px] flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-[14px]">
              <h2
                className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]"
                style={{ fontFamily: "Inter" }}
              >
                PROFESSION/OCCUPATION
              </h2>
              <InputField
                value={formData.profession}
                onChange={(value) => handleChange("profession", value)}
                placeholder="eg Doctor"
              />
            </div>

            <div className="flex flex-col gap-[14px]">
              <h2
                className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]"
                style={{ fontFamily: "Inter" }}
              >
                NAME & ADDRESS OF EMPLOYERS/BUSINESS
              </h2>
              <InputField
                value={formData.employerAddress}
                onChange={(value) => handleChange("employerAddress", value)}
                placeholder="eg John Doe, Lekki Phase 1, Lagos"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* <div className="flex flex-col gap-[14px]">
              <h2
                className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]"
                style={{ fontFamily: "Inter" }}
              >
                DATE OF MOVING TO WHERE YOU PRESENTLY LIVE
              </h2>
              <InputField
                value={formData.dateMovedIn}
                onChange={(value) => handleChange("dateMovedIn", value)}
                placeholder="eg 20th Feb 2023"
                error={errors.dateMovedIn}
              />
            </div> */}
            <div className="flex flex-col gap-[14px]">
              <h2
                className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]"
                style={{ fontFamily: "Inter" }}
              >
                WHAT IS YOUR ANNUAL INCOME
              </h2>
              <InputField
                value={formData.annualIncome}
                onChange={(value) => handleChange("annualIncome", value)}
                placeholder="500000"
                type="number"
              />
            </div>

            <div className="flex flex-col gap-[14px]">
              <h2
                className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]"
                style={{ fontFamily: "Inter" }}
              >
                STATE/TOWN/LGA
              </h2>
              <InputField
                value={formData.state}
                onChange={(value) => handleChange("state", value)}
                placeholder="Lagos state"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-[14px]">
              <h2
                className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]"
                style={{ fontFamily: "Inter" }}
              >
                NATIONALITY
              </h2>
              <NationalityInput
                value={formData.nationality || ""}
                onChange={(nationality) =>
                  handleChange("nationality", nationality)
                }
              />
            </div>

            <div className="flex flex-col gap-[14px]">
              <h2
                className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]"
                style={{ fontFamily: "Inter" }}
              >
                RELIGION
              </h2>
              <InputField
                value={formData.religion}
                onChange={(value) => handleChange("religion", value)}
                placeholder="eg Christianity"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-[14px]">
              <h2
                className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]"
                style={{ fontFamily: "Inter" }}
              >
                MARITAL STATUS
              </h2>
              <InputField
                value={formData.maritalStatus}
                onChange={(value) => handleChange("maritalStatus", value)}
                placeholder="Single"
              />
            </div>

            <div className="flex flex-col gap-[14px]">
              <h2
                className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]"
                style={{ fontFamily: "Inter" }}
              >
                NAME OF SPOUSE (IF NOT MARRIED TYPE NONE)
              </h2>
              <InputField
                value={formData.spouseName}
                onChange={(value) => handleChange("spouseName", value)}
                placeholder="eg Jane Doe"
              />
            </div>
          </div>

          <div className="flex gap-10 justify-between">
            <ColouredButton title="Previous" onClick={prevStep} />
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

export default Form2;