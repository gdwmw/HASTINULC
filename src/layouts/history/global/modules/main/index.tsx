import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { FC, PropsWithChildren, ReactElement } from "react";

import { getAllSession } from "@/src/hooks";
import { DUMMY_REVIEW_DATA } from "@/src/libs";
import { IBookingResponse, IMetaResponse } from "@/src/types";
import { GETBooking, GETReview } from "@/src/utils";

import { Content } from "./batches";

type T = Readonly<PropsWithChildren>;

export const Main: FC<T> = async (props): Promise<ReactElement> => {
  const queryClient = new QueryClient();
  const session = await getAllSession();

  const fetchBooking = async () => {
    await queryClient.prefetchInfiniteQuery<{ data: IBookingResponse[] } & IMetaResponse>({
      initialPageParam: 1,
      queryFn: () =>
        GETBooking(
          `sort[0]=createdAt:desc&filters[relation_data][documentId][$eq]=${session?.user?.dataDocumentId}&pagination[pageSize]=5&pagination[page]=1`,
        ),
      queryKey: ["booking", session?.user?.dataDocumentId],
    });
  };

  if (session?.user?.role !== "demo") {
    await fetchBooking();
  }

  const fetchReview = async () => {
    try {
      return await GETReview(`filters[relation_data][documentId][$eq]=${session?.user?.dataDocumentId}`);
    } catch {
      console.warn("GETReview Failed, Bypassed!");
      return null;
    }
  };

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Content reviewResponse={session?.user?.role !== "demo" ? await fetchReview() : DUMMY_REVIEW_DATA} session={session}>
        {props.children}
      </Content>
    </HydrationBoundary>
  );
};
