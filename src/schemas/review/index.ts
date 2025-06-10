import { z } from "zod";

import { schemaErrorMessage as errorMessage } from "../schema-error-message";

// ----------------------------

export const ReviewSchema = z.object({
  description: z
    .string()
    .min(100, { message: errorMessage.string.min("Description", 100) })
    .max(1000, { message: errorMessage.string.max("Description", 1000) }),
  image: z
    .any()
    .refine((files) => files instanceof FileList, "Invalid file list")
    .refine((files) => files.length <= 4, "Maximum 4 files")
    .refine((files) => Array.from(files).every((file) => file.size <= 5 * 1024 * 1024), "Maximum file size 5 MB")
    .optional(),
  rating: z.number().min(1, { message: errorMessage.number.min("Rating", 1) }),
});

export type TReviewSchema = z.infer<typeof ReviewSchema>;
