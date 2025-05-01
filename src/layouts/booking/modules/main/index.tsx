import { FC, ReactElement } from "react";

import { getAllSession } from "@/src/hooks";
import { GETBooking } from "@/src/utils";

import { Content } from "./batches";

export const Main: FC = async (): Promise<ReactElement> => {
  const session = await getAllSession();
  const fetchBooking = async () => {
    try {
      const res = await GETBooking();
      return res.data;
    } catch {
      console.warn("GETBooking Failed, Bypassed!");
      return null;
    }
  };

  return <Content response={await fetchBooking()} session={session} />;
};
