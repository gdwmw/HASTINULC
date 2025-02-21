"use client";

import { Session } from "next-auth";
import Image from "next/image";
import { FC, ReactElement } from "react";
import { IoStar } from "react-icons/io5";

import { BookingSummary } from "@/src/components";
import { useGlobalStates } from "@/src/context";

interface I {
  session: null | Session;
  slug: string[];
}

/* eslint-disable react/jsx-no-useless-fragment */
export const Content: FC<I> = (props): ReactElement => {
  const { open, response } = useGlobalStates();

  const selectedBookingSummary = response?.bookings.find((dt) => dt.documentId === props.slug[1]);
  const selectedReview = response?.reviews.find((dt) => dt.documentId === selectedBookingSummary?.review?.documentId);

  return (
    <>
      {open?.bookingSummary ? (
        <BookingSummary
          {...selectedBookingSummary}
          datasDocumentId={props.session?.user?.datasDocumentId}
          documentId={props.slug[1]}
          status={selectedBookingSummary?.indicator}
        />
      ) : (
        <section className="w-full max-w-[400px] rounded-lg border border-gray-200 bg-white p-6 shadow-md">
          <header>
            <h1 className="mb-4 text-center text-xl font-bold tracking-widest text-rose-500">-- YOUR REVIEW --</h1>
            <div className="my-3 border-t border-gray-300" />
          </header>

          <dl className="space-y-4">
            <div className="flex flex-col gap-2">
              <dt className="font-medium text-gray-600">Rating:</dt>
              <dd className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => {
                  const ratingValue = i + 1;
                  return <IoStar className={ratingValue <= (selectedReview?.rating ?? 0) ? "text-yellow-400" : "text-gray-200"} key={i} size={28} />;
                })}
              </dd>
            </div>

            <div className="flex flex-col gap-3">
              <dt className="font-medium text-gray-600">Description:</dt>
              <dd className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                <p className="leading-relaxed text-gray-700">{selectedReview?.description ?? "Loading..."}</p>
              </dd>
            </div>

            <div className="flex flex-col gap-3">
              <dt className="font-medium text-gray-600">Images:</dt>
              <dd className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {selectedReview?.images ? (
                  selectedReview?.images.map((dt, i) => (
                    <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200" key={i}>
                      <Image alt="Review Image" className="object-cover" fill quality={50} src={dt.url} />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No Images Available</p>
                )}
              </dd>
            </div>
          </dl>
        </section>
      )}
    </>
  );
};
