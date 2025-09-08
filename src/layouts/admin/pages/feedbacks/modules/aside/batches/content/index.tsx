"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FC, ReactElement, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import loadingAnimation from "@/public/assets/animations/Loading-R.svg";
import { IMetaResponse, IQuestionnaireResponse } from "@/src/types";
import { GETQuestionnaire } from "@/src/utils";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

export const Content: FC = (): ReactElement => {
  const { inView, ref } = useInView();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<{ data: IQuestionnaireResponse[] } & IMetaResponse>({
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage.meta.pagination;
      return page < pageCount ? page + 1 : undefined;
    },
    initialPageParam: 1,
    queryFn: ({ pageParam }) => GETQuestionnaire(`sort[0]=createdAt:desc&pagination[pageSize]=8&pagination[page]=${pageParam}`),
    queryKey: ["questionnaire-feedbacks"],
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line
  }, [inView]);

  return (
    <>
      <section className="grid grid-cols-1 gap-5 pb-2 xl:grid-cols-2">
        {data?.pages.map((pg) =>
          pg.data.map((dt, i) => (
            <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-md" key={i}>
              <div className="flex flex-col gap-3">
                <dt className="font-medium text-gray-600">
                  Feedback from <span className="font-bold text-rose-400">{dt.name || "-"}</span> (
                  <span className="font-bold text-rose-400">{dt.username || "-"}</span>):
                </dt>
                <dd className="space-y-3">
                  {dt.feedback && dt.feedback.length > 0 ? (
                    dt.feedback.map((fb, j) => (
                      <div className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-3" key={j}>
                        <p>
                          <span className="font-bold text-rose-400">{j + 1}. </span>
                          <span>{fb.question}</span>
                        </p>
                        <p className="rounded-lg border border-gray-200 bg-white p-3">{fb.answer || "-"}</p>
                      </div>
                    ))
                  ) : (
                    <p>-</p>
                  )}
                </dd>
              </div>
            </div>
          )),
        )}
      </section>

      {hasNextPage && <Image alt="Loading..." className="mx-auto" ref={ref} src={loadingAnimation} width={20} />}
    </>
  );
};
