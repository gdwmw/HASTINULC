import { format } from "date-fns";
import Link from "next/link";
import { FC, ReactElement } from "react";

import { currencyFormat } from "@/src/hooks";
import { IBookingResponse } from "@/src/types";

import { ExampleATWM } from "../../";

interface I {
  data: Partial<IBookingResponse>;
}

export const BookingSummary: FC<I> = (props): ReactElement => (
  <section className="flex w-full min-w-[260px] max-w-[400px] flex-col justify-between gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-md lg:min-w-[400px]">
    <div className="space-y-4">
      <header>
        <h1 className="mb-4 text-center text-xl font-bold tracking-widest text-rose-400 max-[450px]:text-base max-[380px]:text-sm">
          -- BOOKING SUMMARY --
        </h1>
        <div className="my-3 border-t border-gray-200" />
      </header>

      <dl className="space-y-4 max-[450px]:text-sm max-[380px]:text-xs">
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="flex justify-between gap-5">
            <dt className="font-medium text-gray-600">Name:</dt>
            <dd className="line-clamp-1 font-semibold">{props.data.name || "-"}</dd>
          </div>

          <div className="flex justify-between">
            <dt className="font-medium text-gray-600">Package:</dt>
            <dd className="font-semibold">{props.data.package || "-"}</dd>
          </div>

          <div className="flex justify-between">
            <dt className="font-medium text-gray-600">Date:</dt>
            <dd className="font-semibold">{props.data.date || "-"}</dd>
          </div>

          <div className="flex justify-between">
            <dt className="font-medium text-gray-600">Time:</dt>
            <dd className="max-w-60 text-right">
              <pre>{Array.isArray(props.data.time) && props.data.time.length > 0 ? props.data.time.join(`\n`) : "-"}</pre>
            </dd>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="flex justify-between">
            <dt className="font-medium text-gray-600">Phone:</dt>
            <dd className="font-semibold">{props.data.phoneNumber || "-"}</dd>
          </div>

          <div className="flex justify-between">
            <dt className="font-medium text-gray-600">Email:</dt>
            <dd className="max-w-[250px] truncate font-semibold max-[480px]:max-w-[200px] max-[430px]:max-w-[150px] max-[380px]:max-w-[120px]">
              {props.data.email || "-"}
            </dd>
          </div>

          <div className="flex justify-between">
            <dt className="font-medium text-gray-600">Location:</dt>
            <dd>
              <Link
                className={ExampleATWM({
                  className: "font-semibold text-rose-400 underline hover:text-rose-500 max-[450px]:text-sm max-[380px]:text-xs",
                  color: "rose",
                  size: "sm",
                  variant: "ghost",
                })}
                href={props.data.googleMapsLink || "#"}
                target="_blank"
              >
                {props.data.googleMapsLink ? "View on Map" : "-"}
              </Link>
            </dd>
          </div>
        </div>

        {props.data.indicator && (
          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
            <dt className="font-medium text-gray-600">Status:</dt>
            <dd
              className={`flex h-7 w-28 items-center justify-center rounded-full text-sm font-semibold text-white max-[380px]:text-xs ${
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
            </dd>
          </div>
        )}

        {props.data.createdAt && (
          <div className="flex justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
            <dt className="font-medium text-gray-600">Created At:</dt>
            <dd className="font-semibold">{format(new Date(props.data.createdAt), "yyyy-MM-dd / HH:mm") || "-"}</dd>
          </div>
        )}

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="flex justify-between">
            <dt className="font-medium text-gray-600">Tax:</dt>
            <dd className="font-semibold">{currencyFormat(props.data.tax || 0, "USD")}</dd>
          </div>

          <div className="flex justify-between">
            <dt className="font-medium text-gray-600">Subtotal:</dt>
            <dd className="font-semibold">{currencyFormat(props.data.subtotal || 0, "USD")}</dd>
          </div>

          <div className="my-3 border-t border-gray-200" />

          <div className="flex justify-between text-lg max-[450px]:text-base max-[380px]:text-sm">
            <dt className="font-semibold">TOTAL:</dt>
            <dd className="font-bold text-rose-400">{currencyFormat(props.data.total || 0, "USD")}</dd>
          </div>
        </div>
      </dl>
    </div>

    <footer className="mt-4 text-center text-xs text-gray-400">
      <span className="block">{props.data.documentId?.toLocaleUpperCase() || "< EMPTY >"}</span>
      <span className="block">{props.data.relation_data?.documentId.toLocaleUpperCase() || "< EMPTY >"}</span>
    </footer>
  </section>
);
