import { IUsersPayload, IUsersResponse, IUsersSchema } from "@/src/types/api";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

const mapDataToResponse = (dt: IUsersSchema): IUsersResponse => ({
  datasDocumentId: dt.datasDocumentId,
});

export const PUTUsers = async (payload: IUsersPayload): Promise<IUsersResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/users/${payload.id}?populate=*`, {
      body: JSON.stringify({ datasDocumentId: payload.datasDocumentId }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to put: Users with status ${res.status} || ${response.error.message}`);
    }

    return mapDataToResponse(response);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};
