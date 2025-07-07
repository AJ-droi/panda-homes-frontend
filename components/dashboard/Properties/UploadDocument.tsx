import React, { useRef, useState } from "react";
import { Trash } from "lucide-react";

type UploadingFile = {
  name: string;
  progress: number;
};

const UploadDocument = () => {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleBrowseLogo = () => {
    logoInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleLogoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFileNames = Array.from(e.dataTransfer.files).map((file) => file.name);
      simulateUpload(newFileNames);
    }
  };

  const handleLogoFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFileNames = Array.from(e.target.files).map((file) => file.name);
      simulateUpload(newFileNames);
    }
  };

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
                className="text-[#785DBA] font-medium"
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
                      className="text-gray-400 hover:text-gray-600"
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
                  <div className="text-sm">{file}</div>
                  <button
                    onClick={() => removeUploadedFile(index)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload Button */}
          <button className="w-full bg-[#785DBA] hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded transition duration-150">
            UPLOAD FILES
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
