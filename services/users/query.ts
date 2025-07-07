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
        id: item?.id,
        tenantName: `${toSentenceCase(item?.user?.first_name) ?? ""} ${
          toSentenceCase(item?.user?.last_name) ?? ""
        }`,
        property: item?.rents[0]?.property?.name || "No Property",
        // moveInDay: item?.moveInDate
        //   ? new Date(item.moveInDate).toLocaleDateString("en-US", {
        //       month: "short",
        //       day: "numeric",
        //       year: "numeric",
        //     })
        //   : "-",
        // rentStatus: item?.rentPaid ? "Paid" : "Overdue",
        rent: item?.rents[0]?.rental_price || "-",
        expiryDate: item?.rents?.[0]?.lease_end_date
          ? new Date(item?.rents?.[0]?.lease_end_date).toLocaleDateString(
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
      const activeProperty = data.property_tenants.find(
        (item: any) => item.status === "active"
      );

      if (
        activeProperty &&
        activeProperty.property &&
        Array.isArray(activeProperty.property.rents) &&
        activeProperty.property.rents.length > 0
      ) {
        const rent = activeProperty.property.rents[0];

        return {
          description: activeProperty.property.description || "",
          rental_price: rent.rental_price || 0,
          security_deposit: rent.security_deposit || 0,
          service_charge: rent.service_charge || 0,
          lease_start_date: rent.lease_start_date,
          lease_end_date: rent.lease_end_date
        };
      }

      return null; // Or throw or return default values
    },
  });
}
