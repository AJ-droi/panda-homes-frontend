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
    select: (data: any) =>
      data?.users?.map((user: any) => ({
        id: user?.id,
        tenantName: `${user?.first_name ?? ""} ${user?.last_name ?? ""}`,
        property: user?.property_tenants?.[0]?.property?.name || "No Property",
        moveInDay: user?.moveInDate
          ? new Date(user.moveInDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "-",
        rentStatus: user?.rentPaid ? "Paid" : "Overdue",
        rent:user?.property_tenants?.[0]?.property?.rental_price || "-",
        expiryDate:user?.rents?.[0]?.lease_end_date ? new Date(user?.rents?.[0]?.lease_end_date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }) : "-"
      })) ?? [],
  });
}
