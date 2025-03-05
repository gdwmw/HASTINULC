import { FC, ReactElement } from "react";

import { getAllSession } from "@/src/hooks";
import { GETBooking } from "@/src/utils";

import { Content } from "./batches";

export const Main: FC = async (): Promise<ReactElement> => {
  const session = await getAllSession();
  const fetchBooking = async () => {
    try {
      return await GETBooking();
    } catch {
      console.log("GETBooking Failed, Bypassed!");
      return null;
    }
  };

  return <Content response={await fetchBooking()} session={session} />;
};
