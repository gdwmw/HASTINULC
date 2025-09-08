import type { IMetaResponse, IQuestionnairePayload, IQuestionnaireResponse } from "@/src/types";

import { getApi, postApi } from "../base";

const label = "Questionnaire";

export const GETQuestionnaire = async (query?: string): Promise<{ data: IQuestionnaireResponse[] } & IMetaResponse> => {
  const params = query ? Object.fromEntries(new URLSearchParams(query).entries()) : undefined;
  const response = await getApi<{ data: IQuestionnaireResponse[] } & IMetaResponse>({
    endpoint: "/api/questionnaires",
    label: label,
    params: params,
  });
  return response;
};

export const POSTQuestionnaire = async (payload: IQuestionnairePayload): Promise<IQuestionnaireResponse> => {
  const response = await postApi<{ data: IQuestionnaireResponse }>({
    data: { data: payload },
    endpoint: "/api/questionnaires",
    label: label,
  });
  return response.data;
};
