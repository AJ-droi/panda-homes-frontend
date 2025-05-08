"use client";
/*eslint-disable */
import React from "react";
import InputField from "@/components/InputField";
import ColouredButton from "@/components/ColouredButton";
// import { TenantFormData } from "@/app/tenant-signup/page";
// import NationalityInput from "@/components/NatonalityInput";
import Image from "next/image";
import { BackArrow } from "@/layout/svgIconPaths";

interface Form2Props {
  formData: any;
  updateFormData: (data: Partial<any>) => void;
  nextStep: () => void;
  prevStep?: () => void;
  handleSubmit?: any;
}

const Form2: React.FC<Form2Props> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
  handleSubmit
}) => {
  // const handleChange = (field: keyof TenantFormData, value: string) => {
  //   updateFormData({ [field]: value });
  // };

  return (
    <div
      className="bg-white min-h-screen rounded-lg py-4 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12"
      style={{ fontFamily: "Inter" }}
    >
      <div className="flex justify-between items-end text-[16px] font-[600] text-[#BDBDBD] leading-[100%]">
        <span className="flex gap-[9px] text-[#8692A6] hover:cursor-pointer" onClick={prevStep}>
          <BackArrow /> Back
        </span>{" "}
        <span>STEP 02/02</span>
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
          <div className="w-full flex gap-4 sm:gap-6 md:gap-[28px] flex-col">
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
           

              <div className="flex flex-col gap-[14px]">
                <h2
                  className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]"
                  style={{ fontFamily: "Inter" }}
                >
                  NAME OF EMPLOYERS/BUSINESS
                </h2>
                <InputField
                  name="employers_name"
                  value={formData.presentAddress}
                  onChange={updateFormData}
                  placeholder="eg John Doe, Lekki Phase 1, Lagos"
                />
              </div>

              <div className="flex flex-col gap-[14px]">
                <h2
                  className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]"
                  style={{ fontFamily: "Inter" }}
                >
                  ADDRESS OF EMPLOYERS/BUSINESS
                </h2>
                <InputField
                  name="employers_address"
                  value={formData.presentAddress}
                  onChange={updateFormData}
                  placeholder="eg John Doe, Lekki Phase 1, Lagos"
                />
              </div>
            </div> */}

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
                />
              </div> */}

              <div className="flex flex-col gap-[14px]">
                <h2
                  className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]"
                  style={{ fontFamily: "Inter" }}
                >
                  STATE OF ORIGIN
                </h2>
                <InputField
                  name="state_of_origin"
                  value={formData.state_of_origin}
                  onChange={updateFormData}
                  placeholder="Lagos state"
                />
              </div>

              {/* <div className="flex flex-col gap-[14px]">
                <h2
                  className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]"
                  style={{ fontFamily: "Inter" }}
                >
                  LGA OF ORIGIN
                </h2>
                <InputField
                  name="lga_of_origin"
                  value={formData.lga_of_origin}
                  onChange={updateFormData}
                  placeholder="Ikeja"
                />
              </div> */}

              {/* <div className="flex flex-col gap-[14px]">
                <h2
                  className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]"
                  style={{ fontFamily: "Inter" }}
                >
                 Home Town
                </h2>
                <InputField
                  name="home_town"
                  value={formData.home_town}
                  onChange={updateFormData}
                  placeholder="Surulere"
                />
              </div> */}

              <div className="flex flex-col gap-[14px]">
                <h2
                  className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]"
                  style={{ fontFamily: "Inter" }}
                >
                  RELIGION
                </h2>
                <InputField
                  name="religion"
                  value={formData.religion}
                  onChange={updateFormData}
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
                  name="marital_status"
                  value={formData.marital_status}
                  onChange={updateFormData}
                  placeholder="Single"
                />
              </div>

              <div className="flex flex-col gap-[14px]">
                <h2
                  className="mb-2 font-[500] text-[16px] leading-[100%] text-[#696F79]"
                  style={{ fontFamily: "Inter" }}
                >
                  NAME OF SPOUSE (IF MARRIED)
                </h2>
                <InputField
                  name="name_of_spouse"
                  value={formData.name_of_spouse}
                  onChange={updateFormData}
                  placeholder="eg Jane Doe"
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
                <InputField
                  name="nationality"
                  value={formData.nationality}
                  onChange={updateFormData}
                />
              </div>

            
            </div>

           

            {/* <div className="flex gap-10 justify-between">
            <ColouredButton title="Previous" onClick={prevStep} />
          </div> */}
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center flex flex-col mt-2 sm:mt-2 gap-3 sm:gap-[14px]">
      
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

export default Form2;
