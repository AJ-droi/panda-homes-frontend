"use client";
/*eslint-disable */
import { useEffect, useState } from "react";
import Form1 from "../tenantsSection/tenantRegistrationForms/RegistrationForm1";
import Form2 from "../tenantsSection/tenantRegistrationForms/RegistrationForm2";
import Form3 from "../tenantsSection/tenantRegistrationForms/RegistrationForm3";
import { useCreateUserKYCMutation } from "@/services/users/mutation";
import { useParams, useRouter } from "next/navigation";

export default function KycHome() {
  const [currentStep, setCurrentStep] = useState(1);
  const {id} = useParams() as {id:string}
//   const user_id = localStorage.getItem('user_id') as string
  const router = useRouter()
  const [error, setError] = useState("");
  const [user_id, setUserId] = useState<string | null>(null);

  const [formData, setFormData] = useState<any>({
    former_house_address: "",
    reason_for_leaving: "",
    former_accomodation_type: "",
    occupation: "",
    employers_name:"",
    employers_address: "",
    state_of_origin: "",
    lga_of_origin:"",
    home_town:"",
    nationality: "",
    religion: "",
    marital_status: "",
    name_of_spouse: "",
    next_of_kin: "",
    next_of_kin_address:"",
    guarantor: "",
    guarantor_address:"",
    guarantor_occupation:"",
    guarantor_phone_number:"",
    annual_income: "",
    accept_terms_and_condition: false
  });


  useEffect(() => {
    const storedId = localStorage.getItem("user_id");
    setUserId(storedId);
  }, []);

  const updateFormData = (e: any) => {
    const { name, type, value, checked } = e.target;
  
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  

//   const handleDateChange = (name: keyof typeof formData, date: Date | null) => {
//     setFormData((prev:any) => ({
//       ...prev,
//       [name]: date,
//     }));
//   };

  const validateStep = () => {
    let requiredFields: any = [];

    if (currentStep === 1) {
      requiredFields = ["former_house_address", "reason_for_leaving", "former_accomodation_type", "occupation", "employers_name", " employers_address"];
    } else if (currentStep === 2) {
      requiredFields = [
        "state_of_origin", "lga_of_origin", "home_town", "nationality",
        "religion", "marital_status", "name_of_spouse"
      ];
    } else if (currentStep === 3) {
      requiredFields = [
        "next_of_kin", "next_of_kin_address", "guarantor", "guarantor_address",
        "guarantor_occupation", "guarantor_phone_number", "annual_income", "accept_terms_and_condition"
      ];
    }

    return requiredFields.every((field:any) => formData[field]?.toString().trim() !== "");
  };

  const nextStep = () => {
    if (!validateStep()) {
      alert("Please complete all required fields before proceeding.");
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const userId = id || user_id as string

   const { mutate} = useCreateUserKYCMutation(userId);

   const handleSubmit = (e:any) => {
    e.preventDefault()

    mutate(formData, {
        onSuccess: () => {
            router.push(`/kyc/success`);
          },
          onError: (error: any) => {
            setError(error.message || "An error occurred during kyc verification.");
          },
    })
   }

  return (
    <div className="min-h-[90vh] bg-gray-50  px-4 sm:px-6 lg:px-8">

{error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {currentStep === 1 && (
        <Form1
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          
        />
      )}

      {currentStep === 2 && (
        <Form2
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {currentStep === 3 && (
        <Form3
          formData={formData}
          updateFormData={updateFormData}
          nextStep={() => {
            if (validateStep()) {
              console.log("Form complete:", formData);
              // Add your form submission logic here
            } else {
              alert("Please complete all required fields.");
            }
          }}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
