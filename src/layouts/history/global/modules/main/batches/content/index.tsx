"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Session } from "next-auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import { BiSolidDetail } from "react-icons/bi";
import { BsCalendar2CheckFill } from "react-icons/bs";
import { FaBox, FaChevronRight, FaEdit } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import { useInView } from "react-intersection-observer";

import loadingAnimation from "@/public/assets/animations/Loading-R.svg";
import { ExampleA, ExampleATWM, FormContainer } from "@/src/components";
import { useGlobalStates } from "@/src/context";
import { DUMMY_BOOKING_DATA } from "@/src/libs";
import { IBookingResponse, IMetaResponse, IOpenContext, IReviewResponse } from "@/src/types";
import { GETBooking, GETBookingByDocumentId } from "@/src/utils";

interface I {
  children: ReactNode;
  reviewResponse: IReviewResponse[] | null | undefined;
  session: null | Session;
}

export const Content: FC<I> = (props): ReactElement => {
  const pathname = usePathname();
  const router = useRouter();
  const { inView, ref } = useInView();
  const [pageCount, setPageCount] = useState(1);
  const [pathKeeper, setPathKeeper] = useState("");
  const [searchedData, setSearchedData] = useState<IBookingResponse>();
  const { open, setOpen, setResponse } = useGlobalStates();

  const {
    data: bookingResponse,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<{ data: IBookingResponse[] } & IMetaResponse>({
    enabled: props.session?.user?.role !== "demo",
    getNextPageParam: (lastPage, allPages): number | undefined => (pageCount === allPages.length ? undefined : allPages.length + 1),
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      GETBooking(
        `sort[0]=createdAt:desc&filters[relation_data][documentId][$eq]=${props.session?.user?.dataDocumentId}&pagination[pageSize]=5&pagination[page]=${pageParam}`,
      ),
    queryKey: ["booking", props.session?.user?.dataDocumentId],
  });

  useEffect(() => {
    const execute = async () => {
      try {
        if (!bookingResponse?.pages[0]?.meta.pagination) {
          return;
        }

        setPageCount(bookingResponse.pages[0].meta.pagination.pageCount || 1);

        if (!pathKeeper) {
          return;
        }

        const data = bookingResponse.pages.flatMap((pg) => pg.data);
        const findBooking = data?.find((dt) => dt.documentId === pathKeeper);

        const findReview = props.reviewResponse?.find((dt) => dt.relation_booking.documentId === pathKeeper);

        if (!findBooking) {
          const fetchedBooking = await GETBookingByDocumentId(pathKeeper);
          setResponse({ booking: fetchedBooking, review: findReview });
          setSearchedData(fetchedBooking);
        } else {
          setResponse({ booking: findBooking, review: findReview });
        }
      } catch {
        console.warn("Data Not Found!");
      }
    };

    if (props.session?.user?.role !== "demo") {
      execute();
    } else {
      const findBooking = DUMMY_BOOKING_DATA?.find((dt) => dt.documentId === pathKeeper);

      if (findBooking?.relation_review) {
        setResponse({ booking: findBooking, review: findBooking.relation_review });
      } else {
        setResponse({ booking: findBooking });
      }
    }

    // eslint-disable-next-line
  }, [bookingResponse?.pages, pathKeeper]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line
  }, [inView]);

  useEffect(() => {
    const pathSegments = pathname.split("/");
    const documentId = pathSegments[3];

    setPathKeeper(documentId);

    const element = document.getElementById(documentId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [pathname]);

  return (
    <main className="bg-slate-100">
      <FormContainer
        className={{
          innerContainer: "size-full max-h-[821px] max-w-[460px] gap-5 lg:max-w-[1000px]",
        }}
        href="/"
        isHistory
        label="Home"
      >
        <div
          className={`size-full max-w-[400px] space-y-4 overflow-y-auto rounded-lg bg-rose-50 p-5 max-lg:mx-auto lg:block ${open?.historyAsideSwitch ? "hidden" : "block"}`}
        >
          {searchedData && (
            <>
              <Component data={searchedData} pathName={pathKeeper} router={router} setOpen={setOpen} username={props.session?.user?.username} />

              <div className="mx-auto h-0.5 w-1/2 rounded-full bg-rose-400" />
            </>
          )}

          {props.session?.user?.role === "demo"
            ? DUMMY_BOOKING_DATA.map((dt, i) => (
                <Component data={dt} key={i} pathName={pathKeeper} router={router} setOpen={setOpen} username={props.session?.user?.username} />
              ))
            : bookingResponse?.pages.map((pg) =>
                pg.data.map((dt, i) => (
                  <Component data={dt} key={i} pathName={pathKeeper} router={router} setOpen={setOpen} username={props.session?.user?.username} />
                )),
              )}

          {hasNextPage && <Image alt="Loading..." className="mx-auto" ref={ref} src={loadingAnimation} width={20} />}
        </div>

        <aside className={`min-w-fit grow items-start overflow-y-auto ${open?.historyAsideSwitch ? "flex" : "max-lg:hidden lg:flex"}`}>
          <div className="my-auto flex w-full justify-center p-2">{props.children}</div>
        </aside>
      </FormContainer>
    </main>
  );
};

// ----------------------------

interface IComponent {
  data: IBookingResponse;
  pathName: string;
  router: AppRouterInstance;
  setOpen: (param: IOpenContext) => void;
  username: string | undefined;
}

const Component: FC<IComponent> = (props): ReactElement => (
  <section
    className="group relative flex w-full max-w-[360px] flex-col justify-between overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:border-rose-200 hover:shadow-md"
    id={props.data.documentId}
    key={props.data.documentId}
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
        }[props.data.indicator] ?? "bg-gray-200"
      }`}
    />

    <div className="flex flex-col gap-4 p-5">
      <header className="flex items-center justify-between gap-2">
        <h1 className="line-clamp-1 text-lg font-semibold text-gray-900">{props.data.name || "-"}</h1>

        <div className="flex w-fit items-center gap-2">
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
              }[props.data.indicator] ?? "bg-gray-400"
            }`}
          >
            {props.data.indicator}
          </strong>

          {props.data.documentId === props.pathName && <div className="min-h-6 min-w-6 rounded-full bg-rose-400" />}
        </div>
      </header>

      <div className="space-y-3 text-sm max-[400px]:text-xs">
        <div className="flex justify-between gap-3 max-[450px]:flex-col">
          <figure className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-full bg-rose-100">
              <FaBox className="text-rose-500" size={12} />
            </div>
            <figcaption>
              <h2 className="text-gray-500">Package</h2>
              <span className="block font-semibold text-gray-900">{props.data.package || "-"}</span>
            </figcaption>
          </figure>

          {props.data.relation_review?.rating && (
            <figure className="flex items-center gap-3 max-[450px]:order-first">
              <div className="flex size-8 items-center justify-center rounded-full bg-rose-100">
                <IoStar className="text-rose-500" size={15} />
              </div>
              <figcaption>
                <h2 className="text-gray-500">Rating</h2>
                {props.data.indicator === "Success" && props.data.relation_review && (
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => {
                      const ratingValue = i + 1;
                      return (
                        <IoStar
                          className={`size-4 max-[400px]:size-[14px] ${ratingValue <= (props.data.relation_review?.rating ?? 0) ? "text-yellow-400" : "text-gray-200"}`}
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
            <BsCalendar2CheckFill className="text-rose-500" size={13} />
          </div>
          <figcaption>
            <h2 className="text-gray-500">Date</h2>
            <span className="block font-semibold text-gray-900">{props.data.date || "-"}</span>
          </figcaption>
        </figure>
      </div>
    </div>

    <footer className="flex items-center justify-end gap-3 border-t border-gray-200 p-3 group-hover:border-rose-200">
      {props.data.indicator === "Success" && !props.data.relation_review && (
        <>
          <Link
            className={ExampleATWM({ className: "text-sm font-semibold", color: "rose", size: "sm", variant: "ghost" })}
            href={`/review/${props.username}/${props.data.documentId}`}
          >
            <FaEdit size={18} />
          </Link>
          <div className="h-5 w-px bg-rose-200" />
        </>
      )}

      {props.data.indicator === "Success" && props.data.relation_review && (
        <>
          <ExampleA
            className="text-sm font-semibold"
            color="rose"
            onClick={() => {
              props.setOpen({
                historyAsideSwitch: true,
                historyDetailSwitch: true,
              });
              props.router.replace(`/history/${props.username}/${props.data.documentId}`);
            }}
            size="sm"
            variant="ghost"
          >
            <BiSolidDetail size={20} />
          </ExampleA>
          <div className="h-5 w-px bg-rose-200" />
        </>
      )}

      <ExampleA
        className="text-sm font-semibold"
        color="rose"
        onClick={() => {
          props.setOpen({
            historyAsideSwitch: true,
            historyDetailSwitch: false,
          });
          props.router.replace(`/history/${props.username}/${props.data.documentId}`);
        }}
        size="sm"
        variant="ghost"
      >
        View Details <FaChevronRight className="ml-1" size={12} />
      </ExampleA>
    </footer>
  </section>
);
