/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPropertySchema } from "@/schemas/property.schemas";
import axiosInstance from "../axios-instance";
import { z } from "zod";
import { PropertyFilter } from "../interface/filter";

export const getProperties = async (params?: PropertyFilter) => {
  try {
    const response = await axiosInstance.get("/properties", {
      headers: {
        "Content-Type": "application/json",
      },
      params, // ✅ pass query params
    });

    if (response.status !== 200) {
      throw new Error("error fetching properties");
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


export const getVacantProperties = async () => {
  try {
    const response = await axiosInstance.get(`/properties/vacant`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error("error fetching properties");
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



export const getPropertiesById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/properties/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error("error fetching properties");
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

export const getPropertyRent = async (id: string) => {
  try {
    const response = await axiosInstance.get(`properties/rent/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error("Error getting Rents");
    }

    return response.data;
  } catch (error: any) {
    let errorMessage = error.message || "An error occurred";
    return {
      success: false,
      message: errorMessage,
      error: error.response?.data || null,
    };
  }
};

export const getPropertyServiceRequests = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `properties/service-request/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Error getting Rents");
    }

    return response.data;
  } catch (error: any) {
    let errorMessage = error.message || "An error occurred";
    return {
      success: false,
      message: errorMessage,
      error: error.response?.data || null,
    };
  }
};

export const createProperty = async (data: any) => {
  try {
    const response = await axiosInstance.post("/properties", data, {
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // }
    });
    //
    return response.data;
  } catch (error: any) {
    ``;
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

export const updateProperty = async (data: any, id: string) => {
  try {
    const response = await axiosInstance.put(`/properties/${id}`, data, {
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // }
    });
    //
    return response.data;
  } catch (error: any) {
    ``;
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

export const getHistoryByPropertyId = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/notifications/property/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

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

export const deletePropertyById = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/properties/${id}`);
    return response.data;
  } catch (error: any) {
    // Throw to ensure React Query triggers onError
    throw new Error(error?.response?.data?.message || "Failed to delete property");
  }
};



export const AttachTenantToProperty = async (id:string, data: any) => {
  try {
    const response = await axiosInstance.post(`/properties/assign-tenant/${id}`, data, {
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // }
    });
    //
    return response.data;
  } catch (error: any) {
    ``;
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


