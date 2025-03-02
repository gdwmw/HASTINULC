import { redirect } from "next/navigation";
import { FC, ReactElement } from "react";

import { getAllSession } from "@/src/hooks";
import { GETBookings } from "@/src/utils";

import { Content } from "./batches";

interface I {
  slug: Promise<{ slug: string[] }>;
}

export const Main: FC<I> = async (props): Promise<ReactElement> => {
  const slug = (await props.slug).slug;
  const session = await getAllSession();
  const fetchBookings = async () => {
    try {
      return await GETBookings(`sort[0]=current:desc&filters[data][documentId][$eq]=${session?.user?.datasDocumentId}`);
    } catch {
      console.log("GETBookings Failed, Bypassed!");
      return null;
    }
  };
  const response = await fetchBookings();
  const selectedBookingSummary = response?.find((dt) => dt.documentId === slug[1]);

  if (selectedBookingSummary?.review?.rating) {
    redirect(`/history/${session?.user?.username}/${slug[1]}`);
  }

  return <Content selectedBookingSummary={selectedBookingSummary} session={session} slug={slug} />;
};
