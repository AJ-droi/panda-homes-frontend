/*eslint-disable */
import Pagination from "@/components/PaginationComponent";
import { useFetchNoticeAgreements } from "@/services/notice-agreement/query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import TableHeader from "../TableHeader";

export const DocumentPreviewModal = ({ documentUrl, onClose }: any) => {
  const [isPdfLoading, setIsPdfLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Determine file type from URL for proper display
  const getFileType = (url: any) => {
    if (url.match(/\.(jpeg|jpg|gif|png)$/i)) return "image";
    return "pdf"; // Default to pdf if not an image
  };

  const fileType = getFileType(documentUrl);

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 ml-[5%]">
      <div className="bg-white rounded-lg p-6 w-full sm:w-11/12 lg:w-5/6 max-w-6xl flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Document Preview
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
            aria-label="Close Preview Modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-grow overflow-auto border border-gray-200 rounded-lg bg-gray-50">
          {(isPdfLoading || isImageLoading) && (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          )}

          {fileType === "pdf" ? (
            <iframe
              src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(
                documentUrl
              )}`}
              className="w-full h-[600px]"
              onLoad={() => setIsPdfLoading(false)}
              onError={() => setIsPdfLoading(false)}
            />
          ) : fileType === "image" ? (
            <img
              src={documentUrl}
              alt="Document Preview"
              className="max-w-full max-h-full mx-auto"
              onLoad={() => setIsImageLoading(false)}
              onError={() => setIsImageLoading(false)} // Handle error for Image load failure
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-gray-600 mb-4">
                This document type can't be previewed
              </p>
              {!isPdfLoading && !isImageLoading && (
                <p className="text-sm text-gray-500">
                  Try downloading the document instead
                </p>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <a
            href={documentUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#785DBA] text-white px-4 py-2 rounded-lg hover:bg-[#624a94] transition-colors"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
};

const NoticeTable = ({ noticeData, handleSort }: any) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Calculate items to display on current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = noticeData?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePreview = (url: any) => {
    setPreviewUrl(url);
  };

  const closePreview = () => {
    setPreviewUrl(null);
  };


  return (
    <div className="max-w-full text-[#6E7079] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-y border-[#E1E2E9]">
              <TableHeader
                headertitle={"Notice Type"}
                ascending={() => handleSort("notice_type", "asc")}
                descending={() => handleSort("notice_type", "desc")}
              />

              <TableHeader
                headertitle={"Tenant"}
                ascending={() => handleSort("tenant_name", "asc")}
                descending={() => handleSort("tenant_name", "desc")}
              />
              <TableHeader
                headertitle={"Property"}
                ascending={() => handleSort("property_name", "asc")}
                descending={() => handleSort("property_name", "desc")}
              />
              <TableHeader
                headertitle={"Date Sent"}
                ascending={() => handleSort("created_at", "asc")}
                descending={() => handleSort("created_at", "desc")}
              />

              <TableHeader
                headertitle={"Status"}
                ascending={() => handleSort("status", "asc")}
                descending={() => handleSort("status", "desc")}
              />

              <th
                className="text-left text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((item: any, index: number) => (
              <tr
                key={item.id}
                className={`${
                  index !== noticeData?.length - 1 ? "" : ""
                } text-sm`}
              >
                <td className="py-4 text-left px-6">{item.noticeType}</td>
                <td className="py-4 px-6 text-left">{item.tenant}</td>
                <td className="py-4 px-6 text-left">{item.property}</td>
                <td className="py-4 px-6 text-left">{item.dateSent}</td>
                <td className="py-4 text-left px-6">{item.status}</td>
                <td className="py-4 px-6 text-left">
                  <div className="flex justify-start space-x-2">
                    <button
                      onClick={() => handlePreview(item.notice_document)}
                      className="bg-[#785DBA] text-white hover:bg-[#624a94] px-[16px] py-[10px] rounded-[12px] text-sm hover:cursor-pointer"
                    >
                      Preview
                    </button>
                    <a
                      href={item.notice_document}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#5E636614] text-[#8B8D97] hover:cursor-pointer hover:bg-transparent hover:border-1 hover:border-black hover:text-black px-[16px] py-[10px] rounded-[12px] text-sm inline-flex items-center"
                    >
                      Download
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={noticeData?.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        itemsPerPageOptions={[10, 25, 50, 100]}
        showNavigation
        showItemsPerPage
        showPageJumper
      />

      {previewUrl && (
        <DocumentPreviewModal documentUrl={previewUrl} onClose={closePreview} />
      )}
    </div>
  );
};

export default NoticeTable;
