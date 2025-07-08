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
import BackButton from "@/components/Backbutton";
import { ArrowLeft } from "lucide-react";

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "Lagos",
    // property_status: "vacant",
    property_type: "Duplex",
    no_of_bedrooms: "",
    // rental_price: "",
    // security_deposit: "",
    // service_charge: "",
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
    // rental_price: parseInt(formData.rental_price.replace(/,/g, "")),
    // security_deposit: parseInt(formData.security_deposit.replace(/,/g, "")),
    // service_charge: parseInt(formData.service_charge.replace(/,/g, "")),
    description: `Property is a ${
      formData.no_of_bedrooms
    }-bedroom ${formData.property_type.toLowerCase()} located in ${
      formData.location}`
    // } with a rental price of ₦${
    //   formData.rental_price
    // }, a security deposit of ₦${
    //   formData.security_deposit
    // }, and a service charge of ₦${formData.service_charge}.`,
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
      onSuccess: () => {
        setShowSummary(false)
        router.push("/dashboard/properties");
      },
      onError: (error: any) => {
        console.error("An error occurred: " + error.message);
        alert(error.response?.data?.message || "Submission failed");
      },
    });
  };

  const handlePlaceSelected = (
    place: google.maps.places.PlaceResult | null
  ) => {
    setFormData((prev) => ({ ...prev, location: place?.formatted_address || "" }));
  };

  return (
    <>
      <form className="space-y-6 text-[#000]">
      {/* {errors && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errors}
        </div>
      )} */}

        <div>
          <label>Name</label>
          <InputField
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label>Address</label>
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
            <Dropdown2
              name="no_of_bedrooms"
              options={["1", "2", "3", "4", "5", "6+"]}
              selectedOption={formData.no_of_bedrooms}
              placeholder="Select type"
              onChange={handleDropdownChange}
            />
            {/* <InputField
              name="no_of_bedrooms"
              type="number"
              placeholder="e.g. 3"
              value={formData.no_of_bedrooms}
              onChange={handleChange}
            /> */}
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

        {/* <div className="flex flex-col lg:flex-row gap-4">
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
        </div> */}

        <button
          type="button"
          className="bg-[#785DBA] text-white px-4 py-2 rounded w-full hover:cursor-pointer"
          onClick={handleShowSummary}
        >
          Review
        </button>
      </form>

     {showSummary && (
        <>
          <div
            className="absolute inset-0  bg-opacity-50 backdrop-blur-sm"
            onClick={() => setShowSummary(false)}
          />
          <div className="fixed inset-0  bg-opacity-60 flex items-center justify-center z-60">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl mx-4">
              <div className="flex items-center mb-4">
                <button
                  onClick={() => setShowSummary(false)}
                  className="mr-3 text-gray-600 hover:text-gray-800 hover:cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h2
                  className="text-xl font-bold text-[#000]"
                  style={{ fontFamily: "Inter" }}
                >
                  Review
                </h2>
              </div>

              <ul className="space-y-3 text-gray-800 mb-6">
                <li className="flex flex-col justify-between">
                  <span className="font-medium">Property:</span>
                  <span className="text-[#666666]">{formData.name}</span>
                </li>
                <li className="flex flex-col justify-between">
                  <span className="font-medium">Address:</span>
                  <span className="text-[#666666]">{formData.location} </span>
                </li>
                <li className="flex flex-col justify-between">
                  <span className="font-medium">Description:</span>
                  <span className="text-[#666666]">
                    {getSubmissionData().description}
                  </span>
                </li>
                {/* <li className="flex justify-between">
                <span className="font-medium">Bedrooms:</span>
                <span>{formData.no_of_bedrooms}</span>
              </li> */}
              </ul>

              <div className="flex justify-start gap-3">
                <button
                  className="bg-[#785DBA] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#6B4CA0] transition-colors disabled:opacity-50 hover:cursor-pointer"
                  onClick={handleSubmit}
                  disabled={isPending}
                  style={{ fontFamily: "Inter" }}
                >
                  {isPending ? "Creating..." : "Save"}
                </button>
                <button
                  className="bg-gray-300 text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors hover:cursor-pointer"
                  onClick={() => setShowSummary(false)}
                  style={{ fontFamily: "Inter" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PropertyForm;
