/*eslint-disable */
import React, { useEffect, useState } from "react";
import { Edit3 } from "lucide-react";
import InputField from "@/components/InputField";
import { useFetchPropertyById } from "@/services/property/query";
import { useParams, useRouter } from "next/navigation";
import BackButton from "@/components/Backbutton";
import {
  useDeletePropertyMutation,
  useUpdatePropertyMutation,
} from "@/services/property/mutation";
import { toast } from "react-toastify";
import { useRemoveTenantMutation } from "@/services/rents/mutation";
import { toSentenceCase } from "@/utilities/utilities";
// adjust the path as needed

type PropertyField =
  | "name"
  | "location"
  | "description"
  | "occupancy_status"
  | "service_charge"
  | "security_deposit"
  | "lease_start_date"
  | "rental_price"
  | "lease_end_date"
  | "rent_status"
  | "first_name"
  | "last_name"
  | "phone_number"
  | "email";

const PropertyView = () => {
  const [editMode, setEditMode] = useState<Record<PropertyField, boolean>>({
    name: false,
    location: false,
    description: false,
    occupancy_status: false,
    service_charge: false,
    security_deposit: false,
    lease_start_date: false,
    rental_price: false,
    lease_end_date: false,
    rent_status: false,
    first_name: false,
    last_name: false,
    phone_number: false,
    email: false,
  });

  const [propertyData, setPropertyData] = useState<
    Record<PropertyField, string>
  >({
    name: "Apartment 1",
    location: "21 Ibiyinka Salvador Street",
    description: "Beautiful 2-bedroom flat with modern amenities.",
    occupancy_status: "Vacant",
    service_charge: "500,000",
    security_deposit: "500,000",
    lease_start_date: "June 5th, 2022",
    rental_price: "500,000",
    lease_end_date: "June 5th, 2023",
    rent_status: "Paid",
    first_name: "Jon",
    last_name: "Doe",
    phone_number: "08012345678",
    email: "johndoe@gmail.com",
  });

  const toggleEditMode = (field: PropertyField) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const router = useRouter()

  const toggleEditPropertyMode = () => {
    setEditMode((prev) => ({
      ...prev,
      name: !prev.name,
      location: !prev.location,
      description: !prev.description,
      occupancy_status: !prev.occupancy_status,
    }));
  };

  const { id } = useParams<{ id: string }>();

  const { data } = useFetchPropertyById(id) as any;

  const { mutate, isPending } = useUpdatePropertyMutation(id);

  const deleteMutation = useDeletePropertyMutation();

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(id);
      window.location.href = "/dashboard/properties";
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const removeTenant = useRemoveTenantMutation();

  const confirmRemoveTenant = async (tenant_id: string) => {
    if (!tenant_id) return;
    try {
      await removeTenant.mutateAsync(tenant_id);
      window.location.reload();
      // Optionally refetch tenant list here
    } catch (error) {
      console.error("Failed to remove tenant", error);
    } finally {
      toast.success("Tenant removed successfully");
      // setShowModal(false);
      // setSelectedTenant(null);
    }
  };

  useEffect(() => {
    if (data) {
      setPropertyData(data);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPropertyData((prev) => ({ ...prev, [name as PropertyField]: value }));
  };

  const handleSubmit = () => {
    const payload = {
      ...propertyData,
      rental_price: Number(propertyData.rental_price),
      service_charge: Number(propertyData.service_charge),
      security_deposit: Number(propertyData.security_deposit),
      lease_start_date: new Date(propertyData.lease_start_date).toISOString(),
      lease_end_date: new Date(propertyData.lease_end_date).toISOString(),
    };

    mutate(payload, {
      onSuccess: () => {
        toast.success("Property data updated successfully");
        window.location.reload();
      },
      onError: (error) => {
        toast.error("Error updating property data:", error);
      },
    });
    console.log("Saving property data:", propertyData);
    const resetEditMode = Object.keys(editMode).reduce((acc, key) => {
      acc[key as PropertyField] = false;
      return acc;
    }, {} as Record<PropertyField, boolean>);
    setEditMode(resetEditMode);
  };

  const renderField = (
    label: string,
    field: PropertyField,
    type: string = "text"
  ) => (
    <div className="py-2">
      <label className="text-sm text-gray-800 font-medium">{label}</label>
      {editMode[field] ? (
        <InputField
          name={field}
          value={propertyData[field]}
          onChange={handleChange}
          type={type}
        />
      ) : (
        <div className="flex items-center justify-between mt-1">
          <p className="text-gray-500 text-[14px]">
            {" "}
            {field === "service_charge" ||
            field === "rental_price" ||
            field === "security_deposit"
              ? Number(propertyData[field]).toLocaleString("en-NG")
              : field === "first_name" || field === "last_name"
              ? toSentenceCase(propertyData[field])
              : propertyData[field]}
          </p>
          {/* <button onClick={() => toggleEditMode(field)}>
            <Edit3 size={16} className="text-gray-500" />
          </button> */}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-8">
        {/* Property Details Section */}
        <div className="border-b border-b-[#999999] pb-8">
          <div className="flex items-center mb-6">
            <BackButton />
            <h2 className="text-md font-medium text-[#8B8D97]">
              Property Details
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField("Property Name", "name")}
            {renderField("Property Address", "location")}
          </div>

          {renderField("Description", "description")}
          {renderField("Current Occupancy Status", "occupancy_status")}

          <div className="flex justify-between gap-4 mt-6">
            <button
              type="button"
              className="px-6 py-2 border border-[#785DBA] text-[#785DBA] rounded-lg hover:bg-purple-50 transition-colors text-[12px]"
              onClick={() => toggleEditPropertyMode()}
            >
              Edit Property
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-[#785DBA] text-white rounded-lg hover:bg-[#785DBA] transition-colors text-[12px]"
              onClick={() => handleDelete()}
            >
              Delete Property
            </button>
          </div>
        </div>

        {/* Tenancy Details Section */}
        <div className="py-3 border-b border-b-[#999999] pb-8">
          {data?.occupancy_status !== "vacant" ? (
            <div className="">
             <h2 className="text-md font-medium text-[#8B8D97] ">
                Tenancy Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderField("Service Charge", "service_charge")}
                {renderField("Security Deposit", "security_deposit")}
                {renderField("Lease Start Date", "lease_start_date")}
                {renderField("Rental Price", "rental_price")}
                {renderField("Lease End Date", "lease_end_date")}
              </div>
              {renderField("Rent Status", "rent_status")}

              <div className="mt-6">
                <button
                  type="button"
                  className="px-6 py-2 bg-[#785DBA] text-white rounded-lg hover:bg-[#785DBA] transition-colors text-[12px]"
                  onClick={() => confirmRemoveTenant(data?.tenant_id)}
                  disabled={removeTenant.isPending}
                >
                  {removeTenant.isPending ? `Removing Tenant` : `End Tenancy`}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-[#000]">
              <h2 className="text-md font-medium text-[#8B8D97] ">
                Tenancy Details
              </h2>
              <p className="text-[#353535] text-sm my-2 leading-6">
                No active tenancy assigned to this property. <br /> This unit is
                currently vacant and not linked to any tenant.
              </p>
              <button
                type="button"
                className="px-6 py-2 bg-[#785DBA] text-white rounded-lg hover:bg-[#785DBA] transition-colors text-[12px] my-2"
                onClick={() => router.push('/dashboard/properties/attach-tenant') }
              >
               Assign a Tenant
              </button>
            </div>
          )}
        </div>

        {/* Tenant Details Section */}
        <div className="py-3  pb-8">
          {data?.occupancy_status !== "vacant" ? (
            <div className="">
             <h2 className="text-md font-medium text-[#8B8D97] ">
                Tenant Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderField("First Name", "first_name")}
                {renderField("Last Name", "last_name")}
                {renderField("Phone Number", "phone_number")}
                {/* {renderField('Email', 'email', 'email')} */}
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  className="px-6 py-2 bg-[#785DBA] text-white rounded-lg hover:bg-[#785DBA] transition-colors text-[12px]"
                >
                  View KYC
                </button>
              </div>
            </div>
          ) : (
            <div className="text-[#000]">
              <h2 className="text-md font-medium text-[#8B8D97] ">
                Tenant Details
              </h2>
              <p className="text-[#353535] text-sm my-2 leading-6">
                No tenant linked yet. <br /> Once you assign a tenant to this
                unit, their details will appear here.
              </p>
            </div>
          )}
        </div>
        {/* Save Changes Button */}
        {data?.occupancy_status !== "vacant" && (
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-[#785DBA] text-white rounded-lg hover:bg-[#785DBA] transition-colors font-medium text-[12px]"
            >
              {isPending ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyView;
