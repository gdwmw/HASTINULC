import { IBookingsResponse, IReviewsResponse } from "../api";

export interface IBookingsContext {
  name?: string;
  email?: string;
  phoneNumber?: string;
  package?: string;
  date?: string;
}

export interface IOpenContext {
  bookingSummary?: boolean;
  aside?: boolean;
}

export interface IResponseContext {
  bookings: IBookingsResponse[];
  reviews: IReviewsResponse[];
}
