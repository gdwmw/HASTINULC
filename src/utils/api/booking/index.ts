const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

import { IBookingsPayload, IBookingsResponse, IBookingsSchema } from "@/src/types/api";

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

const mapDataToResponse = (data: IBookingsSchema): IBookingsResponse => ({
  current: data.data.current,
  data: data.data.data,
  date: data.data.date,
  documentId: data.data.documentId,
  email: data.data.email,
  event: data.data.event,
  googleMapsLink: data.data.googleMapsLink,
  indicator: data.data.indicator,
  name: data.data.name,
  phoneNumber: data.data.phoneNumber,
  subTotal: data.data.subTotal,
  tax: data.data.tax,
  time: data.data.time,
  total: data.data.total,
  username: data.data.username,
});

export const POSTBookings = async (data: IBookingsPayload): Promise<IBookingsResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/bookings?populate=*`, {
      body: JSON.stringify({ data: data }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!res.ok) {
      const resError = await res.json();
      throw new Error(`Failed to post: Bookings with status ${res.status} || ${resError.error.message}`);
    }

    const resData = await res.json();

    return mapDataToResponse(resData);
  } catch (error) {
    console.error("--- Fetch Error Message ---", error);
    throw error;
  }
};
