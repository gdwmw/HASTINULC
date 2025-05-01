import { redirect } from "next/navigation";
import { FC, ReactElement } from "react";

import { getAllSession } from "@/src/hooks";
import { DUMMY_BOOKING_DATA } from "@/src/libs";
import { GETBooking } from "@/src/utils";

import { Content } from "./batches";

interface I {
  slug: Promise<{ slug: string[] }>;
}

export const Main: FC<I> = async (props): Promise<ReactElement> => {
  const slug = (await props.slug).slug;
  const session = await getAllSession();

  const fetchBooking = async () => {
    try {
      const res = await GETBooking(`sort[0]=createdAt:desc&filters[relation_data][documentId][$eq]=${session?.user?.dataDocumentId}`);
      return res.data;
    } catch {
      console.warn("GETBooking Failed, Bypassed!");
      return null;
    }
  };

  const response = session?.user?.role !== "demo" ? await fetchBooking() : undefined;

  const selectedBookingSummary =
    session?.user?.role === "demo" ? DUMMY_BOOKING_DATA.find((dt) => dt.documentId === slug[1]) : response?.find((dt) => dt.documentId === slug[1]);

  if (selectedBookingSummary?.relation_review) {
    redirect(`/history/${session?.user?.username}/${slug[1]}`);
  }

  return <Content data={selectedBookingSummary} session={session} slug={slug} />;
};
