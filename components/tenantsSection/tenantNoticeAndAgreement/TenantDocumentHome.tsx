"use client";
/* eslint-disable */
import React, { useState } from "react";
import DocumentsList from "./DocumentList";
import Pagination from "@/components/PaginationComponent";
import { useFetchNoticeAgreementByTenant } from "@/services/notice-agreement/query";

const TenantDocumentHome = () => {
  const { data: noticeData } = useFetchNoticeAgreementByTenant();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Calculate items to display on current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = React.useMemo(() => {
    return noticeData?.slice(indexOfFirstItem, indexOfLastItem) || [];
  }, [noticeData, indexOfFirstItem, indexOfLastItem]);

  //   const sampleDocuments = [
  //     "Lease Agreement.pdf",
  //     "Quit Notice.pdf",
  //     "Tenancy agreement.pdf",
  //     "Lease Agreement.pdf",
  //     "Lease Agreement.pdf",
  //   ];

  const handleView = (filename: any) => {
    console.log(`Viewing: ${filename}`);
    // Implement view logic here
  };

  const handleDownload = (filename: any) => {
    console.log(`Downloading: ${filename}`);
    // Implement download logic here
  };

  return (
    <div className="space-y-5 bg-gray-50 min-h-screen">
      {/* Original Documents Example */}

      <div className="p-6 border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">My Documents</h3>
        <p className="text-sm text-gray-600 mt-1">
          Easily view, download, or reference important documents like your
          lease agreement, notices, ID uploads, and more.
        </p>
      </div>
      <DocumentsList
        documents={currentItems}
        onView={handleView}
        onDownload={handleDownload}
      />

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={noticeData?.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        itemsPerPageOptions={[10, 25, 50, 100]}
        showNavigation={true}
        showItemsPerPage={true}
        showPageJumper={true}
      />
    </div>
  );
};

export default TenantDocumentHome;
