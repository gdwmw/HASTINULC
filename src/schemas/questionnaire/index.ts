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

const questionsSchema: Record<string, z.ZodTypeAny> = {};

const createQuestionValidator = (questionNumber: number) => {
  const message = errorMessage.string.enum(`the answer for question number ${questionNumber}`);
  return z
    .string()
    .min(1, { message })
    .nullable()
    .refine((val) => val !== null, { message });
};

for (let i = 1; i <= 13; i++) {
  const key = `question${i}`;
  if (i === 13) {
    questionsSchema[key] = z.string().optional();
  } else {
    questionsSchema[key] = createQuestionValidator(i);
  }
}

export const QuestionnaireSchema = z.object(questionsSchema);

export type TQuestionnaireSchema = z.infer<typeof QuestionnaireSchema>;
