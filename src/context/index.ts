import { create } from "zustand";

import { IBookingsContextPayload } from "../types/context";

interface IStates {
  booking?: IBookingsContextPayload;
  openB?: boolean;
}

interface IActions {
  setBooking: (param: IBookingsContextPayload) => void;
  setOpenB: (param: boolean) => void;
}

export const useGlobalStates = create<IActions & IStates>((set) => ({
  openB: false,
  setBooking: (booking: IBookingsContextPayload) => set({ booking }),
  setOpenB: (openB: boolean) => set({ openB }),
}));
