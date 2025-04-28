import { createPropertySchema } from "@/schemas/property.schemas";
import axiosInstance from "../axios-instance";
import { z } from "zod";
import { AnyCnameRecord } from "dns";


  export const getProperties = async () => {
    try {
      const response = await axiosInstance.get("/properties", {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.status !== 200) {
        throw new Error("error fetching properties");
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
  }

  export const getPropertiesById = async (id:string) => {
    try {
      const response = await axiosInstance.get(`/properties/${id}`, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.status !== 200) {
        throw new Error("error fetching properties");
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
  }

  export const getPropertyRent = async (id:string) => {
    try {
      const response = await axiosInstance.get(`properties/rent/${id}`, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.status !== 200) {
        throw new Error("Error getting Rents");
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
  }

  export const getPropertyServiceRequests = async (id:string) => {
    try {
      const response = await axiosInstance.get(`properties/service-request/${id}`, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.status !== 200) {
        throw new Error("Error getting Rents");
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
  }

  
export const createProperty = async (data:any) => {
      try {
        const response = await axiosInstance.post("/properties", data, {
          headers: {
            "Content-Type": "multipart/form-data",
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
  