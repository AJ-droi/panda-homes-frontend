/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { createPropertySchema } from "@/schemas/property.schemas";
import { createProperty, deletePropertyById, updateProperty } from "./api";


export function useCreatePropertyMutation() {
    return useMutation({
      mutationFn: async (formPayload: any) => {
        return await createProperty(formPayload);
      },
      onMutate: () => {
        console.log("🔐 property creation started...");
      },
      onError: (error: any) => {
        console.error(error.message);
        return error.message || "An error occurred during property creation.";
      },
      onSuccess: async (data) => {
        return data;
      },
    });
  }
  
export function useUpdatePropertyMutation(id:string) {
    return useMutation({
      mutationFn: async (formPayload: any) => {
        return await updateProperty(formPayload, id);
      },
      onMutate: () => {
        console.log("🔐 property creation started...");
      },
      onError: (error: any) => {
        console.error(error.message);
        return error.message || "An error occurred during property creation.";
      },
      onSuccess: async (data) => {
        return data;
      },
    });
  }
  

  export function useDeletePropertyMutation() {
    return useMutation({
      mutationFn: async (id:string) => {
        return await deletePropertyById(id);
      },
      onMutate: () => {
        console.log("🔐 property deletion started...");
      },
      onError: (error: any) => {
        console.error(error.message);
        return error.message || "An error occurred during property deletion.";
      },
      onSuccess: async (data) => {
        return data;
      },
    });
  } 