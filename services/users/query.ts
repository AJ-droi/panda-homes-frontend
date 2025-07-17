/* eslint-disable @typescript-eslint/no-explicit-any */
// services/users/query.ts
import { useQuery } from "@tanstack/react-query";
import { getTenantAndPropertyInfo, getTenants } from "./api";
import { UserFilter } from "../interface/filter";
import { toSentenceCase } from "@/utilities/utilities";

export function useFetchTenantDetails(params: UserFilter) {
  return useQuery({
    queryKey: ["tenants", params],
    queryFn: () => getTenants(params),
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    select: (data: any) => {
      return data?.users.map((item: any) => ({
        id: item?.tenant?.id,
        tenantName: `${toSentenceCase(item?.tenant?.profile_name?.split(" ")[0]) ?? ""} ${
          toSentenceCase(item?.tenant?.profile_name?.split(" ")[1]) ?? ""
        }`,
        property: item?.property?.name || "No Property",
        // moveInDay: item?.moveInDate
        //   ? new Date(item.moveInDate).toLocaleDateString("en-US", {
        //       month: "short",
        //       day: "numeric",
        //       year: "numeric",
        //     })
        //   : "-",
        // rentStatus: item?.rentPaid ? "Paid" : "Overdue",
        rent: item?.rental_price || "-",
        date: item?.tenant?.created_at
          ? new Date(item?.tenant?.created_at).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              }
            )
          : "-",
      }));
    },
  });
}

export function useFetchTenantAndPropertyInfo() {
  return useQuery({
    queryKey: ["tenants-property-info"],
    queryFn: () => getTenantAndPropertyInfo(),
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    select: (data: any) => {
      const activeProperties = data.property_tenants?.filter(
        (item: any) => item.status === "active"
      );

      const getActiveRent = (rents: any[]) => {
        return rents?.find((rent: any) => rent.rent_status === "active");
      };

      if (!activeProperties?.length) return [];

      return activeProperties.map((item: any) => {
        const rent = getActiveRent(item.property?.rents || []);
        console.log({rent})

        return {
          property_name: item.property.name || "",
          description: item.property?.description || "",
          rental_price: rent?.rental_price || 0,
          security_deposit: rent?.security_deposit || 0,
          service_charge: rent?.service_charge || 0,
          lease_start_date: rent?.lease_start_date || null,
          lease_end_date: rent?.lease_end_date || null,
        };
      });
    },
  });
}
