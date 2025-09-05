"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FC, ReactElement, useEffect } from "react";
import { IoStar } from "react-icons/io5";
import { useInView } from "react-intersection-observer";

import loadingAnimation from "@/public/assets/animations/Loading-R.svg";
import { IMetaResponse, IReviewResponse } from "@/src/types";
import { GETReview } from "@/src/utils";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

export const Content: FC = (): ReactElement => {
  const { inView, ref } = useInView();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<{ data: IReviewResponse[] } & IMetaResponse>({
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage.meta.pagination;
      return page < pageCount ? page + 1 : undefined;
    },
    initialPageParam: 1,
    queryFn: ({ pageParam }) => GETReview(`sort[0]=createdAt:desc&pagination[pageSize]=8&pagination[page]=${pageParam}`),
    queryKey: ["review-reviews"],
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line
  }, [inView]);

  return (
    <aside className="grow space-y-5 overflow-y-auto">
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {data?.pages.map((pg) =>
          pg.data.map((dt, i) => (
            <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-md" key={i}>
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
                    <p className="leading-relaxed">{dt.description || "-"}</p>
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
          )),
        )}
      </section>

      {hasNextPage && <Image alt="Loading..." className="mx-auto" ref={ref} src={loadingAnimation} width={20} />}
    </aside>
  );
};
