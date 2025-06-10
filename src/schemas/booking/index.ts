import { z } from "zod";

import { PACKAGES_DATA } from "@/src/libs";

import { schemaErrorMessage as errorMessage } from "../schema-error-message";

// ----------------------------

export const BookingSchema = z.object({
  date: z.string().min(1, { message: errorMessage.string.required("Date") }),
  email: z.string().email({ message: errorMessage.string.email("Email") }),
  googleMapsLink: z
    .string()
    .url({ message: errorMessage.string.url("Google Maps Link") })
    .refine((url) => url.includes("https://maps.app.goo.gl/"), {
      message: errorMessage.string.url("Google Maps Link"),
    }),
  name: z.string().min(3, { message: errorMessage.string.min("Name", 3) }),
  package: z.enum(PACKAGES_DATA.map((dt) => dt.title) as [string, ...string[]], {
    errorMap: () => ({ message: errorMessage.string.enum("Package") }),
  }),
  phoneNumber: z.string().min(10, { message: errorMessage.string.min("Phone", 10) }),
  time: z
    .array(z.string())
    .min(1, { message: errorMessage.string.enum("Time") })
    .or(z.array(z.string()).length(0))
    .superRefine((val, ctx) => {
      if (val.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: errorMessage.string.enum("Time"),
        });
      }
    }),
});

export type TBookingSchema = z.infer<typeof BookingSchema>;
