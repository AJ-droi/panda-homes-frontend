/* eslint-disable @typescript-eslint/no-explicit-any */
// services/property/query.ts
import { useQuery } from "@tanstack/react-query";
import { getProperties, getPropertiesById, getPropertyRent, getPropertyServiceRequests } from "./api";
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


export function useFetchPropertyRentById(id: string) {
  return useQuery({
    queryKey: ["get-properties-rent-by-id", id],
    queryFn: () => getPropertyRent(id),
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    select: (data: any) => 
 
    data.rents.map((rent: any) => ({
      tenantName: rent.tenant.first_name + " " + rent.tenant.last_name,
      moveInDate: new Date(rent.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      moveOutDate: new Date(rent.expiry_date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      initialRent: rent.amount_paid,
      currentRent: rent.amount_paid,
      leaseRenewed: rent.status,
      rentIncreases: [
        { amount: "₦500,000", date: "4th July,2021" },
        { amount: "₦200,000", date: "2nd March,2020" },
      ],
    }))
    
  });
}

export function useFetchServiceRequestById(id: string) {
  return useQuery({
    queryKey: ["get-service-request-by-id", id],
    queryFn: () => getPropertyServiceRequests(id),
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    select: (data: any) => 
 
    data.service_requests.map((service_request: any) => ({
      issueType:service_request.issue_category,
      dateReported: new Date(service_request.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: service_request.status,
      resolutionDate: new Date(service_request.effective_date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }))
    
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

