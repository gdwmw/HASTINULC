import { z } from "zod";

import { PACKAGES_DATA } from "@/src/libs/constants";

/* eslint-disable perfectionist/sort-objects */
const errorMessage = {
  string: {
    min: (label: string, min: number) => `Please enter ${label} minimum ${min} characters`,
    max: (label: string, max: number) => `${label} maximum ${max} characters`,
    required: (label: string) => `Please enter ${label}`,
    email: (label: string) => `${label} must be a valid email address`,
    enum: (label: string) => `Please select ${label}`,
  },
  number: {
    min: (label: string, min: number) => `${label} minimum ${min}`,
    max: (label: string, max: number) => `${label} maximum ${max}`,
  },
};
/* eslint-enable perfectionist/sort-objects */

// -----------------------------------------------------------------------------

export const BookingSchema = z.object({
  date: z.string().min(1, { message: errorMessage.string.required("Date") }),
  email: z.string().email({ message: errorMessage.string.email("Email") }),
  event: z.enum(PACKAGES_DATA.map((dt) => dt.title) as [string, ...string[]], {
    errorMap: () => ({ message: errorMessage.string.enum("Event") }),
  }),
  name: z.string().min(3, { message: errorMessage.string.min("Name", 3) }),
  time: z.string().min(1, { message: errorMessage.string.required("Time") }),
});

export type TBookingSchema = z.infer<typeof BookingSchema>;
