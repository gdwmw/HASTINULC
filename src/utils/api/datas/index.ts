const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

import { IDatasPayload, IDatasResponse, IDatasSchema } from "@/src/types/api";

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

const mapDataToResponse = (dt: IDatasSchema): IDatasResponse => ({
  bookings: dt.data.bookings,
  documentId: dt.data.documentId,
  image: API_URL + dt.data.image?.url,
  name: dt.data.name,
  phoneNumber: dt.data.phoneNumber,
  role: dt.data.role,
});

export const GETDatasByDocumentId = async (documentId: string): Promise<IDatasResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/datas/${documentId}?populate=*`);

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to get: Datas By Document ID with status ${res.status} || ${response.error.message}`);
    }

    return mapDataToResponse(response);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};

export const POSTDatas = async (payload: IDatasPayload): Promise<IDatasResponse> => {
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
      throw new Error(`Failed to post: Datas with status ${res.status} || ${response.error.message}`);
    }

    return mapDataToResponse(response);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};
