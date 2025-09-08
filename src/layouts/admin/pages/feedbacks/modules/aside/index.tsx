import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { FC, ReactElement } from "react";

import { IMetaResponse, IQuestionnaireResponse } from "@/src/types";
import { GETQuestionnaire } from "@/src/utils";

import { Content } from "./batches";

export const ASide: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery<{ data: IQuestionnaireResponse[] } & IMetaResponse>({
    initialPageParam: 1,
    queryFn: () => GETQuestionnaire("sort[0]=createdAt:desc&pagination[pageSize]=8&pagination[page]=1"),
    queryKey: ["questionnaire-feedbacks"],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Content />
    </HydrationBoundary>
  );
};
