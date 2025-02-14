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
  <section className="flex min-w-[384px] flex-col justify-between gap-5 rounded-lg border border-gray-200 bg-white p-5 shadow-md">
    <div className="space-y-3">
      <header>
        <h1 className="mb-4 text-center text-lg font-bold tracking-widest text-rose-500">-- BOOKING SUMMARY --</h1>
        <div className="my-2 border-t border-gray-300" />
      </header>

      <dl className="space-y-3">
        <div className="flex justify-between">
          <dt className="text-gray-600">Name:</dt>
          <dd className="font-semibold">{props.name || "-"}</dd>
        </div>

        <div className="flex justify-between">
          <dt className="text-gray-600">Event:</dt>
          <dd className="font-semibold">{props.event || "-"}</dd>
        </div>

        <div className="flex justify-between">
          <dt className="text-gray-600">Date:</dt>
          <dd className="font-semibold">{props.date || "-"}</dd>
        </div>

        <div className="flex justify-between">
          <dt className="text-gray-600">Time:</dt>
          <dd className="max-w-60 whitespace-pre-wrap text-center font-semibold">
            {Array.isArray(props.time) && props.time.length > 0 ? props.time.join(`\n`) : "-"}
          </dd>
        </div>

        <div className="flex justify-between">
          <dt className="text-gray-600">Phone Number:</dt>
          <dd className="font-semibold">{props.phoneNumber || "-"}</dd>
        </div>

        <div className="flex justify-between">
          <dt className="text-gray-600">Email:</dt>
          <dd className="font-semibold">{props.email || "-"}</dd>
        </div>

        <div className="flex justify-between">
          <dt className="text-gray-600">Google Maps:</dt>
          <dd>
            <Link
              className={ExampleATWM({ className: "font-semibold underline", color: "rose", size: "sm", variant: "ghost" })}
              href={props.googleMapsLink || "#"}
              target="_blank"
            >
              {props.googleMapsLink ? "View Location" : "-"}
            </Link>
          </dd>
        </div>

        {props.status && (
          <div className="flex items-center justify-between">
            <dt className="text-gray-600">Status:</dt>
            <dd
              className={`flex h-6 w-full max-w-24 items-center justify-center rounded-full px-5 text-xs font-semibold text-white ${(() => {
                switch (props.status) {
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
              {props.status}
            </dd>
          </div>
        )}

        {props.current && (
          <div className="flex justify-between">
            <dt className="text-gray-600">Booked At:</dt>
            <dd className="font-semibold">{format(new Date(props.current), "yyyy-MM-dd / HH:mm") || "-"}</dd>
          </div>
        )}

        <div className="my-2 border-t border-gray-300" />

        <div className="flex justify-between">
          <dt className="text-gray-600">Tax (PPN):</dt>
          <dd className="font-semibold">{currencyFormat(props.tax || 0, "IDR")}</dd>
        </div>

        <div className="flex justify-between">
          <dt className="text-gray-600">Subtotal:</dt>
          <dd className="font-semibold">{currencyFormat(props.subTotal || 0, "IDR")}</dd>
        </div>

        <div className="my-2 border-t border-gray-300" />

        <div className="flex justify-between">
          <dt className="text-lg font-semibold">TOTAL:</dt>
          <dd className="text-lg text-rose-500">
            <strong className="font-bold">{currencyFormat(props.total || 0, "IDR")}</strong>
          </dd>
        </div>
      </dl>
    </div>

    <footer className="text-center text-xs text-gray-300">
      <span className="block">BID {props.documentId?.toLocaleUpperCase() || "< EMPTY >"}</span>
      <span className="block">{props.datasDocumentId?.toLocaleUpperCase() || "< EMPTY >"}</span>
    </footer>
  </section>
);
