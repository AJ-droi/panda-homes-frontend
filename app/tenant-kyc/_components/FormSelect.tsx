"use client";
import { UseFormReturn } from "react-hook-form";
import { KycFormData } from "./data";

interface FormSelectProps {
  label: string;
  name: keyof KycFormData;
  options: Array<{ value: string; label: string } | string>;
  placeholder?: string;
  disabled?: boolean;
  methods: UseFormReturn<KycFormData>;
}

export default function FormSelect({
  label,
  name,
  options,
  placeholder = "Select...",
  disabled = false,
  methods,
}: FormSelectProps) {
  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <div className="mb-4">
      <label className="block font-semibold text-gray-800 mb-1 text-base">
        {label}
      </label>
      <select
        {...register(name)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-colors duration-200"
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options.map((opt: any) => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
      <p className="text-red-500 text-xs mt-1 min-h-[18px]">
        {(errors as any)[name]?.message}
      </p>
    </div>
  );
}
