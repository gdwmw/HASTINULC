import { IRatingsPayload, IRatingsResponse, IRatingsSchema } from "@/src/types/api";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

type TFields = keyof IRatingsResponse;

const FIELDS_DATA: TFields[] = ["documentId", "description", "rating", "booking"];

// eslint-disable-next-line
const createRatingsResponse = (source: any): IRatingsResponse =>
  FIELDS_DATA.reduce(
    (result, field) => ({
      ...result,
      [field]: source[field],
    }),
    {},
  ) as IRatingsResponse;

const rearrangeAll = (response: IRatingsResponse): IRatingsResponse => createRatingsResponse(response);

const rearrange = (response: IRatingsSchema): IRatingsResponse => createRatingsResponse(response.data);

export const GETRatings = async (query?: string): Promise<IRatingsResponse[]> => {
  try {
    const res = await fetch(`${API_URL}/api/ratings?${query ? query + "&" : ""}populate=*`);

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to get: Ratings with status ${res.status} || ${response.error.message}`);
    }

    return response.data.map(rearrangeAll);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};

export const GETRatingsByDocumentId = async (documentId: string): Promise<IRatingsResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/ratings/${documentId}?populate=*`);

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to get: Ratings By Document ID with status ${res.status} || ${response.error.message}`);
    }

    return rearrange(response);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};

export const POSTRatings = async (payload: IRatingsPayload): Promise<IRatingsResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/ratings?populate=*`, {
      body: JSON.stringify({ data: payload }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to post: Ratings with status ${res.status} || ${response.error.message}`);
    }

    return rearrange(response);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};

export const PUTRatings = async (payload: IRatingsPayload): Promise<IRatingsResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/ratings/${payload.documentId}?populate=*`, {
      body: JSON.stringify({ data: payload }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to put: Ratings with status ${res.status} || ${response.error.message}`);
    }

    return rearrange(response);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};

export const DELETERatings = async (documentId: string): Promise<IRatingsResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/ratings/${documentId}?populate=*`, {
      method: "DELETE",
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to delete: Ratings with status ${res.status} || ${response.error.message}`);
    }

    return rearrange(response);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};
