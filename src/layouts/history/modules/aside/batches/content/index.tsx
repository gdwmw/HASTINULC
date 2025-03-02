"use client";

import { Session } from "next-auth";
import dynamic from "next/dynamic";
import { FC, ReactElement } from "react";

import { BookingSummary } from "@/src/components";
import { useGlobalStates } from "@/src/context";

const ReviewResult = dynamic(() => import("../../../../../../components/review-result"));

interface I {
  session: null | Session;
  slug: string[];
}

export const Content: FC<I> = (props): ReactElement => {
  const { open, response } = useGlobalStates();

  const selectedBooking = response?.bookings.find((dt) => dt.documentId === props.slug[1]);
  const selectedReview = response?.reviews.find((dt) => dt.documentId === selectedBooking?.review?.documentId);

  return open?.bookingSummary ? (
    <BookingSummary
      {...selectedBooking}
      datasDocumentId={props.session?.user?.datasDocumentId}
      documentId={props.slug[1]}
      status={selectedBooking?.indicator}
    />
  ) : (
    <ReviewResult selectedReview={selectedReview} />
  );
};
