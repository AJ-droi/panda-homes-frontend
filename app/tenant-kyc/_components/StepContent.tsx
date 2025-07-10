"use client";
import { UseFormReturn } from "react-hook-form";

import {
  KycFormData,
  EmploymentStatus,
  GENDERS,
  STATES,
  LGAS,
  MARITAL_STATUS,
  RELIGIONS,
  NATIONALITIES,
  EMPLOYMENT_STATUS,
} from "./data";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import DateInput from "./DateInput";

interface StepContentProps {
  step: number;
  methods: UseFormReturn<KycFormData>;
  isRefValid: boolean;
}

export default function StepContent({
  step,
  methods,
  isRefValid,
}: StepContentProps) {
  const employmentStatus = methods.watch("employment_status");
  const isEmployed = employmentStatus === EmploymentStatus.EMPLOYED;

  switch (step) {
    case 0:
      return (
        <>
          <h2 className="text-2xl md:text-4xl font-bold mb-6 mt-10 text-gray-700">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1 md:gap-y-2">
            <FormInput
              key="first_name"
              label="First Name *"
              name="first_name"
              placeholder="John Doe"
              methods={methods}
              disabled={!isRefValid}
            />
            <FormInput
              key="last_name"
              label="Last Name *"
              name="last_name"
              placeholder="John Doe"
              methods={methods}
              disabled={!isRefValid}
            />
            <FormInput
              key="email"
              label="E-mail Address"
              name="email"
              type="email"
              placeholder="your_email@example.com"
              methods={methods}
              disabled={!isRefValid}
            />
            <FormInput
              key="phone_number"
              label="Phone Number"
              name="phone_number"
              placeholder="(___) ___-____"
              methods={methods}
              disabled={!isRefValid}
            />
            <DateInput
              key="date_of_birth"
              label="Date of Birth *"
              name="date_of_birth"
              methods={methods}
              disabled={!isRefValid}
            />
            <FormSelect
              key="gender"
              label="Gender *"
              name="gender"
              options={GENDERS}
              methods={methods}
              disabled={!isRefValid}
            />
            <FormInput
              key="current_residence"
              label="Current Residence *"
              name="current_residence"
              placeholder="Ibeju-Lekki"
              methods={methods}
              disabled={!isRefValid}
            />
            <FormSelect
              key="state_of_origin"
              label="State of Origin *"
              name="state_of_origin"
              options={STATES}
              methods={methods}
              disabled={!isRefValid}
            />
            <FormSelect
              key="local_government_area"
              label="Local Government Area *"
              name="local_government_area"
              options={LGAS}
              methods={methods}
              disabled={!isRefValid}
            />
            <FormSelect
              key="marital_status"
              label="Marital Status *"
              name="marital_status"
              options={MARITAL_STATUS}
              methods={methods}
              disabled={!isRefValid}
            />
            <FormSelect
              key="religion"
              label="Religion"
              name="religion"
              options={RELIGIONS}
              methods={methods}
              disabled={!isRefValid}
            />
            <FormSelect
              key="nationality"
              label="Nationality *"
              name="nationality"
              options={NATIONALITIES}
              methods={methods}
              disabled={!isRefValid}
            />
            <FormInput
              key="spouse_name_and_contact"
              label="Spouse's Name & Contact"
              name="spouse_name_and_contact"
              placeholder="Magna"
              methods={methods}
              disabled={!isRefValid}
            />
          </div>
        </>
      );
    case 1:
      return (
        <>
          <h2 className="text-2xl md:text-4xl font-bold mb-6 mt-10 text-gray-700">
            Employment & Income Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1 md:gap-y-2">
            <FormSelect
              key="employment_status"
              label="Employment Status *"
              name="employment_status"
              options={EMPLOYMENT_STATUS}
              methods={methods}
              disabled={!isRefValid}
            />
            <FormInput
              key="occupation"
              label="Occupation *"
              name="occupation"
              placeholder="Product Analyst"
              methods={methods}
              disabled={!isRefValid}
            />
            <FormInput
              key="job_title"
              label="Job Title *"
              name="job_title"
              placeholder="Senior Product Analyst"
              methods={methods}
              disabled={!isRefValid}
            />
            {isEmployed && (
              <>
                <FormInput
                  key="employer_name"
                  label="Employer's Name *"
                  name="employer_name"
                  placeholder="Ano Uche"
                  methods={methods}
                  disabled={!isRefValid}
                />
                <FormInput
                  key="employer_address"
                  label="Employer's Address *"
                  name="employer_address"
                  placeholder="Ikoyi"
                  methods={methods}
                  disabled={!isRefValid}
                />
                <FormInput
                  key="employer_phone_number"
                  label="Employer's Phone Number *"
                  name="employer_phone_number"
                  placeholder="(___) ___-____"
                  methods={methods}
                  disabled={!isRefValid}
                />
              </>
            )}
            <FormInput
              key="monthly_net_income"
              label="Monthly Net Income *"
              name="monthly_net_income"
              type="number"
              placeholder="10,000,000"
              methods={methods}
              disabled={!isRefValid}
            />
          </div>
        </>
      );
    case 2:
      return (
        <>
          <h2 className="text-2xl md:text-4xl font-bold mb-6 mt-10 text-gray-700">
            References
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1 md:gap-y-2">
            <FormInput
              key="reference1_name"
              label="Reference 1 Name *"
              name="reference1_name"
              placeholder="Albert Flores"
              methods={methods}
              disabled={!isRefValid}
            />
            <FormInput
              key="reference1_address"
              label="Reference 1 Address *"
              name="reference1_address"
              placeholder="Lekki Phase 1"
              methods={methods}
              disabled={!isRefValid}
            />
            <FormInput
              key="reference1_relationship"
              label="Reference 1 Relationship *"
              name="reference1_relationship"
              placeholder="Friend"
              methods={methods}
              disabled={!isRefValid}
            />
            <FormInput
              key="reference1_phone_number"
              label="Reference 1 Phone Number *"
              name="reference1_phone_number"
              placeholder="(___) ___-____"
              methods={methods}
              disabled={!isRefValid}
            />
            <FormInput
              key="reference2_name"
              label="Reference 2 Name"
              name="reference2_name"
              placeholder="Albert Flores"
              methods={methods}
              disabled={!isRefValid}
            />
            <FormInput
              key="reference2_address"
              label="Reference 2 Address"
              name="reference2_address"
              placeholder="Lekki Phase 1"
              methods={methods}
              disabled={!isRefValid}
            />
            <FormInput
              key="reference2_relationship"
              label="Reference 2 Relationship"
              name="reference2_relationship"
              placeholder="Friend"
              methods={methods}
              disabled={!isRefValid}
            />
            <FormInput
              key="reference2_phone_number"
              label="Reference 2 Phone Number"
              name="reference2_phone_number"
              placeholder="(___) ___-____"
              methods={methods}
              disabled={!isRefValid}
            />
          </div>
        </>
      );
    default:
      return null;
  }
}
