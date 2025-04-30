/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef } from "react";
import Dropdown2 from "@/components/Dropdown2";
import ColouredButton from "@/components/ColouredButton";
import CalendarDropdown from "../CalendarDropdown";
import { toast } from "react-toastify";
import Image from "next/image";
import {
  // useGetTenantRent,
  // useGetPropertyHistory,
  useGetTenantProperty,
} from "@/services/tenants/query";
import { useCreateServiceRequest } from "@/services/tenants/mutation";
import InputField from "../InputField";

interface propertyFormProps {
  onClose?: () => void;
}

const TenantServiceRequestForm: React.FC<propertyFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    propertyName: "",
    issueCategory: "",
    effectiveDate: null as Date | null,
    additionalNotes: "",
    attachments: [] as File[],
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const jsonTenantDetails = localStorage.getItem("tenant");
  const tenantDetails = JSON.parse(`${jsonTenantDetails}`);
  const { data: tenantPropertyData } = useGetTenantProperty(
    tenantDetails?.property_id
  );

  const categoryOptions = ["Plumbing", "Electricity", "Leaking Roof", "Other"];

  const { mutate: createServiceRequest, isPending: createRequestLoading } =
    useCreateServiceRequest();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);

      if (selectedFiles.length + newFiles.length > 3) {
        toast.error("You can upload a maximum of 3 images", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      const oversizedFiles = newFiles.filter((file) => file.size > 3145728);
      if (oversizedFiles.length > 0) {
        toast.error(
          `Some files exceed 3MB limit: ${oversizedFiles
            .map((f) => f.name)
            .join(", ")}`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        return;
      }

      setSelectedFiles([...selectedFiles, ...newFiles]);
      setFormData({
        ...formData,
        attachments: [...formData.attachments, ...newFiles],
      });

      if (e.target) {
        e.target.value = "";
      }
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    setFormData({
      ...formData,
      attachments: updatedFiles,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !tenantPropertyData?.name ||
      !formData.issueCategory ||
      !formData.effectiveDate ||
      !formData.additionalNotes
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try{
    const submissionData = new FormData();
    submissionData.append(
      "tenant_name",
      `${tenantDetails?.first_name} ${tenantDetails?.last_name}`
    );
    submissionData.append("property_name", tenantPropertyData.name);
    submissionData.append("issue_category", formData.issueCategory);
    submissionData.append(
      "effectiveDate",
      formData.effectiveDate?.toISOString() || ""
    );
    submissionData.append("description", formData.additionalNotes);

    // if (formData?.attachments?.length > 0) {
    //   formData.attachments.forEach((file) => {
    //     submissionData.append('issue_images[]', file);
    //   });
    // }
    submissionData.append('status', 'pending')
    submissionData.append("tenant_id", tenantDetails?.id);
    submissionData.append("property_id", tenantDetails?.property_id);
    submissionData.append("date_reported", `${new Date()}`);

    createServiceRequest(submissionData, {
      onSuccess: () => {
        if (onClose) {
          onClose();
        }
      },
      onError: (error) => {
        console.error("Error creating Service Request:", error);
      },
    });
  }catch(error:any){
    console.error(error)
    return
  }
  };

  const handleCancel = () => {
    setFormData({
      propertyName: "",
      issueCategory: "",
      effectiveDate: null,
      additionalNotes: "",
      attachments: [],
    });
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Blurry overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleCancel}
      ></div>

      {/* Modal container */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="w-full px-6 py-8 sm:px-12 sm:py-10">
              <h1
                className="text-[20px] md:text-[20px] leading-[150%] font-[500] mb-4 md:mb-6 text-[#785DBA]"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Submit a New Service Request
              </h1>

              <main className="text-black">
                <form>
                  <section className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className="gap-2 md:gap-[12.14px] flex flex-col">
                      <InputField
                        onChange={() => ""}
                        placeholder={tenantPropertyData?.name}
                        value={tenantPropertyData?.name}
                        disabled={true}
                      />
                    </div>
                    <div className="gap-2 md:gap-[12.14px] flex flex-col">
                      <Dropdown2
                        options={categoryOptions}
                        placeholder="Issue Category"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            issueCategory: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="gap-2 md:gap-[12.14px] flex flex-col">
                      <CalendarDropdown
                        selectedDate={formData.effectiveDate}
                        onChange={(date) =>
                          setFormData({ ...formData, effectiveDate: date })
                        }
                        disablePastDates={true}
                        placeholder="Effective Date"
                      />
                    </div>
                  </section>

                  <section className="mb-4 md:mb-6 gap-2 md:gap-[12.14px] flex flex-col">
                    <label
                      className="block text-[15px] font-medium mb-1 md:mb-2"
                      style={{ fontFamily: "Plus Jakarta Sans" }}
                    >
                      Additional Notes
                    </label>
                    <textarea
                      value={formData.additionalNotes}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          additionalNotes: e.target.value,
                        })
                      }
                      placeholder="Enter your Message here"
                      className="w-full p-2 md:p-3 border border-[#262626] text-[#000000] rounded-lg focus:outline-none focus:border-[#785DBA] transition-colors text-xs md:text-[11.44px] leading-[150%] font-[500] min-h-[100px]"
                      style={{ fontFamily: "Plus Jakarta Sans" }}
                    />
                  </section>

                  <section className="mb-6 md:mb-8">
                    <div className="gap-2 md:gap-[12.14px] w-full flex flex-col">
                      <label
                        className="block text-sm font-medium mb-1 md:mb-2"
                        style={{ fontFamily: "Plus Jakarta Sans" }}
                      >
                        Upload Attachments (Optional)
                      </label>
                      {selectedFiles.length > 0 ? (
                        <div className="mt-4 border-1 border-dashed border-[#785DBA] rounded-2xl p-4 md:p-6 text-center">
                          <div className="flex flex-wrap gap-2">
                            {selectedFiles.map((file, index) => (
                              <div
                                key={index}
                                className="relative border rounded-lg p-2 w-24 h-24 flex items-center justify-center"
                              >
                                <Image
                                  src={URL.createObjectURL(file)}
                                  alt={file.name}
                                  width={96}
                                  height={96}
                                  className="max-h-full max-w-full object-contain"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeFile(index)}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                >
                                  ×
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs truncate p-1">
                                  {file.name.substring(0, 10)}...
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
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
                            Maximum size of an image is 3 mb, not more than 3
                            images
                          </p>
                          <label className="inline-block px-3 py-1 md:px-4 md:py-2 bg-white text-[#785DBA] rounded-2xl cursor-pointer border-1 hover:text-white border-[#785DBA] hover:bg-[#6a4fa8] transition-colors text-sm md:text-base">
                            Browse
                            <input
                              type="file"
                              className="hidden"
                              onChange={handleFileChange}
                              accept="image/*"
                              multiple
                              ref={fileInputRef}
                              {...(selectedFiles.length >= 3
                                ? { disabled: true }
                                : {})}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </section>

                  <section className="flex flex-col-reverse sm:flex-row justify-between gap-3 md:gap-4">
                    <div className="w-full sm:w-auto">
                      <ColouredButton onClick={handleCancel}>
                        Cancel
                      </ColouredButton>
                    </div>
                    <div className="w-full sm:w-auto">
                      <ColouredButton onClick={(e) => handleSubmit(e)}>
                        {createRequestLoading ? "Submitting..." : "Submit"}
                      </ColouredButton>
                    </div>
                  </section>
                </form>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantServiceRequestForm;
