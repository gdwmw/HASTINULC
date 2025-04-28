import { z } from "zod";

import { schemaErrorMessage } from "../schema-error-message";

// ----------------------------

const questionsSchema: Record<string, z.ZodTypeAny> = {};

const createQuestionValidator = (questionNumber: number) => {
  const message = schemaErrorMessage.string.enum(`the answer for question number ${questionNumber}`);
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
