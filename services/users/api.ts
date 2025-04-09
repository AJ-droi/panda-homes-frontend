import { z } from "zod";
import axiosInstance from "../axios-instance";
import { loginSchema } from "@/schemas/user.schemas";

export const loginUser = async (data: z.infer<typeof loginSchema>) => {
    try {
      const response = await axiosInstance.post("/users/login", data, {
        headers: {
          "Content-Type": "application/json",
        }
      });
  
      const { message, status, success, data: responseData } = response.data;
      console.log(response);
  
      if (!success) {
        throw new Error(message || "Login failed");
      }
  
      const { token, user } = responseData || {};
  
      return { message, token, user, status, success };
    } catch (error: any) {
      let errorMessage = error.message || "An error occurred";
  
    //   if (error.response) {
    //     errorMessage =
    //       error.response.data.message ||
    //       error.response.data.error ||
    //       "Something went wrong!";
    //   } else if (error.request) {
    //     errorMessage = "No response from server. Please try again later.";
    //   } else {
    //     errorMessage = error.message;
    //   }
  
      return {
        success: false,
        message: errorMessage,
        error: error.response?.data || null,
      };
    }
  };