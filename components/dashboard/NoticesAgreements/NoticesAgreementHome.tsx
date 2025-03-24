/* eslint-disable */
"use client";
import React, { useEffect, useState } from "react";
import Pagination from "../../PaginationComponent";
import NoticesHomeNav from "@/components/dashboard/NoticesAgreements/NoticesHomeNav";
import NoticeTable from "./NoticeTable";
import NoticeForm from "./NoticeForm";

const NoticesAgreementHome = () => {
  const [useColumnLayout, setUseColumnLayout] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setUseColumnLayout(width <= 1280);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="bg-[#fafafe] p-4 w-full">
      <section>
        <div className="">
          <NoticesHomeNav />
        </div>
      </section>

      <section className="mt-10 w-full">
        <div
          className={`flex ${
            useColumnLayout ? "flex-col" : "flex-col lg:flex-row"
          }  gap-10 w-full`}
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
          <div className="flex flex-col justify-center items-center w-full">
            <NoticeTable />
            <div className="mt-6 flex justify-center lg:justify-end">
              <Pagination
                totalPages={10}
                currentPage={4}
                onPageChange={() => ""}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 flex flex-col gap-[14px] w-full">
        <NoticeForm />
      </section>
    </div>
  );
};

export default NoticesAgreementHome;
