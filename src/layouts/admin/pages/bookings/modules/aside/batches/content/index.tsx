"use client";

import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FC, ReactElement, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import loadingAnimation from "@/public/assets/animations/Loading-R.svg";
import { AdminBookingCard, DatePickerInput, Input, Select } from "@/src/components";
import { IBookingPayload, IBookingResponse, IMetaResponse, TIndicator } from "@/src/types";
import { GETBooking, PUTBooking } from "@/src/utils";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

export const Content: FC = (): ReactElement => {
  const queryClient = useQueryClient();
  const { inView, ref } = useInView();
  const [dateA, setDateA] = useState<Date | null>(null);
  const [dateB, setDateB] = useState<Date | null>(null);
  const [search, setSearch] = useState("");
  const [by, setBy] = useState("id");

  const queryParams = ["sort[0]=createdAt:desc", "pagination[pageSize]=8"];
  if (search && by) {
    queryParams.push(`filters[${by}][$contains]=${encodeURIComponent(search)}`);
  }
  if (dateA) {
    queryParams.push(`filters[date][$gt]=${dateA.toISOString().slice(0, 10)}`);
  }
  if (dateB) {
    const nextDay = new Date(dateB);
    nextDay.setDate(nextDay.getDate() + 1);
    queryParams.push(`filters[date][$lte]=${nextDay.toISOString().slice(0, 10)}`);
  }

  const {
    data: bookingResponse,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery<{ data: IBookingResponse[] } & IMetaResponse>({
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage.meta.pagination;
      return page < pageCount ? page + 1 : undefined;
    },
    initialPageParam: 1,
    queryFn: ({ pageParam }) => GETBooking([...queryParams, `pagination[page]=${pageParam}`].join("&")),
    queryKey: ["booking-bookings", search, by, dateA, dateB, queryParams],
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const handleByChange = (e: React.ChangeEvent<HTMLSelectElement>) => setBy(e.target.value);
  const handleDateAChange = (value: Date | null) => setDateA(value);
  const handleDateBChange = (value: Date | null) => setDateB(value);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line
  }, [search, by, dateA, dateB]);

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
    <>
      <section className="rounded-lg border px-2 pb-2 shadow-md">
        <div className="flex items-center gap-4 overflow-x-auto p-4">
          <span className="-mb-1.5">From</span>
          <DatePickerInput className={{ container: "min-w-[200px]" }} color="rose" label="Date" onChange={handleDateAChange} selected={dateA} />
          <span className="-mb-1.5">To</span>
          <DatePickerInput className={{ container: "min-w-[200px]" }} color="rose" label="Date" onChange={handleDateBChange} selected={dateB} />
          <Input className={{ container: "min-w-[300px] grow" }} color="rose" label="Search" onChange={handleSearchChange} value={search} />
          <Select className={{ container: "min-w-[112px]" }} color="rose" label="By" onChange={handleByChange} value={by}>
            <option value="id">ID</option>
            <option value="documentId">Document ID</option>
            <option value="username">Username</option>
            <option value="name">Name</option>
            <option value="package">Package</option>
            <option value="date">Date</option>
            <option value="time">Time</option>
            <option value="person">Person</option>
            <option value="indicator">Status</option>
            <option value="total">Total</option>
          </Select>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 pb-2 xl:grid-cols-2">
        {bookingResponse?.pages.map((pg) =>
          pg.data.map((dt, i) => <AdminBookingCard dt={dt} handleUpdateIndicator={handleUpdateIndicator} key={i} />),
        )}
      </section>

      {hasNextPage && <Image alt="Loading..." className="mx-auto" ref={ref} src={loadingAnimation} width={20} />}
    </>
  );
};
