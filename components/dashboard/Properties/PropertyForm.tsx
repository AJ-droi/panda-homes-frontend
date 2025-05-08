"use client";
/* eslint-disable */
import React, { useState } from "react";
import Dropdown2 from "@/components/Dropdown2";
import InputField from "@/components/InputField";
import GeoSearchMap from "@/components/GeoSearchMap";
import { useCreatePropertyMutation } from "@/services/property/mutation";
import { createPropertySchema } from "@/schemas/property.schemas";
import { useRouter } from "next/navigation";
import AddressAutocomplete from "@/components/AddressAutoComplete";

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "Lagos",
    // property_status: "vacant",
    property_type: "Duplex",
    no_of_bedrooms: "",
    rental_price: "",
    security_deposit: "",
    service_charge: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSummary, setShowSummary] = useState(false);
  const { mutate, isPending } = useCreatePropertyMutation();
  const router = useRouter();

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

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDropdownChange = (e: {
    target: { name?: string; value: string };
  }) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  const getSubmissionData = () => ({
    ...formData,
    no_of_bedrooms: parseInt(formData.no_of_bedrooms),
    rental_price: parseInt(formData.rental_price.replace(/,/g, "")),
    security_deposit: parseInt(formData.security_deposit.replace(/,/g, "")),
    service_charge: parseInt(formData.service_charge.replace(/,/g, "")),
    description: `Property "${formData.name}" is a ${
      formData.no_of_bedrooms
    }-bedroom ${formData.property_type.toLowerCase()} located in ${
      formData.location
    } with a rental price of ₦${
      formData.rental_price
    }, a security deposit of ₦${
      formData.security_deposit
    }, and a service charge of ₦${formData.service_charge}.`,
  });

  const handleShowSummary = () => {
    const submissionData = getSubmissionData();
    const validation = createPropertySchema.safeParse(submissionData);

    if (!validation.success) {
      const newErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        newErrors[field] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setShowSummary(true);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const submissionData = getSubmissionData();

    mutate(submissionData, {
      onSuccess: () => router.push("/dashboard/properties"),
      onError: (error: any) => {
        console.error("An error occurred: " + error.message);
        alert(error.response?.data?.message || "Submission failed");
      },
    });
  };

  const handlePlaceSelected = (
    place: google.maps.places.PlaceResult | null
  ) => {
    console.log("Selected place:", place);
    setFormData((prev) => ({ ...prev, location: place?.formatted_address || "" }));
  };

  return (
    <>
      <form className="space-y-6 text-[#000]">
        <div>
          <label>Property Name</label>
          <InputField
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label>Location</label>
          {/* {!showSummary && (
            <GeoSearchMap
              onLocationSelect={(_, address: string) =>
                setFormData((prev) => ({ ...prev, location: address }))
              }
            />

        
          )} */}

          <AddressAutocomplete onPlaceSelected={handlePlaceSelected} />
          {formData.location && (
            <p className="text-green-600 text-sm mt-1">
              Selected: {formData.location}
            </p>
          )}
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-1/2">
            <label>Property Type</label>
            <Dropdown2
              name="property_type"
              options={["Duplex", "Flat", "Self-Contain"]}
              selectedOption={formData.property_type}
              placeholder="Select type"
              onChange={handleDropdownChange}
            />
            {errors.property_type && (
              <p className="text-red-500 text-sm">{errors.property_type}</p>
            )}
          </div>

          <div className="lg:w-1/2">
            <label>Bedrooms</label>
            <InputField
              name="no_of_bedrooms"
              type="number"
              placeholder="e.g. 3"
              value={formData.no_of_bedrooms}
              onChange={handleChange}
            />
            {errors.no_of_bedrooms && (
              <p className="text-red-500 text-sm">{errors.no_of_bedrooms}</p>
            )}
          </div>

          {/* <div className="w-1/3">
            <label>Status</label>
            <Dropdown2
              name="property_status"
              options={["vacant", "occupied", "under_maintenance"]}
              selectedOption={formData.property_status}
              placeholder="Select status"
              onChange={handleDropdownChange}
            />
            {errors.property_status && (
              <p className="text-red-500 text-sm">{errors.property_status}</p>
            )}
          </div> */}
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-1/3">
            <label>Rental Price (₦)</label>
            <InputField
              name="rental_price"
              type="text"
              value={formData.rental_price}
              onChange={handleChange}
              placeholder="e.g. 150000"
            />
            {errors.rental_price && (
              <p className="text-red-500 text-sm">{errors.rental_price}</p>
            )}
          </div>

          <div className="lg:w-1/3">
            <label>Security Deposit</label>
            <InputField
              name="security_deposit"
              type="text"
              value={formData.security_deposit}
              onChange={handleChange}
            />
            {errors.security_deposit && (
              <p className="text-red-500 text-sm">{errors.security_deposit}</p>
            )}
          </div>

          <div className="lg:w-1/3">
            <label>Service Charge</label>
            <InputField
              name="service_charge"
              type="text"
              value={formData.service_charge}
              onChange={handleChange}
            />
            {errors.service_charge && (
              <p className="text-red-500 text-sm">{errors.service_charge}</p>
            )}
          </div>
        </div>

        <button
          type="button"
          className="bg-[#785DBA] text-white px-4 py-2 rounded"
          onClick={handleShowSummary}
        >
          View Property Summary
        </button>
      </form>

      {showSummary && (
        <div className="fixed inset-0 bg-[#fff] bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-[#000]">
              Property Summary
            </h2>
            <ul className="space-y-2 text-gray-800">
              <li>
                <strong>Name:</strong> {formData.name}
              </li>
              <li>
                <strong>Location:</strong> {formData.location}
              </li>
              <li>
                <strong>Type:</strong> {formData.property_type}
              </li>
              {/* <li><strong>Status:</strong> {formData.property_status}</li> */}
              <li>
                <strong>Bedrooms:</strong> {formData.no_of_bedrooms}
              </li>
              <li>
                <strong>Rental Price:</strong> ₦{formData.rental_price}
              </li>
              <li>
                <strong>Security Deposit:</strong> ₦{formData.security_deposit}
              </li>
              <li>
                <strong>Service Charge:</strong> ₦{formData.service_charge}
              </li>
            </ul>
            <div className="mt-6 flex justify-end gap-4">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => setShowSummary(false)}
              >
                Cancel
              </button>
              <button
                className="bg-[#785DBA] text-white px-4 py-2 rounded"
                onClick={handleSubmit}
                disabled={isPending}
              >
                {isPending ? "Submitting..." : "Add Property"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyForm;
