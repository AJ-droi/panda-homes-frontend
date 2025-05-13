/* eslint-disable @typescript-eslint/no-explicit-any */
// services/property/query.ts
import { useQuery } from "@tanstack/react-query";
import { getProperties, getPropertiesById, getPropertyRent, getPropertyServiceRequests } from "./api";
import { getAdminDashboardAnalytics } from "../users/api";
import { PropertyFilter } from "../interface/filter";

export function useFetchPropertyDetails(params?:PropertyFilter) {
  return useQuery({
    queryKey: ["get-properties", params], // ✅ include params here
    queryFn: () => getProperties(params),
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    select: (data:any) =>
      data.properties.map((property: any) => ({
        id: property.id,
        property: property.name,
        vacancy: property.property_status,
        rent: property?.rents[0]?.amount_paid || "-",
        expiryDate: property?.rents[0]?.lease_end_date ? new Date(property?.rents[0]?.lease_end_date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }) :  "-"
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

      const activeRent = data.rents.find((item:any) => item.rent_status == 'active')
      const activeTenant = data.property_tenants.find((item:any) => item.status == 'active')
      const leaseStart = new Date(activeRent.lease_start_date);
      const leaseDuration = data.lease_duration;

      // Calculate leaseEndDate by adding leaseDuration (in months) to leaseStart
      const leaseEnd = new Date(activeRent.lease_end_date);
   

      return {
        // id: data.id,
        name: data.name,
         description: `Property ${data.name} is a ${
      data.no_of_bedrooms
    }-bedroom ${data.property_type.toLowerCase()} located in ${
      data.location}`,
        location: data.location,
        occupancyStatus: data.property_status,
        tenant_name:
         activeTenant.tenant.first_name +
          " " +
         activeTenant.tenant.last_name,
        phone_number: activeTenant.tenant.phone_number,
        propertyType: data.property_type,
        lease_start_date: leaseStart.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        lease_end_date: leaseEnd.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      rentStatus: data.property_tenants[0].status,
        rental_price: activeRent.rental_price,
        service_charge: activeRent.service_charge,
        property_tenants: data.property_tenants,
        no_of_bedrooms: data.no_of_bedrooms,
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

