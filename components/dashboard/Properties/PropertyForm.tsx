/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useState } from "react";
import Dropdown2 from "@/components/Dropdown2";
import InputField from "@/components/InputField";
import ColouredButton from "@/components/ColouredButton";

interface propertyFormProps {
  onClose?: () => void;
}

const PropertyForm: React.FC<propertyFormProps> = ({ onClose }) => {
  // Form state
  const [propertyName, setPropertyName] = useState("");
  const [rentalPrice, setRentalPrice] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [serviceCharge, setServiceCharge] = useState("");
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
  const propertyTypeOptions = [
    "Apartment",
    "House",
    "Condo",
    "Townhouse",
    "Studio",
  ];
  const bathroomOptions = ["1", "2", "3", "4", "5+"];
  const bedroomOptions = ["1", "2", "3", "4", "5+"];
  const paymentFrequencyOptions = ["Monthly", "Weekly", "Yearly"];
  const leaseDurationOptions = [
    "6 months",
    "1 year",
    "2 years",
    "Month-to-month",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full p-4 md:p-6 shadow-2xl bg-white rounded-lg">
      <h1
        className="text-2xl md:text-3xl leading-[150%] font-bold mb-4 md:mb-6 text-[#000000]"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        Add a new property
      </h1>

      <main className=" text-black">
        <form onSubmit={handleSubmit}>
          <section className="mb-4 md:mb-6 gap-2 md:gap-[12.14px] flex flex-col">
            <label
              className="block text-sm font-medium mb-1 md:mb-2"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Property name
            </label>
            <InputField
              placeholder="Enter Property Name"
              value={propertyName}
              onChange={setPropertyName}
            />
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="gap-2 md:gap-[12.14px] flex flex-col">
              <label
                className="block text-sm font-medium mb-1 md:mb-2"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Preferred Location
              </label>
              <Dropdown2
                options={locationOptions}
                placeholder="Select Location"
              />
            </div>
            <div className="gap-2 md:gap-[12.14px] flex flex-col">
              <label
                className="block text-sm font-medium mb-1 md:mb-2"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Property Type
              </label>
              <Dropdown2
                options={propertyTypeOptions}
                placeholder="Select Property Type"
              />
            </div>
            <div className="gap-2 md:gap-[12.14px] flex flex-col">
              <label
                className="block text-sm font-medium mb-1 md:mb-2"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                No. of Bathrooms
              </label>
              <Dropdown2
                options={bathroomOptions}
                placeholder="Select no. of Bathrooms"
              />
            </div>
            <div className="gap-2 md:gap-[12.14px] flex flex-col">
              <label
                className="block text-sm font-medium mb-1 md:mb-2"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                No. of Bedrooms
              </label>
              <Dropdown2
                options={bedroomOptions}
                placeholder="Select no. of Bedrooms"
              />
            </div>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="gap-2 md:gap-[12.14px] flex flex-col">
              <label
                className="block text-sm font-medium mb-1 md:mb-2"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Rental Price
              </label>
              <InputField
                placeholder="Enter Your Price"
                value={rentalPrice}
                onChange={setRentalPrice}
                type="number"
              />
            </div>
            <div className="gap-2 md:gap-[12.14px] flex flex-col">
              <label
                className="block text-sm font-medium mb-1 md:mb-2"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Payment Frequency
              </label>
              <Dropdown2
                options={paymentFrequencyOptions}
                placeholder="Select payment frequency"
              />
            </div>
            <div className="gap-2 md:gap-[12.14px] flex flex-col">
              <label
                className="block text-sm font-medium mb-1 md:mb-2"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Lease Duration
              </label>
              <Dropdown2
                options={leaseDurationOptions}
                placeholder="Select lease duration"
              />
            </div>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="gap-2 md:gap-[12.14px] flex flex-col">
              <label
                className="block text-sm font-medium mb-1 md:mb-2"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Security Deposit
              </label>
              <InputField
                placeholder="Enter amount"
                value={securityDeposit}
                onChange={setSecurityDeposit}
                type="number"
              />
            </div>
            <div className="gap-2 md:gap-[12.14px] flex flex-col">
              <label
                className="block text-sm font-medium mb-1 md:mb-2"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Service Charge
              </label>
              <InputField
                placeholder="Enter amount"
                value={serviceCharge}
                onChange={setServiceCharge}
                type="number"
              />
            </div>
          </section>

          <section className="mb-4 md:mb-6 gap-2 md:gap-[12.14px] flex flex-col">
            <label
              className="block text-sm font-medium mb-1 md:mb-2"
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

          {/* <section className="flex justify-center items-center mb-6 md:mb-8">
            <div className="gap-2 md:gap-[12.14px] w-full sm:w-[250px] h-auto sm:h-[232px] flex flex-col">
              <label
                className="block text-sm font-medium mb-1 md:mb-2"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Upload Image (Optional)
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
                  Maximum size of image 5mb
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
          </section> */}

          <section className="flex flex-col-reverse sm:flex-row justify-end gap-3 md:gap-4">
            <div className="w-full sm:w-auto">
              <ColouredButton title="Save" />
            </div>
          </section>
        </form>
      </main>
    </div>
  );
};

export default PropertyForm;
