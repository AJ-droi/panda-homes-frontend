/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from './queryKeys';
import { createServiceRequest } from './api';
import {toast} from 'react-toastify';




export function useCreateServiceRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createServiceRequest,
    onSuccess: async (data) => {
      toast.success(data?.message || "Service Request Created Successfully");
        queryClient.invalidateQueries({queryKey: queryKeys.getTenantServiceRequests(data.property_id)});
    },
    onError: (error:any) => {
      console.error('Error creating Service Request:', error);
      toast.error(error?.response?.data?.message || "Error creating space");
    },
  });
}