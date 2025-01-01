const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

import { IDatasPayload, IDatasResponse, IDatasSchema } from "@/src/types/api";

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

const mapDataToResponse = (data: IDatasSchema): IDatasResponse => ({
  documentId: data.data.documentId,
  image: API_URL + data.data.image?.url,
  name: data.data.name,
  phoneNumber: data.data.phoneNumber,
  role: data.data.role,
});

export const GETDatasByDocumentId = async (documentId: string): Promise<IDatasResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/datas/${documentId}?populate=*`);

    if (!res.ok) {
      const resError = await res.json();
      throw new Error(`Failed to get: Datas By Document ID with status ${res.status} || ${resError.error.message}`);
    }

    const resData = await res.json();

    return mapDataToResponse(resData);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};

export const POSTDatas = async (data: IDatasPayload): Promise<IDatasResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/datas?populate=*`, {
      body: JSON.stringify({ data: data }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!res.ok) {
      const resError = await res.json();
      throw new Error(`Failed to post: Datas with status ${res.status} || ${resError.error.message}`);
    }

    const resData = await res.json();

    return mapDataToResponse(resData);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};
