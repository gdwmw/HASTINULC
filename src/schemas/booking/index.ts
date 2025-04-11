import { z } from "zod";

import { PACKAGES_DATA } from "@/src/libs";

import { schemaErrorMessage } from "../schema-error-message";

// ----------------------------

export const BookingSchema = z.object({
  date: z.string().min(1, { message: schemaErrorMessage.string.required("Date") }),
  email: z.string().email({ message: schemaErrorMessage.string.email("Email") }),
  googleMapsLink: z
    .string()
    .url({ message: schemaErrorMessage.string.url("Google Maps Link") })
    .refine((url) => url.includes("https://maps.app.goo.gl/"), {
      message: schemaErrorMessage.string.url("Google Maps Link"),
    }),
  name: z.string().min(3, { message: schemaErrorMessage.string.min("Name", 3) }),
  package: z.enum(PACKAGES_DATA.map((dt) => dt.title) as [string, ...string[]], {
    errorMap: () => ({ message: schemaErrorMessage.string.enum("Package") }),
  }),
  phoneNumber: z.string().min(10, { message: schemaErrorMessage.string.min("Phone", 10) }),
  time: z
    .array(z.string())
    .min(1, { message: schemaErrorMessage.string.enum("Time") })
    .or(z.literal(false).transform(() => []))
    .superRefine((val, ctx) => {
      if (Array.isArray(val) && val.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: schemaErrorMessage.string.enum("Time"),
        });
      }
    }),
});

export type TBookingSchema = z.infer<typeof BookingSchema>;
