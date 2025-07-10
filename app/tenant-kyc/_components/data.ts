import * as z from "zod";

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export enum MaritalStatus {
  SINGLE = "single",
  MARRIED = "married",
  DIVORCED = "divorced",
  WIDOWED = "widowed",
}

export enum EmploymentStatus {
  EMPLOYED = "employed",
  SELF_EMPLOYED = "self-employed",
  UNEMPLOYED = "unemployed",
  STUDENT = "student",
}

export const kycSchema = z
  .object({
    // Personal Information
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email format").optional(),
    phone_number: z.string().min(1, "Phone number is required").optional(),
    date_of_birth: z.string().min(1, "Date of birth is required"),
    gender: z.nativeEnum(Gender, {
      errorMap: () => ({ message: "Please select a gender" }),
    }),
    nationality: z.string().min(1, "Nationality is required"),
    current_residence: z.string().min(1, "Current residence is required"),
    state_of_origin: z.string().min(1, "State of origin is required"),
    local_government_area: z
      .string()
      .min(1, "Local government area is required"),
    marital_status: z.nativeEnum(MaritalStatus, {
      errorMap: () => ({ message: "Please select a marital status" }),
    }),
    religion: z.string().optional(),
    spouse_name_and_contact: z.string().optional(),

    // Employment Information
    employment_status: z.nativeEnum(EmploymentStatus, {
      errorMap: () => ({ message: "Please select an employment status" }),
    }),
    occupation: z.string().min(1, "Occupation is required"),
    job_title: z.string().min(1, "Job title is required"),
    employer_name: z.string().optional(),
    employer_address: z.string().optional(),
    employer_phone_number: z.string().optional(),
    monthly_net_income: z.string().min(1, "Monthly net income is required"),

    // References
    reference1_name: z.string().min(1, "Reference 1 name is required"),
    reference1_address: z.string().min(1, "Reference 1 address is required"),
    reference1_relationship: z
      .string()
      .min(1, "Reference 1 relationship is required"),
    reference1_phone_number: z
      .string()
      .min(1, "Reference 1 phone number is required"),
    reference2_name: z.string().optional(),
    reference2_address: z.string().optional(),
    reference2_relationship: z.string().optional(),
    reference2_phone_number: z.string().optional(),
  })
  .refine((data) => data.email || data.phone_number, {
    message: "Either email or phone number is required",
    path: ["email"],
  })
  .refine(
    (data) => {
      if (data.employment_status === EmploymentStatus.EMPLOYED) {
        return (
          data.employer_name &&
          data.employer_address &&
          data.employer_phone_number
        );
      }
      return true;
    },
    {
      message:
        "Employer details are required when employment status is 'Employed'",
      path: ["employer_name"],
    }
  );

export type KycFormData = z.infer<typeof kycSchema>;

// Constants for dropdowns
export const STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

export const LGAS = [
  "Eti-Osa",
  "Ikeja",
  "Surulere",
  "Kosofe",
  "Alimosho",
  "Other",
];

export const RELIGIONS = ["Christianity", "Islam", "Traditional", "Other"];

export const NATIONALITIES = ["Nigerian", "Other"];

export const GENDERS = [
  { value: Gender.MALE, label: "Male" },
  { value: Gender.FEMALE, label: "Female" },
  { value: Gender.OTHER, label: "Other" },
];

export const MARITAL_STATUS = [
  { value: MaritalStatus.SINGLE, label: "Single" },
  { value: MaritalStatus.MARRIED, label: "Married" },
  { value: MaritalStatus.DIVORCED, label: "Divorced" },
  { value: MaritalStatus.WIDOWED, label: "Widowed" },
];

export const EMPLOYMENT_STATUS = [
  { value: EmploymentStatus.EMPLOYED, label: "Employed" },
  { value: EmploymentStatus.SELF_EMPLOYED, label: "Self Employed" },
  { value: EmploymentStatus.UNEMPLOYED, label: "Unemployed" },
  { value: EmploymentStatus.STUDENT, label: "Student" },
];
