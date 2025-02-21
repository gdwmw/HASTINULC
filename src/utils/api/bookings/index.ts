const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

import { IBookingsPayload, IBookingsResponse, IDatasResponse } from "@/src/types";

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

const DUMMY_OBJECTS_DATA: IBookingsResponse = {
  current: new Date(),
  data: {} as IDatasResponse,
  date: "",
  documentId: "",
  email: "",
  googleMapsLink: "",
  indicator: "",
  name: "",
  package: "",
  phoneNumber: "",
  review: undefined,
  subTotal: "",
  tax: "",
  time: [],
  total: "",
  username: "",
};

const create = (response: IBookingsResponse): IBookingsResponse =>
  Object.keys(DUMMY_OBJECTS_DATA).reduce(
    (result, field) => ({
      ...result,
      [field]: response[field as keyof IBookingsResponse],
    }),
    {},
  ) as IBookingsResponse;

const rearrange = (response: IBookingsResponse): IBookingsResponse => create(response);

export const GETBookings = async (query?: string): Promise<IBookingsResponse[]> => {
  try {
    const res = await fetch(`${API_URL}/api/bookings?${query ? query + "&" : ""}populate=*`);

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to get: Bookings with status ${res.status} || ${response.error.message}`);
    }

    return response.data.map(rearrange);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};

export const GETBookingsByDocumentId = async (documentId: string): Promise<IBookingsResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/bookings/${documentId}?populate=*`);

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to get: Bookings By Document ID with status ${res.status} || ${response.error.message}`);
    }

    return rearrange(response.data);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};

export const POSTBookings = async (payload: IBookingsPayload): Promise<IBookingsResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/bookings?populate=*`, {
      body: JSON.stringify({ data: payload }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to post: Bookings with status ${res.status} || ${response.error.message}`);
    }

    return rearrange(response.data);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};

export const PUTBookings = async (payload: IBookingsPayload): Promise<IBookingsResponse> => {
  const { documentId, ...payloadWithoutDocumentId } = payload;
  try {
    const res = await fetch(`${API_URL}/api/bookings/${documentId}?populate=*`, {
      body: JSON.stringify({ data: payloadWithoutDocumentId }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to put: Bookings with status ${res.status} || ${response.error.message}`);
    }

    return rearrange(response.data);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};

export const DELETEBookings = async (documentId: string): Promise<IBookingsResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/bookings/${documentId}?populate=*`, {
      method: "DELETE",
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to delete: Bookings with status ${res.status} || ${response.error.message}`);
    }

    return rearrange(response.data);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};
