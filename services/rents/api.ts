import axiosInstance from "../axios-instance";

  export const getDueRents = async () => {
    try {
      const response = await axiosInstance.get("rents/due", {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.status !== 200) {
        throw new Error("Error Due Rents");
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