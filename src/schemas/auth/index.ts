import { z } from "zod";

/* eslint-disable perfectionist/sort-objects */
const errorMessage = {
  string: {
    min: (label: string, min: number) => `Please enter ${label} minimum ${min} characters`,
    max: (label: string, max: number) => `${label} maximum ${max} characters`,
    email: (label: string) => `${label} must be a valid email address`,
    required: (label: string) => `Please enter ${label}`,
  },
  number: {
    min: (label: string, min: number) => `${label} minimum ${min}`,
    max: (label: string, max: number) => `${label} maximum ${max}`,
  },
};
/* eslint-enable perfectionist/sort-objects */

// -----------------------------------------------------------------------------

export const LoginSchema = (label: string) =>
  z.object({
    identifier:
      label === "Email"
        ? z.string().email({ message: errorMessage.string.email(label) })
        : z.string().min(1, { message: errorMessage.string.required(label) }),
    password: z.string().min(1, { message: errorMessage.string.required("Password") }),
  });

export type TLoginSchema = z.infer<ReturnType<typeof LoginSchema>>;

// -----------------------------------------------------------------------------

export const RegisterSchema = z.object({
  confirmPassword: z.string().min(1, { message: errorMessage.string.required("Confirm Password") }),
  email: z.string().email({ message: errorMessage.string.email("Email") }),
  name: z.string().min(3, { message: errorMessage.string.min("Name", 3) }),
  password: z
    .string()
    .min(8, { message: errorMessage.string.min("Password", 8) })
    .regex(/^(?=.*[A-Z])/, { message: "Password harus memiliki minimal 1 huruf besar" })
    .regex(/^(?=.*\d)/, { message: "Password harus memiliki minimal 1 angka" })
    .regex(/^(?=.*[!@#$%^&*])/, { message: "Password harus memiliki minimal 1 simbol (!@#$%^&*)" }),
  phoneNumber: z.string().min(10, { message: errorMessage.string.min("Phone Number", 10) }),
  username: z.string().min(4, { message: errorMessage.string.min("Username", 4) }),
});

export type TRegisterSchema = z.infer<typeof RegisterSchema>;
