import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { FC, ReactElement } from "react";

import { IBookingResponse, IMetaResponse } from "@/src/types";
import { GETBooking } from "@/src/utils";

import { Content } from "./batches";

export const ASide: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<{ data: IBookingResponse[] } & IMetaResponse>({
    queryFn: () => GETBooking("sort[0]=createdAt:desc&pagination[pageSize]=5&pagination[page]=1"),
    queryKey: ["booking"],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Content />
    </HydrationBoundary>
  );
};
