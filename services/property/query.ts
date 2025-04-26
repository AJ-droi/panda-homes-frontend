/* eslint-disable @typescript-eslint/no-explicit-any */
// services/property/query.ts
import { useQuery } from "@tanstack/react-query";
import { getProperties, getPropertiesById } from "./api";
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

export function useFetchPropertyById(id: string) {
  return useQuery({
    queryKey: ["get-properties-by-id", id],
    queryFn: () => getPropertiesById(id),
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    select: (data: any) => {
      const leaseStart = new Date(data.move_in_date);
      const leaseDuration = data.lease_duration;

      // Calculate leaseEndDate by adding leaseDuration (in months) to leaseStart
      const leaseEnd = new Date(leaseStart);
      leaseEnd.setMonth(leaseEnd.getMonth() + leaseDuration);

      return {
        id: data.id,
        propertyName: data.name,
        description:"property info",
        location: data.location,
        rentStatus: data.property_status,
        tenantName:
          data.property_tenants[0].tenant.first_name +
          " " +
          data.property_tenants[0].tenant.last_name,
        propertyType: data.property_type,
        leaseStartDate: leaseStart.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        leaseDuration,
        leaseEndDate: leaseEnd.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        occupancyStatus: data.property_tenants[0].status,
        rentalPrice: data.rental_price,
        serviceCharge: data.service_charge,
      };
    },
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

