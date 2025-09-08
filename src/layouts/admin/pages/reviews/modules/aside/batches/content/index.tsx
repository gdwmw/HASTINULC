"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FC, ReactElement, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import loadingAnimation from "@/public/assets/animations/Loading-R.svg";
import { AdminReviewResult } from "@/src/components";
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
      <section className="grid grid-cols-1 gap-5 pb-2 md:grid-cols-2">
        {data?.pages.map((pg) => pg.data.map((dt, i) => <AdminReviewResult data={dt} key={i} />))}
      </section>

      {hasNextPage && <Image alt="Loading..." className="mx-auto" ref={ref} src={loadingAnimation} width={20} />}
    </aside>
  );
};
