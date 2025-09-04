import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { FC, ReactElement } from "react";

import { IBookingResponse, IMetaResponse, IReviewResponse } from "@/src/types";
import { GETBooking, GETReview } from "@/src/utils";

import { Content } from "./batches";

export const ASide: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<{ data: IBookingResponse[] } & IMetaResponse>({
    queryFn: () => GETBooking(),
    queryKey: ["all-booking-dashboard"],
  });

  await queryClient.prefetchQuery<{ data: IBookingResponse[] } & IMetaResponse>({
    queryFn: () => GETBooking("sort[0]=createdAt:desc&pagination[pageSize]=5&pagination[page]=1"),
    queryKey: ["booking-dashboard"],
  });

  await queryClient.prefetchQuery<IReviewResponse[]>({
    queryFn: () => GETReview("sort[0]=createdAt:desc&pagination[pageSize]=5&pagination[page]=1"),
    queryKey: ["review-dashboard"],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Content />
    </HydrationBoundary>
  );
};
