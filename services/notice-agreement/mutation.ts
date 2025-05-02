import { useMutation } from "@tanstack/react-query";
import { createNoticeAgreement } from "./api";

export function useCreateNoticeAgreement() {
    return useMutation({
      mutationFn: async (formPayload: any) => {
        return await createNoticeAgreement(formPayload);
      },
      onMutate: () => {
        console.log("🔐 notice agreement creation started...");
      },
      onError: (error: any) => {
        console.error(error.message);
        return error.message || "An error occurred during notice agreement creation.";
      },
      onSuccess: async (data) => {
        return data;
      },
    });
  }