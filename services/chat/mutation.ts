import { useMutation } from "@tanstack/react-query";
import { sendMail } from "./api";

export function useSendMail() {
    return useMutation({
      mutationFn: async (formPayload: any) => {
        return await sendMail(formPayload);
      },
      onMutate: () => {
        console.log("🔐 sending email...");
      },
      onError: (error: any) => {
        console.error(error.message);
        return error.message || "An error occurred while sending email.";
      },
      onSuccess: async (data) => {
        return data;
      },
    });
  }