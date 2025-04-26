/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../axios-instance";

  export const getServiceRequest = async () => {
    try {
      const response = await axiosInstance.get("service-requests", {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.status !== 200) {
        throw new Error("Error fetcthing service requests");
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


  export const getActiveMaintenanceIssues= async () => {
    try {
      const response = await axiosInstance.get("service-requests/pending-urgent", {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.status !== 200) {
        throw new Error("Error fetcthing service requests");
      }
  
      console.log(response.data)
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