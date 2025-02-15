import { IBookingsResponse, IReviewsResponse } from "../api";

export interface IBookingsContext {
  date?: string;
  email?: string;
  event?: string;
  name?: string;
  phoneNumber?: string;
}

export interface IOpenContext {
  bookingSummary: boolean;
}

export interface IResponseContext {
  bookings: IBookingsResponse[];
  reviews: IReviewsResponse[];
}
