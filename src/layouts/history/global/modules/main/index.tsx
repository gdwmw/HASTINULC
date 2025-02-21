import { FC, PropsWithChildren, ReactElement } from "react";

import { getAllSession } from "@/src/hooks";
import { GETBookings, GETReviews } from "@/src/utils";

import { Content } from "./batches";

type T = Readonly<PropsWithChildren>;

export const Main: FC<T> = async (props): Promise<ReactElement> => {
  const session = await getAllSession();
  const bookingsResponse = await GETBookings(`sort[0]=current:desc&filters[data][documentId][$eq]=${session?.user?.datasDocumentId}`);
  const reviewsResponse = await GETReviews(`filters[username][$eq]=${session?.user?.username}`);

  return (
    <Content bookingsResponse={bookingsResponse} reviewsResponse={reviewsResponse} session={session}>
      {props.children}
    </Content>
  );
};
