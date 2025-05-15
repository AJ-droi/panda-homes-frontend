/*eslint-disable */
"use client";
import React, { useMemo, useState } from "react";
import Dropdown2 from "@/components/Dropdown2";
import InputField from "@/components/InputField";
import ColouredButton from "@/components/ColouredButton";
import CalendarDropdown from "@/components/CalendarDropdown";
import { useCreateUserMutation } from "@/services/users/mutation";
import { useRouter } from "next/navigation";
import { useFetchPropertyDetails } from "@/services/property/query";
import BackButton from "@/components/Backbutton";

interface addTenantProps {
  onClose?: () => void;
}

const AddTenantForm: React.FC<addTenantProps> = ({}) => {
  const router = useRouter();
  const [propertyOptions, setPropertyOptions] = useState<any[]>();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    property_id: "",
    lease_start_date: null as Date | null,
    lease_end_date: null as Date | null,
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    rental_price: "",
    security_deposit: "",
    service_charge: "",
  });

  const { mutate, isPending } = useCreateUserMutation();

  const { data } = useFetchPropertyDetails();

  useMemo(() => {
    if (data) {
      const options = data.map((property: any) => ({
        label: property.property, // shown to the user
        value: property.id, // actual value you want to use
      }));
      setPropertyOptions(options);
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const isCurrencyField = [
      "rental_price",
      "security_deposit",
      "service_charge",
    ].includes(name);
    const rawValue = value.replace(/,/g, "");

    if (isCurrencyField) {
      if (/^\d*$/.test(rawValue)) {
        const formatted = Number(rawValue).toLocaleString("en-NG");
        setFormData((prev) => ({ ...prev, [name]: formatted }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (name: keyof typeof formData, date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      [name]: date,
    }));
  };

  const handleDropdownChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      {
        ...formData,
        lease_start_date: formData.lease_start_date?.toISOString(), // if API expects ISO string
        lease_end_date: formData.lease_end_date?.toISOString(),
        rental_price: parseInt(formData.rental_price.replace(/,/g, "")),
        security_deposit: parseInt(formData.security_deposit.replace(/,/g, "")),
        service_charge: parseInt(formData.service_charge.replace(/,/g, "")),
      },
      {
        onSuccess: () => {
          router.push("/dashboard/tenants");
        },
        onError: (error: any) => {
          setError(error.message || "An error occurred during signup.");
        },
      }
    );
  };

  return (
    <div className="w-full p-4 md:p-6 shadow-2xl bg-white rounded-lg">
         <BackButton />
      <h1 className="text-2xl md:text-3xl leading-[150%] font-bold mb-4 md:mb-6 text-[#000000]">
        Register a new Tenant
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <main className="text-black">
        <form onSubmit={handleSubmit}>
          {/* Property Dropdown */}
          <section className="mb-4 md:mb-6 flex flex-col gap-2">
            <label className="block text-sm font-medium mb-1 md:mb-2">
              Property
            </label>
            <Dropdown2
              name="property_id"
              options={
                propertyOptions || [{ label: "Select an option", value: "" }]
              }
              placeholder="Select Property"
              onChange={handleDropdownChange}
            />
          </section>

          {/* First Name, Last Name, Phone Number */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium mb-2">
                First Name
              </label>
              <InputField
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium mb-2">
                Last Name
              </label>
              <InputField
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <InputField
                name="phone_number"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </div>
          </section>

          {/* Payment Frequency and Lease Dates */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {/* <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium mb-2">
                Payment Frequency
              </label>
              <Dropdown2
                name="paymentFrequency"
                options={["Monthly", "Weekly", "Yearly"]}
                placeholder="Select Payment Frequency"
                onChange={handleDropdownChange}
              />
            </div> */}
            <section className="flex flex-col gap-2">
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <InputField
                name="email"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
              />
            </section>

            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium mb-2">
                Lease Start Date
              </label>
              <CalendarDropdown
                selectedDate={formData.lease_start_date}
                onChange={(date) => handleDateChange("lease_start_date", date)}
                placeholder="Select Lease Start Date"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium mb-2">
                Lease End Date
              </label>
              <CalendarDropdown
                selectedDate={formData.lease_end_date}
                onChange={(date) => handleDateChange("lease_end_date", date)}
                placeholder="Select Lease End Date"
              />
            </div>
          </section>

          {/* Email */}

          <div className="flex flex-col lg:flex-row gap-4 mb-[3%]">
            <div className="lg:w-1/3">
              <label>Rental Price (₦)</label>
              <InputField
                name="rental_price"
                type="text"
                value={formData.rental_price}
                onChange={handleChange}
                placeholder="e.g. 150000"
              />
            </div>

            <div className="lg:w-1/3">
              <label>Security Deposit</label>
              <InputField
                name="security_deposit"
                type="text"
                value={formData.security_deposit}
                onChange={handleChange}
                placeholder="e.g. 50000"
              />
            </div>

            <div className="lg:w-1/3">
              <label>Service Charge</label>
              <InputField
                name="service_charge"
                type="text"
                value={formData.service_charge}
                onChange={handleChange}
                placeholder="e.g. 15000"
              />
            </div>
          </div>

          {/* Submit Button */}
          <section className="flex flex-col-reverse sm:flex-row justify-end gap-4">
            <div className="w-full sm:w-auto">
              <ColouredButton
                title={isPending ? "Submitting..." : "Send Registration Link"}
              />
            </div>
          </section>
        </form>
      </main>
    </div>
  );
};

export default AddTenantForm;
