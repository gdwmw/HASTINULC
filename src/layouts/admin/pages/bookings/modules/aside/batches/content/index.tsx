"use client";

import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FC, ReactElement, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import loadingAnimation from "@/public/assets/animations/Loading-R.svg";
import { AdminBookingCard } from "@/src/components";
import { IBookingPayload, IBookingResponse, IMetaResponse, TIndicator } from "@/src/types";
import { GETBooking, PUTBooking } from "@/src/utils";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

export const Content: FC = (): ReactElement => {
  const queryClient = useQueryClient();
  const { inView, ref } = useInView();

  const {
    data: bookingResponse,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<{ data: IBookingResponse[] } & IMetaResponse>({
    // enabled: props.session?.user?.role !== "demo",
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage.meta.pagination;
      return page < pageCount ? page + 1 : undefined;
    },
    initialPageParam: 1,
    queryFn: ({ pageParam }) => GETBooking(`sort[0]=createdAt:desc&pagination[pageSize]=8&pagination[page]=${pageParam}`),
    queryKey: ["booking-bookings"],
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line
  }, [inView]);

  const handleBookingMutation = useMutation({
    mutationFn: (props: Partial<IBookingPayload>) =>
      PUTBooking({ confirmedAt: props.confirmedAt, documentId: props.documentId, indicator: props.indicator } as IBookingPayload),
  });

  const handleUpdateIndicator = async (documentId: string, indicator: TIndicator) => {
    await handleBookingMutation.mutateAsync({ documentId, indicator });
    if (indicator === "Down Pay") {
      await handleBookingMutation.mutateAsync({ confirmedAt: new Date(), documentId });
    }
    queryClient.invalidateQueries({ queryKey: ["booking-bookings"] });
  };

  return (
    <aside className="grow space-y-5 overflow-y-auto">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {bookingResponse?.pages.map((pg) =>
          pg.data.map((dt, i) => <AdminBookingCard dt={dt} handleUpdateIndicator={handleUpdateIndicator} key={i} />),
        )}
      </div>

      {hasNextPage && <Image alt="Loading..." className="mx-auto" ref={ref} src={loadingAnimation} width={20} />}
    </aside>
  );
};
