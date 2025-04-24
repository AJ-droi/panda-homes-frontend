import { useQuery } from "@tanstack/react-query";
import { getActiveMaintenanceIssues, getServiceRequest } from "./api";

export function useFetchServiceRequest() {
    return useQuery({
      queryKey: ["service-request"],
      queryFn: getServiceRequest,
      refetchOnMount: "always",
      refetchOnWindowFocus: true,
      select:(data) => 
        data.service_requests.map((service: any) => ({
            requestid: service.request_id, 
            tenantname: service.tenant_name,
            issue: "leaking pipe",
            date: new Date(service.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
            status:service.status
        }))  
    });
  }

  export function useActiveMaintenanceIssues() {
    return useQuery({
      queryKey: ["active-maintenance-issues"],
      queryFn: getActiveMaintenanceIssues,
      refetchOnMount: "always",
      refetchOnWindowFocus: true,
      select:(data) => 
        data.service_requests.map((service: any) => ({
            property: service.property.name, 
            tenant: service.tenant_name,
            issue: "leaking pipe",
            dateReported: new Date(service.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
            status:service.status
        }))  
    });
  }
  