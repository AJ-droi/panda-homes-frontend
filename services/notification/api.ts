import axiosInstance from "../axios-instance";

export const getPropertyOverview= async () => {
  try {
    const response = await axiosInstance.get(`/notifications/user`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log({response})
    if (response.status !== 200) {
      throw new Error("error fetching properties history");
    }

    return response.data;
  } catch (error: any) {
    const errorMessage = error.message || "An error occurred";

    return {
      success: false,
      message: errorMessage,
      error: error.response?.data || null,
    };
  }
};
