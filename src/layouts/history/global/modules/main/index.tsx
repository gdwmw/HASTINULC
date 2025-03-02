import { FC, PropsWithChildren, ReactElement } from "react";

import { getAllSession } from "@/src/hooks";
import { DUMMY_BOOKINGS_DATA, DUMMY_REVIEWS_DATA } from "@/src/libs";
import { IBookingsResponse, IReviewsResponse } from "@/src/types";
import { GETBookings, GETReviews } from "@/src/utils";

import { Content } from "./batches";

type T = Readonly<PropsWithChildren>;

export const Main: FC<T> = async (props): Promise<ReactElement> => {
  const session = await getAllSession();
  const fetchBookings = async () => {
    try {
      return await GETBookings(`sort[0]=current:desc&filters[data][documentId][$eq]=${session?.user?.datasDocumentId}`);
    } catch {
      console.log("GETBookings Failed, Bypassed!");
      return null;
    }
  };
  const fetchReviews = async () => {
    try {
      return await GETReviews(`filters[username][$eq]=${session?.user?.username}`);
    } catch {
      console.log("GETReviews Failed, Bypassed!");
      return null;
    }
  };

  return (
    <Content
      bookingsResponse={session?.user?.role === "demo" ? (DUMMY_BOOKINGS_DATA as IBookingsResponse[]) : await fetchBookings()}
      reviewsResponse={session?.user?.role === "demo" ? (DUMMY_REVIEWS_DATA as IReviewsResponse[]) : await fetchReviews()}
      session={session}
    >
      {props.children}
    </Content>
  );
};
