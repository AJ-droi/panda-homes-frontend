/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
// import { queryKeys } from './queryKeys';
import { createServiceRequest } from './api';
import {toast} from 'react-toastify'




export function useCreateServiceRequest() {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createServiceRequest,
    onSuccess: async (data) => {
      toast.success(data?.message || "Service Request Created Successfully");
    },
    onError: (error:any) => {
      console.error('Error creating Service Request:', error);
      toast.error(error?.response?.data?.message || "Error creating space");
    },
  });
}

//   export function useUpdateSpaceName() {
//     const queryClient = useQueryClient();
  
//     return useMutation({
//       mutationFn: updateSpaceName,
//       onSuccess: (data, variables) => {
//         queryClient.invalidateQueries(['getAllSpaces']);
//         queryClient.invalidateQueries(['singleSpace', variables.spaceId]);
        
//         queryClient.setQueryData(['singleSpace', variables.spaceId], (oldData) => {
//           return {
//             ...oldData,
//             name: variables.data.name
//           };
//         });
  
//         toast.success(data?.message || "Space name updated successfully");
//       },
//       onError: (error) => {
//         toast.error(error?.response?.data?.message || "Failed to update space name");
//       },
//     });
//   }