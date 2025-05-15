/* eslint-disable */
"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Calendar, Edit2, Edit3 } from "lucide-react";
import { useParams } from "next/navigation";
import { useFetchPropertyById } from "@/services/property/query";
import { useUpdatePropertyMutation } from "@/services/property/mutation";
import { toast } from "react-toastify";
import BackButton from "@/components/Backbutton";

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const PropertyView: React.FC = () => {
  const { id } = useParams() as { id: string };
  const { data, isLoading } = useFetchPropertyById(id);

  const [propertyData, setPropertyData] = useState<any>({});

  const [editMode, setEditMode] = useState<any>({
    description: false,
    name: false,
    tenant_name: false,
    lease_start_date: false,
    lease_end_date: false,
    rental_price: false,
    phone_number: false,
    service_charge: false,
  });

  useMemo(() => {
    if (data) {
      setPropertyData(data);
    }
  }, [data]);

  const toggleEditMode = (field: string) => {
    setEditMode((prev: any) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (field: string, value: any) => {
    setPropertyData((prev: any) => ({ ...prev, [field]: value }));
  };
  const { mutate, isPending } = useUpdatePropertyMutation(id);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Updated Data Submitted:", propertyData);

    mutate(
      {
        ...propertyData,
        lease_start_date: new Date(propertyData?.lease_start_date)?.toISOString(), // if API expects ISO string
        lease_end_date: new Date(propertyData?.lease_end_date)?.toISOString(),
        // rental_price: parseInt(propertyData?.rental_price.replace(/,/g, "")),
        // service_charge: parseInt(propertyData?.service_charge.replace(/,/g, "")),
      },
      {
        onSuccess: () => window.location.reload(),
        onError: (error: any) => {
          console.error("An error occurred: " + error.message);
          toast.error(error.response?.data?.message || "Submission failed");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm mt-6 mx-6">
        <Skeleton className="w-full h-48 mb-4 rounded-lg" />
        <Skeleton className="h-6 w-1/2 mb-4" />
        <Skeleton className="h-32 mb-6 rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array(7)
            .fill(null)
            .map((_, i) => (
              <Skeleton key={i} className="h-12 rounded-md" />
            ))}
        </div>
        <div className="mt-6">
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm mt-6 mx-6">
      <form onSubmit={handleSubmit}>
        {/* Property Image and Description */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="relative w-full lg:w-1/3">
            <div className="relative h-48 w-full rounded-lg overflow-hidden">
              <Image
                src="/house.png"
                alt="Property Image"
                fill
                className="object-cover"
              />
              <button className="absolute top-3 right-3 bg-white p-2 rounded-full">
                <Edit2 size={18} className="text-gray-700" />
              </button>
            </div>
          </div>

          <div className="w-full lg:w-2/3 relative">
            <div className="border rounded-lg p-4 h-full">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-md font-medium text-gray-700">
                  Description
                </h2>
                <button
                  type="button"
                  onClick={() => toggleEditMode("description")}
                  className="text-gray-400 hover:text-gray-700"
                >
                  <Edit3 size={18} />
                </button>
              </div>
              {editMode.description ? (
                <textarea
                  value={propertyData.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Enter a description..."
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={4}
                />
              ) : (
                <p className="text-gray-600 text-sm">
                  {propertyData.description || "No description available"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Property", field: "name" },
            { label: "Tenant's Name", field: "tenant_name" },
            { label: "Lease Start Date", field: "lease_start_date" },
            { label: "Lease End Date", field: "lease_end_date" },
            { label: "Rental Price", field: "rental_price" },
            { label: "Phone Number", field: "phone_number" },
            { label: "Service Charge", field: "service_charge" },
            { label: "No of Bedrooms", field: "no_of_bedrooms" },
            { label: "Location", field: "location" },
          ].map(({ label, field }) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={propertyData[field] || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                  disabled={!editMode[field]}
                  placeholder={
                    editMode[field] ? `Enter ${label.toLowerCase()}...` : ""
                  }
                  className={`w-full p-3 rounded-md border ${
                    editMode[field]
                      ? "bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-[#666666]"
                      : "bg-gray-100 border-gray-200 text-[#000]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => toggleEditMode(field)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  <Edit3 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-[#785DBA] text-white rounded-md hover:bg-[#666666]"
          >
            {isPending?'Updating...' :'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyView;
