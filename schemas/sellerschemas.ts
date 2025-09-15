import { z } from "zod";

// Zod schema for Seller form validation
export const sellerSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full Name must be at least 2 characters" })
    .regex(/^[A-Za-z\s]+$/, { message: "Name must contain only alphabets and spaces" }),
  
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.xyz$/, { message: "Email must end with .xyz" }),

  nid: z
    .string()
    .regex(/^\d{10,17}$/, { message: "NID must be a number with 10 to 17 digits" }),

  age: z
    .number({ message: "Age must be a number" }) //  use `message` instead of invalid_type_error
    .min(0, { message: "Age must be non-negative" }),

  status: z.enum(["active", "inactive"]).optional(),

  adminId: z
    .number({ message: "Admin ID must be a number" }) //  message instead of invalid_type_error
    .optional(),
});

export type SellerFormData = z.infer<typeof sellerSchema>;
