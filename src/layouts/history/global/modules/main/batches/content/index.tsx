"use client";

import { Session } from "next-auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC, ReactElement, ReactNode, useEffect } from "react";
import { BiSolidDetail } from "react-icons/bi";
import { FaBox, FaChevronRight, FaClock, FaEdit } from "react-icons/fa";
import { IoStar } from "react-icons/io5";

import { ExampleA, ExampleATWM, FormContainer } from "@/src/components";
import { useGlobalStates } from "@/src/context";
import { IBookingsResponse, IReviewsResponse } from "@/src/types";

interface I {
  bookingsResponse: IBookingsResponse[] | null | undefined;
  children: ReactNode;
  reviewsResponse: IReviewsResponse[] | null | undefined;
  session: null | Session;
}

export const Content: FC<I> = (props): ReactElement => {
  const pathname = usePathname();
  const router = useRouter();
  const { open, setOpen, setResponse } = useGlobalStates();

  useEffect(() => {
    setResponse({
      bookings: props.bookingsResponse ?? [],
      reviews: props.reviewsResponse ?? [],
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const pathSegments = pathname.split("/");
    const documentId = pathSegments[pathSegments.length - 1];

    const element = document.getElementById(documentId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [pathname]);

  return (
    <main className="bg-slate-100">
      <FormContainer href={"/"} innerContainerClassName="size-full max-h-[821px] max-w-[460px] gap-5 lg:max-w-[1000px]" isBooking label={"Home"}>
        <div
          className={`size-full max-w-[400px] space-y-4 overflow-y-auto rounded-lg bg-rose-50 p-5 max-lg:mx-auto lg:block ${open?.bookingList ? "block" : "hidden"}`}
        >
          {props.bookingsResponse?.map((dt) => (
            <section
              className="relative flex w-full max-w-[360px] flex-col justify-between overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md"
              id={dt.documentId}
              key={dt.documentId}
            >
              <div
                className={`absolute inset-x-0 top-0 m-0 h-1.5 border-none ${
                  {
                    Canceled: "bg-red-400",
                    "On Going": "bg-blue-400",
                    Payment: "bg-orange-400",
                    Rejected: "bg-red-400",
                    Success: "bg-green-400",
                    Waiting: "bg-yellow-400",
                  }[dt.indicator] ?? "bg-gray-200"
                }`}
              />

              <div className="flex flex-col gap-4 p-5">
                <header className="flex items-center justify-between">
                  <h1 className="line-clamp-1 text-lg font-semibold text-gray-900">{dt.name || "-"}</h1>

                  <strong
                    className={`flex h-6 w-full max-w-24 items-center justify-center rounded-full px-5 text-xs font-semibold text-white ${
                      {
                        Canceled: "bg-red-400",
                        "On Going": "bg-blue-400",
                        Payment: "bg-orange-400",
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
                        <FaBox className="size-[12px] text-rose-500 max-[400px]:size-[10px]" />
                      </div>
                      <figcaption>
                        <h2 className="block text-gray-500">Package</h2>
                        <span className="block font-semibold text-gray-900">{dt.package || "-"}</span>
                      </figcaption>
                    </figure>

                    {dt.review?.rating && (
                      <figure className="flex items-center gap-3 max-[450px]:order-first">
                        <div className="flex size-8 items-center justify-center rounded-full bg-rose-100">
                          <IoStar className="text-rose-500" />
                        </div>
                        <figcaption>
                          <h2 className="block text-gray-500">Rating</h2>
                          {dt.indicator === "Success" && dt.review && (
                            <div className="flex items-center">
                              {Array.from({ length: 5 }, (_, i) => {
                                const ratingValue = i + 1;
                                return (
                                  <IoStar
                                    className={`size-4 max-[400px]:size-[14px] ${ratingValue <= (dt.review?.rating ?? 0) ? "text-yellow-400" : "text-gray-200"}`}
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

                  <figure className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-rose-100">
                      <FaClock className="text-rose-500" />
                    </div>
                    <figcaption>
                      <h2 className="block text-gray-500">Date</h2>
                      <span className="block font-semibold text-gray-900">{dt.date || "-"}</span>
                    </figcaption>
                  </figure>
                </div>
              </div>

              <footer className="flex items-center justify-end gap-3 border-t border-gray-200 p-3">
                {dt.indicator === "Success" && !dt.review && (
                  <>
                    <Link
                      className={ExampleATWM({ className: "text-sm font-semibold", color: "rose", size: "sm", variant: "ghost" })}
                      href={`/review/${props.session?.user?.username}/${dt.documentId}`}
                    >
                      <FaEdit size={18} />
                    </Link>
                    <span className="h-5 w-px bg-rose-200" />
                  </>
                )}

                {dt.indicator === "Success" && dt.review && (
                  <>
                    <ExampleA
                      className="text-sm font-semibold"
                      color="rose"
                      onClick={() => {
                        setOpen({
                          bookingList: false,
                          bookingSummary: false,
                        });
                        router.replace(`/history/${props.session?.user?.username}/${dt.documentId}`);
                      }}
                      size="sm"
                      variant="ghost"
                    >
                      <BiSolidDetail size={20} />
                    </ExampleA>
                    <span className="h-5 w-px bg-rose-200" />
                  </>
                )}

                <ExampleA
                  className="text-sm font-semibold"
                  color="rose"
                  onClick={() => {
                    setOpen({
                      bookingList: false,
                      bookingSummary: true,
                    });
                    router.replace(`/history/${props.session?.user?.username}/${dt.documentId}`);
                  }}
                  size="sm"
                  variant="ghost"
                >
                  View Details <FaChevronRight className="ml-1" size={12} />
                </ExampleA>
              </footer>
            </section>
          ))}
        </div>

        <aside className={`min-w-fit grow items-start overflow-y-auto ${open?.bookingList ? "max-lg:hidden" : "flex"}`}>
          <div className="my-auto flex w-full justify-center p-2">{props.children}</div>
        </aside>
      </FormContainer>
    </main>
  );
};
