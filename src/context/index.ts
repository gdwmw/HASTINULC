import { create } from "zustand";

import { IBookingContext, IOpenContext, IResponseContext } from "../types";

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
    historyAsideSwitch: false,
    historyDetailSwitch: false,
    homeAside: false,
  },
  setBooking: (booking: IBookingContext) => set({ booking }),
  setOpen: (open: IOpenContext) => set({ open }),
  setResponse: (response: IResponseContext) => set({ response }),
}));
