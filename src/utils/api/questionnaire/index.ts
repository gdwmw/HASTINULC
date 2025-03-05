import { IQuestionnairePayload, IQuestionnaireResponse } from "@/src/types";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

export const POSTQuestionnaire = async (payload: IQuestionnairePayload): Promise<IQuestionnaireResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/questionnaires?populate=*`, {
      body: JSON.stringify({ data: payload }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to post: Questionnaire with status ${res.status} || ${response.error.message}`);
    }

    return response.data;
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};
