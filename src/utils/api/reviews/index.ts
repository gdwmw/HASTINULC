import { IReviewsPayload, IReviewsResponse } from "@/src/types/api";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

type TFields = keyof IReviewsResponse;

const FIELDS_DATA: TFields[] = ["documentId", "description", "rating", "booking", "image"];

// eslint-disable-next-line
const createReviewsResponse = (source: any): IReviewsResponse =>
  FIELDS_DATA.reduce(
    (result, field) => ({
      ...result,
      [field]: field === "image" ? source[field]?.map((img: { url: string }) => (img.url ? API_URL + img.url : null)) : source[field],
    }),
    {},
  ) as IReviewsResponse;

const rearrange = (response: IReviewsResponse): IReviewsResponse => createReviewsResponse(response);

export const GETReviews = async (query?: string): Promise<IReviewsResponse[]> => {
  try {
    const res = await fetch(`${API_URL}/api/reviews?${query ? query + "&" : ""}populate=*`);

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to get: Reviews with status ${res.status} || ${response.error.message}`);
    }

    return response.data.map(rearrange);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};

export const GETReviewsByDocumentId = async (documentId: string): Promise<IReviewsResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/reviews/${documentId}?populate=*`);

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to get: Reviews By Document ID with status ${res.status} || ${response.error.message}`);
    }

    return rearrange(response.data);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};

export const POSTReviews = async (payload: IReviewsPayload): Promise<IReviewsResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/reviews?populate=*`, {
      body: JSON.stringify({ data: payload }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to post: Reviews with status ${res.status} || ${response.error.message}`);
    }

    return rearrange(response.data);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};

export const PUTReviews = async (payload: IReviewsPayload): Promise<IReviewsResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/reviews/${payload.documentId}?populate=*`, {
      body: JSON.stringify({ data: payload }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to put: Reviews with status ${res.status} || ${response.error.message}`);
    }

    return rearrange(response.data);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};

export const DELETEReviews = async (documentId: string): Promise<IReviewsResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/reviews/${documentId}?populate=*`, {
      method: "DELETE",
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to delete: Reviews with status ${res.status} || ${response.error.message}`);
    }

    return rearrange(response.data);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};
