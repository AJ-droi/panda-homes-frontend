import axiosInstance from "../axios-instance";

  export const getProperties = async () => {
    try {
      const response = await axiosInstance.get("/users", {
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
  console.log(error)
      return {
        success: false,
        message: errorMessage,
        error: error.response?.data || null,
      };
    }
  }