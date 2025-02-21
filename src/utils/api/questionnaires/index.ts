import { IDatasResponse, IQuestionnairesPayload, IQuestionnairesResponse } from "@/src/types";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

const DUMMY_OBJECTS_DATA: IQuestionnairesResponse = {
  current: new Date(),
  data: {} as IDatasResponse,
  documentId: "",
  name: "",
  responses: [],
  username: "",
};

const create = (response: IQuestionnairesResponse): IQuestionnairesResponse =>
  Object.keys(DUMMY_OBJECTS_DATA).reduce(
    (result, field) => ({
      ...result,
      [field]: response[field as keyof IQuestionnairesResponse],
    }),
    {},
  ) as IQuestionnairesResponse;

const rearrange = (response: IQuestionnairesResponse): IQuestionnairesResponse => create(response);

export const GETQuestionnaires = async (query?: string): Promise<IQuestionnairesResponse[]> => {
  try {
    const res = await fetch(`${API_URL}/api/questionnaires?${query ? query + "&" : ""}populate=*`);

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to get: Questionnaires with status ${res.status} || ${response.error.message}`);
    }

    return response.data.map(rearrange);
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

    return rearrange(response.data);
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

    return rearrange(response.data);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};

export const PUTQuestionnaires = async (payload: IQuestionnairesPayload): Promise<IQuestionnairesResponse> => {
  const { documentId, ...payloadWithoutDocumentId } = payload;
  try {
    const res = await fetch(`${API_URL}/api/questionnaires/${documentId}?populate=*`, {
      body: JSON.stringify({ data: payloadWithoutDocumentId }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to put: Questionnaires with status ${res.status} || ${response.error.message}`);
    }

    return rearrange(response.data);
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

    return rearrange(response.data);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};
