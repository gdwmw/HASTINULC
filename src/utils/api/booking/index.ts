import type { IBookingPayload, IBookingResponse, IMetaResponse } from "@/src/types";

import { getApi, postApi } from "../base";

const label = "Booking";

export const GETBooking = async (query?: string): Promise<{ data: IBookingResponse[] } & IMetaResponse> => {
  const params = query ? Object.fromEntries(new URLSearchParams(query).entries()) : undefined;
  const response = await getApi<{ data: IBookingResponse[] } & IMetaResponse>({
    endpoint: "/api/bookings",
    label: label,
    params: params,
  });
  return response;
};

export const GETBookingByDocumentId = async (documentId: string): Promise<IBookingResponse> => {
  const response = await getApi<{ data: IBookingResponse }>({
    endpoint: `/api/bookings/${documentId}`,
    label: label,
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
