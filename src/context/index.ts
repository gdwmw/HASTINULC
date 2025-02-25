import { create } from "zustand";

import { IBookingsContext, IOpenContext, IResponseContext } from "../types/context";

interface IStates {
  booking?: IBookingsContext;
  open?: IOpenContext;
  response?: IResponseContext;
}

interface IActions {
  setBooking: (param: IBookingsContext) => void;
  setOpen: (param: IOpenContext) => void;
  setResponse: (param: IResponseContext) => void;
}

export const useGlobalStates = create<IActions & IStates>((set) => ({
  open: {
    aside: false,
    bookingSummary: true,
  },
  setBooking: (booking: IBookingsContext) => set({ booking }),
  setOpen: (open: IOpenContext) => set({ open }),
  setResponse: (response: IResponseContext) => set({ response }),
}));
