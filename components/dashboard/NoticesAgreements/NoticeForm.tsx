
"use client";
/*eslint-disable */
import React, { useState, useRef, useMemo } from "react";
import Dropdown2 from "@/components/Dropdown2";
import ColouredButton from "@/components/ColouredButton";
import { useRouter } from "next/navigation";
// import NoticeEditor from "./NoticeEditor";
import { useFetchPropertyById, useFetchPropertyDetails } from "@/services/property/query";
import CalendarDropdown from "@/components/CalendarDropdown";
import { useCreateNoticeAgreement } from "@/services/notice-agreement/mutation";

import dynamic from 'next/dynamic';
import BackButton from "@/components/Backbutton";

const NoticeEditor = dynamic(() => import('@/components/dashboard/NoticesAgreements/NoticeEditor'), { ssr: false });


interface noticeFormProps {
  onClose?: () => void;
}

const NoticeForm: React.FC<noticeFormProps> = ({ onClose }) => {
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // State for preview content
  const [previewHtml, setPreviewHtml] = useState("");

   
  const {data: propertyData} = useFetchPropertyDetails()

  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    notice_type: '', // e.g., 'rent_increase'
    effective_date: null as Date | null, // e.g., '2025-05-01T00:00:00.000Z'
    // send_via: [], // e.g., ['email', 'whatsapp']
    // additional_notes: '',
    property_id: '',
    tenant_id: '',
    html_content: '', // HTML string to be generated from the editor
  });

  const propertyOptions = useMemo(() => {

    const propertyOption = propertyData?.map((item:any) => {
      return {
        label: item.property,
        value: item.id
      }
    })|| {label:"select property", value:""}

    return propertyOption
  }, [propertyData])


  const {data: singleProperty} = useFetchPropertyById(formData.property_id)

  const tenantOptions = useMemo(() => {

    if(!singleProperty?.property_tenants){
      return [{label:"no tenant on this property", value:""}]
    }

    const tenantOption = (singleProperty as any)?.property_tenants?.map((item:any) => {
      return {
        label: item.tenant?.profile_name,
        value: item.tenant.id
      }
    })

    return tenantOption
  }, [singleProperty])


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (name: keyof typeof formData, date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      [name]: date,
    }));
  };

  const noticeTypeOptions :any = [
    { label: "Rent Increase", value: "rent_increase" },
    { label: "Lease Renewal", value: "lease_renewal" },
    { label: "Eviction Warning", value: "eviction_warning" },
    { label: "Warning", value: "warning" },
  ];
  

  const router = useRouter();



  const handlePreview = () => {
    // Get current content from the editor
    const editorHtml = (window as any).noticeEditor?.getContent() || "";
    const editorText = (window as any).noticeEditor?.getText() || "";

    // Basic validation
    if (!editorText.trim()) {
      alert("Please add content to your notice before previewing");
      return;
    }

    // Set the preview content and show the preview modal
    setPreviewHtml(editorHtml);
    setShowPreview(true);
  };

  const {mutate, isPending} = useCreateNoticeAgreement()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Get content from editor (using the window hack we set up)
    const editorHtml = (window as any).noticeEditor?.getContent() || "";
    // const editorText = (window as any).noticeEditor?.getText() || "";

    // console.log(editorHtml)

    // Validate for

    setIsSending(true);

    try {
      mutate(
        {
         ...formData,
         html_content: editorHtml
        },
        {
          onSuccess: () => {
            // router.push("/dashboard/notice-agreement");
            window.location.reload()
          },
          onError: (error: any) => {
            setError(error.message || "An error occurred during notice creation.");
          },
        }
      );

      // Reset the form or redirect
      if (typeof window !== "undefined" && (window as any).noticeEditor) {
        (window as any).noticeEditor.resetEditor();
      }
      setAdditionalNotes("");

      // // Redirect to notices page as in original code
      // router.push("/dashboard/notice-agreement/notice");
    } catch (error) {
      console.error("Error sending notice:", error);
      alert("Failed to send notice. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  // Preview Modal Component
  const PreviewModal = () => {
    if (!showPreview) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm shadow-xl bg-opacity-50 flex items-center justify-center z-[1700] text-[#000]">
        <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#785DBA]">
              Notice Preview
            </h2>
            <button
              onClick={() => setShowPreview(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Preview Header */}
          {/* <div className="mb-4 pb-2 border-b">
            {selectedProperty && (
              <p>
                <strong>Property:</strong> {selectedProperty}
              </p>
            )}
            {selectedTenant && (
              <p>
                <strong>Tenant:</strong> {selectedTenant}
              </p>
            )}
            {selectedNoticeType && (
              <p>
                <strong>Notice Type:</strong> {selectedNoticeType}
              </p>
            )}
            {selectedDate && (
              <p>
                <strong>Effective Date:</strong> {selectedDate}
              </p>
            )}
            {selectedMedium && (
              <p>
                <strong>Delivery Method:</strong> {selectedMedium}
              </p>
            )}
          </div> */}

          {/* Content Preview */}
          <div className="border rounded-lg p-4 mb-4">
            <div
              dangerouslySetInnerHTML={{ __html: previewHtml }}
              className="prose max-w-none"
            />
          </div>

          {/* Additional Notes Preview */}
          {additionalNotes && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Additional Notes:</h3>
              <div className="border rounded-lg p-4">{additionalNotes}</div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={() => setShowPreview(false)}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              Edit Notice
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-[#785DBA] text-white rounded-md hover:bg-[#6a4fa8]"
            >
             {isPending ?"Sending Notice":"Send Notice"} 
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full p-10 md:p-10 shadow-lg bg-white  min-h-[100vh]">
       {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
         <BackButton />
      <h1
        className="text-xl md:text-2xl leading-[150%] font-[500] mb-2 md:mb-2 text-[#785DBA] pt-[2%]"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        Send New Notice
      </h1>

      <main className="text-black mt-[37.96px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePreview(); // Show preview instead of direct submit
          }}
          className="flex flex-col gap-[37.95px]"
        >
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="gap-2 md:gap-[12.14px] flex flex-col">
              <Dropdown2
                name="property_id"
                options={propertyOptions}
                // placeholder="Select Property"
                onChange={handleChange}
              />
            </div>
            <div className="gap-2 md:gap-[12.14px] flex flex-col">
              <Dropdown2
               name="tenant_id"
                options={tenantOptions}
                placeholder="Select Tenant(s)"
                onChange={handleChange}
              />
            </div>
            <div className="gap-2 md:gap-[12.14px] flex flex-col">
              <Dropdown2
                name="notice_type"
                options={noticeTypeOptions}
                placeholder="Notice Type"
                onChange={handleChange}
              />
            </div>
            <div className="gap-2 md:gap-[12.14px] flex flex-col">
            <CalendarDropdown
                selectedDate={formData.effective_date}
                onChange={(date) => handleDateChange("effective_date", date)}
                placeholder="Select Effective Date"
              />
            </div>
          </section>

          {/* <section className="gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="gap-2 md:gap-[12.14px] flex flex-col">
              <Dropdown2
                name="send_via"
                options={messageMediumOptions}
                placeholder="Send Via"
                onChange={handleChange}
              />
            </div>
          </section> */}

          {/* Notice Editor - Main content */}
          <section className="mb-4 md:mb-6">
            {/* <NoticeEditor 
              onContentChange={setNoticeContent}
              initialContent="Type your notice content here..."
            /> */}

            <NoticeEditor
              initialContent={`
                <h2><strong>Rent Renewal</strong></h2>

            <p style="color: #6b7280;">27th January 2025</p>

            <p><strong>Ms. Stella Ayekomire</strong><br/>
            Vier Apartments<br/>
            Kenneth Agbakuru Street<br/>
            Lekki Phase 1, Lagos State.</p>

            <p>Dear Ms Ayekomire,</p>

            <p><strong>RENT RENEWAL OFFER</strong></p>

            <p>This is to formally notify you that your tenancy over the one-bedroom apartment situate at Kenneth Agbakuru Street, Lekki Phase I which you currently occupy expires on the 31st of January 2025. Following the expiry of your tenancy, we hereby make you an offer to rent the apartment for another period upon the following terms:</p>

            <ul>
              <li><strong>Permitted Use:</strong> Apartment is not permitted for any other use apart from residential use by the Tenant. Any other use, commercial or otherwise is strictly prohibited.</li>
              <li><strong>Rent:</strong> ₦2,800,000</li>
              <li><strong>Service Charge:</strong> ₦700,000</li>
              <li><strong>Tenancy Term:</strong> One Year Fixed</li>
              <li><strong>Tenancy Expiry Date:</strong> Commencing on the <strong>1st of February 2025</strong> and Expiring on the <strong>31st of January 2026</strong>.</li>
            </ul>

            <p>Please make <strong>ALL</strong> payments on or before the due date of 31st of January 2025 into the company’s account provided below:</p>

            <p><strong>Account No:</strong> 5401475004<br/>
            <strong>Account Bank:</strong> Providus Bank<br/>
            <strong>Account Name:</strong> Panda Homes Nigeria Limited</p>

            <p>Yours faithfully,</p>

            <p><strong>Olatunji Oginni</strong><br/>
            Founder/CEO</p>

            <hr/>

            <p style="text-align: center;">
            17 Ayinde Akinmade Street, Lekki Phase 1, Lagos State<br/>
            <a href="https://www.getpanda.ng" target="_blank" rel="noopener noreferrer">www.getpanda.ng</a>
            </p>`}  
              onContentChange={setNoticeContent}
            />
          </section>
        

          <section className="flex flex-col-reverse sm:flex-row justify-end gap-3 md:gap-4">
            <div className="w-full sm:w-auto">
              <ColouredButton
                title="Preview Notice"
                onClick={handlePreview}
                disabled={isSending}
              />
            </div>
          </section>
        </form>
      </main>

      {/* Preview Modal */}
      <PreviewModal />
    </div>
  );
};

export default NoticeForm;
