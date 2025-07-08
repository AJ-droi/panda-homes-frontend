/*eslint-disable */
"use client";
import React, { useMemo, useState } from "react";
import Dropdown2 from "@/components/Dropdown2";
import InputField from "@/components/InputField";
import ColouredButton from "@/components/ColouredButton";
import CalendarDropdown from "@/components/CalendarDropdown";
import { useCreateUserMutation } from "@/services/users/mutation";
import { useRouter } from "next/navigation";
import {
  useFetchPropertyDetails,
  useFetchVacantPropertyDetails,
} from "@/services/property/query";
import BackButton from "@/components/Backbutton";
import Image from "next/image";
import Modal from "@/components/Modal";
import { toast } from "react-toastify";

interface addTenantProps {
  onClose?: () => void;
}

const AddTenantForm: React.FC<addTenantProps> = ({}) => {
  const router = useRouter();
  const [propertyOptions, setPropertyOptions] = useState<any[]>();
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false)

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
    is_sub_account: false,
  });

  const { mutate, isPending } = useCreateUserMutation();
  const [passwordLink, setPasswordLink] = useState('')

  const { data } = useFetchVacantPropertyDetails();

  useMemo(() => {
    if (data) {
      const options = data.map((property: any) => ({
        label: property.property, // shown to the user
        value: property.id, // actual value you want to use
      }));
      setPropertyOptions(options);
    }
  }, [data]);

  function formatPhoneNumber(phone: string): string {
    if (phone.startsWith("0")) {
      return "+234" + phone.slice(1);
    }
    return phone; // return as-is if it doesn't start with 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as
      | HTMLInputElement
      | HTMLSelectElement;
    const checked = (e.target as HTMLInputElement).checked;

    const formattedValue =
      name === "phone_number" ? formatPhoneNumber(value) : value;

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
    } else if (formattedValue) {
      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
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
        onSuccess: (data) => {
          setIsOpen(true)
          setPasswordLink(data.password_link)
          // router.push("/dashboard/tenants");
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
                Phone Number (Whatsapp)
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
                Tenancy Start Date
              </label>
              <CalendarDropdown
                selectedDate={formData.lease_start_date}
                onChange={(date) => handleDateChange("lease_start_date", date)}
                placeholder="Select Lease Start Date"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium mb-2">
                Tenancy End Date
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

          {/* 
              <div className="flex justify-start gap-2 sm:gap-[14px] items-center">
          <input
            type="checkbox"
            name="is_sub_account"
            checked={formData.is_sub_account}
            onChange={handleChange}
          />
          <span className="font-[500] text-[14px] sm:text-[16px] leading-[100%] text-[#696F79]">
            Choose as a sub account
          </span>
        </div> */}

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

      {isOpen && <Modal onClose={() => {
        setIsOpen(false)
         router.push("/dashboard/tenants");
      }}>
        <div className="flex flex-col justify-center items-center text-[#000] text-center p-2">
          <Image src={"/success.svg"} alt={"success"} height={40} width={40} />
          <div>
            <h3 className="text-[20px] pt-[3%]">Registration Link Sent</h3>
            <h4 className="py-2 text-[14px]">
              The registration link has been successfully sent to the tenant's
              email.
            </h4>

            <p className="text-[#98A0B4] text-[12px]">Want to share the link manually?</p>
          </div>
          <button 
          className="bg-[#785DBA] text-[#fff] rounded-md px-3 py-2 mt-3 text-[12px] hover:cursor-pointer"
          onClick={() => {
          navigator.clipboard.writeText(passwordLink)
            .then(() => {
              toast.success("Link copied to clipboard!");
            })
            .catch(err => {
              toast.info("Failed to copy!", err);
            });
        }}
          >Yes, Copy</button>
        </div>
      </Modal>}
    </div>
  );
};

export default AddTenantForm;
