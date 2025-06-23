import axiosInstance from "../axios-instance";

export const sendMail = async (data:any) => {
    try {
      const response = await axiosInstance.post("/chats/send-mail", data, {
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // }
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