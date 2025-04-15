/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import Dropdown2 from "@/components/Dropdown2";
import ColouredButton from "@/components/ColouredButton";
import { useRouter } from "next/navigation";

interface noticeFormProps {
  onClose?: () => void;
}

const NoticeForm: React.FC<noticeFormProps> = ({ onClose }) => {
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const propertyOptions = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Miami",
  ];
  const tenantOptions = [
    "John Snow",
    "John Doe",
    "Jane Muffings",
    "Esosa Igba",
    "Eghosa Efosa",
  ];
  const noticeTypeOptions = [
    "Rent Increase",
    "Lease Renewal",
    "Eviction Warning",
    "Warning",
  ];
  const DateOptions = ["1", "2", "3", "4", "5+"];
  const messageMediumOptions = ["SMS", "App", "Email"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const router = useRouter()

  return (
    <div className="w-full p-10 md:p-10 shadow-2xl bg-white rounded-lg">
      <h1
        className="text-xl md:text-2xl leading-[150%] font-[500] mb-2 md:mb-2 text-[#785DBA]"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        Send New Notice
      </h1>

      <main className="text-black mt-[37.96px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-[37.95px]">
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="gap-2 md:gap-[12.14px] flex flex-col">
              <Dropdown2
                options={propertyOptions}
                placeholder="Select Property"
              />
            </div>
            <div className="gap-2 md:gap-[12.14px] flex flex-col">
              <Dropdown2
                options={tenantOptions}
                placeholder="Select Tenant(s)"
              />
            </div>
            <div className="gap-2 md:gap-[12.14px] flex flex-col">
              <Dropdown2
                options={noticeTypeOptions}
                placeholder="Notice Type"
              />
            </div>
            <div className="gap-2 md:gap-[12.14px] flex flex-col">
              <Dropdown2 options={DateOptions} placeholder="Effective Date" />
            </div>
          </section>

          <section className="gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="gap-2 md:gap-[12.14px] flex flex-col">
              <Dropdown2
                options={messageMediumOptions}
                placeholder="Send Via"
              />
            </div>
          </section>

          <section className="mb-4 md:mb-6 gap-2 md:gap-[12.14px] flex flex-col">
            <label
              className="block text-sm font-medium mb-1 md:mb-2"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Additional Notes
            </label>
            <textarea
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Enter your Message here"
              className="w-full p-2 md:p-3 border border-[#262626] text-[#000000] rounded-lg focus:outline-none focus:border-[#785DBA] transition-colors text-xs md:text-[11.44px] leading-[150%] font-[500] min-h-[100px]"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            />
          </section>

          {/* <section className="flex justify-center items-center mb-6 md:mb-8">
            <div className="gap-2 md:gap-[12.14px] w-full sm:w-[250px] h-auto sm:h-[232px] flex flex-col justify-center items-center">
              <label
                className="block text-sm font-medium mb-1 md:mb-2"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Upload Attachments (Optional)
              </label>
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
                  Maximum size of image 5mb
                </p>
                <label className="inline-block px-3 py-1 md:px-4 md:py-2 bg-white text-[#785DBA] rounded-2xl cursor-pointer border-1 hover:text-white border-[#785DBA] hover:bg-[#6a4fa8] transition-colors text-sm md:text-base">
                  Browse
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                    multiple
                  />
                </label>
              </div>
            </div>
          </section> */}

          <section className="flex flex-col-reverse sm:flex-row justify-end gap-3 md:gap-4">
            <div className="w-full sm:w-auto">
              <ColouredButton title="Send Notice" onClick={() => router.push('/notices-agreements/notice')}/>
            </div>
          </section>
        </form>
      </main>
    </div>
  );
};

export default NoticeForm;
