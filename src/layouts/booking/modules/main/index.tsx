import { FC, ReactElement } from "react";

import { getAllSession } from "@/src/hooks";
import { GETBookings } from "@/src/utils";

import { Content } from "./batches";

export const Main: FC = async (): Promise<ReactElement> => {
  const session = await getAllSession();
  const fetchBookings = async () => {
    try {
      return await GETBookings();
    } catch {
      console.log("GETBookings Failed, Bypassed!");
      return null;
    }
  };

  return <Content response={await fetchBookings()} session={session} />;
};
