import React, { useState, useRef } from 'react';
import { XCircle } from 'lucide-react';

const DocumentBranding = () => {
  const [logoFiles, setLogoFiles] = useState<string[]>([]);
  const [letterheadFiles, setLetterheadFiles] = useState<string[]>([]);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingLetterhead, setUploadingLetterhead] = useState(false);
  
  const logoInputRef = useRef<HTMLInputElement>(null);
  const letterheadInputRef = useRef<HTMLInputElement>(null);

  const handleBrowseLogo = () => {
    logoInputRef.current?.click();
  };

  const handleBrowseLetterhead = () => {
    letterheadInputRef.current?.click();
  };

  const handleLogoFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => file.name);
      setLogoFiles([...logoFiles, ...newFiles]);
      setUploadingLogo(true);
      
      // Simulate upload completion after 2 seconds
      setTimeout(() => {
        setUploadingLogo(false);
      }, 2000);
    }
  };

  const handleLetterheadFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => file.name);
      setLetterheadFiles([...letterheadFiles, ...newFiles]);
      setUploadingLetterhead(true);
      
      // Simulate upload completion after 2 seconds
      setTimeout(() => {
        setUploadingLetterhead(false);
      }, 2000);
    }
  };

  const removeLogoFile = (fileIndex: number) => {
    setLogoFiles(logoFiles.filter((_, index) => index !== fileIndex));
  };

  const removeLetterheadFile = (fileIndex: number) => {
    setLetterheadFiles(letterheadFiles.filter((_, index) => index !== fileIndex));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleLogoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map(file => file.name);
      setLogoFiles([...logoFiles, ...newFiles]);
      setUploadingLogo(true);
      
      setTimeout(() => {
        setUploadingLogo(false);
      }, 2000);
    }
  };

  const handleLetterheadDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map(file => file.name);
      setLetterheadFiles([...letterheadFiles, ...newFiles]);
      setUploadingLetterhead(true);
      
      setTimeout(() => {
        setUploadingLetterhead(false);
      }, 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Logo Upload Section */}
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-[#000]">Upload Logo</h2>
          
          {/* Drop Zone */}
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 flex flex-col items-center justify-center"
            onDragOver={handleDragOver}
            onDrop={handleLogoDrop}
          >
            <div className="h-16 w-16 rounded-full bg-indigo-50 flex items-center justify-center mb-2">
              <svg className="h-8 w-8 text-[#785DBA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-center text-gray-500 mb-2">Drag & drop files or <button onClick={handleBrowseLogo} className="text-[#785DBA] font-medium hover:cursor-pointer">Browse</button></p>
            <p className="text-sm text-gray-500">Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT</p>
            <input 
              type="file" 
              ref={logoInputRef}
              onChange={handleLogoFilesChange}
              className="hidden" 
              multiple
            />
          </div>

          {/* Uploading Files */}
          {uploadingLogo && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Uploading - 3/3 files</p>
              <div className="relative pt-1 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-2">
                    <div className="text-xs text-gray-600 mb-1">your-file-here.PDF</div>
                    <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-gray-200">
                      <div style={{ width: "75%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#785DBA]"></div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <XCircle size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Uploaded Files */}
          {logoFiles.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Uploaded</p>
              {logoFiles.map((file, index) => (
                <div key={index} className="relative border border-gray-200 rounded-md px-3 py-2 mb-2 flex items-center justify-between">
                  <div className="text-sm">{file}</div>
                  <button 
                    onClick={() => removeLogoFile(index)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <XCircle size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload Button */}
          <button className="w-full bg-[#785DBA] hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded transition duration-150 hover:cursor-pointer">
            UPLOAD FILES
          </button>
        </div>

        {/* Letterhead Upload Section */}
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-[#000]">Upload Letterhead</h2>
          
          {/* Drop Zone */}
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 flex flex-col items-center justify-center"
            onDragOver={handleDragOver}
            onDrop={handleLetterheadDrop}
          >
            <div className="h-16 w-16 rounded-full bg-indigo-50 flex items-center justify-center mb-2">
              <svg className="h-8 w-8 text-[#785DBA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-center text-gray-500 mb-2">Drag & drop files or <button onClick={handleBrowseLetterhead} className="text-[#785DBA] font-medium">Browse</button></p>
            <p className="text-sm text-gray-500">Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT</p>
            <input 
              type="file" 
              ref={letterheadInputRef}
              onChange={handleLetterheadFilesChange}
              className="hidden" 
              multiple
            />
          </div>

          {/* Uploading Files */}
          {uploadingLetterhead && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Uploading - 3/3 files</p>
              <div className="relative pt-1 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-2">
                    <div className="text-xs text-gray-600 mb-1">your-file-here.PDF</div>
                    <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-gray-200">
                      <div style={{ width: "75%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#785DBA]"></div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 hover:cursor-pointer">
                    <XCircle size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Uploaded Files */}
          {letterheadFiles.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Uploaded</p>
              {letterheadFiles.map((file, index) => (
                <div key={index} className="relative border border-gray-200 rounded-md px-3 py-2 mb-2 flex items-center justify-between">
                  <div className="text-sm">{file}</div>
                  <button 
                    onClick={() => removeLetterheadFile(index)}
                    className="text-red-400 hover:text-red-600 hover:cursor-pointer"
                  >
                    <XCircle size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload Button */}
          <button className="w-full bg-[#785DBA] hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded transition duration-150 hover:cursor-pointer">
            UPLOAD FILES
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentBranding;