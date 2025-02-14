import { format } from "date-fns";
import Link from "next/link";
import { FC, ReactElement } from "react";

import { currencyFormat } from "@/src/hooks/functions";

import { ExampleATWM } from "../interfaces/example/A";

type TStatus = "Canceled" | "On Going" | "Payment" | "Rejected" | "Success" | "Waiting";

interface I {
  current?: Date;
  datasDocumentId?: string;
  date?: string;
  documentId?: string;
  email?: string;
  event?: string;
  googleMapsLink?: string;
  name?: string;
  phoneNumber?: string;
  status?: string | TStatus;
  subTotal?: number | string;
  tax?: number | string;
  time?: string[];
  total?: number | string;
}

export const BookingSummary: FC<I> = (props): ReactElement => (
  <section className="flex min-w-[400px] max-w-[500px] flex-col justify-between gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
    <div className="space-y-4">
      <header>
        <h1 className="mb-4 text-center text-xl font-bold tracking-widest text-rose-500">-- BOOKING SUMMARY --</h1>
        <div className="my-3 border-t border-gray-300" />
      </header>

      <dl className="space-y-4">
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="flex justify-between">
            <dt className="font-medium text-gray-600">Name:</dt>
            <dd className="font-semibold text-gray-800">{props.name || "-"}</dd>
          </div>

          <div className="flex justify-between">
            <dt className="font-medium text-gray-600">Event:</dt>
            <dd className="font-semibold text-gray-800">{props.event || "-"}</dd>
          </div>

          <div className="flex justify-between">
            <dt className="font-medium text-gray-600">Date:</dt>
            <dd className="font-semibold text-gray-800">{props.date || "-"}</dd>
          </div>

          <div className="flex justify-between">
            <dt className="font-medium text-gray-600">Time:</dt>
            <dd className="max-w-60 text-right text-gray-800">
              <pre>{Array.isArray(props.time) && props.time.length > 0 ? props.time.join(`\n`) : "-"}</pre>
            </dd>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="flex justify-between">
            <dt className="font-medium text-gray-600">Phone:</dt>
            <dd className="font-semibold text-gray-800">{props.phoneNumber || "-"}</dd>
          </div>

          <div className="flex justify-between">
            <dt className="font-medium text-gray-600">Email:</dt>
            <dd className="font-semibold text-gray-800">{props.email || "-"}</dd>
          </div>

          <div className="flex justify-between">
            <dt className="font-medium text-gray-600">Location:</dt>
            <dd>
              <Link
                className={ExampleATWM({
                  className: "font-semibold text-rose-500 underline hover:text-rose-600",
                  color: "rose",
                  size: "sm",
                  variant: "ghost",
                })}
                href={props.googleMapsLink || "#"}
                target="_blank"
              >
                {props.googleMapsLink ? "View on Map" : "-"}
              </Link>
            </dd>
          </div>
        </div>

        {props.status && (
          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
            <dt className="font-medium text-gray-600">Status:</dt>
            <dd
              className={`flex h-7 w-28 items-center justify-center rounded-full text-sm font-semibold text-white ${
                {
                  Canceled: "bg-red-400",
                  "On Going": "bg-blue-400",
                  Payment: "bg-orange-400",
                  Rejected: "bg-red-400",
                  Success: "bg-green-400",
                  Waiting: "bg-yellow-400",
                }[props.status] ?? "bg-gray-400"
              }`}
            >
              {props.status}
            </dd>
          </div>
        )}

        {props.current && (
          <div className="flex justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
            <dt className="font-medium text-gray-600">Booked At:</dt>
            <dd className="font-semibold text-gray-800">{format(new Date(props.current), "yyyy-MM-dd / HH:mm") || "-"}</dd>
          </div>
        )}

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="flex justify-between">
            <dt className="font-medium text-gray-600">Tax (PPN):</dt>
            <dd className="font-semibold text-gray-800">{currencyFormat(props.tax || 0, "IDR")}</dd>
          </div>

          <div className="flex justify-between">
            <dt className="font-medium text-gray-600">Subtotal:</dt>
            <dd className="font-semibold text-gray-800">{currencyFormat(props.subTotal || 0, "IDR")}</dd>
          </div>

          <div className="my-3 border-t border-gray-300" />

          <div className="flex justify-between">
            <dt className="text-lg font-semibold text-gray-800">TOTAL:</dt>
            <dd className="text-lg font-bold text-rose-500">{currencyFormat(props.total || 0, "IDR")}</dd>
          </div>
        </div>
      </dl>
    </div>

    <footer className="mt-4 text-center text-xs text-gray-400">
      <span className="block">{props.documentId?.toLocaleUpperCase() || "< EMPTY >"}</span>
      <span className="block">{props.datasDocumentId?.toLocaleUpperCase() || "< EMPTY >"}</span>
    </footer>
  </section>
);
