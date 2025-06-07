import { Session } from "next-auth";
import Image from "next/image";
import { FC, ReactElement } from "react";
import { IoStar } from "react-icons/io5";

import { IReviewResponse } from "@/src/types";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

interface I {
  data: Partial<IReviewResponse>;
  session: null | Session;
}

const ReviewResult: FC<I> = (props): ReactElement => (
  <section className="w-full max-w-[400px] rounded-lg border border-gray-200 bg-white p-6 shadow-md">
    <header>
      <h1 className="mb-4 text-center text-xl font-bold tracking-widest text-rose-400 max-[450px]:text-base max-[380px]:text-sm">
        -- YOUR REVIEW --
      </h1>
      <div className="my-3 border-t border-gray-300" />
    </header>

    <dl className="space-y-4 max-[450px]:text-sm max-[380px]:text-xs">
      <div className="flex flex-col gap-2">
        <dt className="font-medium text-gray-600">Rating:</dt>
        <dd className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => {
            const ratingValue = i + 1;
            return (
              <IoStar
                className={`size-7 max-[450px]:size-6 max-[380px]:size-5 ${ratingValue <= (props.data.rating ?? 0) ? "text-yellow-400" : "text-gray-200"}`}
                key={i}
              />
            );
          })}
        </dd>
      </div>

      <div className="flex flex-col gap-3">
        <dt className="font-medium text-gray-600">Description:</dt>
        <dd className="rounded-lg border border-gray-200 bg-gray-50 p-3">
          <p className="leading-relaxed text-gray-700">{props.data.description || "-"}</p>
        </dd>
      </div>

      <div className="flex flex-col gap-3">
        <dt className="font-medium text-gray-600">Images:</dt>
        <dd className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {props.data.image ? (
            props.data.image.map((dt, i) => (
              <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200" key={i}>
                <Image
                  alt="Review Image"
                  className="object-cover"
                  fill
                  quality={50}
                  src={props.session?.user?.role === "demo" ? dt.url : API_URL + dt.url}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500">-</p>
          )}
        </dd>
      </div>
    </dl>
  </section>
);

export default ReviewResult;
