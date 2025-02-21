import { FC, ReactElement } from "react";

import { getAllSession } from "@/src/hooks";
import { GETBookings } from "@/src/utils/api";

import { Content } from "./batches";

export const Main: FC = async (): Promise<ReactElement> => {
  const session = await getAllSession();
  const response = await GETBookings();

  return <Content response={response} session={session} />;
};
