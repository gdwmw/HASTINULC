import { FC, ReactElement } from "react";

import { getAllSession } from "@/src/hooks/session";
import { GETBookings, GETReviewsByDocumentId } from "@/src/utils/api";

import { Content } from "./batches";

interface I {
  slug: Promise<{ slug: string[] }>;
}

export const Main: FC<I> = async (props): Promise<ReactElement> => {
  const slug = (await props.slug).slug;
  const session = await getAllSession();
  const response = await GETBookings(`sort[0]=current:desc&filters[data][documentId][$eq]=${session?.user?.datasDocumentId}`);
  const selectedBookingSummary = response.find((dt) => dt.documentId === slug[1]);
  const selectedReview = await GETReviewsByDocumentId(selectedBookingSummary?.review?.documentId ?? "");

  return <Content selectedBookingSummary={selectedBookingSummary} selectedReview={selectedReview} session={session} slug={slug} />;
};
