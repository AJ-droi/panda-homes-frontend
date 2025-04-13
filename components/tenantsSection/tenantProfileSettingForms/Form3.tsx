/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import InputField from "@/components/InputField";
import ColouredButton from "@/components/ColouredButton";;
import { TenantFormData } from "@/app/tenants-section/tenant-registration/page";

interface Form3Props {
  formData: TenantFormData;
  updateFormData: (data: Partial<TenantFormData>) => void;
  prevStep: () => void;
}

const Form3: React.FC<Form3Props> = ({ formData, updateFormData, prevStep }) => {
  const handleChange = (field: keyof TenantFormData, value: string) => {
    updateFormData({ [field]: value });
  };

  const handleSubmit = () => {
    // e.preventDefault();
    // Submit form data
    console.log("Form submitted:", formData);
  };

  return (
    <div className="w-full p-12 shadow-lg bg-white rounded-[10px] border-1">
            <h1
        className="text-2xl max-w-[916px] leading-[145%] text-[#45464E] border-b mb-6"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        Tenant Details
      </h1>
<div className="flex mt-20 min-h-[784px] justify-center">
      <div className="space-y-6 w-full max-w-[890px] flex gap-[38px] flex-col">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-[14px]">
              <h2 className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]" style={{fontFamily: 'Inter'}}>
              NAME & ADDRESS OF SPOUSE’S EMPLOYER
              </h2>
              <InputField
                value={formData.spouseEmployer}
                onChange={(value) => handleChange("spouseEmployer", value)}
                placeholder="Enter Spouse's Employer Details"
              />
            </div>

            <div className="flex flex-col gap-[14px]">
              <h2 className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]" style={{fontFamily: 'Inter'}}>
              SIGNATURE OF TENANT & DATE
              </h2>
              <InputField
                value={formData.signature}
                onChange={(value) => handleChange("signature", value)}
                placeholder="J.D., 20th Feb 2025"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-[14px]">
              <h2 className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]" style={{fontFamily: 'Inter'}}>
              NAME & ADDRESS OF NEXT OF KIN
              </h2>
              <InputField
                value={formData.nextOfKin}
                onChange={(value) => handleChange("nextOfKin", value)}
                placeholder="eg John Doe, Lekki Lagos"
              />
            </div>

            <div className="flex flex-col gap-[14px]">
              <h2 className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]" style={{fontFamily: 'Inter'}}>
              NAME & ADDRESS OF GUARANTOR
              </h2>
              <InputField
                value={formData.guarantorNameAndAddress}
                onChange={(value) => handleChange("guarantorNameAndAddress", value)}
                placeholder="John Doe, Lekki Lagos"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-[14px]">
              <h2 className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]" style={{fontFamily: 'Inter'}}>
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
              <h2 className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]" style={{fontFamily: 'Inter'}}>
              GUARANTOR’S OCCUPATION/PROFESSION/PHONE NUMBER
              </h2>
              <InputField
                value={formData.guarantorOccupationAndPhone}
                onChange={(value) => handleChange("guarantorOccupationAndPhone", value)}
                placeholder="Doctor/08123456789"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-[14px]">
              <h2 className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]" style={{fontFamily: 'Inter'}}>
              WHO WILL BE RESPONSIBLE FOR THE PAYMENT OF THE RENT
              </h2>
              <InputField
                value={formData.rentPayer}
                onChange={(value) => handleChange("rentPayer", value)}
                placeholder="John Doe"
              />
            </div>
          </div>

        <div className="flex gap-10 justify-between">
          <ColouredButton 
            title="Previous" 
            onClick={prevStep}
          />
          <ColouredButton 
            title="Submit" 
            onClick={handleSubmit}
            // disabled={!formData.profession || !formData.nationality || !formData.maritalStatus}
          />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Form3;