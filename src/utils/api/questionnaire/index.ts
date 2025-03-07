import type { IQuestionnairePayload, IQuestionnaireResponse } from "@/src/types";

import { postApi } from "../base";

const label = "Questionnaire";

export const POSTQuestionnaire = async (payload: IQuestionnairePayload): Promise<IQuestionnaireResponse> => {
  const response = await postApi<{ data: IQuestionnaireResponse }>({
    data: { data: payload },
    endpoint: "/api/questionnaires",
    label: label,
  });
  return response.data;
};
