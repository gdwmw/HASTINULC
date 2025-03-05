import { IReviewPayload, IReviewResponse } from "@/src/types";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

export const GETReview = async (query?: string): Promise<IReviewResponse[]> => {
  try {
    const res = await fetch(`${API_URL}/api/reviews?${query ? query + "&" : ""}populate=*`);

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to get: Review with status ${res.status} || ${response.error.message}`);
    }

    return response.data;
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};

export const POSTReview = async (payload: IReviewPayload): Promise<IReviewResponse> => {
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
      throw new Error(`Failed to post: Review with status ${res.status} || ${response.error.message}`);
    }

    return response.data;
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};
