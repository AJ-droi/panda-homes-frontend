// /* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import Dropdown2 from "@/components/Dropdown2";
import InputField from "@/components/InputField";
import ColouredButton from "@/components/ColouredButton";
import CalendarDropdown from "@/components/CalendarDropdown";

interface addTenantProps {
  onClose?: () => void;
}

const AddTenantForm: React.FC<addTenantProps> = ({}) => {
  const [email, setEmail] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const propertyOptions = ["Lekki", "Ajah", "Uyo", "Epe", "5th Avenue"];
  const paymentFrequencyOptions = ["Monthly", "Weekly", "Yearly"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full p-4 md:p-6 shadow-2xl bg-white rounded-lg">
      <h1
        className="text-2xl md:text-3xl leading-[150%] font-bold mb-4 md:mb-6 text-[#000000]"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        Register a new Tenant
      </h1>

      <main className=" text-black">
        <form onSubmit={handleSubmit}>
          <section className="mb-4 md:mb-6 gap-2 md:gap-[12.14px] flex flex-col">
            <label
              className="block text-sm font-medium mb-1 md:mb-2"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Property
            </label>
            <Dropdown2
              options={propertyOptions}
              placeholder="Select Property"
              onChange={() => console.log('hello')}
            />
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
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
                onChange={() => console.log('hello')}
              />
            </div>
            <div className="gap-2 md:gap-[12.14px] flex flex-col">
              <label
                className="block text-sm font-medium mb-1 md:mb-2"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Lease Start Date
              </label>
              <CalendarDropdown
                selectedDate={selectedStartDate}
                onChange={setSelectedStartDate}
                placeholder="Select lease start date"
              />
            </div>
            <div className="gap-2 md:gap-[12.14px] flex flex-col">
              <label
                className="block text-sm font-medium mb-1 md:mb-2"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Lease End Date
              </label>
              <CalendarDropdown
                selectedDate={selectedEndDate}
                onChange={setSelectedEndDate}
                placeholder="Select lease end date"
              />
            </div>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-1 gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="gap-2 md:gap-[12.14px] flex flex-col">
              <label
                className="block text-sm font-medium mb-1 md:mb-2"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Email Address
              </label>
              <InputField
                placeholder="Enter email address"
                value={email}
                onChange={setEmail}
                type="email"
              />
            </div>
          </section>

          <section className="flex flex-col-reverse sm:flex-row justify-end gap-3 md:gap-4">
            <div className="w-full sm:w-auto">
              <ColouredButton title="Send Registration Link" />
            </div>
          </section>
        </form>
      </main>
    </div>
  );
};

export default AddTenantForm;
