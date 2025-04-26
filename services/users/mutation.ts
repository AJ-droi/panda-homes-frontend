/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "./api";
import { loginSchema } from "@/schemas/user.schemas";
import { z } from "zod";
import Cookies from "js-cookie";

export function useLoginMutation() {
  return useMutation({
    mutationFn: async (data: z.infer<typeof loginSchema>) => {
      // Validate data with zod before sending (optional but good practice)
      const parsed = loginSchema.safeParse(data);
      if (!parsed.success) {
        throw new Error("Invalid login credentials");
      }
      return await loginUser(data);
    },

    onMutate: () => {
      console.log("🔐 Login started...");
    },

    onError: (error: any) => {
      console.log({error})
     return error.message || "An error occurred during login.";
    },

    onSuccess: async (data) => {
      try {
        Cookies.set("access_token",data.access_token, {
          expires: 7, // days
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        // Optionally redirect or refetch user info
        return data
      } catch (error: any) {
        console.error("⚠️ Failed to store user token:", error.message);
      }
    },
  });
}
