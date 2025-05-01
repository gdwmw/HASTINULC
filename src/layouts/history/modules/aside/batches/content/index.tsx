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

  return open?.historyDetailSwitch ? (
    <ReviewResult data={{ ...response?.review }} session={props.session} />
  ) : (
    <BookingSummary
      data={{
        documentId: props.slug[1],
        ...response?.booking,
      }}
    />
  );
};
