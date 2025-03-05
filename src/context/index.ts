import { create } from "zustand";

import { IBookingContext, IOpenContext, IResponseContext } from "../types/context";

interface IStates {
  booking?: IBookingContext;
  open?: IOpenContext;
  response?: IResponseContext;
}

interface IActions {
  setBooking: (param: IBookingContext) => void;
  setOpen: (param: IOpenContext) => void;
  setResponse: (param: IResponseContext) => void;
}

export const useGlobalStates = create<IActions & IStates>((set) => ({
  open: {
    aside: false,
    bookingList: true,
    bookingSummary: true,
  },
  setBooking: (booking: IBookingContext) => set({ booking }),
  setOpen: (open: IOpenContext) => set({ open }),
  setResponse: (response: IResponseContext) => set({ response }),
}));
