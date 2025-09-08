import Image from "next/image";
import { FC, ReactElement } from "react";
import { IoStar } from "react-icons/io5";

import { IReviewResponse } from "@/src/types";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

interface I {
  data: IReviewResponse;
}

export const AdminReviewResult: FC<I> = ({ data: dt }): ReactElement => (
  <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-md">
    <dl className="space-y-4 max-[450px]:text-sm max-[380px]:text-xs">
      <div className="flex flex-col gap-2">
        <dt className="font-medium text-gray-600">Rating:</dt>
        <dd className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => {
            const ratingValue = i + 1;
            return (
              <IoStar
                className={`size-7 max-[450px]:size-6 max-[380px]:size-5 ${ratingValue <= (dt.rating ?? 0) ? "text-yellow-400" : "text-gray-200"}`}
                key={i}
              />
            );
          })}
        </dd>
      </div>

      <div className="flex flex-col gap-3">
        <dt className="font-medium text-gray-600">Description:</dt>
        <dd className="rounded-lg border border-gray-200 bg-gray-50 p-3">
          <p>{dt.description || "-"}</p>
        </dd>
      </div>

      <div className="flex flex-col gap-3">
        <dt className="font-medium text-gray-600">Images:</dt>
        <dd className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {dt.image ? (
            dt.image.map((dt, i) => (
              <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200" key={i}>
                <Image alt="Review Image" className="object-cover" fill quality={50} src={API_URL + dt.url} />
              </div>
            ))
          ) : (
            <p>-</p>
          )}
        </dd>
      </div>
    </dl>
  </div>
);
