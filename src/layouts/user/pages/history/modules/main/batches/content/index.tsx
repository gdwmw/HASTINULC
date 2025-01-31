import { Session } from "next-auth";
import { FC, ReactElement } from "react";

import { BookingSummary } from "@/src/components/booking-sammary";
import { IBookingsResponse } from "@/src/types/api";

interface I {
  response: IBookingsResponse[];
  session: null | Session;
  slug: string[];
}

export const Content: FC<I> = (props): ReactElement => {
  const selectedBookingSummary = props.response.find((dt) => dt.documentId === props.slug[2]);

  return (
    <BookingSummary
      {...selectedBookingSummary}
      datasDocumentId={props.session?.user?.datasDocumentId}
      documentId={props.slug[2]}
      status={selectedBookingSummary?.indicator}
    />
  );
};
