import { IBookingResponse, IReviewResponse } from "../api";

export interface IBookingContext {
  name?: string;
  email?: string;
  phoneNumber?: string;
  package?: string;
  date?: string;
}

export interface IOpenContext {
  historyDetailSwitch?: boolean;
  historyAsideSwitch?: boolean;
  homeAside?: boolean;
}

export interface IResponseContext {
  booking?: IBookingResponse;
  review?: IReviewResponse;
}
