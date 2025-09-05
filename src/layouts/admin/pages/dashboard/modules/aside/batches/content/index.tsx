"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import Image from "next/image";
import { FC, ReactElement } from "react";
import { Line } from "react-chartjs-2";
import { IoStar } from "react-icons/io5";

import { AdminBookingCard } from "@/src/components";
import { IBookingPayload, IBookingResponse, IMetaResponse, IReviewResponse, TIndicator } from "@/src/types";
import { GETBooking, GETReview, PUTBooking } from "@/src/utils";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Annual Booking Statistics",
    },
  },
  responsive: true,
};

const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const getMonthlyBookingCounts = (bookings: IBookingResponse[] | undefined, year: number): number[] => {
  const counts = Array.from({ length: 12 }, () => 0);
  if (!bookings) {
    return [...counts];
  }
  bookings.forEach((booking) => {
    const date = new Date(booking.createdAt);
    if (date.getFullYear() === year) {
      counts[date.getMonth()]++;
    }
  });
  return [...counts];
};

export const Content: FC = (): ReactElement => {
  const queryClient = useQueryClient();

  // ----------------------------

  const { data: allBookingResponse } = useQuery<{ data: IBookingResponse[] } & IMetaResponse>({
    queryFn: () => GETBooking(),
    queryKey: ["all-booking-dashboard"],
  });

  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  const thisYearData = getMonthlyBookingCounts(allBookingResponse?.data, currentYear);
  const lastYearData = getMonthlyBookingCounts(allBookingResponse?.data, lastYear);

  const chartData = {
    datasets: [
      {
        backgroundColor: "rgba(251, 113, 133, 0.5)",
        borderColor: "rgb(251, 113, 133)",
        data: thisYearData,
        label: "This Year",
      },
      {
        backgroundColor: "rgba(229, 231, 235, 0.5)",
        borderColor: "rgb(229, 231, 235)",
        data: lastYearData,
        label: "Last Year",
      },
    ],
    labels,
  };

  // ----------------------------

  const { data: bookingResponse } = useQuery<{ data: IBookingResponse[] } & IMetaResponse>({
    queryFn: () => GETBooking("sort[0]=createdAt:desc&pagination[pageSize]=5&pagination[page]=1"),
    queryKey: ["booking-dashboard"],
  });

  const handleBookingMutation = useMutation({
    mutationFn: (props: Partial<IBookingPayload>) =>
      PUTBooking({ confirmedAt: props.confirmedAt, documentId: props.documentId, indicator: props.indicator } as IBookingPayload),
  });

  const handleUpdateIndicator = async (documentId: string, indicator: TIndicator) => {
    await handleBookingMutation.mutateAsync({ documentId, indicator });
    if (indicator === "Down Pay") {
      await handleBookingMutation.mutateAsync({ confirmedAt: new Date(), documentId });
    }
    queryClient.invalidateQueries({ queryKey: ["booking-dashboard"] });
  };

  // ----------------------------

  const { data: reviewResponse } = useQuery<{ data: IReviewResponse[] } & IMetaResponse>({
    queryFn: () => GETReview("sort[0]=createdAt:desc&pagination[pageSize]=5&pagination[page]=1"),
    queryKey: ["review-dashboard"],
  });

  return (
    <aside className="grow space-y-5 overflow-y-auto">
      <section className="rounded-lg border px-2 pb-2 shadow-md">
        <Line data={chartData} options={options} />
      </section>

      <div className="flex w-full gap-5">
        <section className="mb-2 flex h-96 basis-1/2 flex-col gap-2 rounded-lg border p-3 shadow-md">
          <h3 className="text-lg font-semibold">Last Bookings</h3>

          <div className="h-px w-full bg-gray-200" />

          <div className="space-y-5 overflow-y-auto pb-2">
            {bookingResponse?.data.map((dt, i) => (
              <AdminBookingCard dt={dt} handleUpdateIndicator={handleUpdateIndicator} key={i} />
            ))}
          </div>
        </section>

        <section className="mb-2 flex h-96 basis-1/2 flex-col gap-2 rounded-lg border p-3 shadow-md">
          <h3 className="text-lg font-semibold">Last Reviews</h3>

          <div className="h-px w-full bg-gray-200" />

          <div className="space-y-5 overflow-y-auto pb-2">
            {reviewResponse?.data?.map((dt, i) => (
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
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
};
