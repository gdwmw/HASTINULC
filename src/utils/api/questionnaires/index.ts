import { IQuestionnairesPayload, IQuestionnairesResponse, IQuestionnairesSchema } from "@/src/types/api";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

type TFields = keyof IQuestionnairesResponse;

const FIELDS_DATA: TFields[] = ["name", "username", "data", "responses", "documentId", "current"];

// eslint-disable-next-line
const createQuestionnairesResponse = (source: any): IQuestionnairesResponse =>
  FIELDS_DATA.reduce(
    (result, field) => ({
      ...result,
      [field]: source[field],
    }),
    {},
  ) as IQuestionnairesResponse;

const rearrangeAll = (response: IQuestionnairesResponse): IQuestionnairesResponse => createQuestionnairesResponse(response);

const rearrange = (response: IQuestionnairesSchema): IQuestionnairesResponse => createQuestionnairesResponse(response.data);

export const GETQuestionnaires = async (query?: string): Promise<IQuestionnairesResponse[]> => {
  try {
    const res = await fetch(`${API_URL}/api/questionnaires?${query ? query + "&" : ""}populate=*`);

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to get: Questionnaires with status ${res.status} || ${response.error.message}`);
    }

    return response.data.map(rearrangeAll);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};

export const GETQuestionnairesByDocumentId = async (documentId: string): Promise<IQuestionnairesResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/questionnaires/${documentId}?populate=*`);

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to get: Questionnaires By Document ID with status ${res.status} || ${response.error.message}`);
    }

    return rearrange(response);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};

export const POSTQuestionnaires = async (payload: IQuestionnairesPayload): Promise<IQuestionnairesResponse> => {
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
      throw new Error(`Failed to post: Questionnaires with status ${res.status} || ${response.error.message}`);
    }

    return rearrange(response);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};

export const PUTQuestionnaires = async (payload: IQuestionnairesPayload): Promise<IQuestionnairesResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/questionnaires/${payload.documentId}?populate=*`, {
      body: JSON.stringify({ data: payload }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to put: Questionnaires with status ${res.status} || ${response.error.message}`);
    }

    return rearrange(response);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};

export const DELETEQuestionnaires = async (documentId: string): Promise<IQuestionnairesResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/questionnaires/${documentId}?populate=*`, {
      method: "DELETE",
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to delete: Questionnaires with status ${res.status} || ${response.error.message}`);
    }

    return rearrange(response);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};
