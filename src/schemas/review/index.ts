import { z } from "zod";

/* eslint-disable perfectionist/sort-objects */
const errorMessage = {
  string: {
    min: (label: string, min: number) => `Please enter ${label} minimum ${min} characters`,
    max: (label: string, max: number) => `${label} maximum ${max} characters`,
    required: (label: string) => `Please enter ${label}`,
    email: (label: string) => `${label} must be a valid email address`,
    url: (label: string) => `${label} must be a valid url`,
    enum: (label: string) => `Please select ${label}`,
  },
  number: {
    min: (label: string, min: number) => `${label} minimum ${min}`,
    max: (label: string, max: number) => `${label} maximum ${max}`,
  },
};
/* eslint-enable perfectionist/sort-objects */

// -----------------------------------------------------------------------------

export const ReviewSchema = z.object({
  description: z
    .string()
    .min(100, { message: errorMessage.string.min("Description", 100) })
    .max(1000, { message: errorMessage.string.max("Description", 1000) }),
  rating: z.number().min(1, { message: errorMessage.number.min("Rating", 1) }),
});

export type TReviewSchema = z.infer<typeof ReviewSchema>;
