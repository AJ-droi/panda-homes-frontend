"use client";
/*eslint-disable */
import React from "react";
import InputField from "@/components/InputField";
import ColouredButton from "@/components/ColouredButton";
import { TenantFormData } from "@/app/tenant-signup/page";
import Image from "next/image";
import { BackArrow } from "@/layout/svgIconPaths";

interface Form3Props {
  formData: any;
  updateFormData: (data: Partial<any>) => void;
  nextStep: () => void;
  prevStep?: () => void;
  handleSubmit?: any;
}

const Form3: React.FC<Form3Props> = ({
  formData,
  updateFormData,
  // nextStep,
  prevStep,
  handleSubmit,
}) => {
  // const handleChange = (field: keyof TenantFormData, value: string) => {
  //   updateFormData({ [field]: value });
  // };

  // const handleSubmit = () => {
  //   console.log("Form submitted:", formData);
  // };

  return (
    <div
      className="bg-white min-h-screen rounded-lg py-4 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12"
      style={{ fontFamily: "Inter" }}
    >
      <div className="flex justify-between items-end w-full text-[16px] font-[600] text-[#BDBDBD] leading-[100%]">
        <span
          className="flex gap-[9px] text-[#8692A6] hover:cursor-pointer"
          onClick={prevStep}
        >
          <BackArrow /> Back
        </span>{" "}
        <span>STEP 03/03</span>
      </div>
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
                Welcome! Please complete your registration to access your tenant
                dashboard.
              </div>
            </div>
          </div>
        </section>

        <div className="w-full max-w-6xl flex justify-center">
          <div className="w-full space-y-4 sm:space-y-6 md:space-y-[38px] flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* <div className="flex flex-col gap-2 sm:gap-[14px]">
                <h2 className="mb-1 sm:mb-2 font-[500] text-[14px] sm:text-[16px] leading-[100%] text-[#696F79]">
                  NAME & ADDRESS OF SPOUSE&apos;S EMPLOYER
                </h2>
                <InputField
                  value={formData.spouseEmployer}
                  onChange={(value) => handleChange("spouseEmployer", value)}
                  placeholder="Enter Spouse's Employer Details"
                />
              </div> */}

              {/* <div className="flex flex-col gap-2 sm:gap-[14px]">
                <h2 className="mb-1 sm:mb-2 font-[500] text-[14px] sm:text-[16px] leading-[100%] text-[#696F79]">
                  SIGNATURE OF TENANT & DATE
                </h2>
                <InputField
                  value={formData.signature}
                  onChange={(value) => handleChange("signature", value)}
                  placeholder="J.D., 20th Feb 2025"
                />
              </div> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* <div className="flex flex-col gap-2 sm:gap-[14px]">
                <h2 className="mb-1 sm:mb-2 font-[500] text-[14px] sm:text-[16px] leading-[100%] text-[#696F79]">
                  NAME OF NEXT OF KIN
                </h2>
                <InputField
                  name="next_of_kin"
                  value={formData.next_of_kin}
                  onChange={updateFormData}
                  placeholder="eg John Doe"
                />
              </div>

              <div className="flex flex-col gap-2 sm:gap-[14px]">
                <h2 className="mb-1 sm:mb-2 font-[500] text-[14px] sm:text-[16px] leading-[100%] text-[#696F79]">
                  ADDRESS OF NEXT OF KIN
                </h2>
                <InputField
                  name="next_of_kin_address"
                  value={formData.next_of_kin_address}
                  onChange={updateFormData}
                  placeholder="eg Lekki Lagos"
                />
              </div> */}

              {/* <div className="flex flex-col gap-2 sm:gap-[14px]">
                <h2 className="mb-1 sm:mb-2 font-[500] text-[14px] sm:text-[16px] leading-[100%] text-[#696F79]">
                  NAME OF GUARANTOR
                </h2>
                <InputField
                  name="guarantor"
                  value={formData.guarantor}
                  onChange={updateFormData}
                  placeholder="John Doe"
                />
              </div>

              <div className="flex flex-col gap-2 sm:gap-[14px]">
                <h2 className="mb-1 sm:mb-2 font-[500] text-[14px] sm:text-[16px] leading-[100%] text-[#696F79]">
                  ADDRESS OF GUARANTOR
                </h2>
                <InputField
                  name="guarantor_address"
                  value={formData.guarantor_address}
                  onChange={updateFormData}
                  placeholder="Lekki Lagos"
                />
              </div> */}

              {/* <div className="flex flex-col gap-2 sm:gap-[14px]">
                <h2 className="mb-1 sm:mb-2 font-[500] text-[14px] sm:text-[16px] leading-[100%] text-[#696F79]">
                  GUARANTOR&apos;S OCCUPATION/PROFESSION
                </h2>
                <InputField
                  name="guarantor_occupation"
                  value={formData.guarantor_occupation}
                  onChange={updateFormData}
                  placeholder="Doctor"
                />
              </div>

              <div className="flex flex-col gap-2 sm:gap-[14px]">
                <h2 className="mb-1 sm:mb-2 font-[500] text-[14px] sm:text-[16px] leading-[100%] text-[#696F79]">
                  GUARANTOR&apos;S PHONE NUMBER
                </h2>
                <InputField
                  name="guarantor_phone_number"
                  value={formData.guarantor_phone_number}
                  onChange={updateFormData}
                  placeholder="08123456789"
                  type="number"
                />
              </div> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex flex-col gap-2 sm:gap-[14px]">
                <h2 className="mb-1 sm:mb-2 font-[500] text-[14px] sm:text-[16px] leading-[100%] text-[#696F79]">
                  WHAT IS YOUR ANNUAL INCOME
                </h2>
                <InputField
                  name="annual_income"
                  value={formData.annual_income}
                  onChange={updateFormData}
                  placeholder="500000"
                  type="number"
                />
              </div>
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex flex-col gap-2 sm:gap-[14px]">
                <h2 className="mb-1 sm:mb-2 font-[500] text-[14px] sm:text-[16px] leading-[100%] text-[#696F79]">
                  WHO WILL BE RESPONSIBLE FOR THE PAYMENT OF THE RENT
                </h2>
                <InputField
                  value={formData.rentPayer}
                  onChange={(value) => handleChange("rentPayer", value)}
                  placeholder="John Doe"
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="w-full max-w-6xl flex flex-col mt-2 sm:mt-2 gap-3 sm:gap-[14px]">
        <div className="flex justify-start gap-2 sm:gap-[14px] items-center">
          <input
            type="checkbox"
            name="accept_terms_and_condition"
            checked={formData.accept_terms_and_condition}
            onChange={updateFormData}
          />
          <span className="font-[500] text-[14px] sm:text-[16px] leading-[100%] text-[#696F79]">
            I agree to terms and conditions
          </span>
        </div>
        <div className="w-full max-w-[426px]">
          <ColouredButton title="Complete KYC" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Form3;
