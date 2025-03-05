import { IBookingResponse, IReviewResponse } from "../api";

export interface IBookingContext {
  name?: string;
  email?: string;
  phoneNumber?: string;
  package?: string;
  date?: string;
}

export interface IOpenContext {
  bookingList?: boolean;
  bookingSummary?: boolean;
  aside?: boolean;
}

export interface IResponseContext {
  booking: IBookingResponse[];
  review: IReviewResponse[];
}
