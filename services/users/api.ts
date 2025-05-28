/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import axiosInstance from "../axios-instance";
import { loginSchema } from "@/schemas/user.schemas";
import { UserFilter } from "../interface/filter";

export const loginUser = async (data: z.infer<typeof loginSchema>) => {
  try {
    const response = await axiosInstance.post("/users/login", data, {
      headers: {
        "Content-Type": "application/json",
      }
    });
      return response.data
    } catch (error: any) {``
       // Try to extract a useful message
    let errorMessage = "An error occurred";

    if (error?.response?.data?.message) {
      if (Array.isArray(error.response.data.message)) {
        // Validation error from class-validator
        const constraints = error.response.data.message[0]?.constraints;
        errorMessage = constraints
          ? Object.values(constraints)[0] // pick first constraint message
          : error.response.data.message[0];
      } else if (typeof error.response.data.message === "string") {
        errorMessage = error.response.data.message;
      }
    }

    throw new Error(errorMessage);
    
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
      const errorMessage = error.message || "An error occurred";
      return {
        success: false,
        message: errorMessage,
        error: error.response?.data || null,
      };
    }
  }

  export const getTenants = async (params?: UserFilter) => {
    try {
      const response = await axiosInstance.get("/users/tenant-list", {
        headers: {
          "Content-Type": "application/json",
        },
        params, // ✅ pass query params
      });

      if (response.status !== 200) {
        throw new Error("Error Fetching Users");
      }
  
      return response.data
    } catch (error: any) {
      const errorMessage = error.message || "An error occurred";
      return {
        success: false,
        message: errorMessage,
        error: error.response?.data || null,
      };
    }
  }

  export const getAdminDashboardAnalytics = async () => {
    try {
      const response = await axiosInstance.get("properties/admin/dashboard", {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.status !== 200) {
        throw new Error("Error Fetching Dashbaord Analytics");
      }
  
      return response.data
    } catch (error: any) {
      const errorMessage = error.message || "An error occurred";
      return {
        success: false,
        message: errorMessage,
        error: error.response?.data || null,
      };
    }
  }

    export const forgotPassword = async (data:any) => {
    try {
      const response = await axiosInstance.post("/users/forgot-password", data, {
        headers: {
          "Content-Type": "application/json",
        }
      });
  //
      return response.data
    } catch (error: any) {``
       // Try to extract a useful message
    let errorMessage = "An error occurred";
  
    if (error?.response?.data?.message) {
      if (Array.isArray(error.response.data.message)) {
        // Validation error from class-validator
        const constraints = error.response.data.message[0]?.constraints;
        errorMessage = constraints
          ? Object.values(constraints)[0] // pick first constraint message
          : error.response.data.message[0];
      } else if (typeof error.response.data.message === "string") {
        errorMessage = error.response.data.message;
      }
    }
  
    throw new Error(errorMessage);
    
    }
  }


    export const validateOtp = async (data:any) => {
    try {
      const response = await axiosInstance.post("/users/validate-otp", data, {
        headers: {
          "Content-Type": "application/json",
        }
      });
  //
      return response.data
    } catch (error: any) {``
       // Try to extract a useful message
    let errorMessage = "An error occurred";
  
    if (error?.response?.data?.message) {
      if (Array.isArray(error.response.data.message)) {
        // Validation error from class-validator
        const constraints = error.response.data.message[0]?.constraints;
        errorMessage = constraints
          ? Object.values(constraints)[0] // pick first constraint message
          : error.response.data.message[0];
      } else if (typeof error.response.data.message === "string") {
        errorMessage = error.response.data.message;
      }
    }
  
    throw new Error(errorMessage);
    
    }
  }

  export const resetPassword = async (data:any) => {
    try {
      const response = await axiosInstance.post("/users/reset-password", data, {
        headers: {
          "Content-Type": "application/json",
        }
      });
  //
      return response.data
    } catch (error: any) {``
       // Try to extract a useful message
    let errorMessage = "An error occurred";
  
    if (error?.response?.data?.message) {
      if (Array.isArray(error.response.data.message)) {
        // Validation error from class-validator
        const constraints = error.response.data.message[0]?.constraints;
        errorMessage = constraints
          ? Object.values(constraints)[0] // pick first constraint message
          : error.response.data.message[0];
      } else if (typeof error.response.data.message === "string") {
        errorMessage = error.response.data.message;
      }
    }
  
    throw new Error(errorMessage);
    
    }
  };


  export const createUser= async (data:any) => {
    try {
      const response = await axiosInstance.post("/users", data, {
        headers: {
          "Content-Type": "application/json",
        }
      });
  //
      return response.data
    } catch (error: any) {``
       // Try to extract a useful message
    let errorMessage = "An error occurred";
  
    if (error?.response?.data?.message) {
      if (Array.isArray(error.response.data.message)) {
        // Validation error from class-validator
        const constraints = error.response.data.message[0]?.constraints;
        errorMessage = constraints
          ? Object.values(constraints)[0] // pick first constraint message
          : error.response.data.message[0];
      } else if (typeof error.response.data.message === "string") {
        errorMessage = error.response.data.message;
      }
    }
  
    throw new Error(errorMessage);
    
    }
  };

  export const updateUser= async (data:any) => {
    try {
      const response = await axiosInstance.put("/users", data, {
        headers: {
          "Content-Type": "application/json",
        }
      });
  //
      return response.data
    } catch (error: any) {``
       // Try to extract a useful message
    let errorMessage = "An error occurred";
  
    if (error?.response?.data?.message) {
      if (Array.isArray(error.response.data.message)) {
        // Validation error from class-validator
        const constraints = error.response.data.message[0]?.constraints;
        errorMessage = constraints
          ? Object.values(constraints)[0] // pick first constraint message
          : error.response.data.message[0];
      } else if (typeof error.response.data.message === "string") {
        errorMessage = error.response.data.message;
      }
    }
  
    throw new Error(errorMessage);
    
    }

    
  };

  export const createUserKyc= async (data:any, user_id:string) => {
    try {
      const response = await axiosInstance.post(`/users/complete-kyc/${user_id}`, data, {
        headers: {
          "Content-Type": "application/json",
        }
      });
  //
      return response.data
    } catch (error: any) {``
       // Try to extract a useful message
    let errorMessage = "An error occurred";
  
    if (error?.response?.data?.message) {
      if (Array.isArray(error.response.data.message)) {
        // Validation error from class-validator
        const constraints = error.response.data.message[0]?.constraints;
        errorMessage = constraints
          ? Object.values(constraints)[0] // pick first constraint message
          : error.response.data.message[0];
      } else if (typeof error.response.data.message === "string") {
        errorMessage = error.response.data.message;
      }
    }
  
    throw new Error(errorMessage);
    
    }
  };

