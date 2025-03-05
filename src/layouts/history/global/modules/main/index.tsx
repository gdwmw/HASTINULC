import { FC, PropsWithChildren, ReactElement } from "react";

import { getAllSession } from "@/src/hooks";
import { DUMMY_BOOKING_DATA, DUMMY_REVIEW_DATA } from "@/src/libs";
import { GETBooking, GETReview } from "@/src/utils";

import { Content } from "./batches";

type T = Readonly<PropsWithChildren>;

export const Main: FC<T> = async (props): Promise<ReactElement> => {
  const session = await getAllSession();
  const fetchBooking = async () => {
    try {
      return await GETBooking(`sort[0]=createdAt:desc&filters[relation_data][documentId][$eq]=${session?.user?.dataDocumentId}`);
    } catch {
      console.log("GETBooking Failed, Bypassed!");
      return null;
    }
  };
  const fetchReview = async () => {
    try {
      return await GETReview(`filters[relation_data][documentId][$eq]=${session?.user?.dataDocumentId}`);
    } catch {
      console.log("GETReview Failed, Bypassed!");
      return null;
    }
  };

  return (
    <Content
      bookingResponse={session?.user?.role === "demo" ? DUMMY_BOOKING_DATA : await fetchBooking()}
      reviewResponse={session?.user?.role === "demo" ? DUMMY_REVIEW_DATA : await fetchReview()}
      session={session}
    >
      {props.children}
    </Content>
  );
};
