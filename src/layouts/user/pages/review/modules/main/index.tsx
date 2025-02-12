import { redirect } from "next/navigation";
import { FC, ReactElement } from "react";

import { getAllSession } from "@/src/hooks/session";
import { GETBookings } from "@/src/utils/api";

import { Content } from "./batches";

interface I {
  slug: Promise<{ slug: string[] }>;
}

export const Main: FC<I> = async (props): Promise<ReactElement> => {
  const slug = (await props.slug).slug;
  const session = await getAllSession();
  const response = await GETBookings(`sort[0]=current:desc&filters[data][documentId][$eq]=${session?.user?.datasDocumentId}`);
  const selectedBookingSummary = response.find((dt) => dt.documentId === slug[1]);

  if (selectedBookingSummary?.review?.rating) {
    redirect(`/user/history/${session?.user?.username}/${slug[1]}`);
  }

  return <Content response={response} selectedBookingSummary={selectedBookingSummary} session={session} slug={slug} />;
};
