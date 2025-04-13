/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import Dropdown2 from "@/components/Dropdown2";
import ColouredButton from "@/components/ColouredButton";
import CalendarDropdown from "../CalendarDropdown";

interface propertyFormProps {
  onClose?: () => void;
}

const TenantServiceRequestForm: React.FC<propertyFormProps> = ({ onClose }) => {
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  // Dropdown options
  const locationOptions = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Miami",
  ];
  const categoryOptions = ["Plumbing", "Electricity", "Leaking Roof", "Other"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Blurry overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal container */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="w-full px-6 py-8 sm:px-12 sm:py-10">
              <h1
                className="text-[20px] md:text-[20px] leading-[150%] font-[500] mb-4 md:mb-6 text-[#785DBA]"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Submit a New Service Request
              </h1>

              <main className="text-black">
                <form onSubmit={handleSubmit}>
                  <section className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
                    {/* Form fields remain the same */}
                    <div className="gap-2 md:gap-[12.14px] flex flex-col">
                      <Dropdown2
                        options={locationOptions}
                        placeholder="Select Your Property"
                      />
                    </div>
                    <div className="gap-2 md:gap-[12.14px] flex flex-col">
                      <Dropdown2
                        options={categoryOptions}
                        placeholder="Issue Category"
                      />
                    </div>
                    <div className="gap-2 md:gap-[12.14px] flex flex-col">
                      <CalendarDropdown placeholder="Effective Date" />
                    </div>
                  </section>

                  <section className="mb-4 md:mb-6 gap-2 md:gap-[12.14px] flex flex-col">
                    <label
                      className="block text-[15px] font-medium mb-1 md:mb-2"
                      style={{ fontFamily: "Plus Jakarta Sans" }}
                    >
                      Additional Notes
                    </label>
                    <textarea
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder="Enter your Message here"
                      className="w-full p-2 md:p-3 border border-[#262626] text-[#000000] rounded-lg focus:outline-none focus:border-[#785DBA] transition-colors text-xs md:text-[11.44px] leading-[150%] font-[500] min-h-[100px]"
                      style={{ fontFamily: "Plus Jakarta Sans" }}
                    />
                  </section>

                  <section className="flex justify-center items-center mb-6 md:mb-8">
                    <div className="gap-2 md:gap-[12.14px] w-full sm:w-[250px] h-auto sm:h-[232px] flex flex-col">
                      <label
                        className="block text-sm font-medium mb-1 md:mb-2"
                        style={{ fontFamily: "Plus Jakarta Sans" }}
                      >
                        Upload Attachments (Optional)
                      </label>
                      <div className="border-1 border-dashed border-[#785DBA] rounded-2xl p-4 md:p-6 text-center">
                        <p
                          className="text-[#785DBA] text-sm md:text-base mb-1 md:mb-2"
                          style={{ fontFamily: "Plus Jakarta Sans" }}
                        >
                          Drop Your Files Here
                        </p>
                        <p
                          className="text-xs md:text-[16px] font-[400] text-[#A4A8AB] mb-3 md:mb-4"
                          style={{ fontFamily: "Montserrat" }}
                        >
                          Maximum size of image 1mb
                        </p>
                        <label className="inline-block px-3 py-1 md:px-4 md:py-2 bg-white text-[#785DBA] rounded-2xl cursor-pointer border-1 hover:text-white border-[#785DBA] hover:bg-[#6a4fa8] transition-colors text-sm md:text-base">
                          Browse
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept="image/*"
                            multiple
                          />
                        </label>
                      </div>
                    </div>
                  </section>

                  <section className="flex flex-col-reverse sm:flex-row justify-between gap-3 md:gap-4">
                    <div className="w-full sm:w-auto">
                      <ColouredButton onClick={onClose}>Cancel</ColouredButton>
                    </div>
                    <div className="w-full sm:w-auto">
                      <ColouredButton onClick={onClose}>Submit</ColouredButton>
                    </div>
                  </section>
                </form>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantServiceRequestForm;
