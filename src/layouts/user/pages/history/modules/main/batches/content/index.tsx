"use client";

import { Session } from "next-auth";
import { FC, ReactElement } from "react";
import { IoStar } from "react-icons/io5";

import { BookingSummary } from "@/src/components/booking-sammary";
import { useGlobalStates } from "@/src/context";
import { IBookingsResponse } from "@/src/types/api";

interface I {
  response: IBookingsResponse[];
  selectedBookingSummary: IBookingsResponse | undefined;
  session: null | Session;
  slug: string[];
}

/* eslint-disable react/jsx-no-useless-fragment */
export const Content: FC<I> = (props): ReactElement => {
  const { open } = useGlobalStates();

  return (
    <>
      {open?.bookingSummary ? (
        <BookingSummary
          {...props.selectedBookingSummary}
          datasDocumentId={props.session?.user?.datasDocumentId}
          documentId={props.slug[1]}
          status={props.selectedBookingSummary?.indicator}
        />
      ) : (
        <section className="w-full max-w-lg rounded-lg border border-gray-200 bg-white p-5 shadow-md">
          <header>
            <h1 className="mb-4 text-center text-lg font-bold tracking-widest text-rose-500">-- YOUR REVIEW --</h1>
            <div className="my-2 border-t border-gray-300" />
          </header>

          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-gray-600">Rating:</dt>
              <dd className="flex items-center">
                {Array.from({ length: 5 }, (_, i) => {
                  const ratingValue = i + 1;
                  return (
                    <IoStar
                      className={ratingValue <= (props.selectedBookingSummary?.review?.rating ?? 0) ? "text-yellow-400" : "text-gray-200"}
                      key={i}
                      size={25}
                    />
                  );
                })}
              </dd>
            </div>

            <div className="flex gap-5">
              <dt className="text-gray-600">Description:</dt>
              <dd className="rounded-lg border border-gray-200 p-2">
                <p>{props.selectedBookingSummary?.review?.description ?? ""}</p>
              </dd>
            </div>
          </dl>
        </section>
      )}
    </>
  );
};
