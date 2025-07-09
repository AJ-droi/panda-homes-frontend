"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";

const STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];
const LGAS = ["Eti-Osa", "Ikeja", "Surulere", "Kosofe", "Alimosho", "Other"];
const MARITAL_STATUS = ["Single", "Married", "Divorced", "Widowed"];
const ACCOMODATION_TYPES = [
  "Flat",
  "Self-Contain",
  "Duplex",
  "Bungalow",
  "Other",
];
const RELIGIONS = ["Christianity", "Islam", "Traditional", "Other"];
const NATIONALITIES = ["Nigerian", "Other"];
const GENDERS = ["Male", "Female", "Other"];

const kycSchema = z.object({
  // Screenshot fields
  first_name: z.string().min(1, "Required"),
  last_name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone_number: z.string().min(1, "Required"),
  date_of_birth: z.string().min(1, "Required"),
  gender: z.string().min(1, "Required"),
  current_residence: z.string().min(1, "Required"),
  state_of_origin: z.string().min(1, "Required"),
  lga_of_origin: z.string().min(1, "Required"),
  marital_status: z.string().min(1, "Required"),
  religion: z.string().min(1, "Required"),
  nationality: z.string().min(1, "Required"),
  spouse_name_contact: z.string().optional(),
  // Entity fields for backend
  former_house_address: z.string().optional(),
  reason_for_leaving: z.string().optional(),
  former_accomodation_type: z.string().optional(),
  occupation: z.string().min(1, "Required"),
  employers_name: z.string().min(1, "Required"),
  employers_address: z.string().min(1, "Required"),
  monthly_income: z.string().min(1, "Required"),
  next_of_kin: z.string().optional(),
  next_of_kin_address: z.string().optional(),
  guarantor: z.string().optional(),
  guarantor_address: z.string().optional(),
  guarantor_occupation: z.string().optional(),
  guarantor_phone_number: z.string().optional(),
  accept_terms_and_condition: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

type KycFormData = z.infer<typeof kycSchema>;

const steps = [
  { label: "Personal Information" },
  { label: "Employment & Income Information" },
  { label: "References" },
];

export default function TenantKycPage() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  const [step, setStep] = useState(0);
  const methods = useForm<KycFormData>({
    resolver: zodResolver(kycSchema),
    mode: "onTouched",
    defaultValues: {
      nationality: "Nigerian",
      religion: "Christianity",
      marital_status: "Single",
      state_of_origin: "Lagos",
      lga_of_origin: "Eti-Osa",
      gender: "Male",
      former_accomodation_type: "Flat",
      // accept_terms_and_condition: undefined,
    },
  });

  const isRefValid = !!ref && ref.trim() !== "";

  const onSubmit = (data: KycFormData) => {
    if (!isRefValid) return;
    alert("Submitted! " + JSON.stringify(data));
  };

  const Stepper = () => (
    <div className="flex mb-8 border-b border-gray-200">
      {steps.map((s, i) => (
        <div
          key={s.label}
          className={`px-4 py-2 cursor-pointer border-b-2 transition-colors duration-200 ${
            i === step
              ? "border-purple-600 text-purple-700 font-bold"
              : "border-transparent text-gray-400 hover:text-purple-500"
          }`}
          onClick={() => setStep(i)}
        >
          {s.label}
        </div>
      ))}
    </div>
  );

  const Input = ({
    label,
    name,
    type = "text",
    placeholder = "",
    ...rest
  }: any) => (
    <div className="mb-4">
      <label className="block font-semibold text-gray-800 mb-1 text-base">
        {label}
      </label>
      <input
        {...methods.register(name)}
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-colors duration-200 placeholder-gray-400"
        disabled={!isRefValid}
        {...rest}
      />
      <p className="text-red-500 text-xs mt-1 min-h-[18px]">
        {(methods.formState.errors as any)[name]?.message}
      </p>
    </div>
  );

  const Select = ({
    label,
    name,
    options,
    placeholder = "Select...",
    ...rest
  }: any) => (
    <div className="mb-4">
      <label className="block font-semibold text-gray-800 mb-1 text-base">
        {label}
      </label>
      <select
        {...methods.register(name)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-colors duration-200"
        disabled={!isRefValid}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <p className="text-red-500 text-xs mt-1 min-h-[18px]">
        {(methods.formState.errors as any)[name]?.message}
      </p>
    </div>
  );

  const StepContent = () => {
    switch (step) {
      case 0:
        return (
          <>
            <h2 className="text-2xl font-bold mb-6 mt-2">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input
                label="First Name *"
                name="first_name"
                placeholder="John Doe"
              />
              <Input
                label="Last Name *"
                name="last_name"
                placeholder="John Doe"
              />
              <Input
                label="E-mail Address *"
                name="email"
                type="email"
                placeholder="your_email@example.com"
              />
              <Input
                label="Phone Number *"
                name="phone_number"
                placeholder="(___) ___-____"
              />
              <Controller
                control={methods.control}
                name="date_of_birth"
                render={({ field }) => (
                  <div className="mb-4">
                    <label className="block font-semibold text-gray-800 mb-1 text-base">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      {...field}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-colors duration-200 placeholder-gray-400"
                      disabled={!isRefValid}
                    />
                    <p className="text-red-500 text-xs mt-1 min-h-[18px]">
                      {
                        methods.formState.errors.date_of_birth
                          ?.message as string
                      }
                    </p>
                  </div>
                )}
              />
              <Select label="Gender *" name="gender" options={GENDERS} />
              <Input
                label="Current Residence *"
                name="current_residence"
                placeholder="Ibeju-Lekki"
              />
              <Select
                label="State of Origin *"
                name="state_of_origin"
                options={STATES}
              />
              <Select
                label="Local Government Area *"
                name="lga_of_origin"
                options={LGAS}
              />
              <Select
                label="Marital Status *"
                name="marital_status"
                options={MARITAL_STATUS}
              />
              <Select label="Religion *" name="religion" options={RELIGIONS} />
              <Select
                label="Nationality *"
                name="nationality"
                options={NATIONALITIES}
              />
              <Input
                label="Spouse's Name & Contact"
                name="spouse_name_contact"
                placeholder="Magna"
              />
            </div>
          </>
        );
      case 1:
        return (
          <>
            <h2 className="text-2xl font-bold mb-6 mt-2">
              Employment & Income Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input
                label="Occupation *"
                name="occupation"
                placeholder="Product Analyst"
              />
              <Input
                label="Employer's Name *"
                name="employers_name"
                placeholder="Ano Uche"
              />
              <Input
                label="Employer's Address *"
                name="employers_address"
                placeholder="Ikoyi"
              />
              <Input
                label="Monthly Net Income *"
                name="monthly_income"
                type="number"
                placeholder="10,000,000"
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-2xl font-bold mb-6 mt-2">References</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input
                label="Next of Kin"
                name="next_of_kin"
                placeholder="Albert Flores"
              />
              <Input
                label="Next of Kin Address"
                name="next_of_kin_address"
                placeholder="Lekki Phase 1"
              />
              <Input
                label="Guarantor"
                name="guarantor"
                placeholder="Albert Flores"
              />
              <Input
                label="Guarantor Address"
                name="guarantor_address"
                placeholder="Lekki Phase 1"
              />
              <Input
                label="Guarantor Occupation"
                name="guarantor_occupation"
                placeholder="Employer"
              />
              <Input
                label="Guarantor Phone Number"
                name="guarantor_phone_number"
                placeholder="(___) ___-____"
              />
              <div className="col-span-2 flex items-center mt-4">
                <input
                  type="checkbox"
                  {...methods.register("accept_terms_and_condition")}
                  id="accept_terms_and_condition"
                  disabled={!isRefValid}
                  className="mr-2 w-4 h-4 accent-purple-600"
                />
                <label
                  htmlFor="accept_terms_and_condition"
                  className="text-base text-gray-700"
                >
                  I accept the{" "}
                  <a href="#" className="text-purple-600 underline">
                    terms and conditions
                  </a>{" "}
                  *
                </label>
              </div>
              <p className="text-red-500 text-xs col-span-2 min-h-[18px]">
                {
                  methods.formState.errors.accept_terms_and_condition
                    ?.message as string
                }
              </p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f5f6fa] flex flex-col items-center justify-center py-8 px-2">
      <div className="w-full max-w-4xl mx-auto pt-8 md:pt-16 pb-8 md:pb-16 px-2 md:px-8">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/landingPage/logo.svg"
            alt="Panda Logo"
            width={120}
            height={40}
            className="mb-2"
          />
        </div>
        <Stepper />
        {!isRefValid && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4 text-center">
            Missing or invalid reference ID. Please use a valid link.
          </div>
        )}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <StepContent />
            <div className="flex justify-between mt-8">
              <button
                type="button"
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold border border-gray-300 hover:bg-gray-200 transition-colors duration-200"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                Back
              </button>
              {step < steps.length - 1 ? (
                <button
                  type="button"
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold shadow hover:bg-purple-700 transition-colors duration-200"
                  onClick={() =>
                    setStep((s) => Math.min(steps.length - 1, s + 1))
                  }
                  disabled={!isRefValid}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold shadow hover:bg-purple-700 transition-colors duration-200"
                  disabled={!isRefValid}
                >
                  Save
                </button>
              )}
            </div>
          </form>
        </FormProvider>
        <div className="text-center mt-8 text-sm text-gray-500">
          Stuck on the form?{" "}
          <a href="#" className="text-purple-600 underline">
            Contact Us!
          </a>
        </div>
      </div>
    </div>
  );
}
