"use client";
/*eslint-disable */
import React, { useState } from "react";
import Dropdown2 from "@/components/Dropdown2";
import InputField from "@/components/InputField";
import { useCreatePropertyMutation } from "@/services/property/mutation";
import { createPropertySchema } from "@/schemas/property.schemas";
import GeoSearchMap from "@/components/GeoSearchMap";
import { useRouter } from "next/navigation";

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "Lagos", // Set default value for location
    property_status: "vacant", // Set default value for property_status
    property_type: "Duplex", // Set default value for property_type
    // property_images: [] as File[],
    no_of_bedrooms: "",
    rental_price: "",
    payment_frequency: "monthly", // Set default value for payment_frequency
    lease_duration: "",
    security_deposit: "",
    service_charge: "",
    comment: "",
    // move_in_date: "",
  });

  const router = useRouter();

  // Add validation error state
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) : value,
    }));
    // Clear error for this field when changed
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (files && files.length > 0) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       property_images: Array.from(files),
  //     }));
  //     // Clear error for property_images when files selected
  //     if (errors.property_images) {
  //       setErrors((prev) => ({ ...prev, property_images: "" }));
  //     }
  //   }
  // };

  const handleDropdownChange = (e: {
    target: { name?: string; value: string };
  }) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear error for this field when changed
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  console.log(formData);

  const { mutate, isPending } = useCreatePropertyMutation();

  function formatCurrency(value: string) {
    // Remove non-numeric characters first, then format
    const numeric = value.replace(/[^\d]/g, "");
    return `₦${Number(numeric).toLocaleString()}`;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required images first
    // if (formData.property_images.length === 0) {
    //   setErrors(prev => ({...prev, property_images: "Property images are required"}));
    //   return;
    // }

    const submissionData = {
      ...formData,
      no_of_bedrooms: parseInt(formData.no_of_bedrooms),
      rental_price: parseInt(formData.rental_price),
      lease_duration: parseInt(formData.lease_duration),
      security_deposit: parseInt(formData.security_deposit),
      service_charge: parseInt(formData.service_charge),
    };

    const validation = createPropertySchema.safeParse(submissionData);

    if (!validation.success) {
      const newErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        newErrors[field] = err.message;
      });
      setErrors(newErrors);
      console.error("Validation failed:", validation.error.errors);
      return;
    }

    // const formPayload = new FormData();

    // // Append all fields to form data
    // for (const key in submissionData) {
    //   const value = submissionData[key as keyof typeof submissionData];

    //   if (key === "property_images" && Array.isArray(value)) {
    //     // Ensure we're appending actual files
    //     if (value.length > 0) {
    //       value.forEach((file) => formPayload.append("property_images", file));
    //     }
    //   } else if (value !== undefined && value !== null) {
    //     formPayload.append(key, String(value));
    //   }
    // }

    mutate(submissionData, {
      onSuccess: () => {
        router.push("/dashboard/properties");
      },
      onError: (error: any) => {
        console.error("An error occurred: " + error.message);
        if (error.response?.data?.message) {
          // Handle specific API errors
          if (error.response.data.message.includes("Property images")) {
            setErrors((prev) => ({
              ...prev,
              property_images: error.response.data.message,
            }));
          } else {
            // General error handling
            alert(error.response.data.message);
          }
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-[#000]">
      <section className="flex justify-between">
        <div className="w-[100%]">
          <label>Property Name</label>
          <InputField
            name="name"
            placeholder="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* <div className="w-[48%]">
          <label>Location</label>
          <Dropdown2
            name="location"
            options={["Lagos", "Abuja", "Port Harcourt", "Kano", "Ibadan"]}
            placeholder="Select location"
            selectedOption={formData.location}
            width="100%"
            colorIcon
            icon={null}
            onChange={handleDropdownChange}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
        </div> */}
      </section>

      <div className="w-full mb-4">
        <label className="block mb-1 font-medium">Location</label>
        <GeoSearchMap
          onLocationSelect={(coords: any, address: string) => {
            setFormData((prev) => ({
              ...prev,
              location: address, // <- set to the full address instead of lat/lng
            }));
          }}
        />

        {formData.location && (
          <p className="text-green-600 text-sm mt-1">
            Location selected: {formData.location}
          </p>
        )}
        {errors.location && (
          <p className="text-red-500 text-sm mt-1">{errors.location}</p>
        )}
      </div>

      <section className="flex justify-between gap-4">
        {/* <div className="w-[30%]">
          <label>Property Images <span className="text-red-500">*</span></label>
          <InputField
            name="property_images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
          {errors.property_images && <p className="text-red-500 text-sm mt-1">{errors.property_images}</p>}
          {formData.property_images.length > 0 && (
            <p className="text-green-600 text-sm mt-1">{formData.property_images.length} images selected</p>
          )}
        </div> */}

        <div className="w-[30%]">
          <label>Property Type</label>
          <Dropdown2
            name="property_type"
            options={["Duplex", "Flat", "Self-Contain"]}
            placeholder="Select property type"
            selectedOption={formData.property_type}
            width="100%"
            colorIcon
            icon={null}
            onChange={handleDropdownChange}
          />
          {errors.property_type && (
            <p className="text-red-500 text-sm mt-1">{errors.property_type}</p>
          )}
        </div>

        <div className="w-[30%]">
          <label>No of Bedrooms</label>
          <InputField
            name="no_of_bedrooms"
            type="number"
            value={formData.no_of_bedrooms}
            onChange={handleChange}
            placeholder="Number of bedrooms"
          />
          {errors.no_of_bedrooms && (
            <p className="text-red-500 text-sm mt-1">{errors.no_of_bedrooms}</p>
          )}
        </div>

        <div className="w-[30%]">
          <label>Property Status</label>
          <Dropdown2
            name="property_status"
            options={["vacant", "occupied", "under_maintenance"]}
            placeholder="Select status"
            selectedOption={formData.property_status}
            width="100%"
            colorIcon
            icon={null}
            onChange={handleDropdownChange}
          />
          {errors.property_status && (
            <p className="text-red-500 text-sm mt-1">
              {errors.property_status}
            </p>
          )}
        </div>
      </section>

      <section className="flex justify-between gap-4">
        <div className="w-[48%]">
          <label>Payment Frequency</label>
          <Dropdown2
            name="payment_frequency"
            options={["monthly", "yearly"]}
            placeholder="Select frequency"
            selectedOption={formData.payment_frequency}
            width="100%"
            colorIcon
            icon={null}
            onChange={handleDropdownChange}
          />
          {errors.payment_frequency && (
            <p className="text-red-500 text-sm mt-1">
              {errors.payment_frequency}
            </p>
          )}
        </div>

        <div className="w-[48%]">
          <label>Tenancy Term (years)</label>
          <InputField
            name="lease_duration"
            type="number"
            value={formData.lease_duration}
            onChange={handleChange}
            placeholder="Lease duration"
          />
          {errors.lease_duration && (
            <p className="text-red-500 text-sm mt-1">{errors.lease_duration}</p>
          )}
        </div>
      </section>

      <section className="flex justify-between gap-4">
        <div className="w-[30%]">
          <label>Rental Price</label>
          <InputField
            name="rental_price"
            type="number"
            value={formData.rental_price}
            onChange={handleChange}
            placeholder="Rental price"
          />
          {formData.rental_price && (
            <p className="text-gray-500 text-sm mt-1">
              {formatCurrency(formData.rental_price.toString())}
            </p>
          )}
          {errors.rental_price && (
            <p className="text-red-500 text-sm mt-1">{errors.rental_price}</p>
          )}
        </div>

        <div className="w-[30%]">
          <label>Security Deposit</label>
          <InputField
            name="security_deposit"
            type="number"
            value={formData.security_deposit}
            onChange={handleChange}
            placeholder="Security deposit"
          />
          {formData.security_deposit && (
            <p className="text-gray-500 text-sm mt-1">
              {formatCurrency(formData.security_deposit.toString())}
            </p>
          )}
          {errors.security_deposit && (
            <p className="text-red-500 text-sm mt-1">
              {errors.security_deposit}
            </p>
          )}
        </div>

        <div className="w-[30%]">
          <label>Service Charge</label>
          <InputField
            name="service_charge"
            type="number"
            value={formData.service_charge}
            onChange={handleChange}
            placeholder="Service charge"
          />
          {formData.service_charge && (
            <p className="text-gray-500 text-sm mt-1">
              {formatCurrency(formData.service_charge.toString())}
            </p>
          )}
          {errors.service_charge && (
            <p className="text-red-500 text-sm mt-1">{errors.service_charge}</p>
          )}
        </div>
      </section>

      <div>
        <label>Comment</label>
        <InputField
          name="comment"
          placeholder="Any comment?"
          value={formData.comment}
          onChange={handleChange}
        />
        {errors.comment && (
          <p className="text-red-500 text-sm mt-1">{errors.comment}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-[#785DBA] text-white px-6 py-3 rounded-lg font-semibold"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Property"}
      </button>
    </form>
  );
};

export default PropertyForm;
