import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { FC, ReactElement } from "react";

import { IBookingResponse, IMetaResponse } from "@/src/types";
import { GETBooking } from "@/src/utils";

import { Content } from "./batches";

export const ASide: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery<{ data: IBookingResponse[] } & IMetaResponse>({
    initialPageParam: 1,
    queryFn: () => GETBooking("sort[0]=createdAt:desc&pagination[pageSize]=8&pagination[page]=1"),
    queryKey: ["booking-bookings", "", "id", null, null, "sort[0]=createdAt:desc", "pagination[pageSize]=8"],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Content />
    </HydrationBoundary>
  );
};
