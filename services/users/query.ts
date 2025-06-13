/* eslint-disable @typescript-eslint/no-explicit-any */
// services/users/query.ts
import { useQuery } from "@tanstack/react-query";
import { getTenants} from "./api";
import { UserFilter } from "../interface/filter";

export function useFetchTenantDetails(params:UserFilter) {
  return useQuery({
    queryKey: ["tenants", params],
    queryFn:() => getTenants(params),
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    select: (data: any) =>{
      return data?.users.map((item: any) => ({
        id: item?.id,
        tenantName: `${item?.user?.first_name ?? ""} ${item?.user?.last_name ?? ""}`,
        property: item?.rents[0]?.property?.name || "No Property",
        // moveInDay: item?.moveInDate
        //   ? new Date(item.moveInDate).toLocaleDateString("en-US", {
        //       month: "short",
        //       day: "numeric",
        //       year: "numeric",
        //     })
        //   : "-",
        // rentStatus: item?.rentPaid ? "Paid" : "Overdue",
        rent:item?.rents[0]?.rental_price || "-",
        expiryDate:item?.rents?.[0]?.lease_end_date ? new Date(item?.rents?.[0]?.lease_end_date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }) : "-"
      })) }
  });
}
