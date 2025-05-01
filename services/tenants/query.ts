import { useQuery } from "@tanstack/react-query";
import { getTenantRentDetails, getTenantPropertyHistory, getTenantProperty } from './api';
import { queryKeys } from './queryKeys';


export function useGetTenantRent(tenant_id:string) {
    return useQuery({
      queryKey: queryKeys.getTenantRent(tenant_id),
      queryFn: () => getTenantRentDetails(tenant_id),
      enabled: !!tenant_id,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching rent");
    //   },
    });
  }


  export function useGetPropertyHistory(property_id:string) {
    return useQuery({
      queryKey: queryKeys.getTenantPropertyHistory(property_id),
      queryFn: () => getTenantPropertyHistory(property_id),
      enabled: !!property_id,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching property history");
    //   },
    });
  }

  export function useGetTenantProperty(property_id:string) {
    return useQuery({
      queryKey: queryKeys.getTenantPropertyDetails(property_id),
      queryFn: () => getTenantProperty(property_id),
      enabled: !!property_id,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     toast.error(error?.response?.data?.message || "An error occurred while fetching property details");
    //   },
    });
  }


