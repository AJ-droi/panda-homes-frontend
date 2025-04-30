/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../axios-instance";

export const getTenantServiceRequest = async (property_id:string) => {
    try {
      const response = await axiosInstance.get(`/service-requests/tenant/${property_id}`, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.status !== 200) {
        throw new Error("Error Fetching Service Requests");
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


  export const getTenantRentDetails = async (tenant_id:string) => {
    try {
      const response = await axiosInstance.get(`/rents/tenant/${tenant_id}`, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.status !== 200) {
        throw new Error("Error Fetching Tenant Rent Details");
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

  export const getTenantPropertyHistory = async (property_id:string) => {
    try {
      const response = await axiosInstance.get(`/property-history/${property_id}`, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.status !== 200) {
        throw new Error("Error Fetching Property History");
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


  export const getTenantProperty = async (property_id:string) => {
    try {
      const response = await axiosInstance.get(`/properties/${property_id}`, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.status !== 200) {
        throw new Error("Error Fetching Property Details");
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

export const createServiceRequest = async(data:object) => {
    const response = await axiosInstance.post(`/service-requests`, data, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response.data
}