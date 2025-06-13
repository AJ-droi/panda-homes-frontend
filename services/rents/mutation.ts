import { useMutation } from "@tanstack/react-query";
import { removeTenant } from "./api";
import { toast } from "react-toastify";

  export function useRemoveTenantMutation() {
  return useMutation({
    mutationFn: async (id: string) => {
      return await removeTenant(id);
    },
    onMutate: () => {
      console.log("🔐 tenant removal started..");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error|| "An error occurred during tenant removal.");
    },
    onSuccess: () => {
      toast.success('Tenant Removed successfully');
    },
  });
}