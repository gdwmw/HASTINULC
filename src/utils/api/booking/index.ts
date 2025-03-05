const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

import { IBookingPayload, IBookingResponse } from "@/src/types";

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

export const GETBooking = async (query?: string): Promise<IBookingResponse[]> => {
  try {
    const res = await fetch(`${API_URL}/api/bookings?${query ? query + "&" : ""}populate=*`);

    const response = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to get: Booking with status ${res.status} || ${response.error.message}`);
    }

    return response.data;
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};

export const POSTBooking = async (payload: IBookingPayload): Promise<IBookingResponse> => {
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
      throw new Error(`Failed to post: Booking with status ${res.status} || ${response.error.message}`);
    }

    return response.data;
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};
