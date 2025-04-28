import { z } from "zod";

import { PACKAGES_DATA } from "@/src/libs";

import { schemaErrorMessage } from "../schema-error-message";

// ----------------------------

export const HomeBookingSchema = (screenWidth: number) =>
  z.object({
    date: z.string().min(1, { message: schemaErrorMessage.string.required("Date") }),
    email: screenWidth <= 1024 ? z.string().optional() : z.string().email({ message: schemaErrorMessage.string.email("Email") }),
    name: screenWidth <= 1024 ? z.string().optional() : z.string().min(3, { message: schemaErrorMessage.string.min("Name", 3) }),
    package: z.enum(PACKAGES_DATA.map((dt) => dt.title) as [string, ...string[]], {
      errorMap: () => ({ message: schemaErrorMessage.string.enum("Package") }),
    }),
    phoneNumber: screenWidth <= 1024 ? z.string().optional() : z.string().min(10, { message: schemaErrorMessage.string.min("Phone", 10) }),
  });

export type THomeBookingSchema = z.infer<ReturnType<typeof HomeBookingSchema>>;
