"use client";

import { Session } from "next-auth";
import dynamic from "next/dynamic";
import { FC, ReactElement } from "react";

import { BookingSummary } from "@/src/components";
import { useGlobalStates } from "@/src/context";

const ReviewResult = dynamic(() => import("../../../../../../components/templates/review-result"));

interface I {
  session: null | Session;
  slug: string[];
}

export const Content: FC<I> = (props): ReactElement => {
  const { open, response } = useGlobalStates();

  const selectedBooking = response?.booking.find((dt) => dt.documentId === props.slug[1]);
  const selectedReview = response?.review.find((dt) => dt.documentId === selectedBooking?.relation_review?.documentId);

  return open?.bookingSummary ? (
    <BookingSummary
      data={{
        documentId: props.slug[1],
        ...selectedBooking,
      }}
    />
  ) : (
    <ReviewResult data={{ ...selectedReview }} session={props.session} />
  );
};
