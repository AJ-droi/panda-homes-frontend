"use client";
import React from "react";
import RequestCard from "./RequestCard";
import { useFetchTenantServiceRequest } from "@/services/tenants/query";
import NoDataAvailable from "../NoDataComponent";
import BackButton from "@/components/Backbutton";

const PastRequest = () => {
  const { data: tenantServiceRequest } =
    useFetchTenantServiceRequest("resolved");

  return (
    <div className="bg-[#fff] min-h-[100vh] text-[#000] py-[2%] px-[3%] ">
       <BackButton title={"Past Requests"} />

      {tenantServiceRequest?.length === 0 ? (
        <NoDataAvailable
          title="No Past Request Available"
          subtitle=""
          description=""
          footer=""
        />
      ) : (
        <RequestCard request={tenantServiceRequest} type={"past"} />
      )}
    </div>
  );
};

export default PastRequest;
