"use client";

import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactElement, ReactNode, useEffect } from "react";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight, FaClock } from "react-icons/fa";

import { ExampleATWM } from "@/src/components/interfaces/example/A";
import { IBookingsResponse } from "@/src/types/api";

interface I {
  children: ReactNode;
  response: IBookingsResponse[];
  session: null | Session;
}

export const UserLayout: FC<I> = (props): ReactElement => {
  const pathname = usePathname();

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
      <section className="container mx-auto flex h-screen items-center justify-center p-5">
        <div className="relative flex size-full max-h-[821px] max-w-[1000px] gap-5 rounded-xl bg-white px-5 pb-5 pt-[60px] shadow-lg">
          <Link className={ExampleATWM({ className: "absolute left-5 top-5 font-semibold", color: "rose", size: "sm", variant: "ghost" })} href={"/"}>
            <FaChevronLeft className="ml-1" size={12} /> Home
          </Link>
          <section className="size-full max-w-[400px] space-y-4 overflow-y-auto rounded-lg bg-rose-50 p-5">
            {props.response.map((dt) => (
              <div
                className="relative flex w-full max-w-[360px] flex-col justify-between overflow-hidden rounded-lg border border-gray-300 bg-white"
                id={dt.documentId}
                key={dt.documentId}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 ${(() => {
                    switch (dt.indicator) {
                      case "Canceled":
                        return "bg-red-400";
                      case "On Going":
                        return "bg-blue-400";
                      case "Payment":
                        return "bg-orange-400";
                      case "Rejected":
                        return "bg-red-400";
                      case "Success":
                        return "bg-green-400";
                      case "Waiting":
                        return "bg-yellow-400";
                      default:
                        return "bg-gray-200";
                    }
                  })()}`}
                />

                <div className="flex flex-col gap-4 p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">{dt.name || "-"}</h3>
                    <span
                      className={`flex h-6 w-full max-w-24 items-center justify-center rounded-full px-5 text-xs font-semibold text-white ${(() => {
                        switch (dt.indicator) {
                          case "Canceled":
                            return "bg-red-400";
                          case "On Going":
                            return "bg-blue-400";
                          case "Payment":
                            return "bg-orange-400";
                          case "Rejected":
                            return "bg-red-400";
                          case "Success":
                            return "bg-green-400";
                          case "Waiting":
                            return "bg-yellow-400";
                          default:
                            return "";
                        }
                      })()}`}
                    >
                      {dt.indicator}
                    </span>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-full bg-rose-100">
                        <FaCalendarAlt className="text-rose-500" />
                      </div>
                      <div>
                        <span className="block text-gray-500">Event</span>
                        <span className="block font-medium text-gray-900">{dt.event || "-"}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-full bg-rose-100">
                        <FaClock className="text-rose-500" />
                      </div>
                      <div>
                        <span className="block text-gray-500">Date</span>
                        <span className="block font-medium text-gray-900">{dt.date || "-"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end border-t border-gray-300 p-3">
                  <Link
                    className={ExampleATWM({ className: "text-sm font-semibold", color: "rose", size: "sm", variant: "ghost" })}
                    href={`/user/${props.session?.user?.username}/history/${dt.documentId}`}
                  >
                    View Details <FaChevronRight className="ml-1" size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </section>

          <div className="flex grow items-start overflow-y-auto h-min-[845px]:items-center">
            <div className="flex w-full justify-center h-max-[845px]:my-auto">{props.children}</div>
          </div>
        </div>
      </section>
    </main>
  );
};
