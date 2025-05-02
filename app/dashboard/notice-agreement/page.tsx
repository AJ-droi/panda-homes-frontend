"use client";
import React, { Suspense } from "react";
import NoticesAgreementHome from "@/components/dashboard/NoticesAgreements/NoticesAgreementHome";

const NoticesAndAgreements = () => {
  return (
    <Suspense fallback={<p> loading....</p>}>
        <section className="">
      <NoticesAgreementHome />
    </section>
    </Suspense>
  
  );
};

export default NoticesAndAgreements;
