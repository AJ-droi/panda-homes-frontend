/*eslint-disable */
import React, { useRef, useState } from "react";
import { Trash } from "lucide-react";
import axios from "axios";
import { useUploadDocument } from "@/services/notice-agreement/mutation";
import { useParams } from "next/navigation";

const CLOUD_NAME = "djrqmnzdw";
const UPLOAD_PRESET = "gi3ara5r";

type UploadingFile = {
  name: string;
  progress: number;
};

const UploadDocument = () => {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const logoInputRef = useRef<HTMLInputElement>(null);

const handleBrowseLogo = () => {
  if (logoInputRef.current) {
    logoInputRef.current.value = ""; // Allow re-uploading same file
    logoInputRef.current.click();
  }
};


  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleLogoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFileNames = Array.from(e.dataTransfer.files).map(
        (file) => file.name
      );
      simulateUpload(newFileNames);
    }
  };

  const upload = useUploadDocument();
  const { id } = useParams() as any;

  const handleLogoFilesChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      await uploadToCloudinary(files);
    }
  };

  const uploadToCloudinary = async (files: File[]) => {
    console.log({ files });
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      // Add file to uploading list
      setUploadingFiles((prev) => [...prev, { name: file.name, progress: 0 }]);

      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
          formData,
          {
            onUploadProgress: (progressEvent: any) => {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );

              setUploadingFiles((prev) =>
                prev.map((f) =>
                  f.name === file.name ? { ...f, progress: percent } : f
                )
              );
            },
          }
        );
        console.log({ r: res.data });
        const secureUrl = res.data.secure_url;
        setUploadedFiles((prev) => [...prev, secureUrl]);
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setUploadingFiles((prev) => prev.filter((f) => f.name !== file.name));
      }
    }
  };

  console.log({ uploadedFiles });

  const simulateUpload = (fileNames: string[]) => {
    const uploads = fileNames.map((name) => ({ name, progress: 0 }));
    setUploadingFiles((prev) => [...prev, ...uploads]);

    fileNames.forEach((name) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 25;
        setUploadingFiles((prev) =>
          prev.map((file) =>
            file.name === name
              ? { ...file, progress: Math.min(progress, 100) }
              : file
          )
        );

        if (progress >= 100) {
          clearInterval(interval);
          setUploadedFiles((prev) => [...prev, name]);
          setUploadingFiles((prev) =>
            prev.filter((file) => file.name !== name)
          );
        }
      }, 500);
    });
  };

  const removeUploadedFile = (fileIndex: number) => {
    setUploadedFiles((prev) => prev.filter((_, index) => index !== fileIndex));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await upload.mutateAsync({
        id,
        formPayload: { document_url: uploadedFiles },
      });

      // Clear uploaded files after successful upload
      setUploadedFiles([]);
      if (logoInputRef.current) {
        logoInputRef.current.value = ""; // Reset file input
      }
    } catch (error) {
      console.error("Failed to upload files:", error);
    }
  };

  return (
    <div className="bg-white min-h-screen w-full py-12">
      <div className="max-w-2xl mx-auto">
        <div className="p-6 rounded-lg">
          {/* Drop Zone */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 flex flex-col items-center justify-center"
            onDragOver={handleDragOver}
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

          {/* Uploading Files */}
          {uploadingFiles.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Uploading</p>
              {uploadingFiles.map((file, index) => (
                <div key={index} className="relative pt-1 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-2">
                      <div className="text-xs text-gray-600 mb-1">
                        {file.name}
                      </div>
                      <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-gray-200">
                        <div
                          style={{ width: `${file.progress}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#785DBA]"
                        ></div>
                      </div>
                    </div>
                    <button
                      className="text-gray-400 hover:text-gray-600 hover:cursor-pointer"
                      disabled
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Uploaded</p>
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="relative border border-gray-200 rounded-md px-3 py-2 mb-2 flex items-center justify-between"
                >
                  <div className="text-sm truncate max-w-[75%]">{file}</div>
                  <button
                    onClick={() => removeUploadedFile(index)}
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
            className="w-full bg-[#785DBA] hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded transition duration-150 hover:cursor-pointer"
            onClick={handleSubmit}
            disabled={upload.isPending}
          >
            {upload.isPending ? "UPLOADING..." : "UPLOAD FILES"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
