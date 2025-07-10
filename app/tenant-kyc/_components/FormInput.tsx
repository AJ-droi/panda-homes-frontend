"use client";
import { UseFormReturn } from "react-hook-form";
import { KycFormData } from "./data";

interface FormInputProps {
  label: string;
  name: keyof KycFormData;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  methods: UseFormReturn<KycFormData>;
}

export default function FormInput({
  label,
  name,
  type = "text",
  placeholder = "",
  disabled = false,
  methods,
}: FormInputProps) {
  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <div className="mb-4">
      <label className="block font-semibold text-gray-800 mb-1 text-base">
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-colors duration-200 placeholder-gray-400"
        disabled={disabled}
      />
      <p className="text-red-500 text-xs mt-1 min-h-[18px]">
        {(errors as any)[name]?.message}
      </p>
    </div>
  );
}
