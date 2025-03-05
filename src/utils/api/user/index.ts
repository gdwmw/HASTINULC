import { IUserPayload, IUserResponse } from "@/src/types";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

export const GETUserByDocumentId = async (documentId: string): Promise<IUserResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/users/${documentId}?populate=*`);

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to get: User By Document ID with status ${res.status} || ${response.error.message}`);
    }

    return response;
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};

export const PUTUser = async (payload: IUserPayload): Promise<IUserResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/users/${payload.id}?populate=*`, {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to put: User with status ${res.status} || ${response.error.message}`);
    }

    return response;
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};
