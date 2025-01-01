import { IUsersPayload, IUsersResponse, IUsersSchema } from "@/src/types/api";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

const mapDataToResponse = (data: IUsersSchema): IUsersResponse => ({
  datasDocumentId: data.datasDocumentId,
});

export const PUTUsers = async (data: IUsersPayload): Promise<IUsersResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/users/${data.id}?populate=*`, {
      body: JSON.stringify({ datasDocumentId: data.datasDocumentId }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    if (!res.ok) {
      const resError = await res.json();
      throw new Error(`Failed to put: Users with status ${res.status} || ${resError.error.message}`);
    }

    const resData = await res.json();

    return mapDataToResponse(resData);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};
