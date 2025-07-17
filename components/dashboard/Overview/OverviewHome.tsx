import React from "react";
import OverviewCard from "./OverviewCard";
import { useFetchPropertyOverview } from "@/services/notification/query";

const OverviewHome = () => {
  const { data } = useFetchPropertyOverview();
  return (
    <div className="py-2 md:px-4">
      <h3 className="text-[#6E7079] text-[14px] pb-3">
        {" "}
        See what’s happening across your properties.{" "}
      </h3>
      <OverviewCard data={data} />
    </div>
  );
};

export default OverviewHome;
