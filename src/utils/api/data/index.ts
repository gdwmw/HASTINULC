import { IDataPayload, IDataResponse } from "@/src/types";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

export const GETDataByDocumentId = async (documentId: string): Promise<IDataResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/datas/${documentId}?populate=*`);

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to get: Data By Document ID with status ${res.status} || ${response.error.message}`);
    }

    return response.data;
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};

export const POSTData = async (payload: IDataPayload): Promise<IDataResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/datas?populate=*`, {
      body: JSON.stringify({ data: payload }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to post: Data with status ${res.status} || ${response.error.message}`);
    }

    return response.data;
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};

export const PUTData = async (payload: IDataPayload): Promise<IDataResponse> => {
  const { documentId, ...payloadWithoutDocumentId } = payload;
  try {
    const res = await fetch(`${API_URL}/api/datas/${documentId}?populate=*`, {
      body: JSON.stringify({ data: payloadWithoutDocumentId }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to put: Data with status ${res.status} || ${response.error.message}`);
    }

    return response.data;
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};
