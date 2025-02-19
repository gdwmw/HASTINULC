import { IBookingsResponse, IReviewsResponse } from "../api";

export interface IBookingsContext {
  name?: string;
  email?: string;
  phoneNumber?: string;
  event?: string;
  date?: string;
}

export interface IOpenContext {
  bookingSummary: boolean;
}

export interface IResponseContext {
  bookings: IBookingsResponse[];
  reviews: IReviewsResponse[];
}
