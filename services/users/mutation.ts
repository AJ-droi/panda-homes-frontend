import { useMutation } from "@tanstack/react-query";
import { loginUser } from "./api";
import { loginSchema } from "@/schemas/user.schemas";
import { z } from "zod";
import { useRouter } from "next/navigation";


export function useLoginMutation() {
    return useMutation({
      mutationFn: async (data: z.infer<typeof loginSchema>) => {
        return await loginUser(data);
      },
      onMutate: () => {
        console.log("Login started...");
      },
      onError: (error: any) => {
        let errorMessage = error.message || "Unknown error occurred during login.";
  
        console.error(`Login error: ${errorMessage}`);
      },
      onSuccess: async (data) => {
        try {
          console.log("Full API Response:", data);
  
          if (!data?.token || !data?.user) {
            throw new Error("Invalid API response. Missing token or user data.");
          }
  
          const token = data.token;
          localStorage.setItem("authToken", token);
  
          console.log("User Data:", { token });
          console.log("Login Successful & User data stored.");
        } catch (error:any) {
          console.error("Failed to store user data:", error.message);
        }
      },
    });
  }