const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

import { IBookingsPayload, IBookingsResponse, IBookingsSchema } from "@/src/types/api";

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

const mapAllDataToResponse = (dt: IBookingsResponse): IBookingsResponse => ({
  current: dt.current,
  data: dt.data,
  date: dt.date,
  documentId: dt.documentId,
  email: dt.email,
  event: dt.event,
  googleMapsLink: dt.googleMapsLink,
  indicator: dt.indicator,
  name: dt.name,
  phoneNumber: dt.phoneNumber,
  subTotal: dt.subTotal,
  tax: dt.tax,
  time: dt.time,
  total: dt.total,
  username: dt.username,
});

const mapDataToResponse = (dt: IBookingsSchema): IBookingsResponse => ({
  current: dt.data.current,
  data: dt.data.data,
  date: dt.data.date,
  documentId: dt.data.documentId,
  email: dt.data.email,
  event: dt.data.event,
  googleMapsLink: dt.data.googleMapsLink,
  indicator: dt.data.indicator,
  name: dt.data.name,
  phoneNumber: dt.data.phoneNumber,
  subTotal: dt.data.subTotal,
  tax: dt.data.tax,
  time: dt.data.time,
  total: dt.data.total,
  username: dt.data.username,
});

export const GETBookings = async (query?: string): Promise<IBookingsResponse[]> => {
  try {
    const res = await fetch(`${API_URL}/api/bookings?${query ? query + "&" : ""}populate=*`);

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to get: Bookings with status ${res.status} || ${response.error.message}`);
    }

    return response.data.map(mapAllDataToResponse);
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

    return mapDataToResponse(response);
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

    return mapDataToResponse(response);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};

export const PUTBookings = async (payload: IBookingsPayload): Promise<IBookingsResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/bookings/${payload.documentId}?populate=*`, {
      body: JSON.stringify({ data: payload }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to put: Bookings with status ${res.status} || ${response.error.message}`);
    }

    return mapDataToResponse(response);
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

    return mapDataToResponse(response);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};
