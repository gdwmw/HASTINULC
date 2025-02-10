import { create } from "zustand";

import { IBookingsContextPayload } from "../types/context";

interface IOpen {
  bookingSummary: boolean;
}

interface IStates {
  booking?: IBookingsContextPayload;
  open?: IOpen;
}

interface IActions {
  setBooking: (param: IBookingsContextPayload) => void;
  setOpen: (param: IOpen) => void;
}

export const useGlobalStates = create<IActions & IStates>((set) => ({
  open: {
    bookingSummary: true,
  },
  setBooking: (booking: IBookingsContextPayload) => set({ booking }),
  setOpen: (open: IOpen) => set({ open }),
}));
