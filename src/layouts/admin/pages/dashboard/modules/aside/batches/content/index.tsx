"use client";

import { faker } from "@faker-js/faker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import Link from "next/link";
import { FC, ReactElement } from "react";
import { Line } from "react-chartjs-2";
import { BsCalendar2CheckFill } from "react-icons/bs";
import { FaBox } from "react-icons/fa";
import { FaClock, FaLocationDot } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";

import { ExampleA } from "@/src/components";
import { currencyFormat } from "@/src/hooks";
import { IBookingPayload, IBookingResponse, IMetaResponse, TIndicator } from "@/src/types";
import { GETBooking, PUTBooking } from "@/src/utils";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
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

export const data = {
  datasets: [
    {
      backgroundColor: "rgba(251, 113, 133, 0.5)",
      borderColor: "rgb(251, 113, 133)",
      data: labels.map(() => faker.number.int({ max: 1000, min: 0 })),
      label: "This Year",
    },
    {
      backgroundColor: "rgba(229, 231, 235, 0.5)",
      borderColor: "rgb(229, 231, 235)",
      data: labels.map(() => faker.number.int({ max: 1000, min: 0 })),
      label: "Last Year",
    },
  ],
  labels,
};

export const Content: FC = (): ReactElement => {
  const queryClient = useQueryClient();

  const { data: bookingResponse } = useQuery<{ data: IBookingResponse[] } & IMetaResponse>({
    queryFn: () => GETBooking("sort[0]=createdAt:desc&pagination[pageSize]=5&pagination[page]=1"),
    queryKey: ["booking"],
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
    queryClient.invalidateQueries({ queryKey: ["booking"] });
  };

  return (
    <aside className="grow space-y-5 overflow-y-auto">
      <section className="rounded-lg border px-2 pb-2 shadow-md">
        <Line data={data} options={options} />
      </section>

      <div className="flex w-full gap-5">
        <section className="mb-2 flex h-96 basis-1/2 flex-col gap-2 rounded-lg border p-3 shadow-md">
          <h3 className="text-lg font-semibold">Last Bookings</h3>

          <div className="h-px w-full bg-gray-200" />

          <div className="space-y-5 overflow-y-auto pb-2">
            {bookingResponse?.data.map((dt) => (
              <div
                className="group relative flex w-full flex-col justify-between overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:border-rose-200 hover:shadow-md"
                id={dt.documentId}
                key={dt.documentId}
              >
                <div
                  className={`absolute inset-x-0 top-0 m-0 h-1.5 border-none ${
                    {
                      Canceled: "bg-red-400",
                      "Down Pay": "bg-orange-400",
                      Expired: "bg-red-400",
                      "Final Pay": "bg-orange-400",
                      "On Going": "bg-blue-400",
                      Rejected: "bg-red-400",
                      Success: "bg-green-400",
                      Waiting: "bg-yellow-400",
                    }[dt.indicator] ?? "bg-gray-200"
                  }`}
                />

                <div className="flex flex-col gap-4 p-5">
                  <header className="flex items-center justify-between gap-2">
                    <h1 className="line-clamp-1 text-lg font-semibold">{dt.name || "-"}</h1>

                    <strong
                      className={`flex h-6 w-full min-w-fit max-w-24 items-center justify-center rounded-full px-5 text-xs font-semibold text-white ${
                        {
                          Canceled: "bg-red-400",
                          "Down Pay": "bg-orange-400",
                          Expired: "bg-red-400",
                          "Final Pay": "bg-orange-400",
                          "On Going": "bg-blue-400",
                          Rejected: "bg-red-400",
                          Success: "bg-green-400",
                          Waiting: "bg-yellow-400",
                        }[dt.indicator] ?? "bg-gray-400"
                      }`}
                    >
                      {dt.indicator}
                    </strong>
                  </header>

                  <div className="space-y-3 text-sm max-[400px]:text-xs">
                    <div className="flex justify-between gap-3 max-[450px]:flex-col">
                      <figure className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-full bg-rose-100">
                          <FaBox className="text-rose-500" size={12} />
                        </div>
                        <figcaption>
                          <h2 className="text-gray-600">Package</h2>
                          <span className="font-semibold">{dt.package || "-"}</span>
                        </figcaption>
                      </figure>

                      {dt.relation_review?.rating && (
                        <figure className="flex w-[130px] items-center gap-3 max-[450px]:order-first">
                          <div className="flex size-8 items-center justify-center rounded-full bg-rose-100">
                            <IoStar className="text-rose-500" size={15} />
                          </div>
                          <figcaption>
                            <h2 className="text-gray-600">Rating</h2>
                            {dt.indicator === "Success" && dt.relation_review && (
                              <div className="flex items-center">
                                {Array.from({ length: 5 }, (_, i) => {
                                  const ratingValue = i + 1;
                                  return (
                                    <IoStar
                                      className={`size-4 max-[400px]:size-[14px] ${ratingValue <= (dt.relation_review?.rating ?? 0) ? "text-yellow-400" : "text-gray-200"}`}
                                      key={i}
                                      size={15}
                                    />
                                  );
                                })}
                              </div>
                            )}
                          </figcaption>
                        </figure>
                      )}
                    </div>
                    <div className="flex justify-between gap-3 max-[450px]:flex-col">
                      <figure className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-full bg-rose-100">
                          <BsCalendar2CheckFill className="text-rose-500" size={13} />
                        </div>
                        <figcaption>
                          <h2 className="text-gray-600">Date</h2>
                          <span className="font-semibold">{dt.date || "-"}</span>
                        </figcaption>
                      </figure>

                      <figure className="flex w-[130px] items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-full bg-rose-100">
                          <FaLocationDot className="text-rose-500" size={14} />
                        </div>
                        <figcaption>
                          <h2 className="text-gray-600">Location</h2>
                          <Link
                            className="font-semibold text-rose-400 underline hover:text-rose-500 max-[450px]:text-sm max-[380px]:text-xs"
                            href={dt.googleMapsLink}
                            target="_blank"
                          >
                            View on Map
                          </Link>
                        </figcaption>
                      </figure>
                    </div>

                    <figure className="flex items-start gap-3 pt-[3px]">
                      <div className="flex size-8 items-center justify-center rounded-full bg-rose-100">
                        <FaClock className="text-rose-500" size={13} />
                      </div>
                      <figcaption>
                        <h2 className="text-gray-600">Time</h2>
                        <pre className="font-semibold">{Array.isArray(dt.time) && dt.time.length > 0 ? dt.time.join(`\n`) : "-"}</pre>
                      </figcaption>
                    </figure>
                  </div>
                </div>

                <footer className="flex items-center justify-end gap-3 border-t border-gray-200 p-3 group-hover:border-rose-200">
                  <div className="mr-auto flex gap-1">
                    <h2 className="text-gray-600">Total:</h2>
                    <span className="font-bold text-rose-400">{currencyFormat(dt.total, "IDR")}</span>
                  </div>

                  {(dt.indicator === "Down Pay" || dt.indicator === "On Going") && (
                    <ExampleA
                      className="text-sm font-semibold"
                      color="rose"
                      onClick={() => handleUpdateIndicator(dt.documentId, "Canceled")}
                      size="sm"
                      variant="ghost"
                    >
                      Cancel
                    </ExampleA>
                  )}

                  {dt.indicator === "Down Pay" && <div className="h-5 w-px bg-rose-200" />}

                  {(dt.indicator === "Waiting" || dt.indicator === "Down Pay") && (
                    <ExampleA
                      className="text-sm font-semibold"
                      color="rose"
                      onClick={() => handleUpdateIndicator(dt.documentId, "Rejected")}
                      size="sm"
                      variant="ghost"
                    >
                      Reject
                    </ExampleA>
                  )}

                  {dt.indicator === "Waiting" && (
                    <>
                      <div className="h-5 w-px bg-rose-200" />
                      <ExampleA
                        className="text-sm font-semibold"
                        color="rose"
                        onClick={() => handleUpdateIndicator(dt.documentId, "Down Pay")}
                        size="sm"
                        variant="solid"
                      >
                        Accept
                      </ExampleA>
                    </>
                  )}

                  {dt.indicator === "Down Pay" && (
                    <>
                      <div className="h-5 w-px bg-rose-200" />
                      <ExampleA
                        className="text-sm font-semibold"
                        color="rose"
                        onClick={() => handleUpdateIndicator(dt.documentId, "On Going")}
                        size="sm"
                        variant="solid"
                      >
                        Confirm
                      </ExampleA>
                    </>
                  )}

                  {dt.indicator === "On Going" && (
                    <>
                      <div className="h-5 w-px bg-rose-200" />
                      <ExampleA
                        className="text-sm font-semibold"
                        color="rose"
                        onClick={() => handleUpdateIndicator(dt.documentId, "Final Pay")}
                        size="sm"
                        variant="solid"
                      >
                        Final Pay
                      </ExampleA>
                    </>
                  )}

                  {dt.indicator === "Final Pay" && (
                    <ExampleA
                      className="text-sm font-semibold"
                      color="rose"
                      onClick={() => handleUpdateIndicator(dt.documentId, "Success")}
                      size="sm"
                      variant="solid"
                    >
                      Confirm
                    </ExampleA>
                  )}
                </footer>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-2 h-96 basis-1/2 space-y-2 rounded-lg border p-3 shadow-md">
          <h3 className="text-lg font-semibold">Last Reviews</h3>
          <div className="h-px w-full bg-gray-200" />
          <div>
            <div className="border p-2"></div>
          </div>
        </section>
      </div>
    </aside>
  );
};
