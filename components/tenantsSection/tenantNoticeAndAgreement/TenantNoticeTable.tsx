/*eslint-disable */
import { DocumentPreviewModal } from "@/components/dashboard/NoticesAgreements/NoticeTable";
import Pagination from "@/components/PaginationComponent";
import { useFetchNoticeAgreementByTenant } from "@/services/notice-agreement/query";
import React, { useState } from "react";

const TenantNoticeTable = () => {


    const { data: noticeData, isLoading } = useFetchNoticeAgreementByTenant();
      const [previewUrl, setPreviewUrl] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 10;
      
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
    <div className="max-w-full text-[#6E7079] overflow-hidden ">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
          <tr className="border-y border-[#E1E2E9]">
               <th
               className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Notice Type
              </th>
               {/* <th
               className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Tenant
              </th> */}
               <th
               className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Property
              </th>
               <th
               className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Date Sent
              </th>
               <th
               className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Status
              </th>
               <th
               className="text-center text-md leading-[145%] py-4 px-6 text-[#785DBA] font-normal"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
          {isLoading
              ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="py-4 px-6 text-center">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto" />
                    </td>
                  </tr>
                ))
              )
              : !currentItems || currentItems?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-400">
                    No Notice Agreement Yet
                  </td>
                </tr>
              ) :currentItems?.map((item:any, index:number) => (
              <tr
                key={item.id}
                className={`${
                  index !== noticeData.length - 1 ? "" : ""
                } text-sm`}
              >
                <td className={`py-4 text-center px-6`}>{item.noticeType}</td>
                <td className="py-4 px-6 text-center">{item.property}</td>
                <td className="py-4 px-6 text-center">{item.dateSent}</td>
                <td className={`py-4 px-6 text-center`}>{item.status}</td>
                {/* <td className={`py-4 text-center px-6`}>{item.status}</td> */}
                <td className="py-4 px-6 text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handlePreview(item.notice_document)}
                      className="bg-[#785DBA] text-white hover:cursor-pointer hover:bg-[#624a94] px-[16px] py-[10px] rounded-[12px] text-sm "
                    >
                      Preview
                    </button>
                    <a 
                      href={item.notice_document}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#5E636614] text-[#8B8D97] hover:cursor-pointer hover:bg-transparent hover:border-1 hover:border-black hover:text-black px-[16px] py-[10px] rounded-[12px] text-sm inline-flex items-center "
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
        onPageChange={setCurrentPage}      />


          {previewUrl && (
                <DocumentPreviewModal 
                  documentUrl={previewUrl} 
                  onClose={closePreview}
                />
              )}
    </div>
  );
};

export default TenantNoticeTable;
