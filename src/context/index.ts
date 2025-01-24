import { create } from "zustand";

import { IBookingsPayloadContext } from "../types/context";

interface IStates {
  booking?: IBookingsPayloadContext;
  openB?: boolean;
}

interface IActions {
  setBooking: (param: IBookingsPayloadContext) => void;
  setOpenB: (param: boolean) => void;
}

export const useGlobalStates = create<IActions & IStates>((set) => ({
  openB: false,
  setBooking: (booking: IBookingsPayloadContext) => set({ booking }),
  setOpenB: (openB: boolean) => set({ openB }),
}));
