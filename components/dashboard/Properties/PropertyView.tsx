/* eslint-disable */
"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Calendar, Edit2, Edit3 } from "lucide-react";
import { useParams } from "next/navigation";
import { useFetchPropertyById } from "@/services/property/query";

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const PropertyView: React.FC = () => {
  const { id } = useParams() as { id: string };
  const { data, isLoading } = useFetchPropertyById(id);

  const [propertyData, setPropertyData] = useState<any>({});

  const [editMode, setEditMode] = useState<any>({
    description: false,
    propertyName: false,
    tenantName: false,
    leaseStartDate: false,
    leaseEndDate: false,
    rentalPrice: false,
    phoneNumber: false,
    serviceCharge: false,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Data Submitted:", propertyData);
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
                  onChange={(e) =>
                    handleChange("description", e.target.value)
                  }
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
            { label: "Property Name", field: "propertyName" },
            { label: "Tenant's Name", field: "tenantName" },
            { label: "Lease Start Date", field: "leaseStartDate" },
            { label: "Lease End Date", field: "leaseEndDate" },
            { label: "Rental Price", field: "rentalPrice" },
            { label: "Phone Number", field: "phoneNumber" },
            { label: "Service Charge", field: "serviceCharge" },
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
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyView;
