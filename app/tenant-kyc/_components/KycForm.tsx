"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import {
  KycFormData,
  kycSchema,
  Gender,
  MaritalStatus,
  EmploymentStatus,
} from "./data";
import Stepper from "./Stepper";
import StepContent from "./StepContent";
import FormButtons from "./FormButtons";
import AlertMessage from "./AlertMessage";

const steps = [
  { label: "Personal Information" },
  { label: "Employment & Income Information" },
  { label: "References" },
];

export default function KycForm() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const methods = useForm<KycFormData>({
    resolver: zodResolver(kycSchema),
    mode: "onBlur",
    defaultValues: {
      nationality: "Nigerian",
      religion: "Christianity",
      marital_status: MaritalStatus.SINGLE,
      state_of_origin: "Lagos",
      local_government_area: "Eti-Osa",
      gender: Gender.MALE,
      employment_status: EmploymentStatus.EMPLOYED,
    },
  });

  const isRefValid = !!ref && ref.trim() !== "";

  const onSubmit = async (data: KycFormData) => {
    if (!isRefValid) return;

    data = { ...data, admin_id: ref } as any;

    console.log("Form data being submitted:", data);

    setIsLoading(true);
    setAlert(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/tenant-kyc`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
          }),
        }
      );

      if (response.ok) {
        setAlert({
          type: "success",
          message:
            "KYC form submitted successfully! We'll review your information and get back to you soon.",
        });

        methods.reset();
        setStep(0);
      } else {
        const errorData = await response.json();
        setAlert({
          type: "error",
          message:
            errorData.message || "Failed to submit KYC form. Please try again.",
        });
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setStep(stepIndex);
  };

  const handleBack = () => {
    setStep((s) => Math.max(0, s - 1));
  };

  const handleNext = () => {
    setStep((s) => Math.min(steps.length - 1, s + 1));
  };

  const handleSubmit = () => {
    methods.handleSubmit(onSubmit)();
  };

  const closeAlert = () => {
    setAlert(null);
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-center py-8 px-2">
      <div className="w-full max-w-6xl mx-auto pt-8 md:pt-16 pb-8 md:pb-16 px-2 md:px-8">
        <div className="flex flex-col mb-8">
          <Image
            src="/landingPage/logo.svg"
            alt="Panda Logo"
            width={120}
            height={40}
            className="mb-2"
          />
        </div>

        <Stepper
          steps={steps}
          currentStep={step}
          onStepClick={handleStepClick}
        />

        {!isRefValid && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4 text-center">
            Missing or invalid reference ID. Please use a valid link.
          </div>
        )}

        {alert && (
          <AlertMessage
            type={alert.type}
            message={alert.message}
            onClose={closeAlert}
          />
        )}

        <FormProvider {...methods}>
          <form className="space-y-4">
            <StepContent
              step={step}
              methods={methods}
              isRefValid={isRefValid}
            />

            <FormButtons
              step={step}
              totalSteps={steps.length}
              isRefValid={isRefValid}
              onBack={handleBack}
              onNext={handleNext}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
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
