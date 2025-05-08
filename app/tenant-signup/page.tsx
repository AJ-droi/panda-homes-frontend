"use client";
import React from "react";
import Head from "next/head";
// import Form1 from "@/components/tenantsSection/tenantRegistrationForms/RegistrationForm1";
// import Form2 from "@/components/tenantsSection/tenantRegistrationForms/RegistrationForm2";
// import Form3 from "@/components/tenantsSection/tenantRegistrationForms/RegistrationForm3";
// import SuccessForm from "@/components/tenantsSection/tenantRegistrationForms/SignupSuccesComponent";

export interface TenantFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  accommodationType: string;
  presentAddress: string;
  reasonForLeaving: string;
  dateMovedIn: string;
  numberOfPersons: string;
  profession: string;
  nationality: string;
  maritalStatus: string;
  employerName: string;
  employerAddress: string;
  state: string;
  religion: string;
  spouseName: string;
  spouseEmployer: string;
  nextOfKin: string;
  annualIncome: string;
  rentPayer: string;
  signature: string;
  signatureDate: string;
  guarantorNameAndAddress: string;
  guarantorOccupationAndPhone: string;
}

const TenantRegistration = () => {
  // const [currentStep, setCurrentStep] = useState(1);
  // const [formData, setFormData] = useState<TenantFormData>({
  //   fullName: "",
  //   phoneNumber: "",
  //   email: "",
  //   accommodationType: "",
  //   presentAddress: "",
  //   reasonForLeaving: "",
  //   dateMovedIn: "",
  //   numberOfPersons: "",
  //   profession: "",
  //   nationality: "",
  //   maritalStatus: "",
  //   employerName: "",
  //   employerAddress: "",
  //   state: "",
  //   religion: "",
  //   spouseName: "",
  //   spouseEmployer: "",
  //   nextOfKin: "",
  //   annualIncome: "",
  //   rentPayer: "",
  //   signature: "",
  //   signatureDate: "",
  //   guarantorNameAndAddress: "",
  //   guarantorOccupationAndPhone: "",
  // });

  // const updateFormData = (newData: Partial<TenantFormData>) => {
  //   setFormData(prev => ({ ...prev, ...newData }));
  // };

  // const nextStep = () => setCurrentStep(prev => prev + 1);
  // const prevStep = () => setCurrentStep(prev => prev - 1);

  // const renderStep = () => {
  //   // switch (currentStep) {
  //   //   case 1:
  //   //     return <Form1 formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
  //   //   case 2:
  //   //     return <Form2 formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
  //   //   case 3:
  //   //     return <Form3 formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
  //   //     case 4:
  //   //     return <SuccessForm />;
  //   //   default:
  //   //     return <Form1 formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
  //   }
  // };

  return (
    <div className="border-20 bg-[#c0bdfc] border-[#c0bdfc] flex justify-center items-center flex-col min-h-screen">
      <Head>
        <title>Tenant Registration | Panda App</title>
        <meta name="description" content="Tenant Registration page" />
      </Head>

      {/* <div className="w-full min-h-screen flex rounded-[10px] justify-center item-center">
        <div className="w-full rounded-[10px] mx-auto">          
          {renderStep()}
        </div>
      </div> */}
    </div>
  );
  
};

//py-10 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40

export default TenantRegistration;