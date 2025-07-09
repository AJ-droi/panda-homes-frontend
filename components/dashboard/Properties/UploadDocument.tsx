/* eslint-disable */
import React, { useRef, useState } from "react";
import { Trash } from "lucide-react";
import axios from "axios";
import { useUploadDocument } from "@/services/notice-agreement/mutation";
import { useParams } from "next/navigation";

const CLOUD_NAME = "djrqmnzdw";
const UPLOAD_PRESET = "gi3ara5r";

type SelectedFile = {
  file: File;
  progress: number;
  secureUrl?: string;
};

const UploadDocument = () => {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const upload = useUploadDocument();
  const { id } = useParams() as any;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBrowseLogo = () => {
    if (logoInputRef.current) {
      logoInputRef.current.value = ""; // Allow re-selection
      logoInputRef.current.click();
    }
  };

  const handleFileSelection = (files: File[]) => {
    const fileObjs = files.map((file) => ({
      file,
      progress: 0,
      secureUrl: undefined,
    }));
    setSelectedFiles((prev) => [...prev, ...fileObjs]);
  };

  const handleLogoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      handleFileSelection(Array.from(e.dataTransfer.files));
    }
  };

  const handleLogoFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileSelection(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true); // Start submitting state

    try {
      const documentUrls: string[] = [];

      for (const fileObj of selectedFiles) {
        const formData = new FormData();
        formData.append("file", fileObj.file);
        formData.append("upload_preset", UPLOAD_PRESET);

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
          formData,
          {
            onUploadProgress: (progressEvent: any) => {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setSelectedFiles((prev) =>
                prev.map((f) =>
                  f.file.name === fileObj.file.name
                    ? { ...f, progress: percent }
                    : f
                )
              );
            },
          }
        );

        const secureUrl = res.data.secure_url;
        documentUrls.push(secureUrl);

        setSelectedFiles((prev) =>
          prev.map((f) =>
            f.file.name === fileObj.file.name ? { ...f, secureUrl } : f
          )
        );
      }

      if (documentUrls.length > 0) {
        await upload.mutateAsync({
          id,
          formPayload: { document_url: documentUrls },
        });
        setSelectedFiles([]);
        if (logoInputRef.current) logoInputRef.current.value = "";
      }
    } catch (error) {
      console.error("❌ Upload failed:", error);
    } finally {
      setIsSubmitting(false); // End submitting state
    }
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white min-h-screen w-full py-12">
      <div className="max-w-2xl mx-auto">
        <div className="p-6 rounded-lg">
          {/* Drop Zone */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 flex flex-col items-center justify-center"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleLogoDrop}
          >
            <div className="h-16 w-16 rounded-full bg-indigo-50 flex items-center justify-center mb-2">
              <svg
                className="h-8 w-8 text-[#785DBA]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <p className="text-center text-gray-500 mb-2">
              Drag & drop files or{" "}
              <button
                onClick={handleBrowseLogo}
                className="text-[#785DBA] font-medium hover:cursor-pointer"
              >
                Browse
              </button>
            </p>
            <p className="text-sm text-gray-500">
              Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
            </p>
            <input
              type="file"
              ref={logoInputRef}
              onChange={handleLogoFilesChange}
              className="hidden"
              multiple
            />
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Selected Files</p>
              {selectedFiles.map((fileObj, index) => (
                <div
                  key={index}
                  className="relative border border-gray-200 rounded-md px-3 py-2 mb-2 flex items-center justify-between"
                >
                  <div className="flex flex-col w-full mr-2">
                    <span className="text-sm truncate">
                      {fileObj.file.name}
                    </span>
                    {fileObj.progress > 0 && fileObj.progress < 100 && (
                      <div className="h-2 bg-gray-200 rounded mt-1">
                        <div
                          className="h-2 bg-[#785DBA] rounded"
                          style={{ width: `${fileObj.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeSelectedFile(index)}
                    className="text-red-400 hover:text-red-600 hover:cursor-pointer"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload Button */}
          <button
            className="w-full bg-[#785DBA] hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded transition duration-150 hover:cursor-pointer disabled:opacity-50"
            onClick={handleSubmit}
            disabled={isSubmitting || selectedFiles.length === 0}
          >
            {isSubmitting ? "SUBMITTING..." : "UPLOAD FILES"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
