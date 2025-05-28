"use client";
import React, { Suspense } from "react";
import ResetForm from "@/components/ResetForm";

const ResetPassword = () => {
  return (
   <Suspense fallback={<div>Loading...</div>}>
      <ResetForm />
   </Suspense>
    
        
  );
};

export default ResetPassword ;