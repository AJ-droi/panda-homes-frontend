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

      if (response.status !== 200) {
        throw new Error("Login failed");
      }
  
      return response.data
    } catch (error: any) {
      let errorMessage = error.message || "An error occurred";
  
      return {
        success: false,
        message: errorMessage,
        error: error.response?.data || null,
      };
    }
  };

  export const getUsers = async () => {
    try {
      const response = await axiosInstance.get("/users", {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.status !== 200) {
        throw new Error("Error Fetching Users");
      }
  
      return response.data
    } catch (error: any) {
      let errorMessage = error.message || "An error occurred";
  console.log(error)
      return {
        success: false,
        message: errorMessage,
        error: error.response?.data || null,
      };
    }
  }