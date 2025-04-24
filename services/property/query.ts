// services/property/query.ts
import { useQuery } from "@tanstack/react-query";
import { getProperties } from "./api";
import { getAdminDashboardAnalytics } from "../users/api";

export function useFetchPropertyDetails() {
  return useQuery({
    queryKey: ["get-properties"],   
    queryFn: getProperties,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    select: (data:any) =>
      data.properties.map((property: any) => ({
        id: property.id,
        property: property.name,
        location: property.location,
        vacancy: property.property_status,
        rentOwed: property.rental_price,
      })),
  });
}


export function useAdminDashboardAnalytics() {
  return useQuery({
    queryKey: ["admin-dashboard-analytics"],
    queryFn: getAdminDashboardAnalytics,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
}
