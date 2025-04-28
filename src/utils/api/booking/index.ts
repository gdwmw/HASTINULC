import type { IBookingPayload, IBookingResponse } from "@/src/types";

import { getApi, postApi } from "../base";

const label = "Booking";

export const GETBooking = async (query?: string): Promise<IBookingResponse[]> => {
  const params = query ? Object.fromEntries(new URLSearchParams(query).entries()) : undefined;
  const response = await getApi<{ data: IBookingResponse[] }>({
    endpoint: "/api/bookings",
    label: label,
    params: params,
  });
  return response.data;
};

export const POSTBooking = async (payload: IBookingPayload): Promise<IBookingResponse> => {
  const response = await postApi<{ data: IBookingResponse }>({
    data: { data: payload },
    endpoint: "/api/bookings",
    label: label,
  });
  return response.data;
};
