import { IBookingsResponse, IDatasResponse, IReviewsPayload, IReviewsResponse } from "@/src/types/api";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

const DUMMY_OBJECTS_DATA: IReviewsResponse = {
  booking: {} as IBookingsResponse,
  current: new Date(),
  data: {} as IDatasResponse,
  description: "",
  documentId: "",
  id: 0,
  images: null,
  name: "",
  rating: 0,
  username: "",
};

const create = (response: IReviewsResponse): IReviewsResponse =>
  Object.keys(DUMMY_OBJECTS_DATA).reduce(
    (result, field) => ({
      ...result,
      [field]:
        field === "images"
          ? response[field]
            ? response[field].map((dt) => ({
                url: `${API_URL + dt.url}`,
              }))
            : null
          : response[field as keyof IReviewsResponse],
    }),
    {},
  ) as IReviewsResponse;

const rearrange = (response: IReviewsResponse): IReviewsResponse => create(response);

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
  const { documentId, ...payloadWithoutDocumentId } = payload;
  try {
    const res = await fetch(`${API_URL}/api/reviews/${documentId}?populate=*`, {
      body: JSON.stringify({ data: payloadWithoutDocumentId }),
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
