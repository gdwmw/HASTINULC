import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { FC, ReactElement } from "react";

import { IMetaResponse, IReviewResponse } from "@/src/types";
import { GETReview } from "@/src/utils";

import { Content } from "./batches";

export const ASide: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery<{ data: IReviewResponse[] } & IMetaResponse>({
    initialPageParam: 1,
    queryFn: () => GETReview("sort[0]=createdAt:desc&pagination[pageSize]=8&pagination[page]=1"),
    queryKey: ["review-reviews"],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Content />
    </HydrationBoundary>
  );
};
